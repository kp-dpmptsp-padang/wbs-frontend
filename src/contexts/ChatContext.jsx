// src/contexts/ChatContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { chatService } from '@/services';
import useApi from '@/hooks/useApi';
import { useToast } from './ToastContext';

// Membuat context untuk chat
const ChatContext = createContext(null);

// Provider untuk chat context
export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentReportId, setCurrentReportId] = useState(null);
  const [isAnonymousChat, setIsAnonymousChat] = useState(false);
  const { showToast } = useToast();
  
  // Gunakan custom hook useApi
  const { loading: chatsLoading, execute: fetchReportChats } = useApi(chatService.getReportChats);
  const { loading: anonymousChatsLoading, execute: fetchAnonymousChats } = useApi(chatService.getAnonymousReportChats);
  const { loading: sendMessageLoading, execute: executeSendMessage } = useApi(chatService.sendChatMessage);
  const { loading: sendAnonymousMessageLoading, execute: executeSendAnonymousMessage } = useApi(chatService.sendAnonymousChatMessage);

  // Fungsi untuk mendapatkan riwayat chat untuk laporan tertentu
  const getReportChats = useCallback(async (reportId) => {
    setCurrentReportId(reportId);
    setIsAnonymousChat(false);
    
    const result = await fetchReportChats(reportId);
    if (result.success) {
      setChats(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchReportChats, showToast]);

  // Fungsi untuk mendapatkan riwayat chat untuk laporan anonim
  const getAnonymousReportChats = useCallback(async (uniqueCode) => {
    setCurrentReportId(uniqueCode);
    setIsAnonymousChat(true);
    
    const result = await fetchAnonymousChats(uniqueCode);
    if (result.success) {
      setChats(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchAnonymousChats, showToast]);

  // Fungsi untuk mengirim pesan chat
  const sendChatMessage = useCallback(async (message) => {
    if (!currentReportId) {
      showToast('error', 'Tidak ada laporan yang dipilih');
      return { success: false };
    }
    
    let result;
    
    if (isAnonymousChat) {
      result = await executeSendAnonymousMessage(currentReportId, message);
    } else {
      result = await executeSendMessage(currentReportId, message);
    }
    
    if (result.success) {
      // Tambahkan pesan ke daftar chat lokal
      setChats(prev => [...prev, result.data]);
    } else {
      showToast('error', result.error);
    }
    
    return result;
  }, [
    currentReportId, 
    isAnonymousChat, 
    executeSendMessage, 
    executeSendAnonymousMessage, 
    showToast
  ]);

  // Nilai yang akan disediakan oleh context
  const value = {
    chats,
    currentReportId,
    isAnonymousChat,
    
    // Actions
    getReportChats,
    getAnonymousReportChats,
    sendChatMessage,
    
    // Loading states
    loading: {
      chats: chatsLoading || anonymousChatsLoading,
      sendMessage: sendMessageLoading || sendAnonymousMessageLoading
    },
    
    // Helpers
    clearChats: () => {
      setChats([]);
      setCurrentReportId(null);
      setIsAnonymousChat(false);
    }
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