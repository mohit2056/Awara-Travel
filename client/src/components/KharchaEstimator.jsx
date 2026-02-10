import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';

const KharchaEstimator = ({ avgCost }) => {
  const [tripType, setTripType] = useState(1); // 0: Budget, 1: Standard, 2: Luxury

  const calculateCost = () => {
    if (tripType === 0) return avgCost * 0.6;
    if (tripType === 2) return avgCost * 1.8;
    return avgCost;
  };

  return (
    <div className="glass p-8 rounded-2xl h-fit sticky top-24 border border-white/10">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <IndianRupee className="text-green-400" /> Kharcha Estimator
      </h2>

      <div className="mb-10">
        <div className="flex justify-between text-sm text-gray-400 mb-4 font-semibold">
          <span>🎒 Backpacker</span>
          <span>🚗 Comfort</span>
          <span>👑 Luxury</span>
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
  );
};

export default KharchaEstimator;