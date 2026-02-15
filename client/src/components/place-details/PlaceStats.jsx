import React from 'react';
import { DollarSign, Star } from 'lucide-react';

const PlaceStats = ({ place }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl flex flex-wrap justify-around items-center gap-4">
      <div className="text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Budget</p>
        <p className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
          <DollarSign size={20}/> {place.avgCost}
        </p>
      </div>
      <div className="w-px h-10 bg-gray-600/50"></div>
      <div className="text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Rating</p>
        <p className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
          <Star size={20} className="fill-current"/> {place.rating ? place.rating.toFixed(1) : "N/A"}
        </p>
      </div>
      <div className="w-px h-10 bg-gray-600/50"></div>
      <div className="text-center">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Reviews</p>
        <p className="text-2xl font-bold text-purple-400">{place.numReviews || 0}</p>
      </div>
    </div>
  );
};

export default PlaceStats;