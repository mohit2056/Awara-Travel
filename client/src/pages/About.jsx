import React from 'react';
import { Users, Heart, Globe, Map } from 'lucide-react';

const About = () => {
  return (
    // ✅ FIX: Background image ab seedha style tag mein hai (Foolproof)
    <div 
      className="min-h-screen pt-24 px-4 text-white relative flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1534854638093-bada1813ca19?q=80&w=2070&auto=format&fit=crop')",
        backgroundColor: 'black' // Fallback color
      }}
    >
      
      {/* 🌑 Overlay (Thoda dark kiya taaki text chamke) */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 animate-pulse">
          We Are Awara
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-2xl mx-auto font-light">
          "Hum shehron mein nahi, raaston par baste hain. 🌍"
        </p>

        {/* 3 Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="glass p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition transform hover:-translate-y-2 duration-300 shadow-lg">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Users className="text-purple-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Community</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Awara sirf ek app nahi, ek tribe hai. Yahan travelers milte hain, stories share karte hain aur dost bante hain.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition transform hover:-translate-y-2 duration-300 shadow-lg">
            <div className="bg-pink-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <Heart className="text-pink-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Passion</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Humein wo jagah dhoondhna pasand hai jo Google Maps par aasani se nahi milti. Asli maza unknown mein hai.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition transform hover:-translate-y-2 duration-300 shadow-lg">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              <Globe className="text-yellow-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Adventure</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Blind Travel ke saath hum aapko comfort zone se bahar nikaal kar asli duniya dikhate hain.
            </p>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="inline-block p-8 glass rounded-3xl border border-white/20 relative backdrop-blur-xl">
          <Map className="absolute -top-6 -left-6 text-purple-500 bg-black rounded-full p-2 border border-purple-500" size={48} />
          <p className="text-2xl md:text-3xl font-serif italic text-gray-200">
            "Manzil se behtar lagne lage hain ye raaste..."
          </p>
          <div className="mt-4 flex justify-center gap-2 items-center">
            <div className="h-1 w-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <p className="text-purple-400 font-bold tracking-widest uppercase text-sm">Team Awara</p>
            <div className="h-1 w-10 bg-linear-to-r from-pink-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;