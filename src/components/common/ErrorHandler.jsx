// src/components/common/ErrorHandler.jsx
import React from 'react';
import { isAuthError, isPermissionError } from '@/utils/errorHandler';
import { Link } from 'react-router-dom';

/**
 * Komponen untuk menangani dan menampilkan error secara standar
 */
const ErrorHandler = ({ 
  error, 
  onRetry,
  showRetry = true,
  className = ''
}) => {
  // Jika tidak ada error, jangan render apapun
  if (!error) return null;

  // Handler khusus berdasarkan jenis error
  if (isAuthError(error)) {
    return (
      <div className={`bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 ${className}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">Sesi telah kedaluwarsa</h3>
            <div className="mt-2 text-sm">
              <p>Silakan <Link to="/login" className="font-medium underline">login kembali</Link> untuk melanjutkan.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isPermissionError(error)) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 ${className}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">Akses ditolak</h3>
            <div className="mt-2 text-sm">
              <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error umum
  return (
    <div className={`bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">Terjadi kesalahan</h3>
          <div className="mt-2 text-sm">
            <p>{error.message || 'Terjadi kesalahan yang tidak diketahui.'}</p>
          </div>
          {showRetry && onRetry && (
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={onRetry}
              >
                Coba lagi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;