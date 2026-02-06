import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ExternalLink } from 'lucide-react'; // 🆕 Icon add kiya

// Icon Fix (Same as before)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const PlaceMap = ({ coordinates, name }) => {
  if (!coordinates) return null;

  // 🌍 Google Maps Link Generator
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

  return (
    <div className="h-100 w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 relative">
      <MapContainer 
        center={[coordinates.lat, coordinates.lng]} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup className="custom-popup">
            <div className="text-center p-1">
              <h3 className="font-bold text-gray-800 text-lg mb-2">{name}</h3>
              
              {/* 🚀 Feature: Get Directions Button */}
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-full transition shadow-md no-underline"
              >
                Get Directions <ExternalLink size={12} />
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* 🟢 Overlay Button (Map ke upar bhi dikhega) */}
      <a 
        href={googleMapsUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-400 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition text-sm"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="GMap" className="w-5 h-5" />
        Open in Google Maps
      </a>
    </div>
  );
};

export default PlaceMap;