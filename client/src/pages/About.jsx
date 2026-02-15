import React from 'react';
import { Users, Heart, Compass, Globe, Map } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        
        {/* 🌟 SECTION 1: HERO (Video/Image Background) */}
        <div className="relative h-screen flex items-center justify-center text-center px-4">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop" 
              alt="Travel Vibe" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black"></div>
          </div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 drop-shadow-2xl animate-fade-in-up">
              We Are Awara
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 font-light italic mb-8">
              "We don't belong in cities. We thrive on the open road." 🌍
            </p>
          </div>
          
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 animate-bounce text-gray-400">
            <p className="text-sm tracking-widest uppercase">Scroll to Explore</p>
            <div className="w-0.5 h-16 bg-gray-500 mx-auto mt-2"></div>
          </div>
        </div>

        {/* 🌟 SECTION 2: OUR MISSION (Glass Cards) */}
        <div className="relative py-24 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Card 1 */}
            <div className="group relative bg-gray-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition duration-500 hover:-translate-y-2">
              <div className="absolute -top-6 left-8 bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-white group-hover:text-purple-400 transition">Global Tribe</h3>
              <p className="text-gray-400 leading-relaxed">
                Awara is more than an app; it's a movement. Connect with explorers who speak the language of adventure.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gray-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition duration-500 hover:-translate-y-2">
              <div className="absolute -top-6 left-8 bg-pink-600 p-4 rounded-2xl shadow-lg shadow-pink-500/30 group-hover:scale-110 transition">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-white group-hover:text-pink-400 transition">Pure Passion</h3>
              <p className="text-gray-400 leading-relaxed">
                We live for the hidden gems Google Maps misses. The true essence of travel lies in the thrill of the unknown.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gray-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-yellow-500/50 transition duration-500 hover:-translate-y-2">
              <div className="absolute -top-6 left-8 bg-yellow-500 p-4 rounded-2xl shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition">
                <Compass size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-white group-hover:text-yellow-400 transition">Blind Adventure</h3>
              <p className="text-gray-400 leading-relaxed">
                Push beyond your comfort zone. Our 'Blind Travel' feature lets fate decide your next destination.
              </p>
            </div>

          </div>
        </div>

        {/* 🌟 SECTION 3: STORY IMAGE + TEXT */}
        <div className="py-24 px-4 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1887&auto=format&fit=crop" 
                alt="Journey" 
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-700 w-full h-125 object-cover"
              />
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2">
              <h2 className="text-5xl font-bold mb-6 text-white">
                Not Just a Trip, <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">It's a Reset.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                Modern life is chaotic. We built Awara to help you disconnect from the noise and reconnect with yourself. 
                Whether it's a quiet mountain village or a hidden beach, we find the places that heal the soul.
              </p>
              
              <div className="flex gap-8 mt-8">
                <div className="text-center">
                  <h4 className="text-4xl font-bold text-white">50+</h4>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mt-2">Hidden Gems</p>
                </div>
                <div className="text-center">
                  <h4 className="text-4xl font-bold text-white">10k+</h4>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mt-2">Happy Travelers</p>
                </div>
                <div className="text-center">
                  <h4 className="text-4xl font-bold text-white">∞</h4>
                  <p className="text-gray-500 text-sm uppercase tracking-wider mt-2">Memories</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 🌟 SECTION 4: CALL TO ACTION */}
        <div className="relative py-32 text-center px-4">
          <div className="absolute inset-0 z-0">
             <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
              alt="Footer BG"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to get lost?</h2>
            <button className="bg-white text-black text-xl font-bold px-10 py-4 rounded-full hover:bg-yellow-400 transition transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3 mx-auto">
              <Map size={24} /> Start Your Journey
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default About;