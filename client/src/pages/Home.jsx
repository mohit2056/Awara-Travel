import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Navigation ke liye
import { Search, MapPin, Coffee, PartyPopper, Mountain, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen">
      
      {/* 🌟 HERO SECTION (Yahan Search Bar Hai) */}
      <div className="relative h-125 flex items-center justify-center text-center px-4 bg-linear-to-b from-purple-900/50 to-[#0f0f1a]">
        
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Travel Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0f0f1a] via-transparent to-transparent"></div>
        </div>

        <div className="max-w-3xl mx-auto z-10 pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
            Awara
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light">
            "Kahan jana hai? Faisla dil pe chhod do."
          </p>

          {/* 🔍 SEARCH BAR (Ye naya add kiya hai) */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-2 rounded-full border border-white/20 shadow-2xl">
            <div className="flex-1 flex items-center px-4">
              <MapPin className="text-purple-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search 'Biryani', 'Jibhi', or 'Goa'..." 
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

      {/* ✨ VIBE SECTION (Jo pehle se tha) */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Find Your <span className="text-purple-400">Vibe</span></h2>
        <p className="text-gray-400 text-center mb-12">Mood ke hisaab se jagah dhoondho</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/discover?type=peace" className="glass p-8 rounded-2xl text-center hover:bg-white/5 transition border border-white/10 group cursor-pointer">
            <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Coffee className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Peace</h3>
            <p className="text-sm text-gray-400 mt-2">Calmness & Nature</p>
          </Link>

          <Link to="/discover?type=party" className="glass p-8 rounded-2xl text-center hover:bg-white/5 transition border border-white/10 group cursor-pointer">
            <div className="bg-pink-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <PartyPopper className="text-pink-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Party</h3>
            <p className="text-sm text-gray-400 mt-2">Nightlife & Clubs</p>
          </Link>

          <Link to="/discover?type=thrill" className="glass p-8 rounded-2xl text-center hover:bg-white/5 transition border border-white/10 group cursor-pointer">
            <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Mountain className="text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Thrill</h3>
            <p className="text-sm text-gray-400 mt-2">Trekking & Adventure</p>
          </Link>

          <Link to="/discover?type=spiritual" className="glass p-8 rounded-2xl text-center hover:bg-white/5 transition border border-white/10 group cursor-pointer">
            <div className="bg-orange-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Ghost className="text-orange-400" size={32} />
            </div>
            <h3 className="text-xl font-bold">Spiritual</h3>
            <p className="text-sm text-gray-400 mt-2">Temples & Soul</p>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;