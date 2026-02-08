import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // ✅ Routing ke liye
import { AuthProvider } from './context/AuthContext.jsx' // ✅ Auth ke liye

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>       {/* 1. Sabse bahar Router rakho */}
      <AuthProvider>      {/* 2. Uske andar AuthProvider */}
        <App />           {/* 3. Phir tumhara Main App */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)