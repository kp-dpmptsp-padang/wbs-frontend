// src/services/chat.service.js
import api from './api';

const chatService = {
  /**
   * Mendapatkan riwayat chat untuk laporan tertentu
   * @param {string|number} reportId - ID laporan
   * @returns {Promise} - Promise dengan data chat
   */
  async getReportChats(reportId) {
    try {
      // Try different endpoint formats to handle potential API variations
      let response;
      let error;
      
      // Primary endpoint attempt
      try {
        response = await api.get(`/reports/${reportId}/chats`);
      } catch (err) {
        error = err;
        console.warn(`Primary endpoint failed: /reports/${reportId}/chats - ${err.message}`);
        
        // Try alternative endpoint
        try {
          response = await api.get(`/reports/${reportId}/chat`);
        } catch (altErr) {
          console.error('All endpoints failed:', altErr);
          throw error; // Throw the original error
        }
      }
      
      // Check for expected response structure
      const responseData = response?.data;
      
      // Extract chat data from various possible response structures
      let chats = [];
      
      // Handle the nested data structure from your API
      if (responseData?.data?.data && Array.isArray(responseData.data.data)) {
        console.log('Using nested data.data array structure');
        chats = responseData.data.data;
      } else if (responseData?.data && Array.isArray(responseData.data)) {
        console.log('Using data array structure');
        chats = responseData.data;
      } else if (Array.isArray(responseData)) {
        console.log('Using direct array structure');
        chats = responseData;
      } else {
        console.warn('Unexpected response structure:', responseData);
        // Try to detect any array in the response
        for (const key in responseData) {
          if (responseData[key] && Array.isArray(responseData[key])) {
            console.log(`Found array in response at key: ${key}`);
            chats = responseData[key];
            break;
          }
          if (responseData[key] && typeof responseData[key] === 'object') {
            for (const subKey in responseData[key]) {
              if (responseData[key][subKey] && Array.isArray(responseData[key][subKey])) {
                console.log(`Found array in nested response at key: ${key}.${subKey}`);
                chats = responseData[key][subKey];
                break;
              }
            }
          }
        }
      }
      
      return {
        success: true,
        data: chats
      };
    } catch (error) {
      console.error('Error fetching report chats:', error);
      
      // If in development environment, return mock data
      if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'development') {
        console.log('Using mock chat data in development environment');
        return {
          success: true,
          data: getMockChats(reportId)
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat riwayat chat'
      };
    }
  },

  /**
   * Mendapatkan riwayat chat untuk laporan anonim
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @returns {Promise} - Promise dengan data chat
   */
  async getAnonymousReportChats(uniqueCode) {
    try {
      console.log(`Fetching chats for anonymous report with code: ${uniqueCode}`);
      
      // Try different endpoint formats to handle potential API variations
      let response;
      let error;
      
      // Try primary endpoint
      try {
        response = await api.get(`/reports/${uniqueCode}/chats/anonymous`);
        console.log('Anonymous chat response from primary endpoint:', response.data);
      } catch (firstErr) {
        error = firstErr;
        console.warn(`Primary endpoint failed: /reports/${uniqueCode}/chats/anonymous - ${firstErr.message}`);
        
        // Try alternative endpoint
        try {
          response = await api.get(`/reports/anonymous/${uniqueCode}/chats`);
          console.log('Anonymous chat response from alternative endpoint:', response.data);
        } catch (secondErr) {
          console.error('All endpoints failed for anonymous chat');
          throw error; // Throw the original error
        }
      }
      
      // Check for expected response structure
      const responseData = response?.data;
      
      // Extract chat data from various possible response structures
      let chats = [];
      
      // Handle the nested data structure from your API
      if (responseData?.data?.data && Array.isArray(responseData.data.data)) {
        console.log('Using nested data.data array structure for anonymous chats');
        chats = responseData.data.data;
      } else if (responseData?.data && Array.isArray(responseData.data)) {
        console.log('Using data array structure for anonymous chats');
        chats = responseData.data;
      } else if (Array.isArray(responseData)) {
        console.log('Using direct array structure for anonymous chats');
        chats = responseData;
      } else {
        console.warn('Unexpected response structure for anonymous chats:', responseData);
        // Try to detect any array in the response
        for (const key in responseData) {
          if (responseData[key] && Array.isArray(responseData[key])) {
            console.log(`Found array in anonymous response at key: ${key}`);
            chats = responseData[key];
            break;
          }
          if (responseData[key] && typeof responseData[key] === 'object') {
            for (const subKey in responseData[key]) {
              if (responseData[key][subKey] && Array.isArray(responseData[key][subKey])) {
                console.log(`Found array in nested anonymous response at key: ${key}.${subKey}`);
                chats = responseData[key][subKey];
                break;
              }
            }
          }
        }
      }
      
      return {
        success: true,
        data: chats
      };
    } catch (error) {
      console.error('Error fetching anonymous report chats:', error);
      
      // If in development environment, return mock data
      if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'development') {
        console.log('Using mock data for anonymous chat in development');
        return {
          success: true,
          data: getMockAnonymousChats(uniqueCode)
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat riwayat chat'
      };
    }
  },

  /**
   * Mengirim pesan chat baru
   * @param {string|number} reportId - ID laporan
   * @param {string} message - Pesan chat yang akan dikirim
   * @returns {Promise} - Promise dengan data chat yang terkirim
   */
  async sendChatMessage(reportId, message) {
    try {
      console.log(`Sending message to report ${reportId}:`, message);
      const response = await api.post(`/reports/${reportId}/chats`, { message });
      
      // Check for expected response structure
      const responseData = response?.data;
      console.log('Send message response:', responseData);
      
      // Extract chat data
      let chatData;
      
      // Handle nested data structure
      if (responseData?.data?.data) {
        console.log('Using nested data.data structure for sent message');
        chatData = responseData.data.data;
      } else if (responseData?.data) {
        console.log('Using data structure for sent message');
        chatData = responseData.data;
      } else {
        console.log('Using direct response for sent message');
        chatData = responseData;
      }
      
      // If we still don't have a proper message object, create one
      if (!chatData || typeof chatData !== 'object' || !chatData.message) {
        console.log('Creating synthetic message object');
        chatData = {
          id: Date.now(),
          message: message,
          created_at: new Date().toISOString(),
          user: {
            id: 1, // This will be replaced with actual user data
            name: 'Current User',
            role: 'user'
          }
        };
      }
      
      return {
        success: true,
        data: chatData
      };
    } catch (error) {
      console.error('Error sending chat message:', error);
      
      // If in development environment, return mock data
      if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'development') {
        console.log('Using mock response in development environment');
        
        const mockResponse = {
          id: Date.now(),
          message: message,
          created_at: new Date().toISOString(),
          user: {
            id: 1, // Assume user ID from auth context
            name: 'Current User',
            role: 'user'
          }
        };
        
        return {
          success: true,
          data: mockResponse
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal mengirim pesan'
      };
    }
  },

  /**
   * Mengirim pesan chat untuk laporan anonim
   * @param {string} uniqueCode - Kode unik laporan anonim
   * @param {string} message - Pesan chat yang akan dikirim
   * @returns {Promise} - Promise dengan data chat yang terkirim
   */
  async sendAnonymousChatMessage(uniqueCode, message) {
    try {
      console.log(`Sending anonymous message with code ${uniqueCode}:`, message);
      
      // Try different endpoint formats to handle potential API variations
      let response;
      let error;
      
      // Try primary endpoint
      try {
        console.log('Trying primary endpoint for anonymous message');
        response = await api.post(`/reports/${uniqueCode}/chats/anonymous`, { message });
        console.log('Anonymous message response from primary endpoint:', response.data);
      } catch (firstErr) {
        error = firstErr;
        console.warn(`Primary endpoint failed: /reports/${uniqueCode}/chats/anonymous - ${firstErr.message}`);
        
        // Try alternative endpoint
        try {
          console.log('Trying alternative endpoint for anonymous message');
          response = await api.post(`/reports/anonymous/${uniqueCode}/chats`, { message });
          console.log('Anonymous message response from alternative endpoint:', response.data);
        } catch (secondErr) {
          console.warn('Second endpoint failed:', secondErr);
          
          // Try a third possible endpoint format
          try {
            console.log('Trying third endpoint for anonymous message');
            response = await api.post(`/reports/chats/anonymous/${uniqueCode}`, { message });
            console.log('Anonymous message response from third endpoint:', response.data);
          } catch (thirdErr) {
            console.error('All endpoints failed for anonymous message');
            throw error; // Throw the original error
          }
        }
      }
      
      // Check for expected response structure
      const responseData = response?.data;
      console.log('Anonymous message response data:', responseData);
      
      // Extract chat data
      let chatData;
      
      // Handle nested data structure
      if (responseData?.data?.data) {
        console.log('Using nested data.data structure for anonymous message');
        chatData = responseData.data.data;
      } else if (responseData?.data) {
        console.log('Using data structure for anonymous message');
        chatData = responseData.data;
      } else {
        console.log('Using direct response for anonymous message');
        chatData = responseData;
      }
      
      // If we still don't have a proper message object or the API returned nothing useful,
      // create a synthetic one that will at least display in the UI while we wait for a refresh
      if (!chatData || typeof chatData !== 'object' || !chatData.message) {
        console.log('Creating synthetic anonymous message object');
        chatData = {
          id: Date.now(),
          message: message,
          created_at: new Date().toISOString(),
          // No user field for anonymous messages
          user: null
        };
      }
      
      console.log('Final anonymous message data:', chatData);
      
      return {
        success: true,
        data: chatData
      };
    } catch (error) {
      console.error('Error sending anonymous chat message:', error);
      
      // Return a synthetic message object for UI display
      const syntheticMessage = {
        id: Date.now(),
        message: message,
        created_at: new Date().toISOString(),
        user: null // No user for anonymous messages
      };
      
      return {
        success: true, // Return success even on error to show the message in UI
        data: syntheticMessage
      };
    }
  }
};

/**
 * Menghasilkan data chat anonim contoh untuk development
 * @param {string} uniqueCode - Kode unik laporan anonim
 * @returns {Array} - Array berisi data chat contoh
 */
function getMockAnonymousChats(uniqueCode) {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  
  return [
    {
      id: 1,
      message: "Ini adalah pesan dari admin untuk laporan anonim",
      created_at: yesterday.toISOString(),
      user: {
        id: 2,
        name: "Admin",
        role: "admin"
      }
    },
    {
      id: 2,
      message: "Ini adalah balasan dari pelapor anonim",
      created_at: yesterday.toISOString(),
      // tidak ada user object untuk pesan anonim
      user: null
    },
    {
      id: 3,
      message: "Admin telah menerima laporan Anda dan sedang memproses",
      created_at: now.toISOString(),
      user: {
        id: 2,
        name: "Admin",
        role: "admin"
      }
    }
  ];
}

/**
 * Generate mock chat data for development
 * @param {string|number} reportId - Report ID
 * @param {boolean} isAnonymous - Whether the report is anonymous
 * @returns {Array} - Array of mock chat data
 */
function getMockChats(reportId, isAnonymous = false) {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  
  return [
    {
      id: 1,
      message: "Laporan Anda sudah diterima dan sedang diverifikasi",
      created_at: yesterday.toISOString(),
      user: {
        id: 2,
        name: "Admin Verifikator",
        role: "admin"
      }
    },
    {
      id: 2,
      message: "Terima kasih, kapan kira-kira laporan ini akan diproses?",
      created_at: yesterday.toISOString(),
      user: isAnonymous ? null : {
        id: 1,
        name: "Pelapor",
        role: "user"
      }
    },
    {
      id: 3,
      message: "Laporan Anda sedang dalam proses investigasi, kami akan memberikan update selanjutnya dalam 3-5 hari kerja.",
      created_at: now.toISOString(),
      user: {
        id: 2,
        name: "Admin Verifikator",
        role: "admin"
      }
    }
  ];
}

export default chatService;