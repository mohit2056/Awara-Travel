import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, DollarSign, Image as ImageIcon, Star, Globe, Utensils, UploadCloud } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { API_BASE_URL } from '../config'; // 👈 1. IMPORT ADDED

const AddPlace = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    price: '',
    image: '', // This will store the Cloudinary URL
    lat: '',
    lng: '',
    food: '',
    isHiddenGem: false
  });
  
  const [uploading, setUploading] = useState(false); // To show loading spinner during upload
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 📤 NEW: Handle Image File Selection & Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      // 1. Send file to Backend (which sends to Cloudinary)
      // 👇 2. CHANGE: Localhost removed, API_BASE_URL added
      const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // 2. Get the secure URL from response
      setFormData(prev => ({ ...prev, image: res.data.url }));
      setUploading(false);
      setMessage('✅ Image Uploaded Successfully!');
    } catch (error) {
      console.error(error);
      setUploading(false);
      setMessage('❌ Image Upload Failed!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      setMessage('⚠️ Please upload an image first!');
      return;
    }

    try {
      // 👇 3. CHANGE: Localhost removed, API_BASE_URL added
      await axios.post(`${API_BASE_URL}/api/places`, formData);
      setMessage('✅ Place Added Successfully!');
      
      // Reset Form
      setFormData({
        title: '',
        location: '',
        description: '',
        price: '',
        image: '',
        lat: '',
        lng: '',
        food: '',
        isHiddenGem: false
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding place.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-900 flex justify-center text-white font-sans">
        <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
          
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" /> Admin: Add New Place
          </h2>

          {message && (
            <div className={`p-4 mb-6 rounded-xl text-center font-bold ${message.includes('Error') || message.includes('Failed') || message.includes('⚠️') ? 'bg-red-500/20 text-red-300 border border-red-500/50' : 'bg-green-500/20 text-green-300 border border-green-500/50'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Place Name</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required 
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="e.g. Hawa Mahal" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="Jaipur, Rajasthan" />
                </div>
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Latitude</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} required 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="26.9124" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Longitude</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} required 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="75.7873" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="Details regarding the vibe, history or experience..." />
            </div>

            {/* Food & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Famous Food</label>
                <div className="relative">
                  <Utensils className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="text" name="food" value={formData.food} onChange={handleChange} required 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="Dal Baati, Churma" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block font-medium">Budget (₹)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 pl-10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition" placeholder="5000" />
                </div>
              </div>
            </div>

            {/* 🖼️ NEW IMAGE UPLOAD SECTION */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">Upload Image</label>
              
              {/* If image uploaded, show preview */}
              {formData.image ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-purple-500/50 group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <p className="text-white font-bold">Change Image?</p>
                  </div>
                  <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </div>
              ) : (
                // Upload Box
                <div className="relative w-full h-32 bg-gray-900 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center hover:border-purple-500 hover:bg-gray-800 transition cursor-pointer">
                  {uploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  ) : (
                    <>
                      <UploadCloud className="text-gray-400 mb-2" size={32} />
                      <p className="text-gray-400 text-sm font-medium">Click to Upload Image</p>
                      <p className="text-gray-600 text-xs mt-1">JPG, PNG supported</p>
                    </>
                  )}
                  <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </div>
              )}
            </div>

            {/* Hidden Gem Checkbox */}
            <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition cursor-pointer" onClick={() => setFormData(prev => ({...prev, isHiddenGem: !prev.isHiddenGem}))}>
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${formData.isHiddenGem ? 'bg-purple-600 border-purple-600' : 'border-gray-500'}`}>
                 {formData.isHiddenGem && <Star size={14} className="text-white fill-white" />}
              </div>
              <label className="cursor-pointer select-none">
                <span className="block text-white font-bold">Is this a Hidden Gem? 💎</span>
                <span className="text-xs text-gray-400">Mark this if it's an offbeat or secret location.</span>
              </label>
            </div>

            <button type="submit" disabled={uploading} className={`w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-500 hover:to-pink-500'}`}>
              {uploading ? 'Uploading Image...' : 'Add to Database 🚀'}
            </button>

          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default AddPlace;