import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Link hata diya, navigate se kaam chalayenge
import { Search, MapPin, Coffee, PartyPopper, Mountain, Ghost } from 'lucide-react';
import PageTransition from '../components/PageTransition'; 

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 🔍 Search Handler (Enter dabane par)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/discover?search=${searchTerm}`);
    }
  };

  // 🎭 Mood Click Handler (Cards ke liye)
  const handleMoodClick = (mood) => {
    navigate(`/discover?search=${mood}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-purple-500/30">
        
        {/* 🌟 HERO SECTION */}
        <div className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
          
          {/* Background Image/Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
              alt="Travel Background" 
              className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-gray-900/30 via-gray-900/50 to-gray-900"></div>
          </div>

          <div className="max-w-4xl mx-auto z-10 pt-10">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-2xl">
              Awara
            </h1>
            <p className="text-xl md:text-3xl text-gray-100 mb-12 font-light italic tracking-wide">
              "Kahan jana hai? Faisla dil pe chhod do."
            </p>

            {/* 🔍 SEARCH BAR */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-2 rounded-full border border-white/20 shadow-2xl transition-all focus-within:bg-white/20 focus-within:border-white/40 focus-within:scale-105">
              <div className="flex-1 flex items-center px-6 w-full">
                <MapPin className="text-pink-400 mr-3 shrink-0" size={24} />
                <input 
                  type="text" 
                  placeholder="Search 'Jaipur', 'Peace', or 'Dal Baati'..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-300 outline-none text-lg py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full md:w-auto bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-bold transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                <Search size={20} /> Explore
              </button>
            </form>

            {/* Popular Tags */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {/* 👇 Yahan maine 'Food' hata kar 'Adventure' kar diya hai */}
              {['Jaipur', 'Udaipur', 'Hidden Gem','Extreme Sports'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/discover?search=${tag}`)}
                  className="px-4 py-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-sm text-gray-200 hover:bg-white/20 transition hover:border-white/40"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ✨ VIBE SECTION (Mood Cards) */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Find Your <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">Vibe</span></h2>
          <p className="text-gray-400 text-center mb-16 text-lg">Select a mood to start your journey</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Peace Card */}
            <div onClick={() => handleMoodClick('Peace')} className="cursor-pointer group relative overflow-hidden bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-purple-500/50 transition duration-500 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gray-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition duration-500 shadow-xl border border-gray-700 group-hover:border-purple-500/30">
                  <Coffee className="text-purple-400 group-hover:text-purple-300" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition">Peace</h3>
                <p className="text-sm text-gray-400">Calmness & Nature</p>
              </div>
            </div>

            {/* Party Card */}
            <div onClick={() => handleMoodClick('Party')} className="cursor-pointer group relative overflow-hidden bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-pink-500/50 transition duration-500 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gray-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-3 transition duration-500 shadow-xl border border-gray-700 group-hover:border-pink-500/30">
                  <PartyPopper className="text-pink-400 group-hover:text-pink-300" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-pink-300 transition">Party</h3>
                <p className="text-sm text-gray-400">Nightlife & Clubs</p>
              </div>
            </div>

            {/* Thrill Card */}
            <div onClick={() => handleMoodClick('Thrill')} className="cursor-pointer group relative overflow-hidden bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-blue-500/50 transition duration-500 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
               <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
               <div className="relative z-10">
                <div className="bg-gray-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition duration-500 shadow-xl border border-gray-700 group-hover:border-blue-500/30">
                  <Mountain className="text-blue-400 group-hover:text-blue-300" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition">Thrill</h3>
                <p className="text-sm text-gray-400">Trekking & Adventure</p>
              </div>
            </div>

            {/* Spiritual Card */}
            <div onClick={() => handleMoodClick('Spiritual')} className="cursor-pointer group relative overflow-hidden bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-orange-500/50 transition duration-500 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative z-10">
                <div className="bg-gray-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-3 transition duration-500 shadow-xl border border-gray-700 group-hover:border-orange-500/30">
                  <Ghost className="text-orange-400 group-hover:text-orange-300" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-300 transition">Spiritual</h3>
                <p className="text-sm text-gray-400">Temples & Soul</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default Home;