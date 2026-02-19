import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import PageTransition from '../components/PageTransition';
import Preloader from '../components/Preloader';
import ReviewSection from '../components/ReviewSection';

// 👇 Ye 3 tere 'place-details' folder ke andar hain
import HeroSection from '../components/place-details/HeroSection';
import PlaceStats from '../components/place-details/PlaceStats';
import PlaceSidebar from '../components/place-details/PlaceSidebar';

// 👇 Ye 2 seedha 'components' folder mein hain (Bahar)
import FoodGuide from '../components/FoodGuide';
import KharchaEstimator from '../components/KharchaEstimator';
const PlaceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchPlace = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/places/${id}`);
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setPlace(data);
    } catch (error) {
      console.error("Error fetching place:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  useEffect(() => {
    if (user && id) {
      const checkWishlist = async () => {
        try {
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          const res = await fetch(`${API_BASE_URL}/api/users/wishlist`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          const data = await res.json();
          if (Array.isArray(data)) {
             const exists = data.some((item) => item.place?._id === id);
             setIsWishlisted(exists);
          }
        } catch (err) { console.error(err); }
      };
      checkWishlist();
    }
  }, [id, user]);

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
    if (navigator.share && place) {
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

  // ✅ Maps Bug Fixed: Sahi dollar ($) sign aur standard Google Maps format laga diya
  const openMaps = () => {
    if (place?.coordinates?.lat && place?.coordinates?.lng) {
      window.open(`https://maps.google.com/?q=${place.coordinates.lat},${place.coordinates.lng}`, '_blank');
    } else if (place) {
      window.open(`https://maps.google.com/?q=${place.name} ${place.location}`, '_blank');
    }
  };

  if (loading) return <Preloader />;
  
  if (!place) return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Place details missing 😕</h2>
      <button onClick={() => window.location.reload()} className="bg-purple-600 px-6 py-2 rounded-full">Retry</button>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-purple-500/30 pb-20">
        
        {/* HERO SECTION */}
        <HeroSection 
          place={place} 
          isWishlisted={isWishlisted} 
          handleWishlist={handleWishlist} 
          handleShare={handleShare} 
        />

        {/* QUICK STATS (Overlapping the hero section) */}
        <div className="px-4">
            <PlaceStats place={place} />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Description, Food & Reviews */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Description Box */}
            <div className="bg-gray-900/40 rounded-3xl p-8 border border-white/5 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">About The Experience</h3>
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {place.description}
              </p>
            </div>

            {/* Food Guide */}
            <FoodGuide dishes={place.mustTryDishes} />

            {/* Reviews Section */}
            <div className="bg-gray-900/40 rounded-3xl p-8 border border-white/5 shadow-lg">
                <ReviewSection placeId={id} reviews={place.reviews || []} user={user} refreshPlace={fetchPlace} />
            </div>
            
          </div>

          {/* Right Column: Sidebar (Map, Est Cost, Tags) */}
          <div className="lg:col-span-4 space-y-8">
            <PlaceSidebar place={place} openGoogleMaps={openMaps} />
            <KharchaEstimator avgCost={place.avgCost} />
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default PlaceDetails;