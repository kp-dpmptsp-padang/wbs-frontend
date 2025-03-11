// src/pages/users/reporter/ReportHistory.jsx
import React, { useState, useEffect } from 'react';
import { FiFileText, FiAlertTriangle, FiCheckCircle, FiFilter, FiClock } from 'react-icons/fi';
import reportService from '@/services/report.service';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Button from '@/components/common/Button';
import ReportCard from '@/components/user/ReportCard';
import EmptyState from '@/components/common/EmptyState';
import ReportDetailModal from '@/components/user/modals/ReportDetailModal';
import { formatDate } from '@/utils/formatters';

const ReportHistory = () => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // State for report detail modal
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    // Filter reports to only show completed or rejected reports
    const historyReports = reports.filter(report => 
      report.status === 'selesai' || report.status === 'ditolak'
    );
    
    // Apply additional filter if selected
    if (filter === 'all') {
      setFilteredReports(historyReports);
    } else {
      setFilteredReports(historyReports.filter(report => report.status === filter));
    }
  }, [reports, filter]);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const result = await reportService.getReportHistory();
      if (result.success) {
        setReports(result.data);
      } else {
        addToast(result.error || 'Gagal memuat riwayat laporan', 'error');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      addToast('Terjadi kesalahan saat memuat riwayat laporan', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchReportDetail = async (reportId) => {
    setIsLoadingDetail(true);
    try {
      const result = await reportService.getReportDetail(reportId);
      if (result.success) {
        setSelectedReport(result.data);
        setIsDetailModalOpen(true);
      } else {
        addToast(result.error || 'Gagal memuat detail laporan', 'error');
      }
    } catch (error) {
      console.error('Error fetching report detail:', error);
      addToast('Terjadi kesalahan saat memuat detail laporan', 'error');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleReportAction = (reportId, action) => {
    if (action === 'detail') {
      fetchReportDetail(reportId);
    } else if (action === 'komunikasi') {
      // Navigate to chat page
      window.location.href = `/chat?reportId=${reportId}`;
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    // Wait for modal animation to finish before clearing data
    setTimeout(() => {
      setSelectedReport(null);
    }, 300);
  };

  // Determine the icon to show based on report status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'selesai':
        return <FiCheckCircle className="text-green-500" />;
      case 'ditolak':
        return <FiAlertTriangle className="text-red-500" />;
      default:
        return <FiFileText className="text-gray-500" />;
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Laporan Saya</h1>
          <p className="text-sm text-gray-600 mt-1">Lihat riwayat laporan yang telah selesai atau ditolak</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              icon={<FiFilter />}
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              Filter: {filter === 'all' ? 'Semua Riwayat' : 
                       filter === 'selesai' ? 'Selesai' : 'Ditolak'}
            </Button>
            {isFilterMenuOpen && (
              <div className="absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                    onClick={() => {
                      setFilter('all');
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Semua Riwayat
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm ${filter === 'selesai' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                    onClick={() => {
                      setFilter('selesai');
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Selesai
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm ${filter === 'ditolak' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                    onClick={() => {
                      setFilter('ditolak');
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Ditolak
                  </button>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            onClick={fetchReports}
          >
            Refresh
          </Button>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <EmptyState
          icon={<FiClock size={48} />}
          title="Belum Ada Riwayat Laporan"
          description="Anda belum memiliki laporan yang selesai atau ditolak. Laporan yang sudah selesai diproses atau ditolak akan muncul di sini."
          actionLabel="Kembali ke Pantau Laporan"
          actionUrl="/laporan/pantau"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              title={report.title}
              date={formatDate(report.date)}
              description={report.detail}
              status={report.status}
              icon={getStatusIcon(report.status)}
              hasNewMessages={false}
              onClick={(action) => handleReportAction(report.id, action)}
            />
          ))}
        </div>
      )}
      
      {/* Report Detail Modal */}
      {isLoadingDetail ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <ReportDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          report={selectedReport}
        />
      )}
    </div>
  );
};

export default ReportHistory;