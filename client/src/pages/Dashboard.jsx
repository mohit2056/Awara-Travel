import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Frown, User, Globe, Trash2, NotebookPen, X, Save } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trips');
  
  // 📝 Note Modal State
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [savingNote, setSavingNote] = useState(false);

  // Fetch Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        const res = await fetch('http://localhost:5000/api/users/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchWishlist();
  }, [user]);

  // Remove from Wishlist
  const removeFromWishlist = async (e, placeId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const res = await fetch('http://localhost:5000/api/users/wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ placeId }),
      });
      if (res.ok) {
        // Filter logic updated to handle object structure
        setWishlist(wishlist.filter(item => item.place && item.place._id !== placeId));
      }
    } catch (error) { console.error("Remove failed", error); }
  };

  // 📝 Open Note Modal
  const openNoteModal = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!item.place) return;
    setCurrentPlaceId(item.place._id);
    setCurrentNote(item.note || '');
    setIsNoteOpen(true);
  };

  // 💾 Save Note Function
  const handleSaveNote = async () => {
    setSavingNote(true);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const res = await fetch('http://localhost:5000/api/users/wishlist/note', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ placeId: currentPlaceId, note: currentNote }),
      });

      if (res.ok) {
        // Local State Update
        const updatedList = wishlist.map(item => 
            (item.place && item.place._id === currentPlaceId) ? { ...item, note: currentNote } : item
        );
        setWishlist(updatedList);
        setIsNoteOpen(false);
      }
    } catch (error) {
      console.error("Note save failed", error);
    } finally {
      setSavingNote(false);
    }
  };

  if (!user) return <div className="text-center py-20 text-white text-xl">Login to access your den. 🔒</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      
      {/* 🖼️ HERO COVER SECTION */}
      <div className="relative h-64 md:h-80 w-full">
        <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Cover" 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
        
        <div className="absolute -bottom-16 left-4 md:left-10 flex items-end gap-6">
            <div className="h-32 w-32 rounded-full border-4 border-black overflow-hidden shadow-2xl bg-gray-800">
                <img 
                    src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mb-4">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                    {user.username} 
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">Explorer</span>
                </h1>
                <p className="text-gray-300 text-sm flex items-center gap-1 mt-1">
                    <Globe size={14} className="text-blue-400" /> Ready to conquer the world
                </p>
            </div>
        </div>
      </div>

      {/* 📊 STATS & TABS */}
      <div className="mt-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4 gap-4">
            <div className="flex gap-6">
                <button onClick={() => setActiveTab('trips')} className={`pb-4 text-lg font-medium transition relative ${activeTab === 'trips' ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}>
                    Bucket List ✈️
                    {activeTab === 'trips' && <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-t-full"></span>}
                </button>
                <button onClick={() => setActiveTab('reviews')} className={`pb-4 text-lg font-medium transition relative ${activeTab === 'reviews' ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}>
                    My Reviews ✍️
                    {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-t-full"></span>}
                </button>
            </div>
        </div>

        {/* 🗂️ CONTENT AREA */}
        <div className="mt-8">
            {activeTab === 'trips' ? (
                loading ? (
                    <div className="text-center py-20 text-gray-500 animate-pulse">Loading your dreams... 🌍</div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                        <Frown size={64} className="mx-auto text-gray-600 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">Your wishlist is empty!</h3>
                        <Link to="/discover" className="bg-linear-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-bold text-white mt-4 inline-block">Start Exploring 🚀</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlist.map((item) => {
                            // 🛡️ SAFETY CHECK: Agar data kharab hai ya place delete ho gayi hai, toh skip karo
                            if (!item || !item.place) return null;

                            return (
                                <Link key={item.place._id} to={`/place/${item.place._id}`} className="group relative block rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-purple-500/50 transition transform hover:-translate-y-2 bg-gray-900">
                                    
                                    {/* Image */}
                                    <div className="h-56 overflow-hidden relative">
                                        <img src={item.place.images[0]} alt={item.place.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                                        
                                        {/* Action Buttons */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                            <button 
                                                onClick={(e) => openNoteModal(e, item)}
                                                className="bg-blue-500/20 text-blue-400 p-2 rounded-full border border-blue-500/50 hover:bg-blue-500 hover:text-white transition"
                                                title="Plan & Notes"
                                            >
                                                <NotebookPen size={18} />
                                            </button>
                                            <button 
                                                onClick={(e) => removeFromWishlist(e, item.place._id)}
                                                className="bg-red-500/20 text-red-400 p-2 rounded-full border border-red-500/50 hover:bg-red-500 hover:text-white transition"
                                                title="Remove"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition">{item.place.name}</h3>
                                        <p className="text-gray-300 text-sm flex items-center gap-1 mb-4">
                                            <MapPin size={14} className="text-purple-400" /> {item.place.location}
                                        </p>
                                        
                                        {/* 📝 Note Preview Area */}
                                        <div className="bg-white/5 p-3 rounded-lg border border-white/5 min-h-15">
                                            {item.note ? (
                                                <p className="text-sm text-gray-300 italic line-clamp-2">" {item.note} "</p>
                                            ) : (
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <NotebookPen size={12} /> No plans yet. Click to add.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-gray-400">Reviews fetching from the multiverse... 🚧</p>
                </div>
            )}
        </div>
      </div>

      {/* 📝 NOTE MODAL POPUP */}
      {isNoteOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-gray-900 w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
                
                {/* Header */}
                <div className="bg-linear-to-r from-purple-900/50 to-pink-900/50 p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <NotebookPen className="text-yellow-400" /> Trip Planner
                    </h3>
                    <button onClick={() => setIsNoteOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <label className="block text-gray-400 text-sm mb-2">My Plans for this trip:</label>
                    <textarea 
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        className="w-full h-40 bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none resize-none placeholder-gray-600"
                        placeholder="e.g. Visit in December, Stay at Zostel, Don't forget camera..."
                    ></textarea>

                    <div className="mt-6 flex justify-end gap-3">
                        <button 
                            onClick={() => setIsNoteOpen(false)} 
                            className="px-4 py-2 text-gray-400 hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveNote}
                            disabled={savingNote}
                            className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition flex items-center gap-2"
                        >
                            {savingNote ? 'Saving...' : <><Save size={18} /> Save Note</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;