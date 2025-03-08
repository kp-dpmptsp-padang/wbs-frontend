// src/services/auth.service.js
import api from './api';
import { setAuthData, removeToken, getRefreshToken } from '@/utils/token';

class AuthService {
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
      }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { access_token, refresh_token, user } = response.data;
      
      // Simpan token dan data user
      setAuthData(access_token, refresh_token, user);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.'
      };
    }
  }

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
  }

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
  }

  async refreshToken() {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/auth/token', { refresh_token: refreshToken });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal refresh token.'
      };
    }
  }
}

export default new AuthService();