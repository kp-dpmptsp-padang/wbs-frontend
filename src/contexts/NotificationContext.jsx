// src/contexts/NotificationContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { notificationService } from '@/services';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

// Create context for notifications
const NotificationContext = createContext(null);

// Export the context so it can be imported in useNotification.js
export { NotificationContext };

/**
 * Provider component for notification context
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [meta, setMeta] = useState({});
  const { addToast } = useToast();
  const { isAuthenticated, user } = useAuth();
  
  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    notifications: false,
    markAsRead: false,
    markAllAsRead: false,
    unreadCount: false
  });

  // Set loading state helper
  const setLoading = (key, value) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: value
    }));
  };

  /**
   * Get notifications with optional filters and pagination
   */
  const getNotifications = useCallback(async (params = {}) => {
    if (!isAuthenticated) {
      return { success: true, data: [], meta: {} };
    }
    
    setLoading('notifications', true);
    
    try {
      const result = await notificationService.getNotifications(params);
      
      if (result.success) {
        setNotifications(result.data || []);
        
        // Set metadata for pagination
        if (result.meta) {
          setMeta(result.meta);
          
          // If unread count is available in meta, update it
          if (typeof result.meta.unread_count !== 'undefined') {
            setUnreadCount(result.meta.unread_count);
          }
        }
      } else {
        addToast(result.error || 'Failed to fetch notifications', 'error');
      }
      
      return result;
    } catch (error) {
      console.error('Error in getNotifications:', error);
      addToast('An error occurred while fetching notifications', 'error');
      return { success: false, error: error.message, data: [], meta: {} };
    } finally {
      setLoading('notifications', false);
    }
  }, [isAuthenticated, addToast]);

  /**
   * Mark a notification as read
   */
  const markAsRead = useCallback(async (notificationId) => {
    if (!notificationId) {
      return { success: false, error: 'Notification ID is required' };
    }
    
    setLoading('markAsRead', true);
    
    try {
      const result = await notificationService.markAsRead(notificationId);
      
      if (result.success) {
        // Update local state
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, is_read: true } 
              : notification
          )
        );
        
        // Decrease unread count
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        addToast(result.error || 'Failed to mark notification as read', 'error');
      }
      
      return result;
    } catch (error) {
      console.error('Error in markAsRead:', error);
      addToast('An error occurred while marking notification as read', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading('markAsRead', false);
    }
  }, [addToast]);

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    setLoading('markAllAsRead', true);
    
    try {
      const result = await notificationService.markAllAsRead();
      
      if (result.success) {
        // Update all notifications in local state
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, is_read: true }))
        );
        
        // Reset unread count
        setUnreadCount(0);
      } else {
        addToast(result.error || 'Failed to mark all notifications as read', 'error');
      }
      
      return result;
    } catch (error) {
      console.error('Error in markAllAsRead:', error);
      addToast('An error occurred while marking all notifications as read', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading('markAllAsRead', false);
    }
  }, [addToast]);

  /**
   * Get unread notification count
   */
  const getUnreadCount = useCallback(async () => {
    if (!isAuthenticated) {
      return { success: true, data: 0 };
    }
    
    setLoading('unreadCount', true);
    
    try {
      const result = await notificationService.getUnreadCount();
      
      if (result.success) {
        setUnreadCount(result.data);
      }
      
      return result;
    } catch (error) {
      console.error('Error in getUnreadCount:', error);
      return { success: false, error: error.message, data: 0 };
    } finally {
      setLoading('unreadCount', false);
    }
  }, [isAuthenticated]);

  // Fetch unread count when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      getUnreadCount();
    } else {
      // Reset notifications when logged out
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, getUnreadCount]);

  // Poll for new notifications every minute if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      getUnreadCount();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [isAuthenticated, getUnreadCount]);

  // Context value to be provided
  const value = {
    notifications,
    unreadCount,
    meta,
    
    // Actions
    getNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    
    // Loading states
    loading: loadingStates
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Note: We're still exporting the hook for backward compatibility,
// but you should use the imported one from useNotification.js
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};