import React, { useState, useEffect } from 'react';
import CrossFitRandomiser from './components/CrossFitRandomiser';
import { fetchWorkoutsFromGoogleSheets } from './googleSheetsIntegration';

function App() {
  const [loading, setLoading] = useState(true);
  const [externalWorkouts, setExternalWorkouts] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Attempt to load workouts from Google Sheets
    async function loadExternalWorkouts() {
      try {
        const data = await fetchWorkoutsFromGoogleSheets();
        setExternalWorkouts(data);
      } catch (err) {
        console.error('Failed to fetch external workouts:', err);
        setError('Unable to fetch external workouts. Using built-in workouts only.');
      } finally {
        setLoading(false);
      }
    }
    
    loadExternalWorkouts();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading WOD Randomiser...</h2>
          <p className="text-gray-500 mt-2">Getting your workout ready</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="App">
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <CrossFitRandomiser externalWorkouts={externalWorkouts} />
    </div>
  );
}

export default App;