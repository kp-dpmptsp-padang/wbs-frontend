// src/services/notification.service.js
import api from './api';

const notificationService = {
  /**
   * Mendapatkan daftar notifikasi pengguna
   * @param {Object} params - Parameter untuk filter dan pagination
   * @param {boolean} params.is_read - Filter notifikasi berdasarkan status baca (opsional)
   * @param {number} params.page - Nomor halaman (default: 1)
   * @param {number} params.per_page - Jumlah data per halaman (default: 10)
   * @returns {Promise} - Promise dengan data notifikasi
   */
  async getNotifications(params = {}) {
    try {
      const response = await api.get('/notifications', { params });
      return {
        success: true,
        data: response.data.data,
        meta: response.data.meta
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat notifikasi'
      };
    }
  },

  /**
   * Menandai semua notifikasi sebagai telah dibaca
   * @returns {Promise} - Promise dengan status operasi
   */
  async markAllAsRead() {
    try {
      const response = await api.put('/notifications/read-all');
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menandai notifikasi'
      };
    }
  },

  /**
   * Menandai notifikasi tertentu sebagai telah dibaca
   * @param {string|number} notificationId - ID notifikasi
   * @returns {Promise} - Promise dengan status operasi
   */
  async markAsRead(notificationId) {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menandai notifikasi'
      };
    }
  },

  /**
   * Mendapatkan jumlah notifikasi yang belum dibaca
   * @returns {Promise} - Promise dengan jumlah notifikasi yang belum dibaca
   */
  async getUnreadCount() {
    try {
      const response = await api.get('/notifications', {
        params: { is_read: false, per_page: 1 }
      });
      return {
        success: true,
        data: response.data.meta.unread_count
      };
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat jumlah notifikasi'
      };
    }
  }
};

export default notificationService;