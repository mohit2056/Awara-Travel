import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'; // ✅ Icon add kiya
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

          {/* ✅ Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-purple-400 transition">Home</Link>
              <Link to="/discover" className="hover:text-purple-400 transition">Discover</Link>

              {/* ✅ Blind Travel Link */}
              <Link to="/blind-travel" className="hover:text-purple-400 transition flex items-center gap-1">
                🎲 <span className="hidden lg:inline">Blind Travel</span>
              </Link>

              <Link to="/about" className="hover:text-purple-400 transition">About</Link>

              {/* User Logic */}
              {user ? (
                <div className="flex items-center gap-4 ml-4">
                  
                  {/* ⭐ NEW: Dashboard Link (Only visible when logged in) */}
                  <Link 
                    to="/dashboard" 
                    className="text-gray-300 hover:text-purple-400 transition flex items-center gap-1 font-medium"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>

                  <span className="text-purple-400 font-bold flex items-center gap-2 border-l border-white/20 pl-4">
                    <User size={18} /> Hi, {user.username}
                  </span>
                  
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition flex items-center gap-2 text-sm"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition text-white shadow-lg">
                    Join Now
                  </button>
                </Link>
              )}

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

            {/* ✅ Blind Travel Link */}
            <Link to="/blind-travel" className="block px-3 py-2 hover:bg-white/10 rounded-md text-white items-center gap-2">
              🎲 Blind Travel
            </Link>
            
            <Link to="/about" className="block px-3 py-2 hover:bg-white/10 rounded-md text-white">About</Link>

            {user ? (
              <>
                {/* ⭐ NEW: Mobile Dashboard Link */}
                <Link to="/dashboard" className="block px-3 py-2 hover:bg-white/10 rounded-md text-purple-300 items-center gap-2">
                   <LayoutDashboard size={18} /> My Dashboard
                </Link>

                <div className="px-3 py-2 text-purple-400 font-bold border-t border-white/10 mt-2">
                  Hi, {user.username} 👋
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="w-full text-left px-3 py-2 bg-purple-600 rounded-md mt-4 text-white">Join Now</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;