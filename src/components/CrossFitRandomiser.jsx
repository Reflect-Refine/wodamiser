import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import { Filter, Home, Clock, History, Settings, Dumbbell } from 'lucide-react';
import defaultWorkouts from './data/workouts';
import movementInfo, { movementCategories } from './data/movements';

// Tab components
import HomeTab from './tabs/HomeTab';
import TimerTab from './tabs/TimerTab';
import HistoryTab from './tabs/HistoryTab';
import SettingsTab from './tabs/SettingsTab';
import MovementModal from './MovementModal';

const CrossFitRandomiser = ({ externalWorkouts }) => {
  // Main states
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('regular'); // 'regular', 'hyrox', 'intense'
  const [excludedMovements, setExcludedMovements] = useState([]);
  const [showExcludePanel, setShowExcludePanel] = useState(false);
  
  // History tracking
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'history', 'timer', 'settings'
  
  // Timer functionality
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerType, setTimerType] = useState('countdown'); // 'countdown', 'stopwatch', 'amrap'
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // default 20 minutes in seconds
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerSettings, setTimerSettings] = useState({
    countdown: 20 * 60,
    amrap: 20 * 60
  });
  
  // Movement info modal
  const [showMovementInfo, setShowMovementInfo] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);

  // Workout database state
  const [workoutsDatabase, setWorkoutsDatabase] = useState({
    regular: [],
    hyrox: [],
    intense: []
  });

  // Initialize the default workout database
  useEffect(() => {
    setWorkoutsDatabase(defaultWorkouts);
  }, []);

  // Merge external workouts with built-in workouts if available
useEffect(() => {
  const sheetUrl = process.env.REACT_APP_GOOGLE_SHEETS_URL;

  if (!sheetUrl) {
    console.warn("⚠️ No sheet URL defined");
    return;
  }

  fetch(sheetUrl)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rows = results.data;

          const grouped = {
            regular: [],
            hyrox: [],
            intense: []
          };

          rows.forEach(row => {
            const mode = (row.Category || 'regular').toLowerCase();
            if (grouped[mode]) {
              // Parse semicolon-separated movements into array
              const parsedMovements = (row.Movements || '').split(';').map(m => m.trim());
              grouped[mode].push({
                name: row.Name,
                description: row.Description,
                type: row.Type,
                movements: parsedMovements,
                difficulty: row.Difficulty,
                estimatedTime: row.EstimatedTime,
                has_video: row.has_video === 'TRUE' || row.has_video === true,
                videoUrl: row.videoUrl || '',
                thumbnail: row.thumbnail || '',
                posted_by: row.posted_by || '',
                url: row.URL || ''
              });
            }
          });

          setWorkoutsDatabase(prevDb => ({
            regular: [...prevDb.regular, ...grouped.regular],
            hyrox: [...prevDb.hyrox, ...grouped.hyrox],
            intense: [...prevDb.intense, ...grouped.intense]
          }));

          console.log(`✅ Loaded ${rows.length} WODs from Google Sheets`);
        }
      });
    })
    .catch(err => {
      console.error("❌ Failed to load Google Sheet:", err);
    });
}, []);

  // Load saved state from localStorage
  useEffect(() => {
    const savedExclusions = localStorage.getItem('excludedMovements');
    const savedMode = localStorage.getItem('workoutMode');
    const savedHistory = localStorage.getItem('workoutHistory');
    
    if (savedExclusions) setExcludedMovements(JSON.parse(savedExclusions));
    if (savedMode) setMode(savedMode);
    if (savedHistory) setWorkoutHistory(JSON.parse(savedHistory));
    
    // Fetch an initial workout
    fetchWorkout();
  }, [workoutsDatabase]); 

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('excludedMovements', JSON.stringify(excludedMovements));
    localStorage.setItem('workoutMode', mode);
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [excludedMovements, mode, workoutHistory]);

  // Timer functionality
  useEffect(() => {
    let interval = null;
    
    if (timerRunning) {
      interval = setInterval(() => {
        if (timerType === 'countdown' || timerType === 'amrap') {
          setTimeRemaining(prevTime => {
            if (prevTime <= 1) {
              setTimerRunning(false);
              return 0;
            }
            return prevTime - 1;
          });
        } else if (timerType === 'stopwatch') {
          setElapsedTime(prevTime => prevTime + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timerRunning, timerType]);

  const startTimer = () => {
    if (timerType === 'countdown' && timeRemaining === 0) {
      setTimeRemaining(timerSettings.countdown);
    } else if (timerType === 'amrap' && timeRemaining === 0) {
      setTimeRemaining(timerSettings.amrap);
    }
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    if (timerType === 'countdown') {
      setTimeRemaining(timerSettings.countdown);
    } else if (timerType === 'amrap') {
      setTimeRemaining(timerSettings.amrap);
    } else {
      setElapsedTime(0);
    }
  };

  const handleTimerSettingChange = (type, minutes) => {
    const seconds = minutes * 60;
    setTimerSettings(prev => ({
      ...prev,
      [type]: seconds
    }));
    
    if (type === timerType && !timerRunning) {
      setTimeRemaining(seconds);
    }
  };

  const changeTimerType = (type) => {
    setTimerRunning(false);
    setTimerType(type);
    
    if (type === 'countdown') {
      setTimeRemaining(timerSettings.countdown);
      setElapsedTime(0);
    } else if (type === 'amrap') {
      setTimeRemaining(timerSettings.amrap);
      setElapsedTime(0);
    } else {
      setTimeRemaining(0);
      setElapsedTime(0);
    }
  };

  // Format time for display
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const fetchWorkout = () => {
    setLoading(true);
    
    // Simulate API fetch with a timeout
    setTimeout(() => {
      // Filter workouts based on excluded movements
      const availableWorkouts = workoutsDatabase[mode].filter(workout => {
        // If the workout contains any excluded movement, filter it out
        return !workout.movements.some(movement => excludedMovements.includes(movement));
      });
      
      if (availableWorkouts.length === 0) {
        setWorkout({
          name: "No matching workouts",
          description: "No workouts available with your exclusion criteria. Try removing some exclusions.",
          type: "Error"
        });
      } else {
        // Get a random workout from the filtered list
        const randomIndex = Math.floor(Math.random() * availableWorkouts.length);
        const selectedWorkout = availableWorkouts[randomIndex];
        setWorkout(selectedWorkout);
        
        // Set timer based on workout type
        if (selectedWorkout.type === "AMRAP") {
          const timeMatch = selectedWorkout.description.match(/AMRAP in (\d+)/);
          if (timeMatch && timeMatch[1]) {
            const minutes = parseInt(timeMatch[1]);
            handleTimerSettingChange('amrap', minutes);
            setTimerType('amrap');
            setTimeRemaining(minutes * 60);
          }
        } else if (selectedWorkout.type === "For Time") {
          setTimerType('stopwatch');
          setElapsedTime(0);
        }
      }
      
      setLoading(false);
    }, 800);
  };

  const saveWorkoutToHistory = () => {
    if (!workout || workout.type === "Error") return;
    
    const historyItem = {
      id: Date.now(),
      date: new Date().toISOString(),
      workout: workout,
      time: timerType === 'stopwatch' ? elapsedTime : timerType === 'amrap' ? timerSettings.amrap - timeRemaining : null
    };
    
    setWorkoutHistory([historyItem, ...workoutHistory]);
    resetTimer();
  };

  const toggleExcludeMovement = (movementId) => {
    if (excludedMovements.includes(movementId)) {
      setExcludedMovements(excludedMovements.filter(id => id !== movementId));
    } else {
      setExcludedMovements([...excludedMovements, movementId]);
    }
  };

  const clearExclusions = () => {
    setExcludedMovements([]);
  };

  const showMovementDetails = (movementId) => {
    if (movementInfo[movementId]) {
      setSelectedMovement(movementInfo[movementId]);
      setShowMovementInfo(true);
    }
  };

  // Format date for history display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Main render function
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <Dumbbell className="mr-2" size={24} />
            CrossFit WOD Randomiser
          </h1>
          <div className="flex space-x-2">
            {activeTab === 'home' && (
              <button 
                onClick={() => setShowExcludePanel(!showExcludePanel)}
                className="p-2 rounded hover:bg-gray-700 transition"
                aria-label="Filter workouts"
              >
                <Filter size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-2 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex justify-around">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'home' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('timer')} 
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'timer' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Clock size={20} />
            <span className="text-xs mt-1">Timer</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'history' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <History size={20} />
            <span className="text-xs mt-1">History</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            <Settings size={20} />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Home Tab - Workout Display */}
          {activeTab === 'home' && (
            <HomeTab 
              workout={workout}
              loading={loading}
              mode={mode}
              setMode={setMode}
              showExcludePanel={showExcludePanel}
              excludedMovements={excludedMovements}
              movementInfo={movementInfo}
              fetchWorkout={fetchWorkout}
              setActiveTab={setActiveTab}
              changeTimerType={changeTimerType}
              saveWorkoutToHistory={saveWorkoutToHistory}
              toggleExcludeMovement={toggleExcludeMovement}
              clearExclusions={clearExclusions}
              showMovementDetails={showMovementDetails}
            />
          )}

          {/* Timer Tab */}
          {activeTab === 'timer' && (
            <TimerTab 
              workout={workout}
              timerType={timerType}
              timerRunning={timerRunning}
              timeRemaining={timeRemaining}
              elapsedTime={elapsedTime}
              timerSettings={timerSettings}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              resetTimer={resetTimer}
              changeTimerType={changeTimerType}
              handleTimerSettingChange={handleTimerSettingChange}
              saveWorkoutToHistory={saveWorkoutToHistory}
              formatTime={formatTime}
            />
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <HistoryTab 
              workoutHistory={workoutHistory}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <SettingsTab 
              setWorkoutHistory={setWorkoutHistory}
              setExcludedMovements={setExcludedMovements}
              setMode={setMode}
            />
          )}

          {/* Movement Info Modal */}
          {showMovementInfo && selectedMovement && (
            <MovementModal 
              movement={selectedMovement}
              onClose={() => setShowMovementInfo(false)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 mt-4">
        <div className="max-w-3xl mx-auto text-sm text-center text-gray-400">
          CrossFit WOD Randomiser PWA | Use at your own risk
        </div>
      </footer>
    </div>
  );
};

export default CrossFitRandomiser;