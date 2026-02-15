import React from 'react';
import Lottie from 'lottie-react';
// अपनी फाइल का सही नाम और पाथ यहाँ चेक कर लेना
import animationData from '../assets/loading.json'; 

const Preloader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 z-50 fixed inset-0">
      
      {/* Animation Container - साइज बढ़ा दिया है */}
      <div className="w-80 h-80 md:w-125 md:h-125 flex items-center justify-center relative">
        <Lottie 
            animationData={animationData} 
            loop={true} 
            autoplay={true} 
            style={{ 
                width: '100%', 
                height: '100%',
                /* 
                   👇 ये लाइन बैकग्राउंड के कोनों को गोल काट देगी जिससे 
                   वो अजीब सा डब्बा नहीं दिखेगा और स्क्रीन पर अच्छा लगेगा।
                */
                clipPath: 'circle(40%)', 
                transform: 'scale(1.2)' // एनीमेशन को और बड़ा दिखाने के लिए
            }} 
        />
      </div>

      {/* Cool Text - एनीमेशन के नीचे सही जगह पर */}
      <p className="text-gray-400 text-xl md:text-2xl font-medium animate-pulse -mt-10 tracking-widest">
        Packing bags... 🎒
      </p>
    </div>
  );
};

export default Preloader;
