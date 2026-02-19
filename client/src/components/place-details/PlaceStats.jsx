import React from 'react';
import { IndianRupee, Star, MessageSquare } from 'lucide-react';

const PlaceStats = ({ place }) => {
  if (!place) return null;

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-wrap justify-around items-center gap-4 relative -mt-10 z-30 max-w-5xl mx-auto">
      
      <div className="text-center flex-1">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Avg Cost</p>
        <p className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
          <IndianRupee size={20}/> {place.avgCost ? place.avgCost.toLocaleString('en-IN') : 'Free'}
        </p>
      </div>
      
      <div className="hidden sm:block w-px h-10 bg-white/10"></div>
      
      <div className="text-center flex-1">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Rating</p>
        <p className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
          <Star size={20} className="fill-current"/> {place.rating ? place.rating.toFixed(1) : "New"}
        </p>
      </div>
      
      <div className="hidden sm:block w-px h-10 bg-white/10"></div>
      
      <div className="text-center flex-1">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Reviews</p>
        <p className="text-2xl font-bold text-purple-400 flex items-center justify-center gap-2">
          <MessageSquare size={18} /> {place.numReviews || 0}
        </p>
      </div>

    </div>
  );
};

export default PlaceStats;