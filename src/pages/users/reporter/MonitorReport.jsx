// src/pages/users/reporter/MonitorReport.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFileText, FiAlertTriangle, FiClock, FiCheckCircle, FiFilter } from 'react-icons/fi';
import reportService from '@/services/report.service';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import ReportCard from '@/components/user/ReportCard';
import EmptyState from '@/components/common/EmptyState';
import ReportDetailModal from '@/components/user/modals/ReportDetailModal';
import { formatDate } from '@/utils/formatters';

const MonitorReport = () => {
  const location = useLocation();
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
    // Check if redirected after successful report creation
    const reportSuccess = window.localStorage.getItem('wbs_report_success');
    if (reportSuccess === 'true') {
      addToast('Laporan berhasil dibuat!', 'success');
      window.localStorage.removeItem('wbs_report_success');
    }

    fetchReports();
  }, []);

  useEffect(() => {
    // Filter reports to only show ongoing reports (menunggu-verifikasi and diproses)
    const ongoingReports = reports.filter(report => 
      report.status === 'menunggu-verifikasi' || report.status === 'diproses'
    );
    
    // Apply additional filter if selected
    if (filter === 'all') {
      setFilteredReports(ongoingReports);
    } else {
      setFilteredReports(ongoingReports.filter(report => report.status === filter));
    }
  }, [reports, filter]);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const result = await reportService.getReportHistory();
      if (result.success) {
        setReports(result.data);
      } else {
        addToast(result.error || 'Gagal memuat laporan', 'error');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      addToast('Terjadi kesalahan saat memuat laporan', 'error');
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
      case 'menunggu-verifikasi':
        return <FiAlertTriangle className="text-yellow-500" />;
      case 'diproses':
        return <FiClock className="text-blue-500" />;
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
          <h1 className="text-2xl font-bold text-gray-900">Pantau Laporan Saya</h1>
          <p className="text-sm text-gray-600 mt-1">Lihat dan pantau laporan yang sedang dalam proses</p>
        </div>
        <div className="flex space-x-2">
                      <div className="relative">
            <Button
              variant="outline"
              icon={<FiFilter />}
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              Filter: {filter === 'all' ? 'Semua Proses' : 
                       filter === 'menunggu-verifikasi' ? 'Menunggu Verifikasi' :
                       'Sedang Diproses'}
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
                    Semua Proses
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm ${filter === 'menunggu-verifikasi' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                    onClick={() => {
                      setFilter('menunggu-verifikasi');
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Menunggu Verifikasi
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 text-sm ${filter === 'diproses' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`} 
                    onClick={() => {
                      setFilter('diproses');
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Sedang Diproses
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
          icon={<FiFileText size={48} />}
          title="Belum Ada Laporan"
          description="Anda belum memiliki laporan yang dapat dipantau. Buat laporan baru untuk mulai melaporkan pelanggaran."
          actionLabel="Buat Laporan Baru"
          actionUrl="/laporan/buat"
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
              hasNewMessages={false} // You would need to implement this
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

export default MonitorReport;