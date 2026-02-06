import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

const SonicPlayer = ({ src, placeName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // 🎵 Play/Pause Logic
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 🔇 Mute/Unmute Logic
  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // ⚠️ Browser Policy: Auto-play aksar block hota hai, isliye hum user interaction ka wait karte hain
  // Lekin hum volume ko thoda kam karke start karenge
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 50% Volume
    }
  }, []);

  if (!src) return null; // Agar music URL nahi hai toh player mat dikhao

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-4 border border-white/20 shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-bounce-in">
        
        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={src} loop />

        {/* Icon & Info */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-white/10 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music size={18} className="text-purple-300" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-purple-200 uppercase tracking-wider">Now Vibe-ing to</p>
            <p className="text-sm font-bold text-white">{placeName} Ambience</p>
          </div>
        </div>

        {/* Controls Divider */}
        <div className="h-8 w-px bg-white/10 mx-2"></div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={togglePlay}
            className="bg-white text-purple-900 p-3 rounded-full hover:scale-110 transition shadow-lg"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>

          <button onClick={toggleMute} className="text-gray-300 hover:text-white transition">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SonicPlayer;