import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(); // export қосылды

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const API_URL = "https://621a91c96fd2860b.mokky.dev"; // Өз Mokky ID-іңізді қойыңыз

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth`, credentials);
      setUser(data.data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      return { success: true };
    } catch (err) {
      return { success: false, message: "Қате: " + err.response?.data?.message };
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData);
      setUser(data.data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      return { success: true };
    } catch (err) {
      return { success: false, message: "Тіркелу қатесі" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);