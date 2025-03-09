// src/pages/users/dashboard/Admin.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiFileText, FiCheckCircle, FiList, FiBarChart2 } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import LoadingScreen from '@/components/common/LoadingScreen';
import { formatDate, formatStatus, formatStatusClass } from '@/utils/formatters';
import { useToast } from '@/contexts/ToastContext';
// import adminService from '@/services/admin.service';

const Admin = ({ userData, dashboardData }) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [reportsByStatus, setReportsByStatus] = useState([]);

  useEffect(() => {
    // Use dashboard data if provided from parent
    if (dashboardData) {
      const { stats, recent_reports, reports_by_status } = dashboardData;
      setStats(stats);
      setRecentReports(recent_reports || []);
      setReportsByStatus(reports_by_status || []);
      return;
    }

    // Otherwise fetch data
    const fetchAdminDashboardData = async () => {
      setIsLoading(true);
      try {
        const result = await adminService.getAdminDashboardStats();
        if (result.success) {
          setStats(result.data.stats);
          setRecentReports(result.data.recent_reports || []);
          setReportsByStatus(result.data.reports_by_status || []);
        } else {
          addToast(result.error || 'Gagal memuat data dashboard', 'error');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        addToast('Terjadi kesalahan saat memuat data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminDashboardData();
  }, [dashboardData, addToast]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  // Use either provided stats or default empty values
  const dashboardStats = stats || {
    pending_verification: 0,
    in_process: 0,
    completed_this_month: 0,
    rejected_this_month: 0
  };

  // Render the pie chart visualization (placeholder)
  const renderStatusDistribution = () => {
    if (!reportsByStatus || reportsByStatus.length === 0) {
      return (
        <div className="flex items-center justify-center h-56">
          <p className="text-gray-500">Tidak ada data status laporan</p>
        </div>
      );
    }

    // In a real implementation, you would use a charting library like Chart.js or Recharts
    // This is a simplified visual representation
    return (
      <div className="flex flex-col items-center justify-center h-56">
        <div className="flex space-x-2 mb-6">
          {reportsByStatus.map((item) => (
            <div 
              key={item.status} 
              className="h-32" 
              style={{ 
                width: `${Math.max(60, (item.count / Math.max(...reportsByStatus.map(s => s.count))) * 100)}px` 
              }}
            >
              <div 
                className={`h-full w-full rounded-t-lg ${
                  item.status === 'menunggu-verifikasi' ? 'bg-yellow-400' :
                  item.status === 'diproses' ? 'bg-blue-400' :
                  item.status === 'selesai' ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <div className="text-center mt-2 text-xs font-medium">
                {formatStatus(item.status)}
                <div className="font-bold">{item.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Admin</h2>
      <p className="mb-6 text-gray-600">
        Selamat datang, <span className="font-semibold">{userData?.name}</span>. 
        Anda bertanggung jawab untuk memproses laporan yang masuk.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-orange-50 border-orange-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-500 text-white mr-4">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.pending_verification}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <FiFileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sedang Diproses</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.in_process}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <FiCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Selesai Bulan Ini</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.completed_this_month}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-500 text-white mr-4">
              <FiList size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ditolak Bulan Ini</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardStats.rejected_this_month}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Reports and Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Laporan Terbaru" className="h-80">
          {recentReports && recentReports.length > 0 ? (
            <div className="overflow-auto max-h-64">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link 
                          to={`/admin/laporan/${report.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-primary"
                        >
                          {report.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${formatStatusClass(report.status)}`}>
                          {formatStatus(report.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Tidak ada laporan terbaru</p>
            </div>
          )}
        </Card>
        
        <Card title="Distribusi Status Laporan" className="h-80">
          {renderStatusDistribution()}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/admin/laporan" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Verifikasi Laporan</h4>
              <p className="text-sm text-gray-600">Verifikasi laporan yang masuk</p>
            </Link>
          </Card>

          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/admin/laporan/diproses" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Laporan Diproses</h4>
              <p className="text-sm text-gray-600">Kelola laporan yang sedang diproses</p>
            </Link>
          </Card>

          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/admin/laporan/rekap" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Rekap Laporan</h4>
              <p className="text-sm text-gray-600">Lihat rekap laporan keseluruhan</p>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;