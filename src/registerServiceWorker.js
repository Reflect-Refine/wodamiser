// Service worker registration script

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      
      registerValidSW(swUrl);
      
      // Add offline detection
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
      updateOnlineStatus();
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      // Check for updates on page load
      registration.update();
      
      // Set up periodic updates
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // Check every hour
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content is available; show update notification
              showUpdateNotification();
            } else {
              // Content is cached for offline use
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

// Show notification when app has updated
function showUpdateNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'update-notification';
  notification.innerHTML = `
    <div class="update-content">
      <p>New version available! <button id="update-app">Update Now</button></p>
      <button id="close-notification">×</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add event listeners
  document.getElementById('update-app').addEventListener('click', () => {
    window.location.reload();
  });
  
  document.getElementById('close-notification').addEventListener('click', () => {
    notification.remove();
  });
  
  // Add some basic styles
  const style = document.createElement('style');
  style.textContent = `
    .update-notification {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    .update-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #update-app {
      background: white;
      color: #2563eb;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      margin-left: 8px;
    }
    #close-notification {
      background: transparent;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  `;
  
  document.head.appendChild(style);
}

// Update online/offline indicator
function updateOnlineStatus() {
  const isOnline = navigator.onLine;
  
  // If there's already an indicator, remove it
  const existingIndicator = document.getElementById('connection-status');
  if (existingIndicator) {
    existingIndicator.remove();
  }
  
  // Only show the offline indicator
  if (!isOnline) {
    const indicator = document.createElement('div');
    indicator.id = 'connection-status';
    indicator.textContent = 'You are offline. Some features may be limited.';
    indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f97316;
      color: white;
      text-align: center;
      padding: 8px;
      z-index: 1000;
    `;
    
    document.body.appendChild(indicator);
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}