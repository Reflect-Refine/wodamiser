// Google Sheets Integration for CrossFit WOD Randomiser

// Replace with your published Google Sheet URL and Sheet ID
const GOOGLE_SHEETS_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

// Function to fetch and parse workouts from Google Sheets
export async function fetchWorkoutsFromGoogleSheets() {
  try {
    // Fetch the published CSV
    const response = await fetch(GOOGLE_SHEETS_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Parse CSV to array of workout objects
    const workouts = parseCSVtoWorkouts(csvText);
    
    // Cache the workouts in localStorage for offline use
    localStorage.setItem('googleSheetsWorkouts', JSON.stringify(workouts));
    localStorage.setItem('googleSheetsLastFetch', new Date().toISOString());
    
    return workouts;
  } catch (error) {
    console.error('Error fetching workouts from Google Sheets:', error);
    
    // Fallback to cached workouts if available
    const cachedWorkouts = localStorage.getItem('googleSheetsWorkouts');
    if (cachedWorkouts) {
      return JSON.parse(cachedWorkouts);
    }
    
    // If no cached data, throw the error to be handled by the caller
    throw error;
  }
}

// Parse CSV to structured workout objects
function parseCSVtoWorkouts(csvText) {
  // Split CSV into lines
  const lines = csvText.split('\n');
  
  // Extract headers (first line)
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Map column indices
  const columnIndices = {
    name: headers.indexOf('Name'),
    description: headers.indexOf('Description'),
    type: headers.indexOf('Type'),
    movements: headers.indexOf('Movements'),
    difficulty: headers.indexOf('Difficulty'),
    estimatedTime: headers.indexOf('EstimatedTime'),
    category: headers.indexOf('Category') // regular, hyrox, intense
  };
  
  // Check if all required columns exist
  const requiredColumns = ['Name', 'Description', 'Type', 'Movements', 'Category'];
  const missingColumns = requiredColumns.filter(col => columnIndices[col.toLowerCase()] === -1);
  
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns in CSV: ${missingColumns.join(', ')}`);
  }
  
  // Process data rows (skip header)
  const workouts = lines.slice(1)
    .filter(line => line.trim() !== '') // Skip empty lines
    .map(line => {
      // Handle quoted values with commas inside them
      const values = parseCSVLine(line);
      
      // Extract values using column indices
      const name = values[columnIndices.name];
      const description = values[columnIndices.description];
      const type = values[columnIndices.type];
      const movementsStr = values[columnIndices.movements];
      const difficulty = columnIndices.difficulty !== -1 ? values[columnIndices.difficulty] : 'Intermediate';
      const estimatedTime = columnIndices.estimatedTime !== -1 ? values[columnIndices.estimatedTime] : '';
      const category = values[columnIndices.category].toLowerCase();
      
      // Parse movements string into array
      const movements = movementsStr.split(';').map(m => m.trim().toLowerCase());
      
      // Create workout object
      return {
        name,
        description,
        type,
        movements,
        movementsList: [], // For detailed movement info
        estimatedTime,
        difficulty,
        category
      };
    });
  
  // Group workouts by category
  const groupedWorkouts = {
    regular: workouts.filter(w => w.category === 'regular'),
    hyrox: workouts.filter(w => w.category === 'hyrox'),
    intense: workouts.filter(w => w.category === 'intense')
  };
  
  return groupedWorkouts;
}

// Helper function to properly parse CSV line with quoted values
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Don't forget the last field
  result.push(current.trim());
  
  return result;
}