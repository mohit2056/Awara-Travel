import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, MapPin, Loader, ArrowRight } from 'lucide-react';

const BlindTravel = () => {
  const [budget, setBudget] = useState(5000); // Default 5k
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSurprise = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    // 🕒 Thoda fake delay taaki user ki heartbeat badhe (Experience!)
    setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/places/blind-date?budget=${budget}`);
        const data = await res.json();

        if (res.ok) {
          setResult(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Better Luck Next Time. 😂");
      } finally {
        setLoading(false);
      }
    }, 2500); // 2.5 second ka suspense
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-purple-900/20 via-black to-pink-900/20 z-0"></div>

      <div className="z-10 text-center max-w-2xl w-full">
        
        {/* 🎉 HEADER */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 animate-pulse">
          Blind Travel
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Kahan jaana hai pata nahi? <br/>
          Bas budget batao, baaki <b>Awara</b> pe chhod do! 🎲
        </p>

        {/* 🎛️ CONTROLS (Jab tak Result nahi aata) */}
        {!result && !loading && (
          <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl transform transition hover:scale-105 duration-300">
            <div className="mb-8">
              <label className="block text-lg font-bold mb-4 text-purple-300">
                How Much Your Budget ? 💰
              </label>
              
              {/* SLIDER INPUT */}
              <input 
                type="range" 
                min="500" 
                max="500000" 
                step="500" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="mt-4 text-4xl font-bold text-white">
                ₹{budget}
              </div>
            </div>

            {error && <p className="text-red-400 mb-4">{error}</p>}

            <button 
              onClick={handleSurprise}
              className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl text-xl flex items-center justify-center gap-3 transition shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            >
              <Gift size={24} className="animate-bounce" />
              Surprise Me!
            </button>
          </div>
        )}

        {/* 🔄 LOADING ANIMATION (Suspense) */}
        {loading && (
          <div className="flex flex-col items-center">
            <Loader size={64} className="text-purple-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-white animate-pulse">
              Matching your vibe... 🔮
            </h2>
            <p className="text-gray-400 mt-2">Hold on scouting the best adventure for you...</p>
          </div>
        )}

        {/* 🎁 RESULT REVEAL (Grand Finale) */}
        {result && (
          <div className="glass p-2 rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)] animate-[fadeIn_0.5s_ease-out]">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              
              {/* ✅ UPDATE 1: Image Source Fixed */}
              <img 
                src={result.images && result.images.length > 0 ? result.images[0] : "https://via.placeholder.com/800x600?text=No+Image"} 
                alt={result.name} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 text-left">
                <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded inline-block mb-2">
                  PERFECT MATCH FOUND! 💘
                </div>
                
                {/* ✅ UPDATE 2: Title ki jagah Name use kiya */}
                <h2 className="text-4xl font-bold text-white mb-1">{result.name}</h2>
                
                <div className="flex items-center text-gray-300">
                  <MapPin size={16} className="mr-1" />
                  {result.location}
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                {result.description}
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition text-gray-300"
                >
                  Try Again 🔄
                </button>
                <button 
                  onClick={() => navigate(`/place/${result._id}`)}
                  className="flex-1 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  View Details <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlindTravel;