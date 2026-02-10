import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About'; 
import Home from './pages/Home';
import Discover from './pages/Discover';
import PlaceDetails from './pages/PlaceDetails';
import SonicPlayer from './components/SonicPlayer';
import Signup from './pages/Sigup';
import Login from './pages/Login';
import BlindTravel from './pages/BlindTravel';
import Dashboard from './pages/Dashboard';

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
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Blind-Travel" element={<BlindTravel />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;