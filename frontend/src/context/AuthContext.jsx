import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const profile = await api.getProfile();
          setUser(profile);
        } catch {
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = await api.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      throw new Error(err.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const parts = (name || '').trim().split(/\s+/);
      const firstName = parts[0] || 'User';
      const lastName = parts.slice(1).join(' ') || 'Name';
      const registeredUser = await api.register(firstName, lastName, email, password);
      setUser(registeredUser);
      return registeredUser;
    } catch (err) {
      throw new Error(err.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const updateProfile = (updatedData) => {
    setUser(prev => {
      const next = { ...prev, ...updatedData };
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated: !!user, isAdmin: user?.role === 'admin', loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
