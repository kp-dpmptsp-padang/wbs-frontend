// src/contexts/AdminContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import adminService from '@/services/admin.service';
import useApi from '@/hooks/useApi';

// Membuat context untuk admin
const AdminContext = createContext(null);

// Provider untuk admin context
export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [adminReports, setAdminReports] = useState([]);
  const [overviewStats, setOverviewStats] = useState(null);
  const [reportStats, setReportStats] = useState(null);
  
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
    try {
      console.log('Fetching admin list...');
      const result = await fetchAllAdmins();
      console.log('Admin list fetch result:', result);
      
      if (result.success) {
        // Pastikan data adalah array dan normalisasi struktur data
        let adminData = [];
        
        if (Array.isArray(result.data)) {
          adminData = result.data;
        } else if (result.data?.data && Array.isArray(result.data.data)) {
          adminData = result.data.data;
        } else if (typeof result.data === 'object' && result.data !== null) {
          // Jika data adalah objek tunggal, periksa struktur
          if (result.data.data && Array.isArray(result.data.data)) {
            // Jika objek memiliki properti data yang adalah array, gunakan array tersebut
            adminData = result.data.data;
          } else {
            // Jika bukan, jadikan objek ini sebagai item tunggal dalam array
            adminData = [result.data];
          }
        }
        
        // Normalisasi setiap item admin untuk memastikan properti yang diharapkan ada
        const normalizedAdmins = adminData.map((admin, index) => {
          // Log untuk melihat struktur asli
          console.log(`Processing admin item ${index}:`, admin);
          
          // Jika admin memiliki properti 'data' yang berisi array, gunakan item pertama
          if (admin.data && Array.isArray(admin.data) && admin.data.length > 0) {
            const [id, name, email, role, createdAt] = admin.data;
            console.log(`Extracted from admin.data array:`, { id, name, email, role, createdAt });
            
            return {
              id: id || admin.id || index,
              name: name || '',
              email: email || '',
              role: role || 'admin',
              createdAt: createdAt || new Date().toISOString(),
              // Salin properti lain dari data asli
              ...admin
            };
          }
          
          // Normalisasi properti sesuai dengan yang diharapkan di UI
          return {
            id: admin.id || index,
            name: admin.name || '',
            email: admin.email || '',
            role: admin.role || 'admin',
            createdAt: admin.createdAt || admin.created_at || new Date().toISOString(),
            // Salin properti lain dari data asli
            ...admin
          };
        });
        
        console.log('Setting normalized admin list:', normalizedAdmins);
        setAdmins(normalizedAdmins);
      }
      return result;
    } catch (error) {
      console.error('Error fetching admins:', error);
      return { success: false, error: 'Gagal memuat daftar admin' };
    }
  }, [fetchAllAdmins]);

  // Fungsi untuk membuat admin baru
  const createAdmin = useCallback(async (adminData) => {
    try {
      console.log('Creating new admin with data:', adminData);
      const result = await executeCreateAdmin(adminData);
      console.log('Create admin result:', result);
      
      if (result.success) {
        console.log('Admin created successfully, refreshing list...');
        // Tambahkan admin baru ke state lokal atau refresh daftar admin
        setTimeout(() => {
          getAllAdmins();
        }, 500); // Sedikit delay untuk memastikan data telah tersimpan di server
      }
      return result;
    } catch (error) {
      console.error('Error creating admin:', error);
      return { success: false, error: 'Gagal membuat admin baru' };
    }
  }, [executeCreateAdmin, getAllAdmins]);

  // Fungsi untuk mengupdate admin
  const updateAdmin = useCallback(async (adminId, adminData) => {
    try {
      const result = await executeUpdateAdmin(adminId, adminData);
      if (result.success) {
        // Update admin di state lokal
        setAdmins(prev => 
          prev.map(admin => 
            admin.id === adminId ? { ...admin, ...adminData } : admin
          )
        );
      }
      return result;
    } catch (error) {
      console.error('Error updating admin:', error);
      return { success: false, error: 'Gagal memperbarui admin' };
    }
  }, [executeUpdateAdmin]);

  // Fungsi untuk menghapus admin
  const deleteAdmin = useCallback(async (adminId) => {
    try {
      const result = await executeDeleteAdmin(adminId);
      if (result.success) {
        // Hapus admin dari state lokal
        setAdmins(prev => prev.filter(admin => admin.id !== adminId));
      }
      return result;
    } catch (error) {
      console.error('Error deleting admin:', error);
      return { success: false, error: 'Gagal menghapus admin' };
    }
  }, [executeDeleteAdmin]);

  // Fungsi untuk mendapatkan daftar laporan (admin view)
  const getAllReports = useCallback(async (params = {}) => {
    try {
      const result = await fetchAllReports(params);
      if (result.success) {
        setAdminReports(result.data);
      }
      return result;
    } catch (error) {
      console.error('Error fetching reports:', error);
      return { success: false, error: 'Gagal memuat daftar laporan' };
    }
  }, [fetchAllReports]);

  // Fungsi untuk mendapatkan detail laporan (admin view)
  const getReportById = useCallback(async (reportId) => {
    try {
      return await fetchReportById(reportId);
    } catch (error) {
      console.error('Error fetching report:', error);
      return { success: false, error: 'Gagal memuat detail laporan' };
    }
  }, [fetchReportById]);

  // Fungsi untuk mendapatkan statistik overview
  const getOverviewStats = useCallback(async () => {
    try {
      const result = await fetchOverviewStats();
      if (result.success) {
        setOverviewStats(result.data);
      }
      return result;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { success: false, error: 'Gagal memuat statistik' };
    }
  }, [fetchOverviewStats]);

  // Fungsi untuk mendapatkan statistik laporan
  const getReportStats = useCallback(async () => {
    try {
      const result = await fetchReportStats();
      if (result.success) {
        setReportStats(result.data);
      }
      return result;
    } catch (error) {
      console.error('Error fetching report stats:', error);
      return { success: false, error: 'Gagal memuat statistik laporan' };
    }
  }, [fetchReportStats]);

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