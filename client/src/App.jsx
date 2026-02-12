import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReloadPrompt from './components/ReloadPrompt'; // ✅ Global Component

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import PlaceDetails from './pages/PlaceDetails';
import About from './pages/About';
import SonicPlayer from './components/SonicPlayer';
import Signup from './pages/Signup'; // (Maine spelling 'Sigup' se 'Signup' kar di hai check kar lena)
import Login from './pages/Login';
import BlindTravel from './pages/BlindTravel';
import Dashboard from './pages/Dashboard';
import Wishlist from './pages/Wishlist'; // ✅ Wishlist Route Add kar diya

function App() {
  const location = useLocation(); // 👈 Animation ke liye ye zaroori hai

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* ✅ ReloadPrompt yahan aayega (Routes ke bahar) taaki har page par kaam kare */}
      <ReloadPrompt />

      <main className="grow relative"> {/* Relative zaroori hai animation overflow rokne ke liye */}
        
        {/* 👇 Animation Wrapper */}
        <AnimatePresence mode="wait">
          {/* 👇 Location aur Key add kiya taaki React ko pata chale page change hua hai */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            <Route path="/sonic-player" element={<SonicPlayer />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blind-travel" element={<BlindTravel />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Wishlist" element={<Wishlist />} /> {/* ✅ Missing route added */}
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;