// src/services/report.service.js
import api from './api';

const reportService = {
  /**
   * Membuat laporan baru
   * @param {Object} formData - FormData berisi data laporan dan file
   * @returns {Promise} - Promise dengan data laporan yang dibuat
   */
  async createReport(formData) {
    try {
      console.log('Creating report with data:', Object.fromEntries(formData));
      const response = await api.post('/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error creating report:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal membuat laporan'
      };
    }
  },

  /**
   * Mendapatkan riwayat laporan pengguna
   * @returns {Promise} - Promise dengan data riwayat laporan
   */
  async getReportHistory() {
    try {
      const response = await api.get('/reports/history');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching report history:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat riwayat laporan'
      };
    }
  },

  /**
   * Mendapatkan detail laporan
   * @param {string|number} reportId - ID laporan
   * @returns {Promise} - Promise dengan data detail laporan
   */
  async getReportDetail(reportId) {
    try {
      const response = await api.get(`/reports/${reportId}`);
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
   * Mendapatkan detail laporan anonim
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @returns {Promise} - Promise dengan data detail laporan anonim
   */
  async getAnonymousReportDetail(uniqueCode) {
    try {
      const response = await api.get(`/reports/anonymous/${uniqueCode}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error fetching anonymous report:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat laporan anonim'
      };
    }
  },

  /**
   * Memproses laporan (Admin)
   * @param {string|number} reportId - ID laporan yang akan diproses
   * @returns {Promise} - Promise dengan hasil proses
   */
  async processReport(reportId) {
    try {
      const response = await api.put(`/reports/${reportId}/process`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error processing report:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memproses laporan'
      };
    }
  },

  /**
   * Menolak laporan (Admin)
   * @param {string|number} reportId - ID laporan
   * @param {string} rejectionReason - Alasan penolakan
   * @returns {Promise} - Promise dengan hasil penolakan
   */
  async rejectReport(reportId, rejectionReason) {
    try {
      const response = await api.put(`/reports/${reportId}/reject`, {
        rejection_reason: rejectionReason
      });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error rejecting report:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menolak laporan'
      };
    }
  },

  /**
   * Menyelesaikan laporan (Admin)
   * @param {string|number} reportId - ID laporan
   * @param {Object} formData - FormData berisi catatan admin dan file bukti penanganan
   * @returns {Promise} - Promise dengan hasil penyelesaian
   */
  async completeReport(reportId, formData) {
    try {
      const response = await api.put(`/reports/${reportId}/complete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error completing report:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menyelesaikan laporan'
      };
    }
  },

  /**
   * Mendapatkan file-file terkait laporan
   * @param {string|number} reportId - ID laporan
   * @returns {Promise} - Promise dengan data file laporan
   */
  async getReportFiles(reportId) {
    try {
      const response = await api.get(`/reports/${reportId}/files`);
      return {
        success: true,
        data: response.data.data.files
      };
    } catch (error) {
      console.error('Error fetching report files:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat file laporan'
      };
    }
  },

  /**
   * Mendapatkan URL untuk mengunduh file
   * @param {string|number} fileId - ID file yang akan diunduh
   * @returns {string} - URL untuk mengunduh file
   */
  getFileDownloadUrl(fileId) {
    return `${api.defaults.baseURL}/reports/files/${fileId}`;
  }
};

export default reportService;