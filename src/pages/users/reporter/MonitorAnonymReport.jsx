// src/pages/users/reporter/MonitorAnonymReport.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiAlertTriangle, FiClock, FiCheckCircle, FiFileText, FiEye } from 'react-icons/fi';
import reportService from '@/services/report.service';
import chatService from '@/services/chat.service';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import EmptyState from '@/components/common/EmptyState';
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

  const handleSendMessage = async () => {
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

  // Helper to format the status display
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'menunggu-verifikasi':
        return { 
          label: 'Menunggu Verifikasi', 
          icon: <FiAlertTriangle className="text-yellow-500" />,
          color: 'text-yellow-600 bg-yellow-100'
        };
      case 'diproses':
        return { 
          label: 'Sedang Diproses', 
          icon: <FiClock className="text-blue-500" />,
          color: 'text-blue-600 bg-blue-100'
        };
      case 'selesai':
        return { 
          label: 'Selesai', 
          icon: <FiCheckCircle className="text-green-500" />,
          color: 'text-green-600 bg-green-100'
        };
      case 'ditolak':
        return { 
          label: 'Ditolak', 
          icon: <FiAlertTriangle className="text-red-500" />,
          color: 'text-red-600 bg-red-100'
        };
      default:
        return { 
          label: 'Unknown', 
          icon: <FiFileText className="text-gray-500" />,
          color: 'text-gray-600 bg-gray-100'
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Cek Status Laporan Anonim</h1>
      <p className="text-center text-gray-600 mb-6">
        Masukkan kode unik yang Anda dapat saat berhasil membuat laporan sebagai anonim
      </p>
      
      <div className="max-w-xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Masukkan Kode"
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Lihat
          </Button>
        </form>
      </div>

      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : reportData ? (
        <div className="space-y-6">
          {/* Report Detail Card */}
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-bold text-center mb-4">Detail Laporan {reportData.title}</h2>
              <p className="text-center text-sm mb-4">Monitoring Proses Laporan Anda</p>
              
              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                <div className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusDisplay(reportData.status).color}`}>
                  {getStatusDisplay(reportData.status).icon}
                  <span className="ml-2 text-sm font-medium">
                    {getStatusDisplay(reportData.status).label}
                  </span>
                </div>
              </div>
              
              {/* Report Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pelanggaran yang Dilakukan</h3>
                  <p className="text-gray-900">{reportData.violation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tanggal</h3>
                  <p className="text-gray-900">{formatDate(reportData.date)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lokasi</h3>
                  <p className="text-gray-900">{reportData.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pihak yang Terlibat</h3>
                  <p className="text-gray-900">{reportData.actors}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Detil Kejadian</h3>
                <p className="text-gray-900 whitespace-pre-line">{reportData.detail}</p>
              </div>
              
              {/* Rejection reason if rejected */}
              {reportData.status === 'ditolak' && reportData.rejection_reason && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <h3 className="text-sm font-medium text-red-800">Alasan Penolakan:</h3>
                  <p className="text-red-700">{reportData.rejection_reason}</p>
                </div>
              )}
              
              {/* Admin notes if completed */}
              {reportData.status === 'selesai' && reportData.admin_notes && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="text-sm font-medium text-green-800">Catatan Penyelesaian:</h3>
                  <p className="text-green-700">{reportData.admin_notes}</p>
                </div>
              )}
              
              {/* Lampiran */}
              {reportData.files && reportData.files.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Lampiran</h3>
                  <div className="flex flex-wrap gap-2">
                    {reportData.files.map((file) => (
                      <a
                        key={file.id}
                        href={file.file_url || `${file.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
                      >
                        <FiEye className="mr-1" />
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
            <div className="p-4">
              <h2 className="text-xl font-bold text-center mb-4">Komunikasi</h2>
              <p className="text-center text-sm mb-4">Sarana Komunikasi Pelapor dengan Admin Prosesor</p>
              
              {/* Chat Messages */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="h-64 overflow-y-auto p-4 bg-gray-50">
                  {chatMessages.length > 0 ? (
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div key={message.id} className={`flex ${message.user ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${ 
                            message.user ? 'bg-gray-200 text-gray-900' : 'bg-blue-600 text-white'
                          }`}>
                            {message.user && (
                              <div className="text-xs text-gray-500 mb-1">
                                {message.user.name} ({message.user.role === 'admin' ? 'Admin' : 'Pelapor'})
                              </div>
                            )}
                            <p className="text-sm">{message.message}</p>
                            <div className="text-xs text-right mt-1 opacity-70">
                              {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Belum ada pesan. Mulai komunikasi dengan admin.</p>
                    </div>
                  )}
                </div>
                
                {/* Chat Input */}
                <div className="p-3 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Kirim Pesan"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={isSendingMessage}
                    />
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleSendMessage}
                      loading={isSendingMessage}
                      disabled={isSendingMessage || !newMessage.trim()}
                    >
                      Kirim
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : isSearching ? (
        <EmptyState
          icon={<FiSearch size={48} />}
          title="Laporan Tidak Ditemukan"
          description="Kode unik yang Anda masukkan tidak valid atau laporan tidak ditemukan. Silakan periksa kembali kode dan coba lagi."
        />
      ) : (
        <EmptyState
          icon={<FiFileText size={48} />}
          title="Masukkan Kode Unik Laporan"
          description="Masukkan kode unik yang Anda dapatkan saat membuat laporan anonim untuk melihat status dan detail laporan."
        />
      )}
    </div>
  );
};

export default MonitorAnonymReport;