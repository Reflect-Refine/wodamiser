import React from 'react';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

const TimerTab = ({
  workout,
  timerType,
  timerRunning,
  timeRemaining,
  elapsedTime,
  timerSettings,
  startTimer,
  pauseTimer,
  resetTimer,
  changeTimerType,
  handleTimerSettingChange,
  saveWorkoutToHistory,
  formatTime
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-3 bg-blue-500 text-white">
        <h2 className="font-bold text-lg">Workout Timer</h2>
      </div>
      
      {/* Timer Type Selection */}
      <div className="p-4 border-b">
        <div className="flex justify-around">
          <button
            onClick={() => changeTimerType('stopwatch')}
            className={`px-4 py-2 rounded ${timerType === 'stopwatch' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => changeTimerType('countdown')}
            className={`px-4 py-2 rounded ${timerType === 'countdown' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Countdown
          </button>
          <button
            onClick={() => changeTimerType('amrap')}
            className={`px-4 py-2 rounded ${timerType === 'amrap' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            AMRAP
          </button>
        </div>
      </div>
      
      {/* Timer Display */}
      <div className="p-8 flex flex-col items-center">
        <div className="text-6xl font-mono font-bold mb-6">
          {timerType === 'stopwatch' 
            ? formatTime(elapsedTime) 
            : formatTime(timeRemaining)}
        </div>
        
        {/* Timer Controls */}
        <div className="flex space-x-4">
          {!timerRunning ? (
            <button
              onClick={startTimer}
              className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              <Play size={32} />
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="flex items-center justify-center w-16 h-16 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
            >
              <Pause size={32} />
            </button>
          )}
          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <RotateCcw size={32} />
          </button>
        </div>
        
        {/* Timer Settings */}
        {(timerType === 'countdown' || timerType === 'amrap') && !timerRunning && (
          <div className="mt-8 w-full max-w-sm">
            <label className="block text-gray-700 mb-2">
              Set {timerType === 'countdown' ? 'Countdown' : 'AMRAP'} Time (minutes):
            </label>
            <div className="flex justify-between">
              {[1, 3, 5, 10, 15, 20, 30].map(min => (
                <button
                  key={min}
                  onClick={() => handleTimerSettingChange(timerType, min)}
                  className={`px-3 py-1 rounded ${
                    timerSettings[timerType] === min * 60 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {min}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Finish Workout Button */}
        {workout && (
          <div className="mt-8 w-full flex justify-center">
            <button
              onClick={saveWorkoutToHistory}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <CheckCircle size={20} className="mr-2" />
              Finish Workout
            </button>
          </div>
        )}
      </div>
      
      {/* Current Workout Display */}
      {workout && (
        <div className="p-4 border-t">
          <h3 className="font-semibold mb-2">Current Workout:</h3>
          <div className="bg-gray-100 p-3 rounded">
            <div className="font-bold">{workout.name}</div>
            <pre className="whitespace-pre-wrap font-sans text-sm mt-1">{workout.description}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerTab;