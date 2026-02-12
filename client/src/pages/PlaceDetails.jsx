import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Share2, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition'; // 👈 Animation Import

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

  // 🔄 1. FETCH PLACE DATA
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

  // ❤️ 2. CHECK WISHLIST STATUS
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!user) return; 

      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) return;

        const res = await fetch('http://localhost:5000/api/users/wishlist', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        if (res.ok) {
          const wishlistData = await res.json();
          // Check if place exists in wishlist
          const exists = wishlistData.some((item) => item.place?._id === id);
          setIsWishlisted(exists);
        }
      } catch (err) {
        console.error("Wishlist check failed", err);
      }
    };

    checkWishlistStatus();
  }, [user, id]);

  // ❤️ 3. HANDLE WISHLIST TOGGLE
  const handleWishlist = async () => {
    if (!user) return alert("Please Login to Save! 🔒");

    // Optimistic UI update
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
  if (loading) return <div className="text-center py-20 text-xl animate-pulse text-white">Loading Vibes... ⏳</div>;

  // ❌ Error / Not Found State
  if (!place) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-400 mb-4">404: Raasta Bhatak Gaye? 🤔</h2>
        <Link to="/discover" className="bg-purple-600 px-6 py-3 rounded-full font-bold text-white hover:bg-purple-700 transition">
          Wapas Discover Pe Jao
        </Link>
      </div>
    );
  }

  return (
    // 👇 PageTransition se wrap kiya
    <PageTransition>
      <div className="pt-24 pb-10 min-h-screen px-4 max-w-7xl mx-auto text-white">
        {/* Back Button */}
        <Link to="/discover" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
          <ArrowLeft size={20} /> Back to Discover
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* LEFT: INFO & HERO */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group h-96 border border-gray-700">
              {/* 👇 Image Fix: Agar array empty ho toh default photo dikhao */}
              <img 
                src={place.images?.[0] || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"} 
                alt={place.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"; 
                }}
              />
              {place.isHiddenGem && (
                <span className="absolute top-4 left-4 bg-purple-600 text-sm font-bold px-3 py-1 rounded-full shadow-lg text-white border border-purple-400">
                  💎 Hidden Gem
                </span>
              )}
            </div>

            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
                {place.name}
              </h1>
              <div className="flex gap-3">
                {/* Share Button */}
                <button onClick={handleShare} className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition text-purple-400 border border-gray-600">
                  <Share2 size={24} />
                </button>
                
                {/* Heart Button */}
                <button 
                  onClick={handleWishlist} 
                  className={`p-3 rounded-full transition border ${
                    isWishlisted 
                      ? 'bg-red-500/20 text-red-500 border-red-500/50' 
                      : 'bg-gray-800 text-gray-400 hover:text-red-400 border-gray-600'
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

            <div className="flex flex-wrap gap-3 mb-8">
              {place.moodTags?.map((tag, index) => (
                <span key={index} className="bg-gray-800 px-4 py-2 rounded-full text-purple-300 border border-gray-700 text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: KHARCHA ESTIMATOR */}
          <div className="lg:mt-0 mt-8">
            <KharchaEstimator avgCost={place.avgCost || 5000} />
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">📍 Location Check</h2>
          <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            <PlaceMap coordinates={place.coordinates} name={place.name} />
          </div>
        </div>

        {/* FOOD GUIDE */}
        <div className="mt-16">
           <FoodGuide dishes={place.mustTryDishes || []} />
        </div>

        {/* SONIC PLAYER (Audio) */}
        {place.musicUrl && (
          <div className="mt-16">
            <SonicPlayer src={place.musicUrl} placeName={place.name} />
          </div>
        )}

        {/* REVIEWS SECTION */}
        <div className="mt-16 mb-10">
          <ReviewSection 
            placeId={id} 
            reviews={place.reviews || []} 
            user={user} 
            refreshPlace={fetchPlace} 
          />
        </div>

      </div>
    </PageTransition>
  );
};

export default PlaceDetails;