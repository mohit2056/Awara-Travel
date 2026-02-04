import React from 'react';
import { Mountain, PartyPopper, Coffee, Ghost } from 'lucide-react';

const Home = () => {
  const moods = [
    { id: 1, name: 'Peace', icon: <Coffee className="w-8 h-8" />, desc: 'Calmness & Nature' },
    { id: 2, name: 'Party', icon: <PartyPopper className="w-8 h-8" />, desc: 'Nightlife & Clubs' },
    { id: 3, name: 'Thrill', icon: <Mountain className="w-8 h-8" />, desc: 'Trekking & Adventure' },
    { id: 4, name: 'Spiritual', icon: <Ghost className="w-8 h-8" />, desc: 'Temples & Soul' },
  ];

  return (
    <div className="pt-20 pb-10 min-h-screen px-4">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Find Your <span className="text-purple-400">Vibe</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          "For the lost souls." Kahan jana hai? Faisla dil pe chhod do.
        </p>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {moods.map((mood) => (
          <div key={mood.id} className="glass p-8 rounded-2xl hover:bg-white/20 transition cursor-pointer group text-center">
            <div className="bg-purple-600/20 p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition">
              {mood.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{mood.name}</h3>
            <p className="text-gray-400">{mood.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;