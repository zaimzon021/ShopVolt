'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if admin is logged in on mount
    if (typeof window !== 'undefined') {
      const storedAdmin = localStorage.getItem('admin');
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin));
        } catch (error) {
          console.error('Failed to parse stored admin:', error);
          localStorage.removeItem('admin');
        }
      }
    }
    setLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      console.log('Attempting admin login...');
      const response = await fetch('http://localhost:3001/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      console.log('Login response status:', response.status);
      
      let data;
      try {
        data = await response.json();
        console.log('Login response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        // Handle different error formats
        const errorMessage = data.message || data.error || 'Admin login failed';
        throw new Error(errorMessage);
      }
      
      // Store admin data (adjust based on your backend response structure)
      const adminData = data.admin || data.user || data;
      
      if (!adminData || !adminData.email) {
        throw new Error('Invalid admin data received from server');
      }
      
      setAdmin(adminData);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin', JSON.stringify(adminData));
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
        }
      }
      
      console.log('Admin login successful');
      return { success: true };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logoutAdmin = () => {
    setAdmin(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
    }
  };

  // Don't render children until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <AdminContext.Provider value={{ admin: null, loginAdmin, logoutAdmin, loading: true }}>
        {children}
      </AdminContext.Provider>
    );
  }

  return (
    <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
