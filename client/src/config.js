// client/src/config.js

// Jab deploy karenge, tab isko 'true' kar denge
const isProduction = false; 

// Jab backend live ho jayega, uska URL yahan daalenge
const productionURL = "https://tera-backend-app.onrender.com"; 

export const API_BASE_URL = isProduction 
  ? productionURL 
  : "http://localhost:5000";