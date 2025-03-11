// src/pages/users/Notification.jsx
import React, { useState, useEffect } from 'react';
import { FiBell, FiCheck, FiCheckCircle, FiFilter, FiRefreshCw, FiMessageSquare, FiFileText } from 'react-icons/fi';
import useNotification from '@/hooks/useNotification';
import { useToast } from '@/contexts/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import LoadingScreen from '@/components/common/LoadingScreen';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import { formatDate } from '@/utils/formatters';

const Notification = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    getNotifications,
    markAsRead,
    markAllAsRead,
    loading
  } = useNotification();
  
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Fetch notifications on component mount and when filter/page changes
  useEffect(() => {
    fetchNotifications();
  }, [filter, currentPage]);
  
  const fetchNotifications = async () => {
    try {
      const params = {
        page: currentPage,
        per_page: 10
      };
      
      // Add read filter if not showing all
      if (filter === 'unread') {
        params.is_read = false;
      } else if (filter === 'read') {
        params.is_read = true;
      }
      
      const result = await getNotifications(params);
      
      // Update total pages from result metadata if available
      if (result && result.meta) {
        setTotalPages(result.meta.total_pages || 1);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      addToast('Gagal memuat notifikasi', 'error');
    }
  };
  
  const handleMarkAsRead = async (id) => {
    try {
      const result = await markAsRead(id);
      if (result.success) {
        // No need to refetch if we're maintaining the state in context
      } else {
        addToast(result.error || 'Gagal menandai notifikasi sebagai dibaca', 'error');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      addToast('Terjadi kesalahan saat menandai notifikasi', 'error');
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllAsRead();
      if (result.success) {
        addToast('Semua notifikasi ditandai sebagai dibaca', 'success');
      } else {
        addToast(result.error || 'Gagal menandai semua notifikasi', 'error');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      addToast('Terjadi kesalahan saat menandai notifikasi', 'error');
    }
  };
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleRefresh = () => {
    fetchNotifications();
  };

  // Handler untuk navigasi ke halaman laporan
  const handleViewReport = (reportId, e) => {
    e.preventDefault();
    console.log('Navigating to report:', reportId);
    if (reportId) {
      // Pastikan reportId adalah string atau number yang valid
      navigate(`/laporan/${reportId}`);
    } else {
      addToast('ID laporan tidak valid', 'error');
    }
  };

  // Handler untuk navigasi ke halaman chat
  const handleViewChat = (reportId, e) => {
    e.preventDefault();
    console.log('Navigating to chat with reportId:', reportId);
    if (reportId) {
      navigate(`/chat?reportId=${reportId}`);
    } else {
      navigate('/chat'); // Fallback jika tidak ada reportId
    }
  };

  // Get appropriate icon for notification based on message content
  const getNotificationIcon = (message) => {
    if (!message) return <FiBell />;
    
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('pesan') || messageLower.includes('chat') || messageLower.includes('komunikasi')) {
      return <FiMessageSquare className="text-blue-500" />;
    } else if (messageLower.includes('laporan') || messageLower.includes('report')) {
      return <FiFileText className="text-green-500" />;
    } else if (messageLower.includes('selesai') || messageLower.includes('complete')) {
      return <FiCheckCircle className="text-green-500" />;
    } else {
      return <FiBell className="text-primary" />;
    }
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

  if (loading.notifications && !notifications.length) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount > 0 
                  ? `Anda memiliki ${unreadCount} notifikasi yang belum dibaca`
                  : 'Semua notifikasi telah dibaca'
                }
              </p>
            </div>
            
            <div className="flex space-x-2">
              {/* Filter Button */}
              <div className="relative">
                <Button
                  variant="outline"
                  icon={<FiFilter />}
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                >
                  {filter === 'all' ? 'Semua' : 
                   filter === 'unread' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                </Button>
                
                {isFilterMenuOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button 
                        className={`w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                        onClick={() => {
                          setFilter('all');
                          setCurrentPage(1);
                          setIsFilterMenuOpen(false);
                        }}
                      >
                        Semua
                      </button>
                      <button 
                        className={`w-full text-left px-4 py-2 text-sm ${filter === 'unread' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                        onClick={() => {
                          setFilter('unread');
                          setCurrentPage(1);
                          setIsFilterMenuOpen(false);
                        }}
                      >
                        Belum Dibaca
                      </button>
                      <button 
                        className={`w-full text-left px-4 py-2 text-sm ${filter === 'read' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                        onClick={() => {
                          setFilter('read');
                          setCurrentPage(1);
                          setIsFilterMenuOpen(false);
                        }}
                      >
                        Sudah Dibaca
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Refresh Button */}
              <Button
                variant="outline"
                icon={<FiRefreshCw />}
                onClick={handleRefresh}
                loading={loading.notifications}
              >
                Refresh
              </Button>
              
              {/* Mark All as Read Button */}
              {unreadCount > 0 && (
                <Button
                  variant="primary"
                  icon={<FiCheckCircle />}
                  onClick={handleMarkAllAsRead}
                  loading={loading.markAllAsRead}
                >
                  Tandai Semua Dibaca
                </Button>
              )}
            </div>
          </div>
          
          {/* Notification List */}
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => {
                // Debug logging
                logNotificationData(notification);
                
                // Analyze notification message for better display
                const hasReport = notification.report_id || 
                                  (notification.message && notification.message.toLowerCase().includes('laporan'));
                const isChat = notification.message && 
                               (notification.message.toLowerCase().includes('pesan') || 
                                notification.message.toLowerCase().includes('chat'));
                
                return (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border ${
                      notification.is_read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className={`p-2 rounded-full ${notification.is_read ? 'bg-gray-100' : 'bg-blue-100'} mr-3 mt-1 flex-shrink-0`}>
                          {getNotificationIcon(notification.message)}
                        </div>
                        
                        <div className="flex-1">
                          <p className={`${notification.is_read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center mt-1 space-x-3">
                            <p className="text-sm text-gray-500">
                              {formatDate(notification.created_at)}
                            </p>
                            
                            {/* Add action buttons based on notification type */}
                            <div className="flex space-x-2">
                              {hasReport && notification.report_id && (
                                <button
                                  onClick={(e) => handleViewReport(notification.report_id, e)}
                                  className="text-sm text-primary hover:underline inline-flex items-center"
                                >
                                  <FiFileText className="mr-1" size={14} />
                                  Lihat Laporan
                                </button>
                              )}
                              
                              {isChat && notification.report_id && (
                                <button
                                  onClick={(e) => handleViewChat(notification.report_id, e)}
                                  className="text-sm text-blue-600 hover:underline inline-flex items-center"
                                >
                                  <FiMessageSquare className="mr-1" size={14} />
                                  Lihat Pesan
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {!notification.is_read && (
                        <Button
                          variant="ghost"
                          size="small"
                          icon={<FiCheck />}
                          onClick={() => handleMarkAsRead(notification.id)}
                          loading={loading.markAsRead}
                          title="Tandai sudah dibaca"
                          className="flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState 
              icon={<FiBell size={48} />}
              title="Tidak Ada Notifikasi" 
              description={
                filter === 'all' 
                  ? "Anda belum memiliki notifikasi."
                  : filter === 'unread'
                    ? "Tidak ada notifikasi yang belum dibaca."
                    : "Tidak ada notifikasi yang sudah dibaca."
              }
              actionLabel="Refresh"
              actionOnClick={handleRefresh}
            />
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Notification;