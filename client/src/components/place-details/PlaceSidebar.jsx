import React from 'react';
import { Navigation, Wallet } from 'lucide-react';

// 👇 Ekdum Sahi Import (Do dots ke saath)
import PlaceMap from "../PlaceMap";

const PlaceSidebar = ({ place, openGoogleMaps }) => {
  if (!place) return null;

  return (
    <div className="space-y-8">
      
      {/* ✅ 1. LOCATION CARD */}
      <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl p-2 border border-white/10 shadow-2xl">
        <div className="px-4 py-3 flex justify-between items-center">
            <h4 className="text-gray-200 font-bold flex items-center gap-2">
                <Navigation size={18} className="text-purple-400" /> Location
            </h4>
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Live View</span>
        </div>

        {/* The Map */}
        <div className="h-64 w-full rounded-2xl overflow-hidden relative border border-white/5">
          <PlaceMap coordinates={place.coordinates} name={place.name} />
        </div>

        {/* GOOGLE MAPS BUTTON */}
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

      {/* ✅ 2. BUDGET PLANNER SUMMARY */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-3xl border border-white/10 shadow-xl group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition duration-700"></div>

        <h4 className="relative text-white text-lg font-bold flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <Wallet className="text-green-400" /> Avg. Cost Estimate
        </h4>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <span>Base Budget</span>
            <span className="text-gray-300">Per Person</span>
          </div>
          
          <div className="flex justify-between items-end">
            <span className="text-gray-500 text-sm mb-1">Total Approx</span>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              ₹{place.avgCost ? place.avgCost.toLocaleString('en-IN') : 'Free'}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ 3. MOOD TAGS */}
      {place.moodTags && place.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
            {place.moodTags.map((tag, i) => (
                <span key={i} className="text-xs font-bold bg-gray-900 text-purple-300 px-3 py-1.5 rounded-lg border border-purple-500/20 hover:bg-purple-900/30 transition cursor-default">
                    #{tag}
                </span>
            ))}
        </div>
      )}

    </div>
  );
};

export default PlaceSidebar;