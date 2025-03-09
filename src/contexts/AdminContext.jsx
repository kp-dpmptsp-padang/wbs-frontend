// src/contexts/AdminContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { adminService } from '@/services';
import useApi from '@/hooks/useApi';
import { useToast } from './ToastContext';

// Membuat context untuk admin
const AdminContext = createContext(null);

// Provider untuk admin context
export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [adminReports, setAdminReports] = useState([]);
  const [overviewStats, setOverviewStats] = useState(null);
  const [reportStats, setReportStats] = useState(null);
  const { showToast } = useToast();
  
  // Gunakan custom hook useApi
  const { loading: adminsLoading, execute: fetchAllAdmins } = useApi(adminService.getAllAdmins);
  const { loading: createAdminLoading, execute: executeCreateAdmin } = useApi(adminService.createAdmin);
  const { loading: updateAdminLoading, execute: executeUpdateAdmin } = useApi(adminService.updateAdmin);
  const { loading: deleteAdminLoading, execute: executeDeleteAdmin } = useApi(adminService.deleteAdmin);
  const { loading: reportsLoading, execute: fetchAllReports } = useApi(adminService.getAllReports);
  const { loading: reportDetailLoading, execute: fetchReportById } = useApi(adminService.getReportById);
  const { loading: statsLoading, execute: fetchOverviewStats } = useApi(adminService.getOverviewStats);
  const { loading: reportStatsLoading, execute: fetchReportStats } = useApi(adminService.getReportStats);

  // Fungsi untuk mendapatkan daftar admin
  const getAllAdmins = useCallback(async () => {
    const result = await fetchAllAdmins();
    if (result.success) {
      setAdmins(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchAllAdmins, showToast]);

  // Fungsi untuk membuat admin baru
  const createAdmin = useCallback(async (adminData) => {
    const result = await executeCreateAdmin(adminData);
    if (result.success) {
      // Tambahkan admin baru ke state lokal
      setAdmins(prev => [...prev, result.data]);
      showToast('success', 'Admin berhasil dibuat');
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeCreateAdmin, showToast]);

  // Fungsi untuk mengupdate admin
  const updateAdmin = useCallback(async (adminId, adminData) => {
    const result = await executeUpdateAdmin(adminId, adminData);
    if (result.success) {
      // Update admin di state lokal
      setAdmins(prev => 
        prev.map(admin => 
          admin.id === adminId ? result.data : admin
        )
      );
      showToast('success', 'Admin berhasil diperbarui');
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeUpdateAdmin, showToast]);

  // Fungsi untuk menghapus admin
  const deleteAdmin = useCallback(async (adminId) => {
    const result = await executeDeleteAdmin(adminId);
    if (result.success) {
      // Hapus admin dari state lokal
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
      showToast('success', 'Admin berhasil dihapus');
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [executeDeleteAdmin, showToast]);

  // Fungsi untuk mendapatkan daftar laporan (admin view)
  const getAllReports = useCallback(async (params = {}) => {
    const result = await fetchAllReports(params);
    if (result.success) {
      setAdminReports(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchAllReports, showToast]);

  // Fungsi untuk mendapatkan detail laporan (admin view)
  const getReportById = useCallback(async (reportId) => {
    const result = await fetchReportById(reportId);
    if (!result.success) {
      showToast('error', result.error);
    }
    return result;
  }, [fetchReportById, showToast]);

  // Fungsi untuk mendapatkan statistik overview
  const getOverviewStats = useCallback(async () => {
    const result = await fetchOverviewStats();
    if (result.success) {
      setOverviewStats(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchOverviewStats, showToast]);

  // Fungsi untuk mendapatkan statistik laporan
  const getReportStats = useCallback(async () => {
    const result = await fetchReportStats();
    if (result.success) {
      setReportStats(result.data);
    } else {
      showToast('error', result.error);
    }
    return result;
  }, [fetchReportStats, showToast]);

  // Nilai yang akan disediakan oleh context
  const value = {
    admins,
    adminReports,
    overviewStats,
    reportStats,
    
    // Admin management
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    
    // Report management
    getAllReports,
    getReportById,
    
    // Stats
    getOverviewStats,
    getReportStats,
    
    // Loading states
    loading: {
      admins: adminsLoading,
      createAdmin: createAdminLoading,
      updateAdmin: updateAdminLoading,
      deleteAdmin: deleteAdminLoading,
      reports: reportsLoading,
      reportDetail: reportDetailLoading,
      stats: statsLoading,
      reportStats: reportStatsLoading
    }
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook untuk menggunakan AdminContext
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};