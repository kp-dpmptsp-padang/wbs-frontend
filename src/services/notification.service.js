// src/services/notification.service.js
import api from './api';

/**
 * Notification service that handles all API calls related to notifications
 */
const notificationService = {
  /**
   * Get all notifications with optional filtering
   * @param {Object} params - Query parameters
   * @param {boolean} params.is_read - Filter notifications based on read status (optional)
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.per_page - Number of items per page (default: 10)
   * @returns {Promise} - Promise with notification data and metadata
   */
  async getNotifications(params = {}) {
    try {
      console.log('Fetching notifications with params:', params);
      const response = await api.get('/notifications', { params });
      
      // Handle potential response structure variations
      const responseData = response.data;
      let notifications = [];
      let meta = {};
      
      // Extract notification data
      if (responseData.data) {
        if (Array.isArray(responseData.data)) {
          notifications = responseData.data;
        } else if (responseData.data.data && Array.isArray(responseData.data.data)) {
          notifications = responseData.data.data;
        }
      } else if (Array.isArray(responseData)) {
        notifications = responseData;
      }
      
      // Extract metadata for pagination
      if (responseData.meta) {
        meta = responseData.meta;
      } else if (responseData.data && responseData.data.meta) {
        meta = responseData.data.meta;
      }
      
      return {
        success: true,
        data: notifications,
        meta: meta
      };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      
      // For development environment, return mock data
      if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'development') {
        console.log('Using mock notifications in development');
        return getMockNotificationResponse(params);
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat notifikasi',
        data: [],
        meta: {}
      };
    }
  },

  /**
   * Mark all notifications as read
   * @returns {Promise} - Promise with operation status
   */
  async markAllAsRead() {
    try {
      const response = await api.put('/notifications/read-all');
      return {
        success: true,
        message: response.data.message || 'Semua notifikasi ditandai sebagai dibaca'
      };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menandai semua notifikasi sebagai dibaca'
      };
    }
  },

  /**
   * Mark a specific notification as read
   * @param {number|string} notificationId - ID of the notification
   * @returns {Promise} - Promise with operation status
   */
  async markAsRead(notificationId) {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return {
        success: true,
        message: response.data.message || 'Notifikasi ditandai sebagai dibaca'
      };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal menandai notifikasi sebagai dibaca'
      };
    }
  },

  /**
   * Get the count of unread notifications
   * @returns {Promise} - Promise with unread count
   */
  async getUnreadCount() {
    try {
      // Try to get this from the metadata of a minimal notification request
      const response = await api.get('/notifications', {
        params: { 
          is_read: false, 
          per_page: 1 
        }
      });
      
      // Check if unread_count is available in meta
      let unreadCount = 0;
      
      if (response.data.meta && typeof response.data.meta.unread_count !== 'undefined') {
        unreadCount = response.data.meta.unread_count;
      } else if (response.data && typeof response.data.unread_count !== 'undefined') {
        unreadCount = response.data.unread_count;
      } else {
        // If no explicit unread count, try to count from data
        const responseData = response.data;
        
        if (responseData.meta && typeof responseData.meta.total !== 'undefined') {
          unreadCount = responseData.meta.total;
        }
      }
      
      return {
        success: true,
        data: unreadCount
      };
    } catch (error) {
      console.error('Error fetching unread count:', error);
      
      // For development, return mock unread count
      if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'development') {
        return {
          success: true,
          data: 5 // Sample unread count
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.message || 'Gagal memuat jumlah notifikasi',
        data: 0
      };
    }
  }
};

/**
 * Helper function to generate mock notification data for development
 * @param {Object} params - Query parameters 
 * @returns {Object} - Mock response with notifications and metadata
 */
function getMockNotificationResponse(params = {}) {
  // Create mock notifications
  const allNotifications = [];
  for (let i = 1; i <= 30; i++) {
    const isRead = i % 3 === 0; // Every third notification is read
    
    allNotifications.push({
      id: i,
      message: `Notifikasi contoh #${i}: ${isRead ? 'Sudah dibaca' : 'Belum dibaca'}`,
      is_read: isRead,
      created_at: new Date(Date.now() - i * 3600000).toISOString(), // Decreasing time
      report_id: i % 5 === 0 ? Math.floor(i / 5) : null // Every fifth notification has a report_id
    });
  }
  
  // Apply filtering based on params
  let filteredNotifications = [...allNotifications];
  
  if (params.is_read === 'true' || params.is_read === true) {
    filteredNotifications = allNotifications.filter(notification => notification.is_read);
  } else if (params.is_read === 'false' || params.is_read === false) {
    filteredNotifications = allNotifications.filter(notification => !notification.is_read);
  }
  
  // Apply pagination
  const page = parseInt(params.page, 10) || 1;
  const perPage = parseInt(params.per_page, 10) || 10;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
  
  // Calculate metadata
  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / perPage);
  
  // Count unread notifications
  const unreadCount = allNotifications.filter(notification => !notification.is_read).length;
  
  return {
    success: true,
    data: paginatedNotifications,
    meta: {
      current_page: page,
      total_pages: totalPages,
      total: totalItems,
      per_page: perPage,
      unread_count: unreadCount
    }
  };
}

export default notificationService;