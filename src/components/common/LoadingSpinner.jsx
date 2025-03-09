// src/components/common/LoadingSpinner.jsx
import React from 'react';

/**
 * Komponen loading spinner yang dapat digunakan di seluruh aplikasi
 * @param {string} size - Ukuran spinner (small, medium, large)
 * @param {string} color - Warna spinner (primary, secondary, white)
 * @param {string} className - Kelas tambahan untuk spinner
 * @param {string} text - Teks yang ditampilkan di bawah spinner
 * @param {boolean} fullScreen - Apakah spinner menutupi seluruh layar
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  className = '',
  text,
  fullScreen = false
}) => {
  // Definisikan kelas ukuran
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
  };
  
  // Definisikan kelas warna
  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-gray-500 border-t-transparent',
    white: 'border-white border-t-transparent',
  };
  
  const spinnerClasses = `inline-block animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  // Jika fullScreen, tampilkan spinner di tengah layar
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="text-center">
          <div className={spinnerClasses}></div>
          {text && <p className="mt-2 text-white">{text}</p>}
        </div>
      </div>
    );
  }
  
  // Jika ada teks, tampilkan teks di bawah spinner
  if (text) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className={spinnerClasses}></div>
        <p className="mt-2 text-gray-600">{text}</p>
      </div>
    );
  }
  
  // Tampilan default
  return <div className={spinnerClasses}></div>;
};

export default LoadingSpinner;