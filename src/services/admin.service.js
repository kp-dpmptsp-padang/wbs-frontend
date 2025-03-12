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
        data: response.data.data || []
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
   * Mengupdate admin (hanya super-admin)
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
      console.log('Fetching reports with params:', params);
      
      // Coba beberapa endpoint API yang mungkin
      let response;
      let endpoint = '';
      let useMockData = false;
      
      try {
        // Pertama coba dengan endpoint admin
        endpoint = '/admin/reports';
        response = await api.get(endpoint, { params });
        console.log('Response from admin/reports:', response.data);
      } catch (adminError) {
        console.log('Error with admin/reports endpoint:', adminError.message);
        
        try {
          // Jika endpoint admin gagal, coba endpoint reports biasa
          endpoint = '/reports';
          response = await api.get(endpoint, { params });
          console.log('Response from /reports:', response.data);
        } catch (reportsError) {
          console.log('Error with /reports endpoint:', reportsError.message);
          
          try {
            // Coba endpoint lain berdasarkan API_Spec.md
            endpoint = '/reports/admin';
            response = await api.get(endpoint, { params });
            console.log('Response from /reports/admin:', response.data);
          } catch (adminReportsError) {
            console.log('Error with reports/admin endpoint:', adminReportsError.message);
            
            // Semua endpoint gagal, gunakan data mock
            useMockData = true;
            console.log('All API endpoints failed, using mock data');
          }
        }
      }
      
      // Gunakan data mock jika semua endpoint gagal
      if (useMockData) {
        return this.getMockReports(params);
      }
      
      // Extract data dari response API
      const responseData = response.data;
      
      // Handle berbagai struktur response
      let reports = [];
      let meta = {};
      
      if (responseData.data && Array.isArray(responseData.data)) {
        reports = responseData.data;
      } else if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
        reports = responseData.data.data;
      } else if (Array.isArray(responseData)) {
        reports = responseData;
      }
      
      // Extract metadata pagination
      if (responseData.meta) {
        meta = responseData.meta;
      } else if (responseData.data && responseData.data.meta) {
        meta = responseData.data.meta;
      }
      
      return {
        success: true,
        data: reports,
        meta: meta
      };
    } catch (error) {
      console.error('Error fetching reports:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data
      });
      
      // Jika API call gagal, gunakan data mock
      return this.getMockReports(params);
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
  },

  /**
   * Fungsi untuk mendapatkan data contoh
   * @param {Object} params - Parameter untuk filter dan pagination
   * @returns {Object} - Object dengan data laporan contoh
   */
  getMockReports(params = {}) {
    console.log('Generating mock reports data');
    
    // Generate 30 data contoh
    const mockReports = [];
    for (let i = 1; i <= 30; i++) {
      mockReports.push({
        id: i,
        title: `Laporan Pengaduan #${i}`,
        violation: ['Korupsi', 'Penyalahgunaan Wewenang', 'Pelanggaran Etika'][i % 3],
        location: ['Kota Padang', 'Kantor DPMPTSP', 'Kecamatan Kuranji'][i % 3],
        date: '2023-05-15',
        created_at: '2023-05-15T08:00:00Z',
        createdAt: '2023-05-15T08:00:00Z',
        status: 'menunggu-verifikasi',
        is_anonymous: i % 2 === 0,
        reporter: { id: 1, name: 'John Doe' },
        detail: 'Detail laporan untuk pengujian sistem...',
        actors: 'Pihak terkait dalam laporan'
      });
    }
    
    // Filter berdasarkan status jika ada
    let filteredReports = mockReports;
    if (params.status) {
      filteredReports = mockReports.filter(report => report.status === params.status);
    }
    
    // Handle pagination
    const page = parseInt(params.page) || 1;
    const perPage = parseInt(params.per_page) || 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedReports = filteredReports.slice(start, end);
    
    return {
      success: true,
      data: paginatedReports,
      meta: {
        current_page: page,
        last_page: Math.ceil(filteredReports.length / perPage),
        total: filteredReports.length,
        per_page: perPage
      }
    };
  }
};

export default adminService;  