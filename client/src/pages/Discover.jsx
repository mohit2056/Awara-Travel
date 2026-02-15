import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Filter, X, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { API_BASE_URL } from '../config'; // 👈 1. YE IMPORT ADD KAR

const Discover = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);

  // 🛠️ Function to fetch places
  const fetchPlaces = async (query = '', hidden = false) => {
    setLoading(true);
    try {
      // 👇 2. YAHAN CHANGE KARNA HAI (Localhost hata diya)
      let url = `${API_BASE_URL}/api/places`; 
      
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (hidden) params.append('type', 'hidden');

      // Agar params hain toh URL mein jodo (Example: ?search=goa)
      if (params.toString()) {
          // Check karo ki URL mein pehle se '?' hai ya nahi
          url += `?${params.toString()}`;
      }

      console.log("Fetching URL:", url); 

      const res = await axios.get(url);
      setPlaces(res.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... Baaki code same rahega (useEffect, etc.)

  // 🔄 Jab page load ho, URL change ho, ya Filter change ho
  useEffect(() => {
    setSearchTerm(initialSearch); // Input box sync karo URL se
    fetchPlaces(initialSearch, showHiddenOnly);
  }, [initialSearch, showHiddenOnly]);

  // 🔍 Handle Manual Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm }); // URL update -> useEffect trigger hoga
  };

  // ❌ Clear Search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams({}); // URL se search hatao
    setShowHiddenOnly(false); // Filter bhi reset kar do
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 pb-12 font-sans selection:bg-purple-500/30">
        
        {/* Header & Controls Container */}
        <div className="max-w-7xl mx-auto mb-10 flex flex-col lg:flex-row justify-between items-end gap-6 border-b border-gray-800 pb-8">
          
          <div className="w-full lg:w-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              {initialSearch ? `Exploring "${initialSearch}"` : "Discover India 🇮🇳"}
            </h1>
            <p className="text-gray-400 text-lg">
              {initialSearch 
                ? "Here's what we found based on your vibe." 
                : "Explore top rated destinations, food, and hidden gems."}
            </p>
          </div>

          {/* Search & Filter Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative group w-full sm:w-80">
              <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search places, vibes, food..." 
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl py-3 pl-12 pr-10 focus:border-purple-500 focus:bg-gray-800 focus:outline-none transition-all shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button type="button" onClick={clearSearch} className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700">
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Hidden Gem Filter Toggle */}
            <button 
              onClick={() => setShowHiddenOnly(!showHiddenOnly)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border shadow-lg ${
                showHiddenOnly 
                  ? 'bg-linear-to-r from-purple-600 to-indigo-600 border-purple-500 text-white shadow-purple-500/20 scale-105' 
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Filter size={18} />
              {showHiddenOnly ? 'Hidden Gems Only' : 'Filter'}
            </button>
          </div>
        </div>

        {/* 🏞️ Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-gray-400 animate-pulse">Finding the best spots for you...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {places.length > 0 ? (
              places.map((place) => (
                <Link to={`/place/${place._id}`} key={place._id} className="group bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                  
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={place.images[0]} 
                      alt={place.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Tags Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {place.isHiddenGem && (
                        <span className="bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-purple-400/30 flex items-center gap-1">
                            💎 Hidden Gem
                        </span>
                        )}
                    </div>
                    
                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl font-bold text-white mb-1 truncate leading-tight drop-shadow-md">{place.name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-300 text-sm drop-shadow-sm">
                        <MapPin size={14} className="text-purple-400 shrink-0" />
                        <span className="truncate">{place.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-6 flex flex-col grow">
                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 grow leading-relaxed">
                        {place.description}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700 mt-auto">
                      <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Budget</span>
                          <span className="text-green-400 font-bold text-lg">₹{place.avgCost}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600">
                         <Star size={14} className="text-yellow-400 fill-yellow-400" />
                         <span className="text-sm font-bold text-gray-200">{place.rating ? place.rating.toFixed(1) : 'New'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-20 text-gray-500 bg-gray-800/30 rounded-3xl border border-gray-800 border-dashed">
                <Search size={48} className="mb-4 text-gray-600 opacity-50" />
                <p className="text-2xl font-bold text-gray-300 mb-2">No places found 🏜️</p>
                <p>Try searching for <span className="text-purple-400">"Jaipur"</span>, <span className="text-purple-400">"Peace"</span>, or <span className="text-purple-400">"Dal Baati"</span>.</p>
                <button onClick={clearSearch} className="mt-6 text-sm text-gray-400 hover:text-white underline">Clear all filters</button>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Discover;