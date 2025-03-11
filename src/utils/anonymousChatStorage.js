// src/utils/anonymousChatStorage.js
/**
 * Utility untuk menyimpan dan mengambil pesan chat anonim secara lokal
 * sebagai solusi sementara untuk masalah penyimpanan chat anonim di server
 */

/**
 * Mendapatkan key untuk localStorage berdasarkan uniqueCode
 * @param {string} uniqueCode - Kode unik laporan anonim
 * @returns {string} - Key untuk localStorage
 */
const getStorageKey = (uniqueCode) => {
    if (!uniqueCode) throw new Error('Unique code is required');
    return `anonymousChat_${uniqueCode}`;
  };
  
  /**
   * Menyimpan pesan chat anonim di localStorage
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @param {Object} message - Pesan chat yang akan disimpan
   */
  export const saveAnonymousMessage = (uniqueCode, message) => {
    try {
      const key = getStorageKey(uniqueCode);
      const messages = getAnonymousMessages(uniqueCode);
      
      // Tambahkan properti untuk menandai pesan lokal
      const messageToSave = {
        ...message,
        id: message.id || Date.now(),
        created_at: message.created_at || new Date().toISOString(),
        is_anonymous: true,
        is_local: true // Penanda bahwa pesan disimpan secara lokal
      };
      
      messages.push(messageToSave);
      localStorage.setItem(key, JSON.stringify(messages));
      
      return messageToSave;
    } catch (error) {
      console.error('Error saving anonymous message to localStorage:', error);
      return null;
    }
  };
  
  /**
   * Mendapatkan semua pesan chat anonim dari localStorage
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @returns {Array} - Array berisi pesan chat anonim
   */
  export const getAnonymousMessages = (uniqueCode) => {
    try {
      const key = getStorageKey(uniqueCode);
      const messagesJSON = localStorage.getItem(key);
      
      return messagesJSON ? JSON.parse(messagesJSON) : [];
    } catch (error) {
      console.error('Error getting anonymous messages from localStorage:', error);
      return [];
    }
  };
  
  /**
   * Menggabungkan pesan dari server dengan pesan lokal
   * @param {Array} serverMessages - Pesan dari server
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @returns {Array} - Array berisi pesan gabungan
   */
  export const mergeMessages = (serverMessages, uniqueCode) => {
    try {
      const localMessages = getAnonymousMessages(uniqueCode);
      if (localMessages.length === 0) return serverMessages || [];
      
      const result = [...(serverMessages || [])];
      
      // Tambahkan pesan lokal yang tidak ada di pesan server
      // Pesan dari server biasanya tidak punya is_local=true
      localMessages.forEach(localMsg => {
        // Coba cari pesan dengan konten dan waktu yang mirip
        // Karena ID mungkin berbeda antara lokal dan server
        const exists = result.some(serverMsg => 
          serverMsg.message === localMsg.message && 
          Math.abs(new Date(serverMsg.created_at) - new Date(localMsg.created_at)) < 60000
        );
        
        if (!exists) {
          result.push(localMsg);
        }
      });
      
      // Sort by created_at date
      return result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } catch (error) {
      console.error('Error merging messages:', error);
      return serverMessages || [];
    }
  };
  
  /**
   * Membersihkan pesan chat anonim di localStorage
   * @param {string} uniqueCode - Kode unik laporan anonim
   */
  export const clearAnonymousMessages = (uniqueCode) => {
    try {
      const key = getStorageKey(uniqueCode);
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing anonymous messages from localStorage:', error);
    }
};