// src/contexts/ReportContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { reportService } from '@/services';
import useApi from '@/hooks/useApi';
import { useToast } from './ToastContext';

// Membuat context untuk laporan
const ReportContext = createContext(null);

// Provider untuk laporan context
export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const { showToast } = useToast();
  
  // Gunakan custom hook useApi
  const { loading: reportHistoryLoading, execute: fetchReportHistory } = useApi(reportService.getReportHistory);
  const { loading: reportDetailLoading, execute: fetchReportDetail } = useApi(reportService.getReportDetail);
  const { loading: createReportLoading, execute: executeCreateReport } = useApi(reportService.createReport);
  const { loading: processReportLoading, execute: executeProcessReport } = useApi(reportService.processReport);
  const { loading: rejectReportLoading, execute: executeRejectReport } = useApi(reportService.rejectReport);
  const { loading: completeReportLoading, execute: executeCompleteReport } = useApi(reportService.completeReport);

  // Fungsi untuk mendapatkan riwayat laporan
  const getReportHistory = useCallback(async () => {
    const result = await fetchReportHistory();
    if (result.success) {
      setReports(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchReportHistory, showToast]);

  // Fungsi untuk mendapatkan detail laporan
  const getReportDetail = useCallback(async (reportId) => {
    const result = await fetchReportDetail(reportId);
    if (result.success) {
      setCurrentReport(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchReportDetail, showToast]);

  // Fungsi untuk membuat laporan baru
  const createReport = useCallback(async (formData) => {
    const result = await executeCreateReport(formData);
    if (result.success) {
      showToast('success', 'Laporan berhasil dibuat');
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeCreateReport, showToast]);

  // Fungsi untuk memproses laporan (Admin)
  const processReport = useCallback(async (reportId) => {
    const result = await executeProcessReport(reportId);
    if (result.success) {
      showToast('success', 'Laporan berhasil diproses');
      // Update currentReport jika ada dan ID cocok
      if (currentReport && currentReport.id === reportId) {
        setCurrentReport(prev => ({
          ...prev,
          status: 'diproses'
        }));
      }
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeProcessReport, showToast, currentReport]);

  // Fungsi untuk menolak laporan (Admin)
  const rejectReport = useCallback(async (reportId, rejectionReason) => {
    const result = await executeRejectReport(reportId, rejectionReason);
    if (result.success) {
      showToast('success', 'Laporan ditolak');
      // Update currentReport jika ada dan ID cocok
      if (currentReport && currentReport.id === reportId) {
        setCurrentReport(prev => ({
          ...prev,
          status: 'ditolak',
          rejection_reason: rejectionReason
        }));
      }
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeRejectReport, showToast, currentReport]);

  // Fungsi untuk menyelesaikan laporan (Admin)
  const completeReport = useCallback(async (reportId, formData) => {
    const result = await executeCompleteReport(reportId, formData);
    if (result.success) {
      showToast('success', 'Laporan berhasil diselesaikan');
      // Update currentReport jika ada dan ID cocok
      if (currentReport && currentReport.id === reportId) {
        setCurrentReport(prev => ({
          ...prev,
          status: 'selesai',
          admin_notes: formData.get('admin_notes')
        }));
      }
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeCompleteReport, showToast, currentReport]);

  // Nilai yang akan disediakan oleh context
  const value = {
    reports,
    currentReport,
    
    // Actions
    getReportHistory,
    getReportDetail,
    createReport,
    processReport,
    rejectReport,
    completeReport,

    // Mendapatkan detail laporan anonim
    getAnonymousReportDetail: reportService.getAnonymousReportDetail,

    // Mendapatkan file laporan
    getReportFiles: reportService.getReportFiles,
    getFileDownloadUrl: reportService.getFileDownloadUrl,
    
    // Loading states
    loading: {
      reportHistory: reportHistoryLoading,
      reportDetail: reportDetailLoading,
      createReport: createReportLoading,
      processReport: processReportLoading,
      rejectReport: rejectReportLoading,
      completeReport: completeReportLoading
    },

    // Clear state
    clearCurrentReport: () => setCurrentReport(null),
    clearReports: () => setReports([])
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook untuk menggunakan ReportContext
export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};