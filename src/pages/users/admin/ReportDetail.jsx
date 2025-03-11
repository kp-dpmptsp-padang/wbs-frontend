// src/pages/users/admin/ReportDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiMessageSquare, FiCheckCircle, FiXCircle, FiDownload, FiFile } from 'react-icons/fi';
import reportService from '@/services/report.service';
import adminService from '@/services/admin.service';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatters';

// Modals
import ApproveReportModal from '@/components/user/modals/admin/Approve';
import RejectReportModal from '@/components/user/modals/admin/Reject';
import FinishReportModal from '@/components/user/modals/report/Finish';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  
  // Modal states
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  useEffect(() => {
    fetchReportDetail();
  }, [id]);

  const fetchReportDetail = async () => {
    setIsLoading(true);
    try {
      const result = await reportService.getReportDetail(id);
      if (result.success) {
        setReport(result.data);
      } else {
        addToast(result.error || 'Gagal memuat detail laporan', 'error');
        navigate('/admin/laporan');
      }
    } catch (error) {
      console.error('Error fetching report detail:', error);
      addToast('Terjadi kesalahan saat memuat laporan', 'error');
      navigate('/admin/laporan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveReport = async () => {
    setIsProcessingAction(true);
    try {
      const result = await reportService.processReport(id);
      if (result.success) {
        addToast('Laporan berhasil disetujui dan akan diproses', 'success');
        fetchReportDetail(); // Refresh data
      } else {
        addToast(result.error || 'Gagal menyetujui laporan', 'error');
      }
    } catch (error) {
      console.error('Error approving report:', error);
      addToast('Terjadi kesalahan saat menyetujui laporan', 'error');
    } finally {
      setIsProcessingAction(false);
      setIsApproveModalOpen(false);
    }
  };

  const handleRejectReport = async (rejectionReason) => {
    setIsProcessingAction(true);
    try {
      const result = await reportService.rejectReport(id, rejectionReason);
      if (result.success) {
        addToast('Laporan berhasil ditolak', 'success');
        fetchReportDetail(); // Refresh data
      } else {
        addToast(result.error || 'Gagal menolak laporan', 'error');
      }
    } catch (error) {
      console.error('Error rejecting report:', error);
      addToast('Terjadi kesalahan saat menolak laporan', 'error');
    } finally {
      setIsProcessingAction(false);
      setIsRejectModalOpen(false);
    }
  };

  const handleFinishReport = async (formData) => {
    setIsProcessingAction(true);
    try {
      const result = await reportService.completeReport(id, formData);
      if (result.success) {
        addToast('Laporan berhasil diselesaikan', 'success');
        fetchReportDetail(); // Refresh data
      } else {
        addToast(result.error || 'Gagal menyelesaikan laporan', 'error');
      }
    } catch (error) {
      console.error('Error completing report:', error);
      addToast('Terjadi kesalahan saat menyelesaikan laporan', 'error');
    } finally {
      setIsProcessingAction(false);
      setIsFinishModalOpen(false);
    }
  };

  const handleChatClick = () => {
    navigate(`/chat?reportId=${id}`);
  };

  const downloadFile = async (fileId) => {
    try {
      // Get download URL
      const downloadUrl = reportService.getFileDownloadUrl(fileId);
      
      // Open file in new tab or trigger download
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
      addToast('Gagal mengunduh file', 'error');
    }
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'menunggu-verifikasi':
        return <Badge variant="warning">Menunggu Verifikasi</Badge>;
      case 'diproses':
        return <Badge variant="primary">Sedang Diproses</Badge>;
      case 'ditolak':
        return <Badge variant="danger">Ditolak</Badge>;
      case 'selesai':
        return <Badge variant="success">Selesai</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  // Check if actions can be performed based on status
  const canApprove = report?.status === 'menunggu-verifikasi';
  const canReject = report?.status === 'menunggu-verifikasi';
  const canFinish = report?.status === 'diproses';

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Button
              variant="outline"
              size="small"
              className="mr-4"
              onClick={() => navigate(-1)}
              icon={<FiArrowLeft />}
            >
              Kembali
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Detail Laporan</h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {canApprove && (
              <Button
                variant="primary"
                onClick={() => setIsApproveModalOpen(true)}
                icon={<FiCheckCircle />}
              >
                Proses
              </Button>
            )}
            
            {canReject && (
              <Button
                variant="danger"
                onClick={() => setIsRejectModalOpen(true)}
                icon={<FiXCircle />}
              >
                Tolak
              </Button>
            )}
            
            <Button
              variant="secondary"
              onClick={handleChatClick}
              icon={<FiMessageSquare />}
            >
              Komunikasi
            </Button>
            
            {canFinish && (
              <Button
                variant="success"
                onClick={() => setIsFinishModalOpen(true)}
                icon={<FiCheckCircle />}
              >
                Selesaikan
              </Button>
            )}
          </div>
        </div>
        
        {/* Status */}
        <Card className="mb-6 bg-gray-50">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{report?.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Monitoring Proses Laporan 
                  {!report?.is_anonymous ? ' Anda' : ' Anonim'}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                {getStatusBadge(report?.status)}
              </div>
            </div>
          </div>
        </Card>

        {/* Report Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pelanggaran yang Dilakukan</h3>
              <p className="text-gray-900">{report?.violation}</p>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Tanggal</h3>
              <p className="text-gray-900">{formatDate(report?.date)}</p>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h3>
              <p className="text-gray-900">{report?.location}</p>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pihak yang Terlibat</h3>
              <p className="text-gray-900">{report?.actors}</p>
            </div>
          </Card>
        </div>

        {/* Detail Kejadian */}
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Detil Kejadian</h3>
            <p className="text-gray-900 whitespace-pre-line">{report?.detail}</p>
          </div>
        </Card>

        {/* Bukti Pendukung */}
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Bukti Pendukung</h3>
            {report?.files && report.files.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.files.map(file => (
                  <div 
                    key={file.id} 
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FiFile className="text-primary mr-2" />
                        <span className="text-sm font-medium text-gray-700 truncate">
                          {file.file_path.split('/').pop()}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => downloadFile(file.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Unduh file"
                      >
                        <FiDownload size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Tidak ada bukti pendukung</p>
            )}
          </div>
        </Card>

        {/* Admin Notes & Rejection Reason (if applicable) */}
        {(report?.admin_notes || report?.rejection_reason) && (
          <Card className={`mb-6 ${report?.status === 'ditolak' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                {report?.status === 'ditolak' ? 'Alasan Penolakan' : 'Catatan Penyelesaian'}
              </h3>
              <p className="text-gray-800 whitespace-pre-line">
                {report?.status === 'ditolak' ? report?.rejection_reason : report?.admin_notes}
              </p>
            </div>
          </Card>
        )}

        {/* Handling Proof (if completed) */}
        {report?.status === 'selesai' && report?.files && (
          <Card className="mb-6">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Bukti Penanganan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.files
                  .filter(file => file.file_type === 'handling_proof')
                  .map(file => (
                    <div 
                      key={file.id} 
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiFile className="text-green-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {file.file_path.split('/').pop()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => downloadFile(file.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Unduh file"
                        >
                          <FiDownload size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Modals */}
      <ApproveReportModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApproveReport}
        report={report}
        isProcessing={isProcessingAction}
      />
      
      <RejectReportModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectReport}
        report={report}
        isProcessing={isProcessingAction}
      />
      
      <FinishReportModal
        isOpen={isFinishModalOpen}
        onClose={() => setIsFinishModalOpen(false)}
        onConfirm={handleFinishReport}
        report={report}
        isProcessing={isProcessingAction}
      />
    </div>
  );
};

export default ReportDetail;