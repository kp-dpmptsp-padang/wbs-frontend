// src/services/api.js
import axios from 'axios';
import { getToken, getRefreshToken, setAuthData, removeToken, isTokenExpired } from '@/utils/token';
import authService from '@/services/auth.service';

// Flag untuk mencegah multiple refresh token requests
let isRefreshing = false;
// Antrian request yang perlu diulang setelah token di-refresh
let failedQueue = [];

// Proses antrian failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    // 'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Jika endpoint yang dipanggil adalah refresh token dan gagal, logout
    if (originalRequest.url.includes('/auth/token') || originalRequest.url.includes('/auth/refresh')) {
      console.log('Refresh token request failed, logging out user');
      removeToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Jika sedang refresh, tambahkan request ke antrian
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        processQueue(new Error('No refresh token available'));
        removeToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      try {
        console.log('Attempting to refresh token');
        // Call refresh token API
        const response = await authService.refreshToken();
        
        if (!response.success) {
          throw new Error(response.error || 'Failed to refresh token');
        }
        
        const { access_token, refresh_token, user } = response.data;
        
        // Update tokens in localStorage
        setAuthData(access_token, refresh_token || getRefreshToken(), user);
        
        // Update authorization header for current request
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        
        // Process all queued requests
        processQueue(null, access_token);
        
        // Execute the original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        processQueue(refreshError);
        removeToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    // Handle other errors
    return Promise.reject(error);
  }
);

// Preemptive token refresh
export const preemptiveTokenRefresh = async () => {
  const token = getToken();
  
  if (token && isTokenExpired(token)) {
    console.log('Token is expired or about to expire, refreshing...');
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      console.error('No refresh token available');
      removeToken();
      window.location.href = '/login';
      return;
    }
    
    try {
      const response = await authService.refreshToken();
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to refresh token');
      }
      
      const { access_token, refresh_token } = response.data;
      
      // Update tokens in localStorage
      setAuthData(access_token, refresh_token || refreshToken);
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Preemptive token refresh failed:', error);
      removeToken();
      window.location.href = '/login';
    }
  }
};

export default api;