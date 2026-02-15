// client/src/config.js

// 👇 1. Isko 'true' kar de. Ab hum Live Server use karenge!
const isProduction = true; 

// 👇 2. Yahan apna sahi Render wala link daal (Last mein '/' mat lagana)
const productionURL = "https://awara-travel.onrender.com"; 

export const API_BASE_URL = isProduction 
  ? productionURL 
  : "http://localhost:5000";