// src/pages/users/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FiSend, 
  FiArrowLeft, 
  FiAlertTriangle, 
  FiClock, 
  FiCheckCircle,
  FiPaperclip,
  FiDownload,
  FiEye,
  FiMessageSquare,
  FiFileText
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Badge from '@/components/common/Badge';
import ChatBubbles, { ChatBubble } from '@/components/common/ChatBubbles';
import reportService from '@/services/report.service';
import chatService from '@/services/chat.service';
import { formatDate } from '@/utils/formatters';

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
  const [activeTab, setActiveTab] = useState('chat');
  
  // Refs
  const chatContainerRef = useRef(null);
  const chatPollingRef = useRef(null);
  const inputRef = useRef(null);

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
  }, [reportId, uniqueCode, addToast, navigate]);
  
  // Fetch chat history function
  const fetchChatHistory = async () => {
    try {
      let chatResult;
      
      if (uniqueCode) {
        chatResult = await chatService.getAnonymousReportChats(uniqueCode);
      } else if (reportId) {
        chatResult = await chatService.getReportChats(reportId);
      }
      
      if (chatResult && chatResult.success) {
        const chatData = Array.isArray(chatResult.data) ? chatResult.data : [];
        setChats(chatData);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Don't show toast on automatic polling
    }
  };
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current && activeTab === 'chat') {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats, activeTab]);

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
        
        // Focus back on input after sending
        if (inputRef.current) {
          inputRef.current.focus();
        }
        
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

  /**
   * Determine if message is from the current user
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

  /**
   * Get sender name display text
   */
  const getSenderName = (chatMsg, isCurrentUser) => {
    if (uniqueCode) {
      return isCurrentUser ? 'Anda (Pelapor Anonim)' : `${chatMsg.user?.name || 'Admin'}`;
    }
    
    if (isCurrentUser) {
      return `Anda (${user.role === 'admin' || user.role === 'super-admin' ? 'Admin' : 'Pelapor'})`;
    }
    
    return `${chatMsg.user?.name || 'Admin'} (${chatMsg.user?.role === 'admin' || chatMsg.user?.role === 'super-admin' ? 'Admin' : 'Pelapor'})`;
  };

  /**
   * Get status display for report state
   */
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'menunggu-verifikasi':
        return { 
          label: 'Menunggu Verifikasi', 
          icon: <FiAlertTriangle />,
          variant: 'warning',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      case 'diproses':
        return { 
          label: 'Sedang Diproses', 
          icon: <FiClock />,
          variant: 'info',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        };
      case 'selesai':
        return { 
          label: 'Selesai', 
          icon: <FiCheckCircle />,
          variant: 'success',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      case 'ditolak':
        return { 
          label: 'Ditolak', 
          icon: <FiAlertTriangle />,
          variant: 'danger',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      default:
        return { 
          label: status, 
          icon: <FiAlertTriangle />,
          variant: 'default',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  // Check if user can send messages based on report status
  const canSendMessage = () => {
    if (!report) return false;
    return report.status !== 'ditolak' && report.status !== 'menunggu-verifikasi';
  };

  // Format timestamp for chat messages
  const formatChatTime = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost-primary"
              size="small"
              className="mr-3"
              onClick={goBack}
              icon={<FiArrowLeft />}
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {isReportLoading ? 'Loading...' : report ? report.title : 'Komunikasi'}
              </h2>
              {report && (
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">{report.location}</span>
                </div>
              )}
            </div>
          </div>
          
          {report && (
            <Badge 
              variant={getStatusDisplay(report.status).variant} 
              size="md" 
              icon={getStatusDisplay(report.status).icon}
            >
              {getStatusDisplay(report.status).label}
            </Badge>
          )}
        </div>
        
        {/* Custom Tabs */}
        <div className="border-b border-gray-200 px-6 py-2">
          <div className="flex">
            <button
              className={`mr-4 py-2 px-1 flex items-center border-b-2 text-sm font-medium ${
                activeTab === 'chat'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              <FiMessageSquare className="mr-2" />
              Komunikasi
            </button>
            <button
              className={`py-2 px-1 flex items-center border-b-2 text-sm font-medium ${
                activeTab === 'details'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('details')}
            >
              <FiFileText className="mr-2" />
              Detail Laporan
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div>
              <div 
                ref={chatContainerRef}
                className="bg-gray-50 rounded-lg border border-gray-200 h-96 overflow-y-auto p-4"
              >
                {chats && chats.length > 0 ? (
                  <ChatBubbles>
                    {chats.map((chat, index) => {
                      if (!chat || typeof chat !== 'object') {
                        return null;
                      }
                      
                      const isCurrentUser = isUserMessage(chat);
                      const senderName = getSenderName(chat, isCurrentUser);
                      const timestamp = formatChatTime(chat.created_at);
                      
                      return (
                        <ChatBubble
                          key={chat.id || `chat-${index}`}
                          message={chat.message}
                          sender={senderName}
                          isCurrentUser={isCurrentUser}
                          timestamp={timestamp}
                          variant={isCurrentUser ? "light" : "default"}
                        />
                      );
                    })}
                  </ChatBubbles>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-gray-500">Belum ada pesan.</p>
                      {canSendMessage() ? (
                        <p className="text-sm text-gray-400 mt-1">Mulai komunikasi dengan mengirim pesan.</p>
                      ) : (
                        <p className="text-sm text-gray-400 mt-1">
                          {report?.status === 'ditolak' 
                            ? 'Komunikasi tidak tersedia karena laporan ditolak.' 
                            : 'Komunikasi akan tersedia setelah laporan diproses.'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="mt-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Input
                      ref={inputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ketik pesan..."
                      disabled={isSending || !canSendMessage()}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<FiSend />}
                    disabled={!message.trim() || isSending || !canSendMessage()}
                    loading={isSending}
                  >
                    Kirim
                  </Button>
                </form>
                
                {!canSendMessage() && (
                  <p className="text-xs text-gray-500 mt-2">
                    {report?.status === 'ditolak' 
                      ? 'Anda tidak dapat mengirim pesan karena laporan sudah ditolak.' 
                      : 'Komunikasi akan tersedia setelah laporan diproses oleh admin.'}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Details Tab */}
          {activeTab === 'details' && report && (
            <div className="bg-white rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Jenis Pelanggaran</h4>
                  <p className="text-gray-900">{report.violation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Tanggal Kejadian</h4>
                  <p className="text-gray-900">{formatDate(report.date)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h4>
                  <p className="text-gray-900">{report.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Pihak yang Terlibat</h4>
                  <p className="text-gray-900">{report.actors}</p>
                </div>
                {report.unique_code && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Kode Unik</h4>
                    <p className="text-gray-900">{report.unique_code}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <div>
                    <Badge 
                      variant={getStatusDisplay(report.status).variant} 
                      size="md" 
                      icon={getStatusDisplay(report.status).icon}
                    >
                      {getStatusDisplay(report.status).label}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Detail Kejadian</h4>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-gray-900 whitespace-pre-line">{report.detail}</p>
                </div>
              </div>
              
              {/* Lampiran */}
              {report.files && report.files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Lampiran</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.files.map((file, index) => (
                      <a
                        key={index}
                        href={file.file_url || file.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                      >
                        {file.file_type === 'image' ? (
                          <FiEye className="mr-2" />
                        ) : (
                          <FiPaperclip className="mr-2" />
                        )}
                        {file.file_path.split('/').pop()}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Rejection reason if rejected */}
              {report.status === 'ditolak' && report.rejection_reason && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800 mb-1">Alasan Penolakan</h4>
                  <p className="text-red-700">{report.rejection_reason}</p>
                </div>
              )}
              
              {/* Admin notes if completed */}
              {report.status === 'selesai' && report.admin_notes && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-1">Catatan Penyelesaian</h4>
                  <p className="text-green-700">{report.admin_notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Chat;