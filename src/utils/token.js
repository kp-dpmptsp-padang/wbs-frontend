// src/utils/token.js
const TOKEN_KEY = 'wbs_token';
const REFRESH_TOKEN_KEY = 'wbs_refresh_token';
const USER_KEY = 'wbs_user';

// Set tokens and user data to localStorage
// src/utils/token.js - Pastikan fungsi setAuthData berfungsi dengan benar
export const setAuthData = (token, refreshToken, user) => {
  console.log('Saving auth data:', { token, refreshToken, user });
  
  if (!token || !user) {
    console.error('Missing required auth data:', { token, user });
    return false;
  }
  
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return true;
};

// Get access token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Get refresh token from localStorage
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Get user data from localStorage
// src/utils/token.js - perbaiki fungsi getUser
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  // Return null jika userStr tidak ada atau undefined
  if (!userStr) return null;
  
  try {
    // Parse userStr dengan aman, gunakan try/catch untuk menangani kemungkinan format JSON yang tidak valid
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    // Jika parsing gagal, hapus key tersebut dari localStorage
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

// Remove tokens and user data from localStorage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getToken() !== null;
};