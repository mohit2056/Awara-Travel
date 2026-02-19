import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // 1. Backend se Wishlist Data Mangwao
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const res = await fetch(`${API_BASE_URL}/api/users/wishlist`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const data = await res.json();
        
        // Data me se sirf 'place' object nikal kar state me dalo
        if (Array.isArray(data)) {
          setFavorites(data.map(item => item.place).filter(Boolean));
        }
      } catch (error) {
        console.error("Error fetching wishlist", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  // 2. Wishlist se remove karne ka function
  const removeFromWishlist = async (id) => {
    // UI se turant hatao (Fast feeling ke liye)
    setFavorites(favorites.filter((place) => place._id !== id));
    
    // Backend se bhi hatao
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await fetch(`${API_BASE_URL}/api/users/wishlist`, {
        method: 'POST', // Toggle API jo tune backend me banayi hai
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({ placeId: id }),
      });
    } catch (error) {
      console.error("Failed to remove from database", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 text-white p-8 pt-24 pb-20 font-sans">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Your Travel Wishlist ❤️
        </h1>

        {!user ? (
          <div className="text-center mt-20 bg-gray-900/50 max-w-lg mx-auto p-10 rounded-3xl border border-white/10 shadow-xl">
            <p className="text-xl text-gray-300 mb-6 font-medium">Please login to see your saved places.</p>
            <Link to="/login" className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition shadow-lg shadow-purple-500/30">
              Login Now 🔒
            </Link>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center mt-20 bg-gray-900/50 max-w-lg mx-auto p-10 rounded-3xl border border-white/10 shadow-xl">
            <div className="text-6xl mb-4">🧳</div>
            <p className="text-xl text-gray-300 mb-6 font-medium">Aapne abhi tak koi jagah save nahi ki hai.</p>
            <Link to="/discover" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold transition shadow-lg shadow-purple-500/30 inline-block">
              Explore Places 🚀
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {favorites.map((place) => (
              <div key={place._id} className="bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition duration-300 group">
                {/* ⚠️ Schema mapping: place.images[0] use kiya gaya hai */}
                <div className="relative h-56 overflow-hidden">
                    <img 
                      src={place.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                      alt={place.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 relative">
                  {/* ⚠️ Schema mapping: place.name use kiya gaya hai */}
                  <h3 className="text-2xl font-bold mb-2 text-white">{place.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{place.description}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <Link 
                      to={`/place/${place._id}`}
                      className="text-purple-400 hover:text-purple-300 text-sm font-bold flex items-center gap-1 transition"
                    >
                      View Details &rarr;
                    </Link>
                    <button 
                      onClick={() => removeFromWishlist(place._id)}
                      className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 hover:bg-red-400/20 px-4 py-2 rounded-xl transition font-bold"
                    >
                      Remove 💔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Wishlist;