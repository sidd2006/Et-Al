'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div 
        className="max-w-7xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-primary/30 shadow-lg shadow-primary/10 px-6 py-4 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && (
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
        )}
        
        <div className="flex items-center justify-between relative z-10">
          <div className="text-2xl font-bold">
            <span className="text-white">Research </span>
            <span className="text-primary">et AL</span>
          </div>
          <div className="flex space-x-8">
            <a href="/" className="text-white font-semibold transition-colors hover:text-primary">
              Home
            </a>
            <a href="/about" className="text-white font-semibold transition-colors hover:text-primary">
              About Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
