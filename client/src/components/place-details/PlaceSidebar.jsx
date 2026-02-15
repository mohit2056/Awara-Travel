import React from 'react';
import { Map as MapIcon, Wallet, Navigation } from 'lucide-react';
import PlaceMap from '../PlaceMap';

const PlaceSidebar = ({ place, openGoogleMaps }) => {
  return (
    <div className="space-y-8">
      
      {/* ✅ 1. LOCATION CARD (New Design) */}
      <div className="bg-gray-800 rounded-3xl p-2 border border-gray-700 shadow-2xl">
        {/* Map Header */}
        <div className="px-4 py-3 flex justify-between items-center">
            <h4 className="text-gray-200 font-bold flex items-center gap-2">
                <Navigation size={18} className="text-purple-400" /> Location
            </h4>
            <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">Live View</span>
        </div>

        {/* The Map Itself */}
        <div className="h-64 w-full rounded-2xl overflow-hidden relative border border-gray-600">
          <PlaceMap coordinates={place.coordinates} name={place.name} />
        </div>

        {/* 👇 GOOGLE MAPS BUTTON (Ab ye kabhi nahi katega) */}
        <div className="mt-3">
          <button 
            onClick={openGoogleMaps}
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="GMap" className="w-5 h-5" />
            Open in Google Maps
          </button>
        </div>
      </div>

      {/* ✅ 2. BUDGET PLANNER (Premium Look) */}
      <div className="relative overflow-hidden bg-linear-to-br from-gray-800 to-black p-6 rounded-3xl border border-gray-700 shadow-xl group">
        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 transition duration-700"></div>

        <h4 className="relative text-white text-lg font-bold flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
          <Wallet className="text-green-400" /> Trip Cost Estimator
        </h4>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <span>Avg. Stay & Food</span>
            <span className="text-gray-200">2 Days / 1 Night</span>
          </div>
          
          <div className="flex justify-between items-end">
            <span className="text-gray-400 text-sm mb-1">Total Budget</span>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">
              ₹{place.avgCost}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-green-500 h-full w-[60%] rounded-full animate-pulse"></div>
          </div>
          <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-2">
            *Excludes Travel Tickets
          </p>
        </div>
      </div>

      {/* 3. Vibe Tags (Minimal) */}
      {place.moodTags && (
        <div className="flex flex-wrap gap-2">
            {place.moodTags.map((tag, i) => (
                <span key={i} className="text-xs font-bold bg-gray-800 text-gray-400 px-3 py-1.5 rounded-lg border border-gray-700 hover:text-white hover:border-gray-500 transition cursor-default">
                    #{tag}
                </span>
            ))}
        </div>
      )}

    </div>
  );
};

export default PlaceSidebar;