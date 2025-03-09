// src/services/upload.service.js
import api from './api';

/**
 * Utilitas untuk mengelola upload file
 */
const uploadService = {
  /**
   * Memvalidasi file sebelum upload
   * @param {File} file - File yang akan divalidasi
   * @param {Object} options - Opsi validasi
   * @param {number} options.maxSize - Ukuran maksimum file dalam bytes (default: 10MB)
   * @param {Array} options.allowedTypes - Array mimetype yang diizinkan
   * @returns {Object} - {valid: boolean, message: string}
   */
  validateFile(file, options = {}) {
    const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
    const allowedTypes = options.allowedTypes || [
      'image/jpeg', 
      'image/png', 
      'image/jpg', 
      'application/pdf'
    ];

    // Validasi ukuran
    if (file.size > maxSize) {
      return {
        valid: false,
        message: `Ukuran file terlalu besar. Maksimal ${maxSize / (1024 * 1024)}MB`
      };
    }

    // Validasi tipe file
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: `Tipe file tidak didukung. Tipe yang diizinkan: ${allowedTypes.join(', ')}`
      };
    }

    return { valid: true };
  },

  /**
   * Membuat FormData untuk upload file
   * @param {Object} data - Data yang akan ditambahkan ke FormData
   * @param {File|Array} data.files - File tunggal atau array file
   * @param {Object} data.fields - Field lain yang akan ditambahkan ke FormData
   * @param {string} options.fileFieldName - Nama field untuk file (default: 'file')
   * @returns {FormData} - FormData yang telah diisi
   */
  createFormData(data, options = {}) {
    const { files, fields = {} } = data;
    const fileFieldName = options.fileFieldName || 'file';
    
    const formData = new FormData();
    
    // Tambahkan file ke FormData
    if (files) {
      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          formData.append(`${fileFieldName}[${index}]`, file);
        });
      } else {
        formData.append(fileFieldName, files);
      }
    }
    
    // Tambahkan field lain ke FormData
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    
    return formData;
  },

  /**
   * Mendapatkan URL untuk file yang diupload
   * @param {string} filePath - Path file
   * @returns {string} - URL lengkap untuk file
   */
  getFileUrl(filePath) {
    if (!filePath) return '';
    
    // Periksa apakah filePath sudah berupa URL lengkap
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    
    // Tambahkan baseURL jika filePath hanya path relatif
    const baseUrl = api.defaults.baseURL || '';
    const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    
    return `${baseUrl}${normalizedPath}`;
  },

  /**
   * Mendapatkan jenis/tipe file dari nama file atau URL
   * @param {string} fileNameOrUrl - Nama file atau URL 
   * @returns {string} - Tipe file ('image', 'document', 'unknown')
   */
  getFileType(fileNameOrUrl) {
    if (!fileNameOrUrl) return 'unknown';
    
    const extension = fileNameOrUrl.split('.').pop().toLowerCase();
    
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
    
    if (imageTypes.includes(extension)) return 'image';
    if (documentTypes.includes(extension)) return 'document';
    
    return 'unknown';
  }
};

export default uploadService;