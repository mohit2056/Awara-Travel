import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';
import { Filter, X } from 'lucide-react'; // 🆕 X icon add kiya (cancel ke liye)

const Discover = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔗 URL params handle karne ke liye hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Current values padho URL se
  const searchQuery = searchParams.get('search');
  const filterType = searchParams.get('type'); // e.g., 'hidden'

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        // 🧠 Smart URL Builder
        let url = `http://localhost:5000/api/places`;
        
        // Agar search ya filter hai, toh query params banao
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (filterType) params.append('type', filterType);
        
        // Agar params hain toh URL mein jodo (e.g., ?type=hidden)
        if (params.toString()) url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        
        setPlaces(data);

        // 🪄 Magic Redirect (Sirf Search ke time, Filter ke time nahi)
        if (searchQuery && data.length === 1 && !filterType) {
          navigate(`/place/${data[0]._id}`, { replace: true });
        }

      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [searchParams, navigate]); // ✅ Jab bhi URL badle, data reload karo

  // 🔘 Filter Toggle Logic
  const toggleFilter = () => {
    if (filterType === 'hidden') {
      // Agar pehle se laga hai, toh hata do
      setSearchParams(searchQuery ? { search: searchQuery } : {});
    } else {
      // Agar nahi laga, toh laga do (Hidden Gems Only)
      const newParams = { type: 'hidden' };
      if (searchQuery) newParams.search = searchQuery; // Search mat udao
      setSearchParams(newParams);
    }
  };

  if (loading) return <div className="text-center py-20 text-xl">Dhoond raha hoon... 🕵️‍♂️</div>;

  return (
    <div className="pt-24 pb-10 min-h-screen px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : "Discover Places"}
          </h1>
          <p className="text-gray-400">
            {searchQuery ? "Ye lo bhai, tumhara search result 🍽️" : "Explore India's hidden gems and popular spots"}
          </p>
        </div>
        
        {/* 🔘 Functional Filter Button */}
        <button 
          onClick={toggleFilter}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition shadow-lg border border-white/10
            ${filterType === 'hidden' 
              ? 'bg-purple-600 text-white hover:bg-purple-700'  // Active State
              : 'glass text-gray-300 hover:bg-white/10'        // Inactive State
            }`}
        >
          {filterType === 'hidden' ? <X size={18} /> : <Filter size={18} />}
          {filterType === 'hidden' ? "Show All" : "Hidden Gems Only"}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.length > 0 ? (
          places.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <h2 className="text-2xl font-bold text-gray-500">Kuch nahi mila bhai 😅</h2>
            <p className="text-gray-600">Filter hata ke try kar ya kuch aur search kar.</p>
            {/* Reset Button for Empty State */}
            {(searchQuery || filterType) && (
              <button 
                onClick={() => setSearchParams({})}
                className="mt-4 text-purple-400 hover:underline"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;