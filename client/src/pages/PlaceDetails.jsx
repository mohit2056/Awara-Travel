import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, IndianRupee, ArrowLeft } from 'lucide-react';
import PlaceMap from '../components/PlaceMap';
import SonicPlayer from '../components/SonicPlayer';

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [tripType, setTripType] = useState(1); // 0: Budget, 1: Standard, 2: Luxury

  // 📡 Data Fetching
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/places/${id}`);
        const data = await res.json();
        setPlace(data);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };
    fetchPlace();
  }, [id]);

  if (!place) return <div className="text-center py-20 text-xl">Loading Vibes... ⏳</div>;

  // 🛡️ Error Handling (Agar ID galat ho ya data delete ho gaya ho)
  if (!place.images || place.message) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-400 mb-4">404: Raasta Bhatak Gaye? 🤔</h2>
        <p className="text-gray-400 mb-6">Ye jagah shayad delete ho gayi hai ya ID galat hai.</p>
        <Link to="/discover" className="bg-purple-600 px-6 py-3 rounded-full font-bold">
          Wapas Discover Pe Jao
        </Link>
      </div>
    );
  }

  // 💰 Kharcha Estimator Logic
  const calculateCost = () => {
    const baseCost = place.avgCost;
    if (tripType === 0) return baseCost * 0.6; // Budget
    if (tripType === 2) return baseCost * 1.8; // Luxury
    return baseCost; // Standard
  };

  return (
    <div className="pt-24 pb-10 min-h-screen px-4 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/discover" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
        <ArrowLeft size={20} /> Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Image & Info */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group h-100">
            <img src={place.images[0]} alt={place.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            {place.isHiddenGem && (
              <span className="absolute top-4 left-4 bg-purple-600 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                💎 Hidden Gem
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{place.name}</h1>
          <p className="flex items-center gap-2 text-gray-400 mb-6 text-lg">
            <MapPin size={20} className="text-purple-400" /> {place.location}
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">{place.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {place.moodTags.map((tag, index) => (
              <span key={index} className="bg-white/10 px-4 py-2 rounded-full text-purple-200 border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Kharcha Estimator */}
        <div className="glass p-8 rounded-2xl h-fit sticky top-24 border border-white/10">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <IndianRupee className="text-green-400" /> Kharcha Estimator
          </h2>

          <div className="mb-10">
            <div className="flex justify-between text-sm text-gray-400 mb-4 font-semibold">
              <span>🎒 Backpacker (Budget)</span>
              <span>🚗 Standard (Comfort)</span>
              <span>👑 Luxury (Premium)</span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="2" 
              step="1" 
              value={tripType}
              onChange={(e) => setTripType(Number(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
            />
            
            <div className="text-center mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-sm text-gray-400 uppercase tracking-widest">Estimated Cost / Person</span>
              <div className="text-5xl font-bold text-green-400 mt-2 text-shadow-lg">
                ₹ {Math.round(calculateCost()).toLocaleString()}
              </div>
              <p className="text-sm text-purple-300 mt-3 font-medium">
                {tripType === 0 && "Hostels • Public Transport • Street Food 🍜"}
                {tripType === 1 && "Decent Hotels • Cafe Meals • Scooty Rental 🛵"}
                {tripType === 2 && "Luxury Resorts • Private Cab • Fine Dining 🍷"}
              </p>
            </div>
          </div>

          <button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition transform hover:-translate-y-1 shadow-lg shadow-purple-600/30">
            Start Planning
          </button>
        </div>
      </div>

      {/* 🗺️ MAP SECTION */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📍 Location Check
        </h2>
        <PlaceMap coordinates={place.coordinates} name={place.name} />
      </div>

      {/* 🍽️ FEATURE 4: WHAT TO EAT SECTION */}
      <div className="mt-16 mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          🍽️ Swaad Anusaar <span className="text-sm font-normal text-gray-400">(Must Try Dishes)</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {place.mustTryDishes.map((dish, index) => (
            <div key={index} className="glass p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition duration-300 group">
              <div className="h-12 w-12 bg-purple-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 transition">
                <span className="text-2xl">🥘</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{dish}</h3>
              <p className="text-sm text-gray-400">
                Highly recommended local delicacy. Mat chhodna bhai!
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🎵 DAY 6 FEATURE: SONIC PLAYER */}
      <SonicPlayer src={place.musicUrl} placeName={place.name} />

    </div>
  );
};

export default PlaceDetails;