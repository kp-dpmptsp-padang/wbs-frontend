// src/utils/mockDataProvider.js

/**
 * Provides mock data for development and testing when API is not available
 */
export const mockReports = [
    {
      id: 1,
      title: "Tindakan Korupsi Oleh Oknum Pejabat",
      violation: "Korupsi",
      location: "Kota A",
      date: "2023-02-06",
      actors: "Si Anu",
      detail: "Terjadi pada 12 Oktober lalu, saya rasa melihat seorang pejabat menerima suap di mana ia mendapatkan duit untuk menyetujui rantian...",
      status: "menunggu-verifikasi",
      is_anonymous: false,
      created_at: "2023-11-15T08:30:00",
      reporter: {
        id: 1,
        name: "John Doe"
      },
      files: [
        {
          id: 1,
          file_path: "/uploads/evidence/bukti1.jpg",
          file_type: "evidence"
        }
      ]
    },
    {
      id: 2,
      title: "Penyalahgunaan Kewenangan",
      violation: "Penyalahgunaan Wewenang",
      location: "Kota B",
      date: "2023-01-20",
      actors: "Oknum XYZ",
      detail: "Terjadi penyalahgunaan wewenang dalam proses penerbitan izin bangunan. Pejabat terkait meminta biaya tambahan di luar ketentuan resmi.",
      status: "menunggu-verifikasi",
      is_anonymous: true,
      created_at: "2023-11-10T10:45:00",
      files: [
        {
          id: 2,
          file_path: "/uploads/evidence/bukti2.pdf",
          file_type: "evidence"
        }
      ]
    },
    {
      id: 3,
      title: "Pelanggaran Prosedur Pengadaan",
      violation: "Manipulasi Pengadaan",
      location: "Kota C",
      date: "2023-03-15",
      actors: "Panitia Pengadaan",
      detail: "Dalam proses pengadaan barang/jasa terdapat indikasi kuat bahwa spesifikasi dibuat khusus untuk mengarah pada produk tertentu.",
      status: "menunggu-verifikasi",
      is_anonymous: false,
      created_at: "2023-11-05T14:20:00",
      reporter: {
        id: 2,
        name: "Jane Smith"
      },
      files: [
        {
          id: 3,
          file_path: "/uploads/evidence/bukti3.jpg",
          file_type: "evidence"
        },
        {
          id: 4,
          file_path: "/uploads/evidence/bukti4.pdf",
          file_type: "evidence"
        }
      ]
    }
  ];
  
  /**
   * Get mock reports with optional filtering
   * @param {Object} params - Filter parameters
   * @param {string} params.status - Filter by status
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @returns {Object} - Mock API response with data and pagination
   */
  export const getMockReports = (params = {}) => {
    const { status, page = 1, per_page = 10 } = params;
    
    // Filter reports by status if provided
    let filteredReports = mockReports;
    if (status) {
      filteredReports = mockReports.filter(report => report.status === status);
    }
    
    // Calculate pagination
    const total = filteredReports.length;
    const lastPage = Math.ceil(total / per_page);
    const currentPage = Math.min(page, lastPage);
    const offset = (currentPage - 1) * per_page;
    
    // Slice reports for current page
    const paginatedReports = filteredReports.slice(offset, offset + per_page);
    
    // Simulate API response
    return {
      success: true,
      data: paginatedReports,
      meta: {
        current_page: currentPage,
        last_page: lastPage,
        total: total,
        per_page: per_page
      }
    };
  };
  
  /**
   * Get mock report by ID
   * @param {number} id - Report ID
   * @returns {Object} - Mock API response with report data
   */
  export const getMockReportById = (id) => {
    const report = mockReports.find(report => report.id === Number(id));
    
    if (!report) {
      return {
        success: false,
        error: 'Laporan tidak ditemukan'
      };
    }
    
    return {
      success: true,
      data: report
    };
};