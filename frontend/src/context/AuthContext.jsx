/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { registerRequest, loginRequest, fetchCurrentUser } from '../api/authApi.js';
import { setDefaultAuthToken } from '../api/httpClient.js';

const STORAGE_KEY = 'mock_ecom_cart_token';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      setToken(storedToken);
      setDefaultAuthToken(storedToken);
      setStatus('loading');
      fetchCurrentUser()
        .then((currentUser) => {
          setUser(currentUser);
          setStatus('authenticated');
        })
        .catch(() => {
          window.localStorage.removeItem(STORAGE_KEY);
          setToken(null);
          setStatus('unauthenticated');
        });
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    if (token) {
      setDefaultAuthToken(token);
    }
  }, [token]);

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await registerRequest({ name, email, password });
      setToken(data.token);
      setUser(data.user);
      setStatus('authenticated');
      window.localStorage.setItem(STORAGE_KEY, data.token);
      toast.success('Account created successfully!');
      return data.user;
    } catch (error) {
      setStatus('unauthenticated');
      toast.error(error.message || 'Unable to register');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await loginRequest({ email, password });
      setToken(data.token);
      setUser(data.user);
      setStatus('authenticated');
      window.localStorage.setItem(STORAGE_KEY, data.token);
      toast.success('Welcome back!');
      return data.user;
    } catch (error) {
      setStatus('unauthenticated');
      toast.error(error.message || 'Unable to login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setStatus('unauthenticated');
    window.localStorage.removeItem(STORAGE_KEY);
    setDefaultAuthToken(null);
  };

  const refreshUser = async () => {
    if (!token) return null;
    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      setStatus('authenticated');
      return currentUser;
    } catch (error) {
      console.error('Failed to refresh user', error);
      logout();
      return null;
    }
  };

  const value = {
    token,
    user,
    status,
    loading,
    isAuthenticated: status === 'authenticated',
    register,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

