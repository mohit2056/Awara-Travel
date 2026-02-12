import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Search, MapPin, Coffee, PartyPopper, Mountain, Ghost } from 'lucide-react';
import PageTransition from '../components/PageTransition'; // 👈 Animation Import

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/discover?search=${searchTerm}`);
    }
  };

  return (
    // 👇 Poore page ko PageTransition se wrap kiya (Smoothness ke liye)
    <PageTransition>
      <div className="min-h-screen bg-gray-900 text-white">
        
        {/* 🌟 HERO SECTION */}
        <div className="relative h-125 flex items-center justify-center text-center px-4">
          
          {/* Background Image/Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
              alt="Travel Background" 
              className="w-full h-full object-cover opacity-40"
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-gray-900/10 via-gray-900/60 to-gray-900"></div>
          </div>

          <div className="max-w-4xl mx-auto z-10 pt-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
              Awara
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light italic">
              "Kahan jana hai? Faisla dil pe chhod do."
            </p>

            {/* 🔍 SEARCH BAR */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-2 rounded-full border border-white/20 shadow-2xl">
              <div className="flex-1 flex items-center px-4">
                <MapPin className="text-purple-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search 'Manali', 'Goa', or 'Varkala'..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-300 outline-none text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center justify-center gap-2 shadow-lg">
                <Search size={20} /> Explore
              </button>
            </form>
          </div>
        </div>

        {/* ✨ VIBE SECTION */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-4">Find Your <span className="text-purple-400">Vibe</span></h2>
          <p className="text-yellow-400 text-center mb-12 uppercase tracking-wide text-sm font-semibold">What is your mood today?</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/discover?type=peace" className="glass p-8 rounded-2xl text-center bg-gray-800/50 hover:bg-gray-800 transition border border-gray-700 hover:border-purple-500/50 group cursor-pointer">
              <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <Coffee className="text-purple-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Peace</h3>
              <p className="text-sm text-gray-400 mt-2">Calmness & Nature</p>
            </Link>

            <Link to="/discover?type=party" className="glass p-8 rounded-2xl text-center bg-gray-800/50 hover:bg-gray-800 transition border border-gray-700 hover:border-pink-500/50 group cursor-pointer">
              <div className="bg-pink-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <PartyPopper className="text-pink-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Party</h3>
              <p className="text-sm text-gray-400 mt-2">Nightlife & Clubs</p>
            </Link>

            <Link to="/discover?type=thrill" className="glass p-8 rounded-2xl text-center bg-gray-800/50 hover:bg-gray-800 transition border border-gray-700 hover:border-blue-500/50 group cursor-pointer">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <Mountain className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Thrill</h3>
              <p className="text-sm text-gray-400 mt-2">Trekking & Adventure</p>
            </Link>

            <Link to="/discover?type=spiritual" className="glass p-8 rounded-2xl text-center bg-gray-800/50 hover:bg-gray-800 transition border border-gray-700 hover:border-orange-500/50 group cursor-pointer">
              <div className="bg-orange-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition duration-300">
                <Ghost className="text-orange-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Spiritual</h3>
              <p className="text-sm text-gray-400 mt-2">Temples & Soul</p>
            </Link>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Home;