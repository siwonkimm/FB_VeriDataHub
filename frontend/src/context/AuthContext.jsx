import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Login handler connecting to Spring Boot backend http://54.206.127.84:8080/api/auth/login
  const login = async (credentials) => {
    try {
      // Attempting backend API call
      const response = await apiClient.post('/api/auth/login', credentials);
      const userData = response.user || {
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'Data Scientist',
        trustScore: 85,
        trustLevel: 'Lv.3 검증위원',
      };
      const token = response.token || 'mock-jwt-token-veridata-2026';

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      closeAuthModal();
      return { success: true };
    } catch (error) {
      console.info('Backend auth endpoint unreachable, fallback to simulated login.', error);
      // Fallback mock login for demonstration
      const mockUser = {
        email: credentials.email,
        name: credentials.email.split('@')[0] || '연구원',
        role: '데이터 연구원',
        trustScore: 88,
        trustLevel: 'Lv.4 고급검증원',
      };
      localStorage.setItem('token', 'mock-jwt-token-demo');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      closeAuthModal();
      return { success: true };
    }
  };

  // Signup handler connecting to Spring Boot backend http://54.206.127.84:8080/api/auth/signup
  const signup = async (formData) => {
    try {
      const response = await apiClient.post('/api/auth/signup', formData);
      const mockUser = {
        email: formData.email,
        name: formData.name,
        role: formData.role || 'Data Analyst',
        trustScore: 50,
        trustLevel: 'Lv.1 신규검증원',
      };
      localStorage.setItem('token', response.token || 'mock-jwt-token-new');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      closeAuthModal();
      return { success: true };
    } catch (error) {
      console.info('Backend signup endpoint unreachable, using local registration fallback.');
      const mockUser = {
        email: formData.email,
        name: formData.name,
        role: formData.role || '데이터 분석가',
        trustScore: 50,
        trustLevel: 'Lv.1 신규검증원',
      };
      localStorage.setItem('token', 'mock-jwt-token-new');
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      closeAuthModal();
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    const newUser = { ...user, ...updatedFields };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUserProfile,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openLogin,
        openSignup,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
