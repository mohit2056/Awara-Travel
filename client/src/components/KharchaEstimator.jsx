import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';

const KharchaEstimator = ({ avgCost }) => {
  const [tripType, setTripType] = useState(1); // 0: Budget, 1: Standard, 2: Luxury

  const calculateCost = () => {
    const base = avgCost || 0;
    if (tripType === 0) return base * 0.6;
    if (tripType === 2) return base * 1.8;
    return base;
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-3xl border border-white/10 sticky top-24 shadow-2xl">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
        <IndianRupee className="text-green-400" size={24} /> Smart Budget Planner
      </h2>

      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-4 font-semibold px-1">
          <span className={tripType === 0 ? "text-purple-400 transition" : ""}>🎒 Backpacker</span>
          <span className={tripType === 1 ? "text-purple-400 transition" : ""}>🚗 Standard</span>
          <span className={tripType === 2 ? "text-purple-400 transition" : ""}>👑 Luxury</span>
        </div>

        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={tripType}
          onChange={(e) => setTripType(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
        />

        <div className="text-center mt-8 p-5 bg-black/40 rounded-2xl border border-white/5">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Est. Cost / Person</span>
          <div className="text-4xl font-black text-green-400 mt-2">
            ₹ {Math.round(calculateCost()).toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-purple-300 mt-3 font-medium h-8 flex items-center justify-center">
            {tripType === 0 && "Hostels • Public Transport • Street Food 🍜"}
            {tripType === 1 && "Decent Hotels • Cafe Meals • Scooty 🛵"}
            {tripType === 2 && "Luxury Resorts • Private Cab • Dining 🍷"}
          </p>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3.5 rounded-xl transition transform hover:-translate-y-1 shadow-lg shadow-purple-600/20">
        Plan My Trip
      </button>
    </div>
  );
};

export default KharchaEstimator;