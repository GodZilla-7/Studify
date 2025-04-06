import React from 'react';
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const SubjectCard = ({ subject }) => {
  return (
    <div className="card bg-gray-800 text-white shadow-xl p-6 hover:shadow-2xl transition-shadow flex flex-col justify-between items-center relative overflow-hidden">
      {/* Subject Info */}
      <div className="my-12 relative z-10">
        {/* Subject Icon (if available) */}
        {subject.iconLink && (
          <div className="relative w-32 h-32">
            <div className="absolute -inset-x-5 -inset-y-10 z-0 w-full h-full opacity-60">
              <JellyWaveBackground />
            </div>
            <img
              src={subject.iconLink}
              alt={`${subject.name} icon`}
              className="w-24 h-24 object-contain relative z-10 mx-auto my-4"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4 z-10 relative">
        {/* Subject Name & Description */}
        <Link to={`/subjects/${subject._id}/chapters`} className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-accent mb-2">{subject.name}</h3>
          {subject.description && <p className="text-gray-300 text-center">{subject.description}</p>}
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-8 mb-4 z-10 relative">
        {/* Book Icon (if bookLink exists) */}
        {subject.bookLink && (
          <a
            href={subject.bookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent flex items-center space-x-2"
          >
            <FaBook className="w-4 h-4" />
            <span>eBook</span>
          </a>
        )}

        {/* PYQ Button (if pyqLink exists) */}
        {subject.pyqLink && (
          <a
            href={subject.pyqLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent flex items-center space-x-2"
          >
            <AiOutlineFileText className="w-4 h-4" />
            <span>PYQ's</span>
          </a>
        )}
      </div>
    </div>
  );
};

// Jelly Wave Background Component
const JellyWaveBackground = () => {
  const [rotation, setRotation] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <svg 
      width="200%" 
      height="200%" 
      viewBox="0 0 400 400" 
      className="absolute -inset-1/3 opacity-40"
      style={{ 
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.5s linear',
      }}
    >
      <defs>
        <linearGradient id="jellyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
        </filter>
      </defs>
      
      <g filter="url(#gooey)">
        <circle cx="200" cy="200" r="120" fill="url(#jellyGradient)">
          <animate 
            attributeName="cx" 
            values="200;220;210;190;200" 
            dur="8s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="cy" 
            values="200;190;210;220;200" 
            dur="10s" 
            repeatCount="indefinite" 
          />
        </circle>
        <circle cx="190" cy="180" r="100" fill="url(#jellyGradient)">
          <animate 
            attributeName="cx" 
            values="190;170;210;190;190" 
            dur="12s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="cy" 
            values="180;190;170;180;180" 
            dur="9s" 
            repeatCount="indefinite" 
          />
        </circle>
        <circle cx="210" cy="220" r="110" fill="url(#jellyGradient)">
          <animate 
            attributeName="cx" 
            values="210;190;220;210;210" 
            dur="10s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="cy" 
            values="220;240;210;200;220" 
            dur="11s" 
            repeatCount="indefinite" 
          />
        </circle>
      </g>
    </svg>
  );
};

export default SubjectCard;
