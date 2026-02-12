import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition'; // 👈 Animation Wrapper

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // LocalStorage se 'favorites' nikalo
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = favorites.filter((item) => item._id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">
          Your Travel Wishlist ❤️
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-400 mb-6">Apne abhi tak kuch pasand nahi kiya.</p>
            <Link 
              to="/discover" 
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
            >
              Explore Places 🚀
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {favorites.map((place) => (
              <div key={place._id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition duration-300">
                <img 
                  src={place.image} 
                  alt={place.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{place.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{place.description}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      to={`/place/${place._id}`}
                      className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
                    >
                      View Details →
                    </Link>
                    <button 
                      onClick={() => removeFromWishlist(place._id)}
                      className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded-full transition"
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