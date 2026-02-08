import React, { createContext, useState, useEffect } from 'react';

// 1. Context Create karo (Ye humara Global Store hai)
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 2. App start hote hi check karo: Kya user pehle se logged in hai?
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  // 3. Login Function (Jab user email/pass daale)
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData)); // Browser mein save karo
    setUser(userData); // State update karo
  };

  // 4. Logout Function
  const logout = () => {
    localStorage.removeItem('userInfo'); // Browser se hatao
    setUser(null); // State khali karo
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};