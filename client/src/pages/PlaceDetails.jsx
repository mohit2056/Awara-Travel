import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Award, Utensils, Star, Heart, Share2, Navigation } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';
import ReviewSection from '../components/ReviewSection';
import Preloader from '../components/Preloader';
import { API_BASE_URL } from '../config';

const PlaceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/places/${id}`);
        const data = await res.json();
        setPlace(data);
      } catch (error) {
        console.error("Error fetching place:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchPlace();
  }, [id]);

  // 2. Wishlist Check
  useEffect(() => {
    if (user) {
      const checkWishlist = async () => {
        try {
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          const res = await fetch(`${API_BASE_URL}/api/users/wishlist`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          const data = await res.json();
          const exists = data.some((item) => item.place?._id === id);
          setIsWishlisted(exists);
        } catch (err) { console.error(err); }
      };
      checkWishlist();
    }
  }, [id, user]);

  // 3. Format Currency (₹ 500)
  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleWishlist = async () => {
    if (!user) return alert("Please login to save places! 🔒");
    setIsWishlisted(!isWishlisted);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await fetch(`${API_BASE_URL}/api/users/wishlist`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ placeId: id }),
      });
    } catch (error) { setIsWishlisted(!isWishlisted); }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: `Check out ${place.name} on Awara!`,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const openMaps = () => {
    if (place?.coordinates?.lat && place?.coordinates?.lng) {
      window.open(`https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${place.name} ${place.location}`, '_blank');
    }
  };

  if (loading) return <Preloader />;
  if (!place) return <div className="text-white text-center mt-20">Place not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-purple-500/30">
        
        {/* HERO IMAGE */}
        <div className="relative h-[60vh] w-full overflow-hidden bg-gray-900">
          {place.images && place.images.length > 0 ? (
            <motion.img 
              initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
              src={place.images[0]} 
              alt={place.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">No Image Available</div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
          
          <div className="absolute bottom-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
            {place.isHiddenGem && (
              <span className="inline-block px-4 py-1 rounded-full bg-purple-600/90 text-white text-xs font-bold mb-4">
                💎 Hidden Gem
              </span>
            )}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-2">{place.name}</h1>
            <div className="flex items-center text-gray-200 text-lg">
              <MapPin className="text-purple-400 mr-2" size={20} />
              {place.location}
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Box */}
            <div className="grid grid-cols-3 gap-4 bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="text-center border-r border-gray-800">
                <p className="text-gray-500 text-xs uppercase mb-1">Cost</p>
                <p className="text-xl font-bold text-green-400">
                  {place.avgCost ? formatBudget(place.avgCost) : 'Free'}
                </p>
              </div>
              <div className="text-center border-r border-gray-800">
                <p className="text-gray-500 text-xs uppercase mb-1">Rating</p>
                <div className="flex justify-center items-center gap-1 text-xl font-bold text-yellow-400">
                  {place.rating ? place.rating.toFixed(1) : 'New'} <Star size={18} fill="currentColor" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase mb-1">Reviews</p>
                <p className="text-xl font-bold text-white">{place.numReviews || 0}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-purple-400" /> Experience
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{place.description}</p>
              
              {/* Mood Tags */}
              {place.moodTags && (
                <div className="mt-6 flex gap-2 flex-wrap">
                  {place.moodTags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-300 border border-gray-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Food Section */}
            {place.mustTryDishes && place.mustTryDishes.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Utensils className="text-yellow-500" /> Must Try Food
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {place.mustTryDishes.map((dish, i) => (
                    <div key={i} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex items-center gap-3">
                      <span className="text-2xl">🍽️</span>
                      <span className="text-gray-200 font-medium">{dish}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Component */}
            <ReviewSection placeId={id} reviews={place.reviews || []} user={user} refreshPlace={() => {}} />
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Map Card */}
            <div onClick={openMaps} className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 cursor-pointer group">
              <div className="h-40 bg-gray-800 relative flex items-center justify-center">
                <p className="flex items-center gap-2 font-bold text-gray-300 group-hover:text-white transition">
                  <Navigation size={20} /> Open in Maps
                </p>
              </div>
              <div className="p-4 text-sm text-gray-400 text-center border-t border-gray-800">
                {place.location}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleWishlist} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition ${isWishlisted ? 'border-pink-500 text-pink-500 bg-pink-500/10' : 'border-gray-800 bg-gray-900 text-gray-400 hover:text-white'}`}>
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                <span className="text-xs font-bold uppercase">{isWishlisted ? 'Saved' : 'Save'}</span>
              </button>
              <button onClick={handleShare} className="p-4 rounded-2xl border border-gray-800 bg-gray-900 text-gray-400 hover:text-white flex flex-col items-center justify-center gap-2 transition">
                <Share2 size={24} />
                <span className="text-xs font-bold uppercase">Share</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default PlaceDetails;