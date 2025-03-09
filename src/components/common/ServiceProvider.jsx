// src/components/common/ServiceProvider.jsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorHandler from './ErrorHandler';

/**
 * Komponen wrapper untuk menangani loading dan error di UI secara otomatis
 * @param {Function} service - Fungsi service yang akan dipanggil
 * @param {Object} serviceParams - Parameter untuk service
 * @param {Function} onSuccess - Callback ketika service berhasil
 * @param {React.ReactNode} children - Komponen yang ditampilkan saat data sudah tersedia
 * @param {boolean} loadingComponent - Custom loading component
 * @param {boolean} errorComponent - Custom error component
 * @param {boolean} showError - Apakah menampilkan error handler
 * @param {boolean} loadOnMount - Apakah memanggil service saat komponen di-mount
 */
const ServiceProvider = ({
  service,
  serviceParams = {},
  onSuccess,
  children,
  loadingComponent,
  errorComponent,
  showError = true,
  loadOnMount = true
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(loadOnMount);
  const [error, setError] = useState(null);

  // Fungsi untuk memuat data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await service(serviceParams);
      
      if (result.success) {
        setData(result.data);
        if (onSuccess) onSuccess(result.data);
      } else {
        setError(new Error(result.error));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Panggil service saat komponen di-mount jika loadOnMount true
  useEffect(() => {
    if (loadOnMount) {
      loadData();
    }
  }, []);
  
  // Jika sedang loading, tampilkan komponen loading
  if (loading) {
    return loadingComponent || <LoadingSpinner text="Memuat data..." />;
  }
  
  // Jika terjadi error, tampilkan komponen error
  if (error && showError) {
    return errorComponent || <ErrorHandler error={error} onRetry={loadData} />;
  }
  
  // Jika children adalah fungsi, panggil dengan data
  if (typeof children === 'function') {
    return children({ data, loading, error, reload: loadData });
  }
  
  // Jika children bukan fungsi, tampilkan langsung
  return children;
};

export default ServiceProvider;