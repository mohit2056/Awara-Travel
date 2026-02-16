import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import axios from 'axios';
import PageTransition from '../components/PageTransition';
import { API_BASE_URL } from '../config'; // 👈 1. IMPORT ADD KIYA

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // 👇 2. CHANGE: Localhost hata kar API_BASE_URL lagaya
      // Hum email bhej rahe hain LIVE backend ko
      const res = await axios.post(`${API_BASE_URL}/api/users/forgot-password`, { email });
      
      // Agar sab sahi raha:
      setMessage(res.data.message); 
      
    } catch (err) {
      // Agar error aaya (e.g., User nahi mila)
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d8e5b5a4570b?q=80&w=2070&auto=format&fit=crop')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        <div className="glass p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl relative z-10 backdrop-blur-md">
          
          <Link to="/login" className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition">
            <ArrowLeft size={18} /> Back to Login
          </Link>

          <h2 className="text-3xl font-bold text-center mb-2 text-white">Forgot Password? 🔒</h2>
          <p className="text-center text-gray-400 mb-8">
            Don't worry, happens to the best of us. <br/> Enter your email to reset it.
          </p>

          {/* ✅ Success Message */}
          {message && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-6 text-sm text-center animate-pulse">
              {message}
            </div>
          )}

          {/* ❌ Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-purple-400" size={20} />
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-purple-500 transition placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full font-bold py-3 rounded-xl transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 
                ${loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                }`}
            >
              {loading ? (
                <>Sending...</>
              ) : (
                <><Send size={18} /> Send Reset Link</>
              )}
            </button>
          </form>

        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;