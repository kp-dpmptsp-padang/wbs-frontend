// src/hooks/useModal.js
import { useState, useCallback } from 'react';

/**
 * Custom hook untuk mengelola state modal
 * @param {boolean} initialState - State awal modal (terbuka/tertutup)
 * @returns {Object} - Object yang berisi state dan method modal
 */
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);

  // Membuka modal
  const openModal = useCallback((modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  // Menutup modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Hapus data setelah modal tertutup
    setTimeout(() => {
      setData(null);
    }, 300); // Small delay to avoid flickering during transition
  }, []);

  // Toggle modal (buka jika tertutup, tutup jika terbuka)
  const toggleModal = useCallback((modalData = null) => {
    if (!isOpen && modalData) {
      setData(modalData);
    }
    setIsOpen(prev => !prev);
    
    // Hapus data setelah modal tertutup (jika sebelumnya terbuka)
    if (isOpen) {
      setTimeout(() => {
        setData(null);
      }, 300);
    }
  }, [isOpen]);

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    toggleModal,
    setModalData: setData
  };
};

export default useModal;