// src/services/dashboard.service.js
import api from './api';

const dashboardService = {
  /**
   * Mendapatkan data dashboard untuk user biasa
   * @returns {Promise} - Promise dengan data dashboard user
   */
  async getUserDashboard() {
    try {
      const response = await api.get('/dashboard/user');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching user dashboard:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat data dashboard'
      };
    }
  },

  /**
   * Mendapatkan data dashboard untuk admin
   * @returns {Promise} - Promise dengan data dashboard admin
   */
  async getAdminDashboard() {
    try {
      const response = await api.get('/dashboard/admin');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat data dashboard admin'
      };
    }
  },

  /**
   * Mendapatkan data dashboard untuk super admin
   * @returns {Promise} - Promise dengan data dashboard super admin
   */
  async getSuperAdminDashboard() {
    try {
      const response = await api.get('/dashboard/super-admin');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching super admin dashboard:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat data dashboard super admin'
      };
    }
  }
};

export default dashboardService;