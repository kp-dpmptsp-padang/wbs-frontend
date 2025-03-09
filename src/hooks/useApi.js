// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { handleApiError } from '@/utils/errorHandler';

/**
 * Custom hook untuk standardisasi request API
 * @param {Function} apiFunc - Fungsi API dari service yang akan dipanggil
 * @returns {Object} - Object yang berisi state dan function untuk eksekusi API
 */
const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Eksekusi API call dengan mengelola state loading dan error
   * @param {any} args - Argumen yang dibutuhkan oleh fungsi API
   * @returns {Promise} - Promise dengan hasil API call
   */
  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunc(...args);
      
      if (result.success) {
        setData(result.data);
        return { success: true, data: result.data };
      } else {
        const formattedError = result.error || 'Terjadi kesalahan dalam memproses permintaan';
        setError(formattedError);
        return { success: false, error: formattedError };
      }
    } catch (err) {
      console.error('API Error:', err);
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan dalam menghubungi server';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return {
    data,
    error,
    loading,
    execute
  };
};

export default useApi;