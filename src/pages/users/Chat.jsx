// src/pages/users/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSend, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import reportService from '@/services/report.service';
import chatService from '@/services/chat.service';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const reportId = queryParams.get('reportId');
  const uniqueCode = queryParams.get('uniqueCode');
  
  // State
  const [report, setReport] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isReportLoading, setIsReportLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  // Refs
  const chatContainerRef = useRef(null);
  const chatPollingRef = useRef(null);

  // Log key info
  useEffect(() => {
    console.log('Chat component mounted:', { reportId, uniqueCode, user });
  }, [reportId, uniqueCode, user]);

  // Fetch report details and chats
  useEffect(() => {
    const fetchData = async () => {
      if (!reportId && !uniqueCode) {
        addToast('ID Laporan atau Kode Unik diperlukan', 'error');
        navigate('/dashboard');
        return;
      }

      try {
        setIsReportLoading(true);
        
        // Fetch report details
        let reportResult;
        if (uniqueCode) {
          reportResult = await reportService.getAnonymousReportDetail(uniqueCode);
        } else {
          reportResult = await reportService.getReportDetail(reportId);
        }

        if (reportResult.success) {
          setReport(reportResult.data);
        } else {
          addToast(reportResult.error || 'Gagal memuat detail laporan', 'error');
          navigate(-1);
          return;
        }
        
        setIsReportLoading(false);
        
        // Fetch chat history
        fetchChatHistory();
      } catch (error) {
        console.error('Error fetching data:', error);
        addToast('Terjadi kesalahan saat memuat data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // Set up polling for new messages
    chatPollingRef.current = setInterval(() => {
      fetchChatHistory();
    }, 15000); // Poll every 15 seconds
    
    return () => {
      if (chatPollingRef.current) {
        clearInterval(chatPollingRef.current);
      }
    };
  }, [reportId, uniqueCode]);
  
  // Fetch chat history function
  const fetchChatHistory = async () => {
    try {
      console.log('Fetching chat history...');
      let chatResult;
      
      if (uniqueCode) {
        chatResult = await chatService.getAnonymousReportChats(uniqueCode);
      } else if (reportId) {
        chatResult = await chatService.getReportChats(reportId);
      }
      
      if (chatResult && chatResult.success) {
        const chatData = Array.isArray(chatResult.data) ? chatResult.data : [];
        console.log('Chat data received:', chatData);
        setChats(chatData);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Don't show toast on automatic polling
    }
  };
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsSending(true);
    
    try {
      let result;
      
      if (uniqueCode) {
        result = await chatService.sendAnonymousChatMessage(uniqueCode, message);
      } else {
        result = await chatService.sendChatMessage(reportId, message);
      }
      
      if (result.success && result.data) {
        // Add new message to chat list
        setChats(prev => {
          const prevChats = Array.isArray(prev) ? prev : [];
          return [...prevChats, result.data];
        });
        
        setMessage('');
        
        // Fetch latest chat after sending
        setTimeout(() => fetchChatHistory(), 500);
      } else {
        addToast(result.error || 'Gagal mengirim pesan', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addToast('Terjadi kesalahan saat mengirim pesan', 'error');
    } finally {
      setIsSending(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  /**
   * Determine if message is from the current user
   * Simplified logic:
   * 1. For anonymous reports: messages without user data are from the anonymous user
   * 2. For regular reports: compare user IDs
   */
  const isUserMessage = (chatMsg) => {
    // For anonymous reports
    if (uniqueCode) {
      // Messages without user object are from anonymous reporter
      return !chatMsg.user;
    }
    
    // For regular reports, compare user IDs
    return chatMsg.user && user && String(chatMsg.user.id) === String(user.id);
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-4 md:p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="text"
              className="mr-2 -ml-2"
              onClick={goBack}
            >
              <FiArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">
              {isReportLoading ? 'Loading...' : 
               report ? report.title : 'Komunikasi'}
            </h1>
          </div>
          
          <div className="flex flex-col h-full">
            {/* Report Preview */}
            {report && (
              <div className="mb-4 bg-gray-50 p-3 rounded-md">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white rounded px-3 py-1 text-sm border">
                    <span className="font-medium">Status:</span> {
                      report.status === 'menunggu-verifikasi' ? 'Menunggu Verifikasi' :
                      report.status === 'diproses' ? 'Sedang Diproses' :
                      report.status === 'selesai' ? 'Selesai' : 
                      report.status === 'ditolak' ? 'Ditolak' : report.status
                    }
                  </div>
                  <div className="bg-white rounded px-3 py-1 text-sm border">
                    <span className="font-medium">Lokasi:</span> {report.location}
                  </div>
                </div>
              </div>
            )}
            
            {/* Chat Messages */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg mb-4">
              <div className="h-96 overflow-y-auto p-4" ref={chatContainerRef}>
                {chats && chats.length > 0 ? (
                  <div>
                    {chats.map((chat, index) => {
                      if (!chat || typeof chat !== 'object') {
                        console.warn('Invalid chat message:', chat);
                        return null;
                      }
                      
                      const userMessage = isUserMessage(chat);
                      
                      return (
                        <div key={chat.id || index} className={`flex ${userMessage ? 'justify-end' : 'justify-start'} mb-3`}>
                          <div 
                            className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg shadow-sm ${ 
                              userMessage 
                                ? 'bg-blue-50 border border-blue-100 text-gray-800' 
                                : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                          >
                            <div className="text-xs font-semibold mb-1 flex justify-between">
                              <span className={userMessage ? 'text-blue-600' : 'text-gray-600'}>
                                {userMessage ? 
                                  (uniqueCode ? 'Anonim (Pelapor)' : (user ? `${user.name} (Pelapor)` : 'Pelapor')) : 
                                  `${chat.user?.name || 'Admin'} (${chat.user?.role === 'admin' || chat.user?.role === 'super-admin' ? 'Admin' : 'Pelapor'})`
                                }
                              </span>
                              <span className="text-gray-500 ml-4">
                                {formatTime(chat.created_at)}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap break-words">{chat.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900">Belum Ada Pesan</h3>
                      <p className="text-sm text-gray-600 mt-1">Mulai komunikasi dengan mengirim pesan pertama Anda</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-grow"
                disabled={isSending}
              />
              <Button
                type="submit"
                variant="primary"
                icon={<FiSend />}
                disabled={!message.trim() || isSending}
                loading={isSending}
              >
                Kirim
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;