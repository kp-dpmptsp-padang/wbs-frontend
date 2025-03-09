// src/utils/errorHandler.js

/**
 * Menangani error dari API dan mengembalikan format yang konsisten
 * @param {Object} error - Error object dari axios atau response API
 * @returns {Object} - Format error yang konsisten
 */
export const handleApiError = (error) => {
  // Error dari respons API
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          type: 'validation',
          message: data.message || 'Terjadi kesalahan validasi',
          errors: data.errors || {}
        };
      case 401:
        // Bisa digunakan untuk trigger logout atau refresh token
        return {
          type: 'auth',
          message: data.message || 'Sesi telah berakhir. Silakan login kembali.'
        };
      case 403:
        return {
          type: 'permission',
          message: data.message || 'Anda tidak memiliki akses untuk operasi ini.'
        };
      case 404:
        return {
          type: 'not_found',
          message: data.message || 'Data tidak ditemukan.'
        };
      case 422:
        return {
          type: 'validation',
          message: data.message || 'Terjadi kesalahan validasi',
          errors: data.errors || {}
        };
      case 500:
      default:
        return {
          type: 'server',
          message: data.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
        };
    }
  } 
  // Error terjadi saat request sedang dibuat (network error)
  else if (error.request) {
    return {
      type: 'network',
      message: 'Tidak dapat terhubung ke server. Mohon periksa koneksi internet Anda.'
    };
  } 
  // Error lainnya (setup error)
  else {
    return {
      type: 'unknown',
      message: error.message || 'Terjadi kesalahan yang tidak diketahui.'
    };
  }
};

/**
 * Format pesan error form untuk ditampilkan ke pengguna
 * @param {Object} errors - Object berisi error dari validasi
 * @returns {String} - Pesan error yang diformat
 */
export const formatValidationErrors = (errors) => {
  if (!errors || Object.keys(errors).length === 0) {
    return 'Terjadi kesalahan validasi';
  }
  
  // Ubah object error menjadi array pesan
  const errorMessages = Object.entries(errors).map(([field, message]) => {
    // Jika message adalah array, ambil pesan pertama
    const errorMsg = Array.isArray(message) ? message[0] : message;
    return `${field}: ${errorMsg}`;
  });
  
  return errorMessages.join('. ');
};

/**
 * Mendeteksi apakah error terkait autentikasi (401)
 * @param {Object} error - Error object
 * @returns {Boolean} - true jika error autentikasi
 */
export const isAuthError = (error) => {
  return error?.response?.status === 401;
};

/**
 * Mendeteksi apakah error terkait izin (403)
 * @param {Object} error - Error object
 * @returns {Boolean} - true jika error izin
 */
export const isPermissionError = (error) => {
  return error?.response?.status === 403;
};