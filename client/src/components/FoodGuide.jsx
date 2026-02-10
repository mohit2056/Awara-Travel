import React from 'react';

const FoodGuide = ({ dishes }) => {
  return (
    <div className="mt-16 mb-20">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        🍽️ Find Your Tast <span className="text-sm font-normal text-gray-400">(Must Try Dishes)</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dishes.map((dish, index) => (
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
  );
};

export default FoodGuide;