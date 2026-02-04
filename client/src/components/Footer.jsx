import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass mt-auto py-6 text-center text-gray-400">
      <p className="flex items-center justify-center gap-2">
        Made for the <span className="text-white font-semibold">Lost Souls</span> 
        <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
        by Awara Team
      </p>
    </footer>
  );
};

export default Footer;