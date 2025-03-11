// src/contexts/ChatContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { chatService } from '@/services';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

// Membuat context untuk chat
const ChatContext = createContext(null);

// Provider untuk chat context
export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentReportId, setCurrentReportId] = useState(null);
  const [isAnonymousChat, setIsAnonymousChat] = useState(false);
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [lastUpdate, setLastUpdate] = useState(null);
  
  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    chats: false,
    sendMessage: false
  });

  // Set loading state helper
  const setLoading = (key, value) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Fungsi untuk mendapatkan riwayat chat untuk laporan tertentu
  const getReportChats = useCallback(async (reportId) => {
    if (!reportId) {
      addToast('ID Laporan diperlukan', 'error');
      return { success: false, error: 'ID Laporan diperlukan' };
    }
    
    setLoading('chats', true);
    setCurrentReportId(reportId);
    setIsAnonymousChat(false);
    
    try {
      const result = await chatService.getReportChats(reportId);
      if (result.success) {
        // Pastikan data adalah array
        const chatData = Array.isArray(result.data) ? result.data : [];
        setChats(chatData);
        setLastUpdate(new Date());
      } else {
        addToast(result.error || 'Gagal memuat riwayat chat', 'error');
      }
      return result;
    } catch (error) {
      console.error('Error in getReportChats:', error);
      addToast('Terjadi kesalahan saat memuat chat', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading('chats', false);
    }
  }, [addToast]);

  // Fungsi untuk mendapatkan riwayat chat untuk laporan anonim
  const getAnonymousReportChats = useCallback(async (uniqueCode) => {
    if (!uniqueCode) {
      addToast('Kode unik diperlukan', 'error');
      return { success: false, error: 'Kode unik diperlukan' };
    }
    
    setLoading('chats', true);
    setCurrentReportId(uniqueCode);
    setIsAnonymousChat(true);
    
    try {
      const result = await chatService.getAnonymousReportChats(uniqueCode);
      if (result.success) {
        // Pastikan data adalah array
        const chatData = Array.isArray(result.data) ? result.data : [];
        setChats(chatData);
        setLastUpdate(new Date());
      } else {
        addToast(result.error || 'Gagal memuat riwayat chat', 'error');
      }
      return result;
    } catch (error) {
      console.error('Error in getAnonymousReportChats:', error);
      addToast('Terjadi kesalahan saat memuat chat', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading('chats', false);
    }
  }, [addToast]);

  // Fungsi untuk mengirim pesan chat
  const sendChatMessage = useCallback(async (message) => {
    if (!currentReportId) {
      addToast('Tidak ada laporan yang dipilih', 'error');
      return { success: false, error: 'Tidak ada laporan yang dipilih' };
    }
    
    if (!message || message.trim() === '') {
      addToast('Pesan tidak boleh kosong', 'warning');
      return { success: false, error: 'Pesan tidak boleh kosong' };
    }
    
    setLoading('sendMessage', true);
    
    try {
      let result;
      
      if (isAnonymousChat) {
        result = await chatService.sendAnonymousChatMessage(currentReportId, message);
      } else {
        result = await chatService.sendChatMessage(currentReportId, message);
      }
      
      if (result.success && result.data) {
        // Tambahkan pesan ke daftar chat lokal
        // Pastikan prev adalah array sebelum menggunakan spread operator
        setChats(prev => {
          const prevChats = Array.isArray(prev) ? prev : [];
          return [...prevChats, result.data];
        });
        setLastUpdate(new Date());
      } else {
        addToast(result.error || 'Gagal mengirim pesan', 'error');
      }
      
      return result;
    } catch (error) {
      console.error('Error in sendChatMessage:', error);
      addToast('Terjadi kesalahan saat mengirim pesan', 'error');
      return { success: false, error: error.message };
    } finally {
      setLoading('sendMessage', false);
    }
  }, [currentReportId, isAnonymousChat, addToast]);

  // Poll for new messages every 30 seconds if there's an active chat
  useEffect(() => {
    if (!isAuthenticated || !currentReportId) return;
    
    const pollInterval = setInterval(() => {
      if (isAnonymousChat) {
        getAnonymousReportChats(currentReportId);
      } else {
        getReportChats(currentReportId);
      }
    }, 30000); // 30 seconds
    
    return () => clearInterval(pollInterval);
  }, [isAuthenticated, currentReportId, isAnonymousChat, getReportChats, getAnonymousReportChats]);

  // Nilai yang akan disediakan oleh context
  const value = {
    chats,
    currentReportId,
    isAnonymousChat,
    lastUpdate,
    
    // Actions
    getReportChats,
    getAnonymousReportChats,
    sendChatMessage,
    
    // Loading states
    loading: loadingStates,
    
    // Helpers
    clearChats: useCallback(() => {
      setChats([]);
      setCurrentReportId(null);
      setIsAnonymousChat(false);
    }, [])
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook untuk menggunakan ChatContext
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};