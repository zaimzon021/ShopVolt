'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      setUser(data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
        // Store individual fields for easy access
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const data = await authAPI.signup(name, email, password);
      setUser(data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
        // Store individual fields for easy access
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Call logout API to update lastLogoutAt
      if (user && user.id) {
        await fetch('http://localhost:3001/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      // Clear cart and wishlist
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
    }
  };

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, login, signup, logout, loading: true }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
