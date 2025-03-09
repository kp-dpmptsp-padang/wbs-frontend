// src/services/admin.service.js
import api from './api';

const adminService = {
  /**
   * Mendapatkan daftar semua admin (hanya super-admin)
   * @returns {Promise} - Promise dengan data admin
   */
  async getAllAdmins() {
    try {
      const response = await api.get('/admin');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching admin list:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat daftar admin'
      };
    }
  },

  /**
   * Membuat admin baru (hanya super-admin)
   * @param {Object} adminData - Data admin baru
   * @param {string} adminData.name - Nama admin
   * @param {string} adminData.email - Email admin
   * @param {string} adminData.password - Password admin
   * @param {string} adminData.password_confirmation - Konfirmasi password
   * @returns {Promise} - Promise dengan data admin yang dibuat
   */
  async createAdmin(adminData) {
    try {
      const response = await api.post('/admin', adminData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error creating admin:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal membuat admin baru'
      };
    }
  },

  /**
   * Mengupdate data admin (hanya super-admin)
   * @param {string|number} adminId - ID admin
   * @param {Object} adminData - Data admin yang akan diperbarui
   * @returns {Promise} - Promise dengan data admin yang diperbarui
   */
  async updateAdmin(adminId, adminData) {
    try {
      const response = await api.put(`/admin/${adminId}`, adminData);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error updating admin:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memperbarui admin'
      };
    }
  },

  /**
   * Menghapus admin (hanya super-admin)
   * @param {string|number} adminId - ID admin yang akan dihapus
   * @returns {Promise} - Promise dengan status operasi
   */
  async deleteAdmin(adminId) {
    try {
      const response = await api.delete(`/admin/${adminId}`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error deleting admin:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menghapus admin'
      };
    }
  },

  /**
   * Mendapatkan daftar semua laporan (untuk admin)
   * @param {Object} params - Parameter untuk filter dan pagination
   * @param {string} params.status - Filter berdasarkan status (opsional)
   * @param {number} params.page - Nomor halaman (default: 1)
   * @param {number} params.per_page - Jumlah data per halaman (default: 10)
   * @returns {Promise} - Promise dengan data laporan
   */
  async getAllReports(params = {}) {
    try {
      const response = await api.get('/admin/reports', { params });
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching reports:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat daftar laporan'
      };
    }
  },

  /**
   * Mendapatkan detail laporan berdasarkan ID (untuk admin)
   * @param {string|number} reportId - ID laporan
   * @returns {Promise} - Promise dengan data detail laporan
   */
  async getReportById(reportId) {
    try {
      const response = await api.get(`/admin/reports/${reportId}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching report detail:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat detail laporan'
      };
    }
  },

  /**
   * Mendapatkan statistik overview untuk dashboard admin
   * @returns {Promise} - Promise dengan data statistik
   */
  async getOverviewStats() {
    try {
      const response = await api.get('/admin/stats/overview');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching overview stats:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat statistik'
      };
    }
  },

  /**
   * Mendapatkan statistik laporan untuk dashboard admin
   * @returns {Promise} - Promise dengan data statistik laporan
   */
  async getReportStats() {
    try {
      const response = await api.get('/admin/stats/reports');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching report stats:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat statistik laporan'
      };
    }
  }
};

export default adminService;