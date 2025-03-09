// src/pages/users/dashboard/SuperAdmin.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText, FiCheckCircle, FiBarChart2, FiActivity, FiClock } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useToast } from '@/contexts/ToastContext';
// import adminService from '@/services/admin.service';

const SuperAdmin = ({ userData, dashboardData }) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [systemStats, setSystemStats] = useState(null);
  const [adminPerformance, setAdminPerformance] = useState([]);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const hasAttemptedFetch = useRef(false);

  useEffect(() => {
    // Use dashboard data if provided from parent
    if (dashboardData) {
      const { system_stats, admin_performance, monthly_reports } = dashboardData;
      setSystemStats(system_stats);
      setAdminPerformance(admin_performance || []);
      setMonthlyReports(monthly_reports || []);
      return;
    }

    // Otherwise fetch data, but only attempt once
    const fetchSuperAdminDashboardData = async () => {
      if (hasAttemptedFetch.current) return;
      
      hasAttemptedFetch.current = true;
      setIsLoading(true);
      
      try {
        // Karena kita tahu endpoint ini bermasalah, gunakan data contoh sebagai fallback
        const mockData = {
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
        };
        
        setSystemStats(mockData.system_stats);
        setAdminPerformance(mockData.admin_performance);
        setMonthlyReports(mockData.monthly_reports);
        
        console.log("Using fallback data for super admin dashboard due to API issues");
      } catch (error) {
        console.error('Error in SuperAdmin dashboard:', error);
        addToast('Terjadi kesalahan saat memuat data dashboard Super Admin', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuperAdminDashboardData();
  }, [dashboardData, addToast]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  // Use either provided stats or default empty values
  const stats = systemStats || {
    total_users: 0,
    total_reports: 0,
    completion_rate: "0%",
    average_process_time: "0 days"
  };

  // Render admin performance table
  const renderAdminPerformance = () => {
    if (!adminPerformance || adminPerformance.length === 0) {
      return (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">Tidak ada data performa admin</p>
        </div>
      );
    }

    return (
      <div className="overflow-auto max-h-64">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laporan Ditangani</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rata-rata Waktu</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adminPerformance.map((admin) => (
              <tr key={admin.admin_id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{admin.reports_handled}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{admin.average_response_time || "-"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render monthly reports chart (placeholder)
  const renderMonthlyReportsChart = () => {
    if (!monthlyReports || monthlyReports.length === 0) {
      return (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">Tidak ada data laporan bulanan</p>
        </div>
      );
    }

    // In a real implementation, you would use a charting library like Chart.js or Recharts
    // This is a simplified visual representation
    const maxCount = Math.max(...monthlyReports.map(item => item.reports_count));
    
    return (
      <div className="flex items-end space-x-2 h-48 pt-6">
        {monthlyReports.map((item) => (
          <div key={item.month} className="flex flex-col items-center">
            <div 
              className="w-12 bg-primary rounded-t-md" 
              style={{ 
                height: `${(item.reports_count / maxCount) * 100}%`,
                minHeight: item.reports_count > 0 ? '10px' : '0'
              }}
            ></div>
            <div className="text-xs font-medium mt-1 -rotate-45 origin-top-left h-10">
              {item.month}
            </div>
            <div className="text-xs font-bold mt-1 absolute -mt-5">
              {item.reports_count}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Super Admin</h2>
      <p className="mb-6 text-gray-600">
        Selamat datang, <span className="font-semibold">{userData?.name}</span>. 
        Anda memiliki akses penuh untuk mengelola seluruh sistem WBS.
      </p>

      {/* Notice about mock data */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg mb-6">
        <p className="text-sm">
          <strong>Info:</strong> Saat ini menampilkan data contoh karena endpoint untuk dashboard super admin sedang dalam perbaikan.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Pengguna</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.total_users}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <FiFileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Laporan</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.total_reports}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
              <FiCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tingkat Penyelesaian</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.completion_rate}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
              <FiClock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Waktu Proses Rata-rata</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.average_process_time}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Admin Performance and Monthly Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Kinerja Admin" className="h-80">
          {renderAdminPerformance()}
        </Card>
        
        <Card title="Statistik Bulanan" className="h-80">
          {renderMonthlyReportsChart()}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/admin/pengguna" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Kelola Admin</h4>
              <p className="text-sm text-gray-600">Tambah dan kelola akun admin</p>
            </Link>
          </Card>

          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/admin/laporan" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Kelola Laporan</h4>
              <p className="text-sm text-gray-600">Pantau dan kelola seluruh laporan</p>
            </Link>
          </Card>

          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/admin/laporan/rekap" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Statistik & Rekap</h4>
              <p className="text-sm text-gray-600">Lihat statistik dan rekap sistem</p>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;