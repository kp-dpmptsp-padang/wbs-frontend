// src/pages/users/reporter/MonitorAnonymReport.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiAlertTriangle, 
  FiClock, 
  FiCheckCircle, 
  FiFileText, 
  FiEye, 
  FiSend,
  FiPaperclip,
  FiDownload
} from 'react-icons/fi';
import reportService from '@/services/report.service';
import chatService from '@/services/chat.service';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import EmptyState from '@/components/common/EmptyState';
import PageContainer from '@/components/user/layout/PageContainer';
import Badge from '@/components/common/Badge';
import ChatBubbles, { ChatBubble } from '@/components/common/ChatBubbles';
import { formatDate } from '@/utils/formatters';

const MonitorAnonymReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [reportData, setReportData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Check if a code was passed via location state (e.g., after submitting anonymous report)
  useEffect(() => {
    if (location.state?.uniqueCode) {
      setUniqueCode(location.state.uniqueCode);
      fetchReportByCode(location.state.uniqueCode);
      
      // Clear the state so refreshing doesn't re-fetch
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location]);

  const fetchReportByCode = async (code) => {
    setIsSearching(true);
    setIsLoading(true);
    try {
      const result = await reportService.getAnonymousReportDetail(code);
      if (result.success) {
        setReportData(result.data); 
        setShowForm(false); // Hide the form once we have data
        
        // Fetch chat messages for this report
        fetchChatMessages(code);
      } else {
        addToast(result.error || 'Laporan tidak ditemukan', 'error');
        setReportData(null);
      }
    } catch (error) {
      console.error('Error fetching anonymous report:', error);
      addToast('Terjadi kesalahan saat memuat laporan', 'error');
      setReportData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatMessages = async (code) => {
    try {
      const result = await chatService.getAnonymousReportChats(code);
      if (result.success) {
        setChatMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      // Don't show toast for this, it's secondary to the main functionality
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uniqueCode.trim()) {
      addToast('Masukkan kode unik terlebih dahulu', 'warning');
      return;
    }
    
    fetchReportByCode(uniqueCode.trim());
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !uniqueCode) return;
    
    setIsSendingMessage(true);
    try {
      const result = await chatService.sendAnonymousChatMessage(uniqueCode, newMessage);
      if (result.success) {
        // Add the new message to the chat
        setChatMessages(prev => [...prev, result.data]);
        setNewMessage(''); // Clear input
      } else {
        addToast(result.error || 'Gagal mengirim pesan', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addToast('Terjadi kesalahan saat mengirim pesan', 'error');
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Reset view to show form again
  const handleCheckAnother = () => {
    setShowForm(true);
    setReportData(null);
    setChatMessages([]);
    setUniqueCode('');
  };

  // Helper to format the status display
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
          label: 'Unknown', 
          icon: <FiFileText />,
          variant: 'default',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  // Render the entry form
  const renderEntryForm = () => (
    <div className="max-w-8xl mx-auto mt-8">
      <Card className="p-8 shadow-md">
        <div className="text-center">
          <FiFileText className="mx-auto text-primary size-16 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cek Status Laporan Anonim</h2>
          <p className="text-gray-600 mb-6">
            Masukkan kode unik yang Anda dapat saat berhasil membuat laporan sebagai anonim
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Masukkan Kode Unik"
              value={uniqueCode}
              onChange={(e) => setUniqueCode(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            block
            className="py-3"
          >
            Lihat Status
          </Button>
        </form>
      </Card>
    </div>
  );

  // Render the report details and chat section
  const renderReportDetails = () => {
    if (!reportData) return null;
    
    const statusInfo = getStatusDisplay(reportData.status);
    
    return (
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Actions */}
        <div className="flex justify-end">
          <Button
            variant="outline-gray"
            onClick={handleCheckAnother}
            icon={<FiSearch />}
          >
            Cek Laporan Lain
          </Button>
        </div>

        {/* Report Detail Card */}
        <Card>
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Detail Laporan</h2>
            <Badge variant={statusInfo.variant} size="md" icon={statusInfo.icon}>
              {statusInfo.label}
            </Badge>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{reportData.title}</h3>
            <p className="text-sm text-gray-500 mb-6">Kode Unik: {reportData.unique_code}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Jenis Pelanggaran</h4>
                <p className="text-gray-900">{reportData.violation}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Tanggal Kejadian</h4>
                <p className="text-gray-900">{formatDate(reportData.date)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h4>
                <p className="text-gray-900">{reportData.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Pihak yang Terlibat</h4>
                <p className="text-gray-900">{reportData.actors}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Detail Kejadian</h4>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-900 whitespace-pre-line">{reportData.detail}</p>
              </div>
            </div>

            {/* Rejection reason if rejected */}
            {reportData.status === 'ditolak' && reportData.rejection_reason && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="text-sm font-medium text-red-800 mb-1">Alasan Penolakan</h4>
                <p className="text-red-700">{reportData.rejection_reason}</p>
              </div>
            )}
            
            {/* Admin notes if completed */}
            {reportData.status === 'selesai' && reportData.admin_notes && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 mb-1">Catatan Penyelesaian</h4>
                <p className="text-green-700">{reportData.admin_notes}</p>
              </div>
            )}
            
            {/* Lampiran */}
            {reportData.files && reportData.files.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Lampiran</h4>
                <div className="flex flex-wrap gap-2">
                  {reportData.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.file_url || `${file.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                    >
                      {file.file_type === 'evidence' ? (
                        <FiPaperclip className="mr-2" />
                      ) : (
                        <FiDownload className="mr-2" />
                      )}
                      {file.file_path.split('/').pop()}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
        
        {/* Chat Communication Card */}
        <Card>
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Komunikasi</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg border border-gray-200 mb-4">
              <div className="h-96 overflow-y-auto p-4">
                {chatMessages.length > 0 ? (
                  <ChatBubbles>
                    {chatMessages.map((message) => (
                      <ChatBubble
                        key={message.id}
                        message={message.message}
                        sender={message.user ? message.user.name : 'Anda (Anonim)'}
                        isCurrentUser={!message.user}
                        timestamp={new Date(message.created_at).toLocaleString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      />
                    ))}
                  </ChatBubbles>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Belum ada pesan. Mulai komunikasi dengan admin.</p>
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="p-3 border-t border-gray-200 w-full">
                <form onSubmit={handleSendMessage} className="flex w-full">
                  <div className="flex-grow mr-2 w-full">
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Ketik pesan Anda..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={isSendingMessage || reportData.status === 'ditolak' || reportData.status === 'selesai'}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      type="submit"
                      variant="primary"
                      icon={<FiSend />}
                      loading={isSendingMessage}
                      disabled={isSendingMessage || !newMessage.trim() || reportData.status === 'ditolak' || reportData.status === 'selesai'}
                    >
                      Kirim
                    </Button>
                  </div>
                </form>
                {(reportData.status === 'ditolak' || reportData.status === 'selesai') && (
                  <p className="text-xs text-gray-500 mt-2">
                    Anda tidak dapat mengirim pesan baru karena laporan sudah {reportData.status === 'ditolak' ? 'ditolak' : 'selesai'}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // Render not found state
  const renderNotFound = () => (
    <EmptyState
      icon={<FiSearch size={48} />}
      title="Laporan Tidak Ditemukan"
      description="Kode unik yang Anda masukkan tidak valid atau laporan tidak ditemukan. Silakan periksa kembali kode dan coba lagi."
      actionLabel="Coba Lagi"
      actionOnClick={handleCheckAnother}
    />
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        {isLoading ? (
          <LoadingScreen fullScreen={false} />
        ) : showForm ? (
          renderEntryForm()
        ) : reportData ? (
          renderReportDetails()
        ) : isSearching ? (
          renderNotFound()
        ) : (
          renderEntryForm()
        )}
    </div>
  );
};

export default MonitorAnonymReport;