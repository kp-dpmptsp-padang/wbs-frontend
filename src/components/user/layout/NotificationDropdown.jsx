// src/components/user/layout/NotificationDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiCheck, FiX, FiFileText, FiMessageSquare } from 'react-icons/fi';
import useNotification from '@/hooks/useNotification';
import { formatDate } from '@/utils/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    getNotifications, 
    markAsRead, 
    markAllAsRead,
    getUnreadCount,
    loading 
  } = useNotification();
  const dropdownRef = useRef(null);
  const refreshTimerRef = useRef(null);

  // Fetch unread count on component mount
  useEffect(() => {
    // Initial fetch of unread count
    getUnreadCount();
    
    // Set up periodic refresh for unread notifications (every 30 seconds)
    refreshTimerRef.current = setInterval(() => {
      getUnreadCount();
    }, 30000);
    
    return () => {
      // Clean up interval on unmount
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [getUnreadCount]);

  useEffect(() => {
    // Load notifications when dropdown is opened
    if (isOpen) {
      getNotifications({ per_page: 5 });
    }
  }, [isOpen, getNotifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async (e) => {
    e.stopPropagation();
    await markAllAsRead();
  };

  // Navigation handlers
  const handleViewReport = (reportId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false); // Close dropdown
    
    console.log('Navigating to report:', reportId);
    if (reportId) {
      navigate(`/laporan/${reportId}`);
    }
  };

  const handleViewChat = (reportId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false); // Close dropdown
    
    console.log('Navigating to chat with reportId:', reportId);
    if (reportId) {
      navigate(`/chat?reportId=${reportId}`);
    } else {
      navigate('/chat');
    }
  };

  // Get notification text color based on read status
  const getTextColorClass = (isRead) => {
    return isRead ? 'text-gray-600' : 'text-gray-900 font-medium';
  };

  // Extract preview text from notification message
  const getMessagePreview = (message) => {
    if (!message) return '';
    
    // If message is longer than 100 characters, truncate it
    if (message.length > 100) {
      return message.substring(0, 100) + '...';
    }
    
    return message;
  };

  // Get icon based on message content
  const getNotificationIcon = (notification) => {
    if (!notification || !notification.message) return null;
    
    const message = notification.message.toLowerCase();
    
    if (message.includes('pesan') || message.includes('chat')) {
      return <FiMessageSquare className="mr-1 text-blue-500" size={14} />;
    } else if (message.includes('laporan') || message.includes('report')) {
      return <FiFileText className="mr-1 text-green-500" size={14} />;
    }
    
    return null;
  };

  // Debug function to log notification data
  const logNotificationData = (notification) => {
    console.log('Notification data:', {
      id: notification.id,
      message: notification.message, 
      report_id: notification.report_id,
      created_at: notification.created_at,
      is_read: notification.is_read
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-1 text-gray-600 hover:text-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notifikasi</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary-dark"
                disabled={loading.markAllAsRead}
              >
                {loading.markAllAsRead ? (
                  <LoadingSpinner size="xs" />
                ) : (
                  'Tandai semua dibaca'
                )}
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto py-1">
            {loading.notifications ? (
              <div className="p-4 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => {
                // Debug log
                logNotificationData(notification);
                
                // Check if notification has report or chat related content
                const message = notification.message ? notification.message.toLowerCase() : '';
                const hasReport = notification.report_id || message.includes('laporan') || message.includes('report');
                const isChat = message.includes('pesan') || message.includes('chat');
                
                return (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors relative border-l-2 ${
                      notification.is_read ? 'border-transparent' : 'border-primary'
                    }`}
                  >
                    <p className={`text-sm ${getTextColorClass(notification.is_read)}`}>
                      {getMessagePreview(notification.message)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification.created_at)}
                    </p>

                    {/* Actions for this notification */}
                    <div className="flex mt-2 space-x-3">
                      {hasReport && notification.report_id && (
                        <button
                          onClick={(e) => handleViewReport(notification.report_id, e)}
                          className="text-xs text-primary hover:underline inline-flex items-center"
                        >
                          <FiFileText className="mr-1" size={12} />
                          Lihat Laporan
                        </button>
                      )}
                      
                      {isChat && notification.report_id && (
                        <button
                          onClick={(e) => handleViewChat(notification.report_id, e)}
                          className="text-xs text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FiMessageSquare className="mr-1" size={12} />
                          Lihat Pesan
                        </button>
                      )}
                    </div>

                    {/* Mark as read button */}
                    {!notification.is_read && (
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        title="Tandai dibaca"
                        disabled={loading.markAsRead}
                      >
                        {loading.markAsRead ? (
                          <LoadingSpinner size="xs" />
                        ) : (
                          <FiCheck size={16} />
                        )}
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                Tidak ada notifikasi
              </div>
            )}
          </div>

          <div className="p-2 border-t border-gray-100 text-center">
            <button
              className="text-xs text-primary hover:text-primary-dark"
              onClick={() => {
                setIsOpen(false);
                navigate('/notifikasi');
              }}
            >
              Lihat Semua Notifikasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;