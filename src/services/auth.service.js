// src/services/auth.service.js
import api from './api';
import { setAuthData, removeToken, getRefreshToken } from '@/utils/token';

const authService = {
  async login(email, password) {
    try {
      console.log('Sending login request to:', `${api.defaults.baseURL}/auth/login`);
      const response = await api.post('/auth/login', { email, password });
      console.log('Login API response:', response.data);
      
      // Sesuaikan dengan format respons API Anda
      const responseData = response.data;
      
      // Jika respons berisi data di dalam properti data
      const userData = responseData.data || responseData;
      
      // Ekstrak token dan user dengan memeriksa struktur respons
      const access_token = userData.access_token || responseData.access_token;
      const refresh_token = userData.refresh_token || responseData.refresh_token;
      const user = userData.user || responseData.user;
      
      // Pastikan semua data yang dibutuhkan ada
      if (!access_token || !user) {
        console.error('Missing required auth data in response:', { access_token, user });
        return {
          success: false,
          error: 'Format respons tidak valid'
        };
      }
      
      console.log('Extracted auth data:', { access_token, refresh_token, user });
      
      // Simpan token dan data user
      setAuthData(access_token, refresh_token, user);
      
      return {
        success: true,
        data: userData
      };
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      return {
        success: false,
        error: error.response?.data?.message || 'Login gagal. Silakan coba lagi.'
      };
    }
  },

  async register(userData) {
    try {
      console.log('Register API call with data:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Register API response:', response.data);
      
      // Respons API berisi data dalam properti 'data'
      const responseData = response.data;
      const data = responseData.data || responseData;
      
      // Ekstrak token dan user dengan memeriksa struktur respons
      const access_token = data.access_token;
      const refresh_token = data.refresh_token;
      const user = data.user;
      
      // Pastikan semua data yang dibutuhkan ada
      if (!access_token || !user) {
        console.error('Register API response missing token or user data:', response.data);
        return {
          success: false,
          error: 'Format respons tidak valid'
        };
      }
      
      console.log('Setting auth data with:', { access_token, refresh_token, user });
      
      // Simpan token dan data user
      const authDataSaved = setAuthData(access_token, refresh_token, user);
      console.log('Auth data saved:', authDataSaved);
      
      return {
        success: true,
        data: {
          user,
          access_token,
          refresh_token
        }
      };
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.'
      };
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal mengirim instruksi reset password.'
      };
    }
  },

  async verifyResetCode(email, code) {
    try {
      const response = await api.post('/auth/verify-code', { email, code });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Kode verifikasi tidak valid'
      };
    }
  },

  async resetPassword(resetData) {
    try {
      const response = await api.post('/auth/reset-password', {
        reset_token: resetData.token,
        password: resetData.new_password,
        password_confirmation: resetData.new_password_confirmation
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Reset password error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal reset password. Silakan coba lagi.'
      };
    }
  },

  async logout() {
    try {
      const refreshToken = getRefreshToken();
      await api.post('/auth/logout', { refresh_token: refreshToken });
      
      // Hapus token dan user data dari localStorage
      removeToken();
      
      return { success: true };
    } catch (error) {
      // Hapus token meskipun API call gagal
      removeToken();
      return { success: false, error: error.message };
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return {
        success: true,
        data: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal mengambil data profil.'
      };
    }
  },

  // Update di authService
  async refreshToken() {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      console.log('Calling refresh token API');
      const response = await api.post('/auth/token', { refresh_token: refreshToken });
      console.log('Refresh token response:', response.data);
      
      // Periksa struktur respons
      const responseData = response.data;
      
      // Ekstrak data yang diperlukan
      const access_token = responseData.access_token;
      const refresh_token = responseData.refresh_token; // Mungkin ada atau tidak, tergantung API
      
      if (!access_token) {
        throw new Error('Invalid refresh token response');
      }
      
      return {
        success: true,
        data: {
          access_token,
          refresh_token,
          expiresIn: responseData.expires_in
        }
      };
    } catch (error) {
      console.error('Refresh token error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal refresh token.'
      };
    }
  }
};

export default authService;