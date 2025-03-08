// src/utils/token.js
const TOKEN_KEY = 'wbs_token';
const REFRESH_TOKEN_KEY = 'wbs_refresh_token';
const USER_KEY = 'wbs_user';

// Set tokens and user data to localStorage
export const setAuthData = (token, refreshToken, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
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
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
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