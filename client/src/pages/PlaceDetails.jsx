import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Share2, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// 👇 COMPONENTS IMPORT
import PlaceMap from '../components/PlaceMap';
import SonicPlayer from '../components/SonicPlayer';
import ReviewSection from '../components/ReviewSection';
import KharchaEstimator from '../components/KharchaEstimator';
import FoodGuide from '../components/FoodGuide';

const PlaceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [place, setPlace] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔄 1. FETCH PLACE DATA (Isse bahar nikal diya taaki dubara bula sakein)
  const fetchPlace = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/places/${id}`);
      const data = await res.json();
      setPlace(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching place:", error);
      setLoading(false);
    }
  }, [id]);

  // Initial Load
  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  // ❤️ 2. CHECK WISHLIST STATUS (Bohot Zaroori Logic)
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user) return; // Agar login nahi hai toh check mat karo

      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) return;

        const res = await fetch('http://localhost:5000/api/users/wishlist', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        if (res.ok) {
          const wishlistData = await res.json();
          // 👇 Yahan check kar rahe hain ki kya ye Place ID wishlist mein hai?
          // Backend populate karke bhejta hai, isliye 'item.place._id' check kiya
          const exists = wishlistData.some((item) => item.place?._id === id);
          setIsWishlisted(exists);
        }
      } catch (err) {
        console.error("Wishlist check failed", err);
      }
    };

    checkWishlistStatus();
  }, [user, id]);

  // ❤️ 3. HANDLE WISHLIST TOGGLE (Add/Remove)
  const handleWishlist = async () => {
    if (!user) return alert("Please Login to Save! 🔒");

    // Optimistic UI update (Turant color change karo, user ko wait mat karao)
    const previousState = isWishlisted;
    setIsWishlisted(!isWishlisted);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const res = await fetch('http://localhost:5000/api/users/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ placeId: id }),
      });

      if (!res.ok) {
        // Agar error aaya toh wapas purana state kar do
        setIsWishlisted(previousState);
        alert("Something went wrong with Wishlist!");
      }
    } catch (error) {
      setIsWishlisted(previousState);
      console.error("Error:", error);
    }
  };

  // 🔗 Share Logic
  const handleShare = async () => {
    const shareData = {
      title: `Check out ${place?.name} on Awara!`,
      text: `Found this amazing place: ${place?.name} in ${place?.location}. Let's go!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied! 📋");
      }
    } catch (err) { console.log("Share cancelled"); }
  };

  // ⏳ Loading State
  if (loading) return <div className="text-center py-20 text-xl animate-pulse">Loading Vibes... ⏳</div>;

  // ❌ Error / Not Found State
  if (!place || !place.images) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-400 mb-4">404: Raasta Bhatak Gaye? 🤔</h2>
        <Link to="/discover" className="bg-purple-600 px-6 py-3 rounded-full font-bold text-white">
          Wapas Discover Pe Jao
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-10 min-h-screen px-4 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link to="/discover" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
        <ArrowLeft size={20} /> Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT: INFO & HERO */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group h-96">
            <img 
              src={place.images[0]} 
              alt={place.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
            />
            {place.isHiddenGem && (
              <span className="absolute top-4 left-4 bg-purple-600 text-sm font-bold px-3 py-1 rounded-full shadow-lg text-white">
                💎 Hidden Gem
              </span>
            )}
          </div>

          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{place.name}</h1>
            <div className="flex gap-3">
              {/* Share Button */}
              <button onClick={handleShare} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition text-purple-400 border border-white/10">
                <Share2 size={24} />
              </button>
              
              {/* Heart Button */}
              <button 
                onClick={handleWishlist} 
                className={`p-3 rounded-full transition border border-white/10 ${
                  isWishlisted 
                    ? 'bg-red-500/20 text-red-500 border-red-500/50' 
                    : 'bg-white/10 text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
              </button>
            </div>
          </div>

          <p className="flex items-center gap-2 text-gray-400 mb-6 text-lg">
            <MapPin size={20} className="text-purple-400" /> {place.location}
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">{place.description}</p>

          <div className="flex flex-wrap gap-3">
            {/* Added ?. to prevent crash if tags are missing */}
            {place.moodTags?.map((tag, index) => (
              <span key={index} className="bg-white/10 px-4 py-2 rounded-full text-purple-200 border border-white/20 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: KHARCHA ESTIMATOR */}
        <KharchaEstimator avgCost={place.avgCost} />
      </div>

      {/* MAP SECTION */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">📍 Location Check</h2>
        <PlaceMap coordinates={place.coordinates} name={place.name} />
      </div>

      {/* FOOD GUIDE */}
      <FoodGuide dishes={place.mustTryDishes} />

      {/* SONIC PLAYER (Audio) */}
      <SonicPlayer src={place.musicUrl} placeName={place.name} />

      {/* REVIEWS SECTION */}
      {/* Note: 'refreshPlace' pass kiya hai taaki review add hone par bina reload ke update ho */}
      <ReviewSection 
        placeId={id} 
        reviews={place.reviews || []} 
        user={user} 
        refreshPlace={fetchPlace} 
      />

    </div>
  );
};

export default PlaceDetails;