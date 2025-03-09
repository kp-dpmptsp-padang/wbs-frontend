// src/utils/token.js
const TOKEN_KEY = 'wbs_token';
const REFRESH_TOKEN_KEY = 'wbs_refresh_token';
const USER_KEY = 'wbs_user';
const RESET_TOKEN_KEY = 'wbs_reset_token';

/**
 * Menyimpan data autentikasi ke localStorage
 * @param {string} token - Access token
 * @param {string} refreshToken - Refresh token
 * @param {object} userData - Data user
 * @returns {boolean} - true jika berhasil disimpan
 */
export const setAuthData = (token, refreshToken, userData) => {
  if (!token || !userData) {
    console.error('Missing required auth data:', { token, userData });
    return false;
  }
  
  try {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving auth data:', error);
    return false;
  }
};

/**
 * Mengambil access token dari localStorage
 * @returns {string|null} - Access token atau null jika tidak ada
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Mengambil refresh token dari localStorage
 * @returns {string|null} - Refresh token atau null jika tidak ada
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Menyimpan reset token ke localStorage
 * @param {string} token - Reset password token
 */
export const setResetToken = (token) => {
  localStorage.setItem(RESET_TOKEN_KEY, token);
};

/**
 * Mengambil reset token dari localStorage
 * @returns {string|null} - Reset token atau null jika tidak ada
 */
export const getResetToken = () => {
  return localStorage.getItem(RESET_TOKEN_KEY);
};

/**
 * Menghapus reset token dari localStorage
 */
export const removeResetToken = () => {
  localStorage.removeItem(RESET_TOKEN_KEY);
};

/**
 * Mengambil data user dari localStorage
 * @returns {object|null} - Data user atau null jika tidak ada
 */
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

/**
 * Memperbarui data user di localStorage
 * @param {object} userData - Data user baru
 * @returns {boolean} - true jika berhasil diperbarui
 */
export const updateUser = (userData) => {
  if (!userData) return false;
  
  try {
    const currentUser = getUser();
    if (!currentUser) return false;
    
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

/**
 * Menghapus semua data autentikasi dari localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(RESET_TOKEN_KEY);
};

/**
 * Memeriksa apakah user terautentikasi (token ada)
 * @returns {boolean} - true jika user terautentikasi
 */
export const isAuthenticated = () => {
  return getToken() !== null;
};

/**
 * Memeriksa apakah token sudah expired
 * @param {string} token - Token yang akan diperiksa
 * @returns {boolean} - true jika token expired
 */
// src/utils/token.js - perbarui fungsi isTokenExpired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Token JWT memiliki 3 bagian: header.payload.signature
    const base64Url = token.split('.')[1];
    if (!base64Url) return true;
    
    // Decode base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const { exp } = JSON.parse(jsonPayload);
    
    // Add buffer time (60 seconds) to refresh token before it expires
    const currentTime = Date.now() / 1000;
    return !exp || exp < (currentTime + 60);
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return true; // Assume expired if there's an error
  }
};