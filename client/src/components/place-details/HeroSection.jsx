import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ place, isWishlisted, handleWishlist, handleShare }) => {
  if (!place) return null; 

  return (
    // 👇 Height 85vh kar di taaki image badi aur immersive dikhe
    <div className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
      
      {/* 1. Background Image */}
      <div className="absolute inset-0">
        <img 
          src={place.images?.[0] || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"} 
          alt={place.name} 
          // 👇 Scale hata diya taaki puri photo clear dikhe
          className="w-full h-full object-cover"
        />
        {/* 👇 Upar ka kala pan (gradient) kam kiya taaki din jaisi clarity aaye */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-black/20"></div>
      </div>
      
      {/* 2. Top Navigation Bar (Buttons) */}
      {/* 👇 Yahan 'top-24' kiya hai taaki Navbar ke peeche na chhupe */}
      <div className="absolute top-24 left-0 right-0 px-6 md:px-10 flex justify-between items-start z-30 max-w-7xl mx-auto">
        
        <Link to="/discover" className="group bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition border border-white/10 shadow-xl">
          <ArrowLeft size={24} className="text-white group-hover:-translate-x-1 transition" />
        </Link>
        
        <div className="flex gap-4">
          <button onClick={handleShare} className="group bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition border border-white/10 shadow-xl">
            <Share2 size={22} className="text-white group-hover:scale-110 transition" />
          </button>
          
          <button onClick={handleWishlist} className={`p-3 rounded-full backdrop-blur-md border border-white/10 transition shadow-xl group ${isWishlisted ? 'bg-red-500 text-white shadow-red-500/50' : 'bg-black/40 text-white hover:bg-white/20'}`}>
            <Heart size={22} className={`${isWishlisted ? "fill-current scale-110" : "group-hover:scale-110"} transition`} />
          </button>
        </div>

      </div>

      {/* 3. Hero Content (Title & Location) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-6 pb-16 md:pb-20 max-w-7xl mx-auto z-20"
      >
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {place.isHiddenGem && (
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-white/20">
              💎 Hidden Gem
            </span>
          )}
          <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-gray-100 border border-white/20 flex items-center gap-1.5 shadow-lg">
            <Star size={14} className="text-yellow-400 fill-yellow-400"/> {place.rating ? place.rating.toFixed(1) : "New"}
          </span>
        </div>

        {/* Massive Title */}
        <h1 className="text-5xl md:text-8xl font-black text-white mb-3 tracking-tight drop-shadow-2xl">
          {place.name}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-200 text-lg md:text-2xl font-medium ml-1 drop-shadow-lg">
          <MapPin size={26} className="text-purple-400" />
          <span>{place.location}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;