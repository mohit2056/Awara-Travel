import React, { useState } from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react'; 
import { API_BASE_URL } from '../config'; // 👈 1. IMPORT ADD KIYA

const ReviewSection = ({ placeId, reviews, user, refreshPlace }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Edit mode tracking

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to write a review!");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      
      // 👇 2. CHANGE: Localhost hata kar API_BASE_URL lagaya
      const res = await fetch(`${API_BASE_URL}/api/places/${placeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (res.ok) {
        setMessage(isEditing ? 'Review Updated! 🔄' : 'Review Submitted! 🎉');
        setComment('');
        setRating(5);
        setIsEditing(false);
        refreshPlace(); // Page refresh karke naya data dikhayega
      } else {
        setMessage('Error submitting review.');
      }
    } catch (error) {
      setMessage('Server error.');
    }
  };

  // ✏️ EDIT FUNCTION: Form mein purana data bharega
  const handleEdit = (review) => {
    setRating(review.rating);
    setComment(review.comment);
    setIsEditing(true);
    setMessage('Edit Mode On: Niche update karein 👇');
  };

  return (
    <div className="mt-16 mb-20">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        🗣️ Public Opinion <span className="text-sm font-normal text-gray-400">({reviews.length} Reviews)</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        
        {/* 📝 LEFT: WRITE REVIEW FORM */}
        <div className="glass p-6 rounded-2xl border border-white/10 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
             {isEditing ? "Update Your Review ✏️" : "Write a Review ✍️"}
             {isEditing && (
               <button onClick={() => { setIsEditing(false); setComment(''); setRating(5); setMessage(''); }} className="text-xs text-red-400 border border-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition">
                 Cancel Edit
               </button>
             )}
          </h3>
          
          {message && <div className={`p-3 rounded mb-4 text-sm ${message.includes('Error') ? 'bg-red-500/20 text-red-200' : 'bg-purple-600/20 text-purple-200'}`}>{message}</div>}
          
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition transform hover:scale-110 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  >
                    <Star size={32} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Your Experience</label>
              <textarea
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition"
                rows="4"
                placeholder="What did you like?..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className={`w-full font-bold py-3 rounded-lg transition ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}>
              {isEditing ? 'Update Review 🔄' : 'Submit Review 🚀'}
            </button>
          </form>
        </div>

        {/* 📜 RIGHT: REVIEWS LIST */}
        <div className="space-y-4 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
          {reviews.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No reviews yet. Be the first one! 🥇
            </div>
          )}
          
          {reviews.map((review) => {
            // Check agar ye review current logged-in user ka hai
            const isMyReview = user && (review.user === user._id || review.name === user.username);

            return (
              <div key={review._id} className={`p-4 rounded-xl border transition ${isMyReview ? 'bg-purple-900/20 border-purple-500/50' : 'bg-white/5 border-white/5'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white flex items-center gap-2">
                        {review.name} 
                        {isMyReview && <span className="text-[10px] bg-purple-500 text-white px-1.5 rounded">YOU</span>}
                      </h4>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400" : "text-gray-700"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500">{review.createdAt.substring(0, 10)}</span>
                    
                    {/* ✏️ EDIT BUTTON (Sirf apne review par dikhega) */}
                    {isMyReview && (
                      <button 
                        onClick={() => handleEdit(review)}
                        className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 transition bg-blue-500/10 px-2 py-1 rounded border border-blue-500/30"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm pl-13 leading-relaxed">{review.comment}</p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ReviewSection;