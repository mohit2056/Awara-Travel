import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import PageTransition from '../components/PageTransition'; 
import { API_BASE_URL } from '../config'; // ✅ Sahi hai!

// ✅ SLIDESHOW LOGIC
const backgroundImages = Array.from({ length: 26 }, (_, i) => `/login-bg/${i + 1}.jpg`);

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Slideshow State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Preload Images
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, []);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 👇 Galti Sudhar Di: '/login' ki jagah '/' (ya '/register') hoga
      // Standard backend mein 'POST /api/users' naya user banata hai.
      const res = await fetch(`${API_BASE_URL}/api/users`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden bg-black">
        
        {/* 🖼️ DYNAMIC BACKGROUND SLIDESHOW */}
        {backgroundImages.map((img, index) => (
          <img 
            key={index}
            src={img}
            alt="Travel Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* 🌑 Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Form Card */}
        <div className="glass p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl relative z-20 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-2 text-white">Join the Tribe ⛺</h2>
          <p className="text-center text-yellow-400 mb-8">Let's Become Awara</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-purple-400" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Your Name (Username)"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-purple-500 transition placeholder-gray-400"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-purple-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-purple-500 transition placeholder-gray-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-purple-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (Strong Password)"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none focus:border-purple-500 transition placeholder-gray-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-green-500 hover:text-green-400 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-lg transition transform hover:-translate-y-1 shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;