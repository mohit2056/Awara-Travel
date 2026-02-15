import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Award, Utensils, Star, Heart, Share2, Navigation } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';
import ReviewSection from '../components/ReviewSection';
import Preloader from '../components/Preloader'; // 👈 Animation Import kiya

const PlaceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // States
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 🛠️ Helper: Format Currency (₹ 10,000)
  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // 1. Fetch Place Data
  const fetchPlace = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/places/${id}`);
      const data = await res.json();
      setPlace(data);
    } catch (error) {
      console.error("Error fetching place:", error);
    } finally {
      // Thoda artificial delay taaki animation dikhe (Optional)
      setTimeout(() => setLoading(false), 800); 
    }
  }, [id]);

  // 2. Check Wishlist Status
  useEffect(() => {
    const checkWishlist = async () => {
      if (!user) return;
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const res = await fetch('http://localhost:5000/api/users/wishlist', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setIsWishlisted(data.some((item) => item.place?._id === id));
        }
      } catch (err) { console.error(err); }
    };
    fetchPlace();
    checkWishlist();
  }, [id, user, fetchPlace]);

  // 3. Handlers
  const handleWishlist = async () => {
    if (!user) return alert("Login to save to wishlist! 🔒");
    
    // Optimistic UI Update
    setIsWishlisted(!isWishlisted);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await fetch('http://localhost:5000/api/users/wishlist', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${userInfo.token}` 
        },
        body: JSON.stringify({ placeId: id }),
      });
    } catch (error) {
      console.error("Wishlist Error:", error);
      setIsWishlisted(!isWishlisted); // Revert on error
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: place?.name,
      text: `Check out this amazing place: ${place?.name} on Awara!`,
      url: window.location.href
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! 📋");
    }
  };

  const openMaps = () => {
    if (place?.coordinates) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
    }
  };

  // 🔄 LOADING STATE (Ab Animation Dikhega)
  if (loading) return <Preloader />;

  // ERROR STATE
  if (!place) return <div className="text-center text-white pt-20">Place not found 😢</div>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-purple-500/30">
        
        {/* 📸 HERO SECTION */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
            src={place.images[0]} 
            alt={place.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
          
          <div className="absolute bottom-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            {place.isHiddenGem && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-purple-400/30 shadow-lg">
                💎 Hidden Gem
              </span>
            )}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2 drop-shadow-xl">{place.name}</h1>
            <div className="flex items-center text-gray-200 text-lg">
              <MapPin className="text-purple-400 mr-2" size={20} />
              {place.location}
            </div>
          </div>
        </div>

        {/* 📝 MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* 💰 BUDGET & STATS ROW */}
            <div className="grid grid-cols-3 gap-4 bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="text-center border-r border-gray-800">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Budget</p>
                <p className="text-2xl md:text-3xl font-bold text-green-400 flex justify-center items-center gap-1">
                   {formatBudget(place.avgCost)}
                </p>
              </div>
              <div className="text-center border-r border-gray-800">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Rating</p>
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-yellow-400">
                  {place.rating?.toFixed(1) || 'N/A'} <Star className="fill-current" size={20} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Reviews</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{place.numReviews || 0}</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Award size={150} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                 <span className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Award size={24}/></span> The Experience
               </h3>
               <p className="text-gray-300 text-lg leading-relaxed">{place.description}</p>
               <div className="mt-6 pt-6 border-t border-gray-800 flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} /> <span>Suggested Duration: 2-3 Days</span>
               </div>
            </div>

            {/* FOOD */}
            {place.mustTryDishes?.length > 0 && (
              <div>
                 <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-yellow-500"><Utensils size={28}/></span> Foodie's Paradise
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {place.mustTryDishes.map((dish, i) => (
                     <div key={i} className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-800 hover:border-yellow-500/40 transition">
                       <span className="text-2xl">🍽️</span>
                       <p className="text-gray-200 font-medium">{dish}</p>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {/* REVIEWS */}
            <ReviewSection placeId={id} reviews={place.reviews || []} user={user} refreshPlace={fetchPlace} />
          </motion.div>

          {/* RIGHT: Sidebar Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* MAP CARD */}
            <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-xl group cursor-pointer" onClick={openMaps}>
              <div className="h-48 bg-gray-800 relative flex items-center justify-center overflow-hidden">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition" alt="Map" />
                 <button className="absolute bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transform group-hover:scale-105 transition">
                    <Navigation size={18} /> View Location
                 </button>
              </div>
              <div className="p-6">
                 <p className="text-gray-400 text-sm">{place.location}</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleWishlist} className={`flex flex-col items-center justify-center gap-2 p-6 rounded-3xl border transition ${isWishlisted ? 'bg-pink-600/20 border-pink-500/50 text-pink-400' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                <Heart size={28} className={isWishlisted ? "fill-current" : ""} />
                <span className="font-bold text-sm">{isWishlisted ? 'Saved' : 'Save'}</span>
              </button>
              <button onClick={handleShare} className="flex flex-col items-center justify-center gap-2 p-6 rounded-3xl bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white transition">
                <Share2 size={28} />
                <span className="font-bold text-sm">Share</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default PlaceDetails;