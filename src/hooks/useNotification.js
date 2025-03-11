// src/hooks/useNotification.js
import { useContext, useEffect } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';

/**
 * Custom hook for accessing and managing notifications
 * Provides all notification-related functionality from the NotificationContext
 * 
 * @returns {Object} - All notification state and functions
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  // Fetch unread count on hook initialization
  useEffect(() => {
    // Only fetch if the user is authenticated (checked in the context)
    if (context.getUnreadCount) {
      context.getUnreadCount();
    }
  }, [context.getUnreadCount]);

  return context;
};

// Also provide a default export for backward compatibility
export default useNotification;