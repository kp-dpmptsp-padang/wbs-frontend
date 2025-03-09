// src/services/chat.service.js
import api from './api';

const chatService = {
  /**
   * Mendapatkan riwayat chat untuk laporan tertentu
   * @param {string|number} reportId - ID laporan
   * @returns {Promise} - Promise dengan data chat
   */
  async getReportChats(reportId) {
    try {
      const response = await api.get(`/reports/${reportId}/chats`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching report chats:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat riwayat chat'
      };
    }
  },

  /**
   * Mendapatkan riwayat chat untuk laporan anonim
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @returns {Promise} - Promise dengan data chat
   */
  async getAnonymousReportChats(uniqueCode) {
    try {
      const response = await api.get(`/reports/${uniqueCode}/chats/anonymous`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching anonymous report chats:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat riwayat chat'
      };
    }
  },

  /**
   * Mengirim pesan chat baru
   * @param {string|number} reportId - ID laporan
   * @param {string} message - Pesan chat yang akan dikirim
   * @returns {Promise} - Promise dengan data chat yang terkirim
   */
  async sendChatMessage(reportId, message) {
    try {
      const response = await api.post(`/reports/${reportId}/chats`, { message });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error sending chat message:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal mengirim pesan'
      };
    }
  },

  /**
   * Mengirim pesan chat untuk laporan anonim
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @param {string} message - Pesan chat yang akan dikirim
   * @returns {Promise} - Promise dengan data chat yang terkirim
   */
  async sendAnonymousChatMessage(uniqueCode, message) {
    try {
      const response = await api.post(`/reports/${uniqueCode}/chats/anonymous`, { message });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error sending anonymous chat message:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal mengirim pesan'
      };
    }
  }
};

export default chatService;