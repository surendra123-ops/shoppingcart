import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

httpClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.response.statusText;
      error.message = message;
    }
    return Promise.reject(error);
  }
);

export const setDefaultAuthToken = (token) => {
  setAuthToken(token);
};

