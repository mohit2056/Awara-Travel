import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ place, isWishlisted, handleWishlist, handleShare }) => {
  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      
      {/* 1. Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img 
          src={place.images?.[0] || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"} 
          alt={place.name} 
          className="w-full h-full object-cover scale-105" // Thoda zoom kiya taaki borders na dikhein
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-black/30"></div>
      </div>
      
      {/* 2. Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
        <Link to="/discover" className="group bg-black/20 backdrop-blur-md p-3 rounded-full hover:bg-white/10 transition border border-white/10">
          <ArrowLeft size={24} className="text-white group-hover:-translate-x-1 transition" />
        </Link>
        
        <div className="flex gap-4">
          <button onClick={handleShare} className="group bg-black/20 backdrop-blur-md p-3 rounded-full hover:bg-white/10 transition border border-white/10">
            <Share2 size={22} className="text-white group-hover:scale-110 transition" />
          </button>
          <button onClick={handleWishlist} className={`p-3 rounded-full backdrop-blur-md border border-white/10 transition group ${isWishlisted ? 'bg-red-500 text-white shadow-red-500/50 shadow-lg' : 'bg-black/20 text-white hover:bg-white/10'}`}>
            <Heart size={22} className={`${isWishlisted ? "fill-current scale-110" : "group-hover:scale-110"} transition`} />
          </button>
        </div>
      </div>

      {/* 3. Hero Content (Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-6 pb-16 max-w-7xl mx-auto z-20"
      >
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {place.isHiddenGem && (
            <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 border border-white/20">
              💎 Hidden Gem
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-gray-200 border border-white/10 flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400"/> {place.rating ? place.rating.toFixed(1) : "New"}
          </span>
        </div>

        {/* Massive Title */}
        <h1 className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tight drop-shadow-2xl">
          {place.name}
        </h1>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-200 text-lg md:text-xl font-medium ml-1">
          <MapPin size={24} className="text-purple-400" />
          <span className="border-b border-dashed border-gray-400 pb-0.5">{place.location}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;