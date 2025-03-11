// src/contexts/NotificationContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { notificationService } from '@/services';
import useApi from '@/hooks/useApi';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

// Membuat context untuk notifikasi
const NotificationContext = createContext(null);

// Provider untuk notifikasi context
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Gunakan custom hook useApi
  const { loading: notificationsLoading, execute: fetchNotifications } = useApi(notificationService.getNotifications);
  const { loading: markAsReadLoading, execute: executeMarkAsRead } = useApi(notificationService.markAsRead);
  const { loading: markAllAsReadLoading, execute: executeMarkAllAsRead } = useApi(notificationService.markAllAsRead);
  const { loading: unreadCountLoading, execute: fetchUnreadCount } = useApi(notificationService.getUnreadCount);

  // Fungsi untuk mengambil notifikasi dengan filter opsional
  const getNotifications = useCallback(async (params = {}) => {
    try {
      const result = await fetchNotifications(params);
      if (result.success) {
        setNotifications(result.data || []);
        
        // Pastikan meta ada sebelum mengakses unread_count
        if (result.meta && typeof result.meta.unread_count !== 'undefined') {
          setUnreadCount(result.meta.unread_count);
        }
      } else {
        showToast('error', result.error);
      }
      return result;
    } catch (error) {
      console.error('Error in getNotifications:', error);
      showToast('error', 'Gagal memuat notifikasi');
      return { success: false, error: error.message };
    }
  }, [fetchNotifications, showToast]);

  // Fungsi untuk menandai notifikasi sebagai dibaca
  const markAsRead = useCallback(async (notificationId) => {
    try {
      const result = await executeMarkAsRead(notificationId);
      if (result.success) {
        // Update notifikasi lokal
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, is_read: true } 
              : notification
          )
        );
        
        // Kurangi unread count
        setUnreadCount(prev => Math.max(0, prev - 1));
        
        showToast('success', 'Notifikasi ditandai sebagai dibaca');
      } else {
        showToast('error', result.error);
      }
      return result;
    } catch (error) {
      console.error('Error in markAsRead:', error);
      showToast('error', 'Gagal menandai notifikasi sebagai dibaca');
      return { success: false, error: error.message };
    }
  }, [executeMarkAsRead, showToast]);

  // Fungsi untuk menandai semua notifikasi sebagai dibaca
  const markAllAsRead = useCallback(async () => {
    try {
      const result = await executeMarkAllAsRead();
      if (result.success) {
        // Update semua notifikasi lokal
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, is_read: true }))
        );
        
        // Reset unread count
        setUnreadCount(0);
        
        showToast('success', 'Semua notifikasi ditandai sebagai dibaca');
      } else {
        showToast('error', result.error);
      }
      return result;
    } catch (error) {
      console.error('Error in markAllAsRead:', error);
      showToast('error', 'Gagal menandai semua notifikasi sebagai dibaca');
      return { success: false, error: error.message };
    }
  }, [executeMarkAllAsRead, showToast]);

  // Fungsi untuk mendapatkan jumlah notifikasi yang belum dibaca
  const getUnreadCount = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        return { success: true, data: 0 };
      }
      
      const result = await fetchUnreadCount();
      if (result.success) {
        setUnreadCount(result.data);
      }
      return result;
    } catch (error) {
      console.error('Error in getUnreadCount:', error);
      return { success: false, error: error.message, data: 0 };
    }
  }, [fetchUnreadCount, isAuthenticated]);

  // Ambil unread count saat komponen dimount
  useEffect(() => {
    if (isAuthenticated) {
      getUnreadCount().catch(error => {
        console.error('Failed to get unread count:', error);
      });
    }
  }, [isAuthenticated, getUnreadCount]);

  // Interval untuk mengambil jumlah notifikasi yang belum dibaca
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      getUnreadCount().catch(error => {
        console.error('Failed to get unread count in interval:', error);
      });
    }, 60000); // Cek setiap 1 menit
    
    return () => clearInterval(interval);
  }, [isAuthenticated, getUnreadCount]);

  // Nilai yang akan disediakan oleh context
  const value = {
    notifications,
    unreadCount,
    
    // Actions
    getNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    
    // Loading states
    loading: {
      notifications: notificationsLoading,
      markAsRead: markAsReadLoading,
      markAllAsRead: markAllAsReadLoading,
      unreadCount: unreadCountLoading
    }
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook untuk menggunakan NotificationContext
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};