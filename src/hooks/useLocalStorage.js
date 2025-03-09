// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook untuk menyimpan dan mengambil data dari localStorage
 * dengan sinkronisasi otomatis antar tab
 * @param {string} key - Kunci untuk menyimpan data di localStorage
 * @param {any} initialValue - Nilai default jika kunci belum ada di localStorage
 * @returns {Array} - [storedValue, setValue, removeValue]
 */
const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Coba ambil dari localStorage
      const item = window.localStorage.getItem(key);
      
      // Parse data tersimpan atau kembalikan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fungsi untuk menyimpan nilai ke localStorage dan state
  const setValue = (value) => {
    try {
      // Simpan state
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Simpan ke localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispatch event untuk sinkronisasi antar tab
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify(valueToStore),
        storageArea: localStorage
      }));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Fungsi untuk menghapus nilai dari localStorage dan state
  const removeValue = () => {
    try {
      // Hapus dari localStorage
      window.localStorage.removeItem(key);
      
      // Reset state ke initialValue
      setStoredValue(initialValue);
      
      // Dispatch event untuk sinkronisasi antar tab
      window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: null,
        storageArea: localStorage
      }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Sinkronisasi antar tab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          // Update state jika nilai di localStorage berubah di tab lain
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    // Listen to storage events
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;