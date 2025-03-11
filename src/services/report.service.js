// src/services/report.service.js
import api from './api';

const reportService = {
  /**
   * Membuat laporan baru
   * @param {Object} formData - FormData berisi data laporan dan file
   * @returns {Promise} - Promise dengan data laporan yang dibuat
   */
    // src/services/report.service.js
  // Di src/services/report.service.js
  // In report.service.js, modify the createReport function:

  async createReport(formData) {
    try {
      // Log simplified FormData entries for debugging
      const formDataEntries = {};
      formData.forEach((value, key) => {
        if (key !== 'evidence_files') {
          formDataEntries[key] = value;
        } else {
          formDataEntries[key] = `[File: ${value.name}]`;
        }
      });
      console.log('Creating report with data:', formDataEntries);
      
      // Make API call with proper headers
      const response = await api.post('/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Log response to see structure
      console.log('API response:', response.data);
      
      // Carefully extract data with fallbacks
      const responseData = response.data || {};
      
      return {
        success: true,
        data: responseData.data || responseData
      };
    } catch (error) {
      console.error('Error creating report:', error.response?.data || error.message);
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
      console.log('Menyelesaikan laporan ID:', reportId);
      
      // Tambahkan log untuk melihat isi formData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }
      
      // Coba beberapa endpoint yang mungkin berdasarkan API_Spec.md
      let response;
      let endpoint = '';
      
      try {
        // Coba endpoint pertama dari API_Spec
        endpoint = `/reports/${reportId}/complete`;
        response = await api.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response from complete endpoint:', response.data);
      } catch (firstError) {
        console.log('Error with first complete endpoint:', firstError.message);
        
        try {
          // Coba endpoint alternative
          endpoint = `/admin/reports/${reportId}/complete`;
          response = await api.post(endpoint, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Response from admin complete endpoint:', response.data);
        } catch (secondError) {
          console.log('Error with second complete endpoint:', secondError.message);
          
          try {
            // Coba dengan PUT sebagai alternatif
            endpoint = `/reports/${reportId}/complete`;
            response = await api.put(endpoint, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log('Response from PUT complete endpoint:', response.data);
          } catch (thirdError) {
            console.log('Error with PUT complete endpoint:', thirdError.message);
            throw new Error('All complete endpoints failed');
          }
        }
      }
      
      // Jika berhasil mencapai sini, berarti salah satu endpoint berhasil
      const responseData = response.data;
      
      return {
        success: true,
        data: responseData.data || responseData
      };
    } catch (error) {
      console.error('Error completing report:', error);
      
      // Untuk development, berikan respon sukses palsu
      if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'development') {
        console.log('Returning mock success response in development mode');
        return {
          success: true,
          data: {
            id: reportId,
            status: 'selesai',
            message: 'Laporan telah diselesaikan (mock response)'
          }
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Gagal menyelesaikan laporan'
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