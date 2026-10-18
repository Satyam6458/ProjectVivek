import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shree_dhaan_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('shree_dhaan_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify stored session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('shree_dhaan_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.auth.getUserDetails();
        if (response && response.success && response.data) {
          setUser(response.data);
          localStorage.setItem('shree_dhaan_user', JSON.stringify(response.data));
        } else {
          // If token verification returned unexpected format
          logout();
        }
      } catch (err) {
        console.warn('[Auth] Session token invalid or expired. Resetting session.', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Sign In User or Admin
   * @param {Object} credentials - { email, password }
   * @param {string} [expectedRole] - Optional role requirement ('admin' or 'user')
   */
  const login = async ({ email, password }, expectedRole = null) => {
    const response = await api.auth.signin({ email, password });
    
    if (!response.success || !response.token || !response.data) {
      throw new Error(response.message || 'Login failed. Please check credentials.');
    }

    const userData = response.data;
    const userToken = response.token;

    // Role enforcement if specified (e.g., admin portal requires role === 'admin')
    if (expectedRole && userData.role !== expectedRole) {
      if (expectedRole === 'admin') {
        throw new Error(`Access Denied: Account '${userData.email}' does not have Administrator privileges. Please use the Customer Login.`);
      } else if (expectedRole === 'user' && userData.role === 'admin') {
        // Admin logging in via customer portal: allow or inform
      }
    }

    // Persist session
    localStorage.setItem('shree_dhaan_token', userToken);
    localStorage.setItem('shree_dhaan_user', JSON.stringify(userData));

    setToken(userToken);
    setUser(userData);

    return response;
  };

  /**
   * Register a new account
   * @param {Object} signupData - { name, email, phone, password, role: 'user'|'admin' }
   */
  const signup = async ({ name, email, phone, password, role = 'user' }) => {
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      role: role.toLowerCase().trim(),
    };

    const response = await api.auth.signup(payload);

    if (!response.success || !response.token || !response.data) {
      throw new Error(response.message || 'Registration failed. Please try again.');
    }

    const userData = response.data;
    const userToken = response.token;

    // Persist session
    localStorage.setItem('shree_dhaan_token', userToken);
    localStorage.setItem('shree_dhaan_user', JSON.stringify(userData));

    setToken(userToken);
    setUser(userData);

    return response;
  };

  /**
   * Logout user and clear tokens
   */
  const logout = () => {
    localStorage.removeItem('shree_dhaan_token');
    localStorage.removeItem('shree_dhaan_user');
    setToken(null);
    setUser(null);
  };

  /**
   * Refresh current user details from API
   */
  const refreshUser = async () => {
    try {
      const response = await api.auth.getUserDetails();
      if (response?.data) {
        setUser(response.data);
        localStorage.setItem('shree_dhaan_user', JSON.stringify(response.data));
      }
    } catch (err) {
      console.error('[Auth] Failed to refresh user profile:', err);
    }
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: Boolean(token && user),
    isAdmin: user?.role === 'admin',
    loading,
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
