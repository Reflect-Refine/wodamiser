import React from 'react';
import { X } from 'lucide-react';

const MovementModal = ({ movement, onClose }) => {
  if (!movement) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-screen overflow-y-auto">
        <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
          <h3 className="font-bold">{movement.name}</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {/* Video Placeholder */}
          <div className="aspect-video bg-gray-200 rounded mb-4 overflow-hidden">
            <img 
              src={movement.videoUrl}
              alt={`${movement.name} demonstration`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <p className="mb-4">{movement.description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Coaching Tips:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {movement.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Scaling Options:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {movement.scaling.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementModal;