import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, MapPin, Loader, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition'; // 👈 Animation Import

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
          setError(data.message || "Koi jagah nahi mili itne budget mein 😅");
        }
      } catch (err) {
        setError("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    }, 2500); // 2.5 second ka suspense
  };

  return (
    // 👇 PageTransition se wrap kiya (Smooth Animation ke liye)
    <PageTransition>
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
            <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl transform transition hover:scale-105 duration-300 backdrop-blur-md bg-white/5">
              <div className="mb-8">
                <label className="block text-lg font-bold mb-4 text-purple-300">
                  Kitna Budget Hai? 💰
                </label>
                
                {/* SLIDER INPUT */}
                <input 
                  type="range" 
                  min="500" 
                  max="50000" 
                  step="500" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="mt-4 text-4xl font-bold text-white">
                  ₹{budget}
                </div>
              </div>

              {error && <p className="text-red-400 mb-4 bg-red-500/10 p-2 rounded-lg">{error}</p>}

              <button 
                onClick={handleSurprise}
                className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl text-xl flex items-center justify-center gap-3 transition shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                <Gift size={24} className="animate-bounce" />
                Surprise Me!
              </button>
            </div>
          )}

          {/* 🔄 LOADING ANIMATION (Suspense) */}
          {loading && (
            <div className="flex flex-col items-center py-10">
              <Loader size={64} className="text-purple-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white animate-pulse">
                Matching your vibe... 🔮
              </h2>
              <p className="text-gray-400 mt-2">Dhoond rahe hain wo jagah jo tumhe hila degi...</p>
            </div>
          )}

          {/* 🎁 RESULT REVEAL (Grand Finale) */}
          {result && (
            <div className="glass p-2 rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.3)] animate-fade-in-up bg-white/5 backdrop-blur-md">
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
                
                {/* Image Logic Fix */}
                <img 
                  src={result.images && result.images.length > 0 ? result.images[0] : "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"} 
                  alt={result.name} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-6 text-left w-full">
                  <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded inline-block mb-2 shadow-lg">
                    PERFECT MATCH FOUND! 💘
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-md">{result.name}</h2>
                  
                  <div className="flex items-center text-gray-300">
                    <MapPin size={16} className="mr-1 text-purple-400" />
                    {result.location}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 text-lg mb-8 line-clamp-3 leading-relaxed">
                  {result.description}
                </p>
                
                <div className="flex gap-4 flex-col md:flex-row">
                  <button 
                    onClick={() => setResult(null)}
                    className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition text-gray-300 font-semibold"
                  >
                    Try Again 🔄
                  </button>
                  <button 
                    onClick={() => navigate(`/place/${result._id}`)}
                    className="flex-1 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    View Details <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default BlindTravel;