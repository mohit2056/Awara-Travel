import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import PlaceDetails from './pages/PlaceDetails';
import SonicPlayer from './components/SonicPlayer';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/sonic-player" element={<SonicPlayer />} /> {/* 🎵 Test Route for Sonic Player */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;