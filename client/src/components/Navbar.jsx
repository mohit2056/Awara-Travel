import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // ❌ Globe hata diya
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ✅ Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Awara Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-yellow-400"
            />
            <span className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
              Awara
            </span>
          </Link>

          {/* ✅ Desktop Menu (Clean) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-purple-400 transition">Home</Link>
              <Link to="/discover" className="hover:text-purple-400 transition">Discover</Link>
              <Link to="/about" className="hover:text-purple-400 transition">About</Link>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition text-white">
                Join Now
              </button>
            </div>
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:bg-white/10 rounded-md text-white">Home</Link>
            <Link to="/discover" className="block px-3 py-2 hover:bg-white/10 rounded-md text-white">Discover</Link>
            <button className="w-full text-left px-3 py-2 bg-purple-600 rounded-md mt-4 text-white">Join Now</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;