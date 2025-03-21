import React from 'react';
import { Dumbbell, Award, Zap, RefreshCw, Play, Download, Info } from 'lucide-react';
import { movementCategories } from '../data/movements';

const HomeTab = ({ 
  workout, 
  loading, 
  mode, 
  setMode, 
  showExcludePanel, 
  excludedMovements,
  movementInfo,
  fetchWorkout,
  setActiveTab,
  changeTimerType,
  saveWorkoutToHistory,
  toggleExcludeMovement,
  clearExclusions,
  showMovementDetails
}) => {
  return (
    <>
      {/* Mode selection */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Workout Mode</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setMode('regular')}
            className={`p-3 rounded-lg flex flex-col items-center transition ${mode === 'regular' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Dumbbell size={24} className="mb-1" />
            <span className="text-sm">Standard</span>
          </button>
          <button
            onClick={() => setMode('hyrox')}
            className={`p-3 rounded-lg flex flex-col items-center transition ${mode === 'hyrox' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Award size={24} className="mb-1" />
            <span className="text-sm">Hyrox</span>
          </button>
          <button
            onClick={() => setMode('intense')}
            className={`p-3 rounded-lg flex flex-col items-center transition ${mode === 'intense' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Zap size={24} className="mb-1" />
            <span className="text-sm">F**k Me Up</span>
          </button>
        </div>
      </div>

      {/* Exclusion panel */}
      {showExcludePanel && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Exclude Movements</h2>
            <button 
              onClick={clearExclusions}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {movementCategories.map(category => (
              <label key={category.id} className="flex items-center p-2 rounded hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={excludedMovements.includes(category.id)}
                  onChange={() => toggleExcludeMovement(category.id)}
                  className="mr-2"
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Workout display */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : workout ? (
          <div>
            <div className={`p-3 ${mode === 'regular' ? 'bg-blue-500' : mode === 'hyrox' ? 'bg-purple-500' : 'bg-red-500'} text-white flex justify-between items-center`}>
              <h2 className="font-bold text-lg">{workout.name}</h2>
              <div className="flex items-center space-x-2">
                {workout.difficulty && (
                  <span className="text-xs font-semibold px-2 py-1 bg-white/20 rounded">
                    {workout.difficulty}
                  </span>
                )}
                <span className="text-xs font-semibold px-2 py-1 bg-white/20 rounded">
                  {workout.type}
                </span>
              </div>
            </div>
            <div className="p-4">
              <pre className="whitespace-pre-wrap font-sans">{workout.description}</pre>
              
              {workout.estimatedTime && (
                <div className="mt-3 text-sm text-gray-600">
                  <strong>Estimated time:</strong> {workout.estimatedTime}
                </div>
              )}
              
              {/* Movements information */}
              {workout.movementsList && workout.movementsList.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">Movement Information:</h3>
                  <div className="flex flex-wrap gap-2">
                    {workout.movementsList.map(movement => (
                      movementInfo[movement] && (
                        <button
                          key={movement}
                          onClick={() => showMovementDetails(movement)}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full flex items-center"
                        >
                          <Info size={12} className="mr-1" />
                          {movementInfo[movement].name}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t p-3 flex justify-between items-center">
              <button 
                onClick={fetchWorkout}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <RefreshCw size={16} className="mr-2" />
                Get New Workout
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setActiveTab('timer');
                    if (workout.type === 'AMRAP') {
                      changeTimerType('amrap');
                    } else {
                      changeTimerType('stopwatch');
                    }
                  }}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  <Play size={16} className="mr-2" />
                  Start
                </button>
                <button 
                  onClick={saveWorkoutToHistory}
                  className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  <Download size={16} className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No workout loaded. Click "Get New Workout" to generate one.
          </div>
        )}
      </div>
    </>
  );
};

export default HomeTab;