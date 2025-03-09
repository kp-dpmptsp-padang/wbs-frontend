// src/pages/users/Dashboard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import ReporterDashboard from './dashboard/Reporter';
import AdminDashboard from './dashboard/Admin';
import SuperAdminDashboard from './dashboard/SuperAdmin';
import dashboardService from '@/services/dashboard.service';
import { useToast } from '@/contexts/ToastContext';

export default function Dashboard() {
  const { user, hasRole } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // Untuk mencegah multiple fetch

  // Gunakan useCallback untuk fetchDashboardData agar tidak dibuat ulang pada setiap render
  const fetchDashboardData = useCallback(async () => {
    if (!user || hasFetched) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      
      // Fetch dashboard data based on user role
      if (hasRole('super-admin')) {
        // Gunakan mock data sementara untuk super admin karena endpoint error 500
        // TODO: Perbaiki endpoint di backend untuk super admin
        result = {
          success: true,
          data: {
            system_stats: {
              total_users: 120,
              total_reports: 158,
              completion_rate: "82%",
              average_process_time: "3.5 days"
            },
            admin_performance: [
              { admin_id: 1, name: "Admin 1", reports_handled: 45, average_response_time: "2.3 days" },
              { admin_id: 2, name: "Admin 2", reports_handled: 32, average_response_time: "3.1 days" }
            ],
            monthly_reports: [
              { month: "Jan", reports_count: 12 },
              { month: "Feb", reports_count: 15 },
              { month: "Mar", reports_count: 18 },
              { month: "Apr", reports_count: 14 },
              { month: "May", reports_count: 21 },
              { month: "Jun", reports_count: 17 }
            ]
          }
        };
        console.log("Using mock data for super admin dashboard");
      } else if (hasRole('admin')) {
        result = await dashboardService.getAdminDashboard();
      } else {
        result = await dashboardService.getUserDashboard();
      }
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.error || 'Gagal memuat data dashboard');
        // Gunakan addToast dengan kondisi agar tidak memanggil setState berulang kali
        if (!hasFetched) {
          addToast(result.error || 'Gagal memuat data dashboard', 'error');
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Terjadi kesalahan saat memuat data');
      // Gunakan addToast dengan kondisi agar tidak memanggil setState berulang kali
      if (!hasFetched) {
        addToast('Terjadi kesalahan saat memuat data', 'error');
      }
    } finally {
      setIsLoading(false);
      setHasFetched(true); // Tandai bahwa data sudah diambil
    }
  }, [user, hasRole, addToast, hasFetched]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Render dashboard based on user role
  const renderDashboardByRole = () => {
    if (hasRole('super-admin')) {
      return <SuperAdminDashboard userData={user} dashboardData={dashboardData} />;
    } else if (hasRole('admin')) {
      return <AdminDashboard userData={user} dashboardData={dashboardData} />;
    } else {
      return <ReporterDashboard userData={user} dashboardData={dashboardData} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Error Loading Dashboard</h3>
          <p>{error}</p>
          {hasRole('super-admin') && (
            <p className="mt-2 text-sm">
              Endpoint untuk dashboard super admin sedang diperbaiki. Sementara menampilkan data contoh.
            </p>
          )}
        </div>
      ) : (
        renderDashboardByRole()
      )}
    </div>
  );
}