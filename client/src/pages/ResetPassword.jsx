import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Save } from 'lucide-react';
import axios from 'axios';
import PageTransition from '../components/PageTransition';

const ResetPassword = () => {
  const { id } = useParams(); // URL se User ID nikaalo
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Backend ko naya password bhejo
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${id}`, { password });
      setMessage(res.data.message);
      
      // 2 second baad Login page par bhej do
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md border border-gray-700 shadow-2xl">
          
          <h2 className="text-3xl font-bold text-center mb-6 text-purple-400">New Password 🔑</h2>
          
          {message && <div className="bg-green-500/20 text-green-300 p-3 rounded mb-4 text-center">{message}</div>}
          {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl py-3 pl-10 pr-10 text-white focus:outline-none focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? 'Updating...' : <><Save size={18} /> Update Password</>}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;