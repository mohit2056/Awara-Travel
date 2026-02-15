import React, { lazy, Suspense } from 'react'; // ✅ Import Fixed
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReloadPrompt from './components/ReloadPrompt';

// 👇 Pages ko Lazy Import kiya (Performance ke liye Best)
const Home = lazy(() => import('./pages/Home'));
const Discover = lazy(() => import('./pages/Discover'));
const PlaceDetails = lazy(() => import('./pages/PlaceDetails'));
const About = lazy(() => import('./pages/About'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const BlindTravel = lazy(() => import('./pages/BlindTravel'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const AddPlace = lazy(() => import('./pages/AddPlace'));

// 👇 Loading Spinner (Jab tak naya page load ho raha hai)
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Global Reload Prompt for PWA Updates */}
      <ReloadPrompt />

      <main className="grow relative">
        {/* 👇 AnimatePresence Page Transition ke liye */}
        <AnimatePresence mode="wait">
          
          {/* 👇 Suspense Zaroori hai Lazy Loading ke liye */}
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/place/:id" element={<PlaceDetails />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/add" element={<AddPlace />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:id" element={<ResetPassword />} />
              <Route path="/blind-travel" element={<BlindTravel />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </Suspense>

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;