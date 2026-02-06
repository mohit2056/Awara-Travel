import React from 'react';
import { MapPin, Music, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  return (
    <Link to={`/place/${place._id}`} className="block glass rounded-xl overflow-hidden hover:scale-105 transition duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={place.images[0]} 
          alt={place.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {/* Hidden Gem Badge */}
        {place.isHiddenGem && (
          <span className="absolute top-2 right-2 bg-purple-600 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            💎 Hidden Gem
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold truncate">{place.name}</h3>
          <span className="text-sm bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
            <IndianRupee size={14} /> {place.avgCost}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
          <MapPin size={14} /> {place.location}
        </p>

        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
          {place.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {place.moodTags.map((tag, index) => (
            <span key={index} className="text-xs border border-white/20 px-2 py-1 rounded-full text-purple-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;