import React from 'react';

const HistoryTab = ({ workoutHistory, formatDate, formatTime }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-3 bg-blue-500 text-white">
        <h2 className="font-bold text-lg">Workout History</h2>
      </div>
      
      {workoutHistory.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No workout history yet. Complete workouts to see them here.
        </div>
      ) : (
        <div className="divide-y">
          {workoutHistory.map(item => (
            <div key={item.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold">{item.workout.name}</div>
                  <div className="text-sm text-gray-600">{formatDate(item.date)}</div>
                </div>
                {item.time !== null && (
                  <div className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {formatTime(item.time)}
                  </div>
                )}
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm mt-1 bg-gray-100 p-2 rounded">{item.workout.description}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTab;