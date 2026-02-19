import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ExternalLink } from 'lucide-react';

// Leaflet Icon Fix (Zaroori hai warna marker nahi dikhega)
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
  // 🛡️ Safety: Agar database mein lat/lng nahi hai toh crash hone se bachayega
  if (!coordinates || !coordinates.lat || !coordinates.lng) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900 text-gray-500 rounded-2xl border border-white/10">
        📍 Map coordinates not available
      </div>
    );
  }

  // ✅ BUG FIXED: Ekdum Sahi Google Maps URL (Direct exact location khulega)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 z-0 relative group">
      <MapContainer 
        center={[coordinates.lat, coordinates.lng]} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup className="custom-popup">
            <div className="text-center p-1">
              <h3 className="font-bold text-gray-800 text-lg mb-2">{name}</h3>
              
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

      {/* 🟢 Premium Overlay Button (Map ke upar chamkega) */}
      <a 
        href={googleMapsUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-[400] bg-white text-gray-900 px-4 py-2 rounded-xl shadow-2xl font-bold flex items-center gap-2 hover:bg-gray-100 hover:scale-105 transition-transform text-sm border border-gray-200"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" alt="GMap" className="w-5 h-5" />
        Open in Maps
      </a>
    </div>
  );
};

export default PlaceMap;