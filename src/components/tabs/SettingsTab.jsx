import React from 'react';
import { X, RotateCcw } from 'lucide-react';

const SettingsTab = ({ setWorkoutHistory, setExcludedMovements, setMode }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-3 bg-blue-500 text-white">
        <h2 className="font-bold text-lg">Settings</h2>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Data Management */}
        <div>
          <h3 className="font-semibold mb-3">Data Management</h3>
          <div className="space-y-2">
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your workout history?')) {
                  setWorkoutHistory([]);
                }
              }}
              className="w-full px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition flex items-center justify-center"
            >
              <X size={16} className="mr-2" />
              Clear Workout History
            </button>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all preferences?')) {
                  setExcludedMovements([]);
                  setMode('regular');
                  localStorage.removeItem('excludedMovements');
                  localStorage.removeItem('workoutMode');
                }
              }}
              className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition flex items-center justify-center"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset All Preferences
            </button>
          </div>
        </div>
        
        {/* App Information */}
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <div className="bg-gray-100 p-4 rounded text-sm">
            <p className="mb-2">CrossFit WOD Randomiser PWA v1.0</p>
            <p className="mb-2">This app generates random CrossFit style workouts, including standard CrossFit benchmark workouts, Hyrox-style training, and high-intensity challenges.</p>
            <p className="text-gray-600">Disclaimer: Always consult a professional trainer before attempting any exercise program. Use this app at your own risk.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;