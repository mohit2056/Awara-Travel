import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Filter, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { getOptimizedUrl } from '../utils/imageOptimizer'; // 👈 Ye Import Zaroori Hai

const Discover = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL se values lo
  const searchQuery = searchParams.get('search') || '';
  const filterType = searchParams.get('type'); // 'hidden' ya null

  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
    fetchPlaces();
  }, [searchParams]); 

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/places'); 
      let data = res.data;

      // 💎 OLD LOGIC: Sirf Hidden Gems Filter
      if (filterType === 'hidden') {
        data = data.filter(place => place.isHiddenGem === true);
      }

      // Search Filter
      if (searchQuery) {
        data = data.filter(place => 
          place.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          place.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setPlaces(data);

    } catch (error) {
      console.error("Error fetching places", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔘 Toggle Filter Function
  const toggleFilter = () => {
    if (filterType === 'hidden') {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      setSearchParams(params);
    } else {
      const params = { type: 'hidden' };
      if (searchQuery) params.search = searchQuery;
      setSearchParams(params);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (inputValue) params.search = inputValue;
    if (filterType) params.type = filterType;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setInputValue('');
  };

  return (
    <PageTransition> {/* ✅ Smooth Animation */}
      <div className="min-h-screen bg-gray-900 text-white pt-24 px-4">
        
        <div className="max-w-7xl mx-auto mb-10">
          {/* Header & Filter Row */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {searchQuery ? `Results for "${searchQuery}"` : "Discover Places"}
              </h1>
              <p className="text-gray-400">
                Explore India's hidden gems and popular spots
              </p>
            </div>

            {/* 💎 HIDDEN GEM TOGGLE BUTTON */}
            <button 
              onClick={toggleFilter}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition shadow-lg border border-white/10
                ${filterType === 'hidden' 
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-500/30' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {filterType === 'hidden' ? <X size={18} /> : <Filter size={18} />}
              {filterType === 'hidden' ? "Show All Places" : "Hidden Gems Only"}
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl bg-gray-800 rounded-xl border border-gray-700">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search 'Goa', 'Jibhi'..." 
              className="w-full bg-transparent text-white pl-12 pr-4 py-3 rounded-xl focus:ring-0 outline-none placeholder-gray-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} 
            />
          </form>
        </div>

        {/* Places Grid */}
        <div className="max-w-7xl mx-auto pb-20">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : places.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {places.map((place) => (
                <Link to={`/place/${place._id}`} key={place._id} className="group">
                  <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500 transition duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden bg-gray-700">
                      
                      {/* 👇 OPTIMIZED IMAGE LOGIC */}
                      <img 
                        src={getOptimizedUrl(place.images?.[0], 600)} 
                        alt={place.name || place.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          // Fallback bhi optimized width (600px) ke saath
                          e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop"; 
                        }}
                      />
                      
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-400 border border-yellow-500/30">
                        ⭐ {place.rating || '4.5'}
                      </div>

                      {/* Hidden Gem Badge */}
                      {place.isHiddenGem && (
                        <span className="absolute top-4 left-4 bg-purple-600 text-xs font-bold px-3 py-1 rounded-full text-white shadow-lg">
                          💎 Hidden Gem
                        </span>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">{place.name || place.title}</h3>
                        <span className="text-sm font-semibold text-green-400">₹{place.avgCost || place.budget}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 text-sm mb-4">
                        <MapPin size={16} className="mr-1 text-purple-500" />
                        {place.location}
                      </div>

                      <p className="text-gray-400 text-sm line-clamp-2 mb-4 grow">{place.description}</p>
                      
                      <button className="w-full mt-auto bg-gray-700 hover:bg-purple-600 text-white py-2 rounded-lg transition font-semibold border border-gray-600 hover:border-purple-500">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/30 rounded-3xl border border-gray-700/50">
              <div className="text-6xl mb-4">🐢</div>
              <h2 className="text-2xl font-bold text-gray-400 mb-2">Kuch nahi mila bhai!</h2>
              <p className="text-gray-500 mb-6">Filter hata ke dekho ya spelling check karo.</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition flex items-center gap-2 mx-auto"
              >
                <X size={18} /> Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Discover;