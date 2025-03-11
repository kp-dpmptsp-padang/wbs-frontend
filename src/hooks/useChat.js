// src/hooks/useChat.js
import { useState, useCallback, useEffect, useRef } from 'react';
import chatService from '@/services/chat.service';
import { useToast } from '@/contexts/ToastContext';

/**
 * Custom hook untuk mengelola chat dalam satu laporan
 * @param {string|number} initialReportId - ID laporan awal (opsional)
 * @param {boolean} isAnonymous - Apakah laporan anonim
 * @returns {Object} - State dan method untuk mengelola chat
 */
const useChat = (initialReportId = null, isAnonymous = false) => {
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState(initialReportId);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  
  // Reference for polling interval
  const pollingInterval = useRef(null);
  
  // Load chats for a specific report
  const loadChats = useCallback(async (id, anonymous = isAnonymous) => {
    if (!id) {
      setError('ID Laporan diperlukan');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = anonymous 
        ? await chatService.getAnonymousReportChats(id)
        : await chatService.getReportChats(id);
        
      if (result.success) {
        setChats(result.data || []);
        setCurrentId(id);
        return true;
      } else {
        setError(result.error || 'Gagal memuat chat');
        addToast(result.error || 'Gagal memuat chat', 'error');
        return false;
      }
    } catch (err) {
      const errorMsg = 'Terjadi kesalahan saat memuat chat';
      setError(errorMsg);
      console.error(errorMsg, err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [addToast, isAnonymous]);
  
  // Send a message
  const sendMessage = useCallback(async (message) => {
    if (!currentId) {
      setError('ID Laporan diperlukan');
      return false;
    }
    
    if (!message || message.trim() === '') {
      setError('Pesan tidak boleh kosong');
      return false;
    }
    
    setIsSending(true);
    setError(null);
    
    try {
      const result = isAnonymous
        ? await chatService.sendAnonymousChatMessage(currentId, message)
        : await chatService.sendChatMessage(currentId, message);
        
      if (result.success && result.data) {
        setChats(prev => [...prev, result.data]);
        return true;
      } else {
        setError(result.error || 'Gagal mengirim pesan');
        addToast(result.error || 'Gagal mengirim pesan', 'error');
        return false;
      }
    } catch (err) {
      const errorMsg = 'Terjadi kesalahan saat mengirim pesan';
      setError(errorMsg);
      addToast(errorMsg, 'error');
      console.error(errorMsg, err);
      return false;
    } finally {
      setIsSending(false);
    }
  }, [currentId, isAnonymous, addToast]);
  
  // Start polling for new messages
  const startPolling = useCallback((interval = 30000) => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }
    
    if (!currentId) return;
    
    pollingInterval.current = setInterval(() => {
      if (isAnonymous) {
        chatService.getAnonymousReportChats(currentId)
          .then(result => {
            if (result.success) {
              setChats(result.data || []);
            }
          })
          .catch(err => console.error('Polling error:', err));
      } else {
        chatService.getReportChats(currentId)
          .then(result => {
            if (result.success) {
              setChats(result.data || []);
            }
          })
          .catch(err => console.error('Polling error:', err));
      }
    }, interval);
    
  }, [currentId, isAnonymous]);
  
  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  }, []);
  
  // Clear all chat data
  const clearChats = useCallback(() => {
    setChats([]);
    setCurrentId(null);
    setError(null);
    stopPolling();
  }, [stopPolling]);
  
  // Load chats automatically if initialReportId is provided
  useEffect(() => {
    if (initialReportId) {
      loadChats(initialReportId, isAnonymous);
      startPolling();
    }
    
    return () => {
      stopPolling();
    };
  }, [initialReportId, isAnonymous, loadChats, startPolling, stopPolling]);
  
  return {
    chats,
    isLoading,
    isSending,
    error,
    currentId,
    loadChats,
    sendMessage,
    clearChats,
    startPolling,
    stopPolling
  };
};

export default useChat;