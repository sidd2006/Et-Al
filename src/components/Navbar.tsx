'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith('/articles')) setActiveLink('articles');
    else if (pathname.startsWith('/about')) setActiveLink('about');
    else setActiveLink('home');
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-6">
      <div 
        className="max-w-7xl mx-auto bg-gradient-to-r from-black/70 via-black/50 to-black/70 backdrop-blur-xl rounded-full border border-purple-500/20 shadow-lg shadow-purple-500/10 px-6 py-4 relative overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20"
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
            <div className="w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        )}
        
        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold group">
            <span className="text-white group-hover:text-purple-300 transition-colors duration-300">Research </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">et AL</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${ activeLink === 'home' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${ activeLink === 'about' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/articles" 
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${ activeLink === 'articles' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Articles
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Link 
            href="/" 
            onClick={() => {
              setActiveLink('home');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center px-4 py-2 rounded-lg font-semibold text-white hover:bg-purple-500/20 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => {
              setActiveLink('about');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center px-4 py-2 rounded-lg font-semibold text-white hover:bg-purple-500/20 transition-colors"
          >
            About Us
          </Link>
          <Link 
            href="/articles" 
            onClick={() => {
              setActiveLink('articles');
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center px-4 py-2 rounded-lg font-semibold text-white hover:bg-purple-500/20 transition-colors"
          >
            Articles
          </Link>
        </div>
      )}
    </nav>
  );
}
