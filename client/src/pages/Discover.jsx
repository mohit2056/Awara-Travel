import React, { useState, useEffect } from 'react';
import PlaceCard from '../components/PlaceCard';
import { Filter } from 'lucide-react';

const Discover = () => {
  const [places, setPlaces] = useState([]);
  const [showHiddenOnly, setShowHiddenOnly] = useState(false); // Toggle State
  const [loading, setLoading] = useState(true);

  // 📡 API Call Function
  const fetchPlaces = async () => {
    setLoading(true);
    try {
      // Agar hidden true hai toh query parameter lagana hai
      const url = showHiddenOnly 
        ? 'http://localhost:5000/api/places?type=hidden' 
        : 'http://localhost:5000/api/places';
      
      const res = await fetch(url);
      const data = await res.json();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jab bhi toggle change ho, data wapas lao
  useEffect(() => {
    fetchPlaces();
  }, [showHiddenOnly]);

  return (
    <div className="pt-24 pb-10 min-h-screen px-4 max-w-7xl mx-auto">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Discover Places</h1>
          <p className="text-gray-400">Explore the unseen India.</p>
        </div>

        {/* 🔥 The Magic Toggle Button */}
        <button 
          onClick={() => setShowHiddenOnly(!showHiddenOnly)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all border ${
            showHiddenOnly 
              ? 'bg-purple-600 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
              : 'glass border-white/10 hover:bg-white/10'
          }`}
        >
          <Filter size={18} />
          {showHiddenOnly ? "Showing Hidden Gems Only 💎" : "Show Hidden Gems"}
        </button>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="text-center py-20 text-xl animate-pulse">Loading places...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.length > 0 ? (
            places.map((place) => <PlaceCard key={place._id} place={place} />)
          ) : (
            <p className="text-center col-span-full text-gray-400">No places found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Discover;