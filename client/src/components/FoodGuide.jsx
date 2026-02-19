import React from 'react';
import { Utensils } from 'lucide-react';

const FoodGuide = ({ dishes }) => {
  // Agar food data nahi hai to ye section hide ho jayega
  if (!dishes || dishes.length === 0) return null;

  return (
    <div className="mt-12 mb-12">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
        <Utensils className="text-yellow-500" /> Must Try Local Food
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish, index) => (
          <div key={index} className="bg-gray-900/50 p-5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition duration-300 group flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-600/50 transition">
              <span className="text-2xl">🥘</span>
            </div>
            <h4 className="text-lg font-bold text-gray-200">{dish}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGuide;