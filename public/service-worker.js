// Service Worker for CrossFit WOD Randomiser PWA
const CACHE_NAME = 'wod-randomiser-v1';

// Assets to cache immediately during installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - precache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network, and cache new requests
self.addEventListener('fetch', event => {
  // Skip cross-origin requests like Google Sheets API
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests (HTML), always go to network first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }

  // For other requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(response => {
        // Don't cache if not a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response since it can only be consumed once
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(error => {
        // For failed image requests, return a placeholder
        if (event.request.destination === 'image') {
          return new Response(
            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="20" fill="#555">Image Unavailable</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
        console.error('Fetch failed:', error);
        throw error;
      });
    })
  );
});

// Background sync for pending history saves
self.addEventListener('sync', event => {
  if (event.tag === 'sync-workout-history') {
    event.waitUntil(syncWorkoutHistory());
  }
});

// Function to sync pending history items
async function syncWorkoutHistory() {
  const pendingSaves = await getPendingSaves();
  
  if (pendingSaves.length === 0) {
    return;
  }

  try {
    // Here you would implement logic to save to your backend
    // For now we just log and clear the queue
    console.log('Syncing pending history items:', pendingSaves);
    await clearPendingSaves();
  } catch (error) {
    console.error('Sync failed:', error);
    throw error; // This will cause the sync to retry
  }
}

// Helper functions for background sync
async function getPendingSaves() {
  const db = await openDatabase();
  return db.getAll('pending-history');
}

async function clearPendingSaves() {
  const db = await openDatabase();
  return db.clear('pending-history');
}

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('workout-history-sync', 1);
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('pending-history', { keyPath: 'id' });
    };
    
    request.onsuccess = event => {
      const db = event.target.result;
      resolve({
        getAll: storeName => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
          });
        },
        clear: storeName => {
          return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
          });
        }
      });
    };
    
    request.onerror = () => reject(request.error);
  });
}