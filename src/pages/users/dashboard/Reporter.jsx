// src/pages/users/dashboard/Reporter.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiAlertTriangle, FiBarChart2, FiCheckCircle, FiPlus } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import LoadingScreen from '@/components/common/LoadingScreen';
import { formatDate } from '@/utils/formatters';
import { useToast } from '@/contexts/ToastContext';
// import reportService from '@/services/report.service';

const Reporter = ({ userData, dashboardData }) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [reportStats, setReportStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Use dashboard data if provided from parent
    if (dashboardData) {
      const { active_reports, latest_activities } = dashboardData;
      setReportStats(active_reports);
      setActivities(latest_activities || []);
      return;
    }

    // Otherwise fetch data
    const fetchUserDashboardData = async () => {
      setIsLoading(true);
      try {
        const result = await reportService.getUserReportStats();
        if (result.success) {
          setReportStats(result.data.active_reports);
          setActivities(result.data.latest_activities || []);
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

    fetchUserDashboardData();
  }, [dashboardData, addToast]);

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  // Use either provided stats or default empty values
  const stats = reportStats || {
    total: 0,
    waiting_verification: 0,
    in_process: 0,
    completed: 0
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Dashboard Pelapor</h2>
      <p className="mb-6 text-gray-600">
        Selamat datang, <span className="font-semibold">{userData?.name}</span>.
        Di sini Anda dapat membuat dan memantau laporan.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <FiFileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Laporan</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.waiting_verification}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
              <FiBarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sedang Diproses</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.in_process}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 text-white mr-4">
              <FiCheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Laporan Selesai</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.completed}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities and Create Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Aktivitas Terbaru" className="h-80">
          {activities && activities.length > 0 ? (
            <div className="space-y-4 overflow-auto max-h-64">
              {activities.map((activity, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Belum ada aktivitas</p>
            </div>
          )}
        </Card>
        
        <Card title="Buat Laporan Baru" className="h-80 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4">
                <FiFileText size={48} className="mx-auto text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Laporkan Tindakan Korupsi atau Pelanggaran</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-md">
                Bantu kami menciptakan lingkungan yang bersih dan transparan dengan melaporkan tindakan korupsi atau pelanggaran.
              </p>
              <Button 
                as={Link} 
                to="/laporan/buat"
                variant="primary"
              >
                <FiPlus size={16} className="mr-1" />
                Buat Laporan Baru
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/laporan/pantau" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Pantau Status Laporan</h4>
              <p className="text-sm text-gray-600">Lihat status dan perkembangan laporan Anda</p>
            </Link>
          </Card>

          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/laporan/anonim" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Cek Laporan Anonim</h4>
              <p className="text-sm text-gray-600">Pantau laporan anonim dengan kode unik</p>
            </Link>
          </Card>

          <Card className="bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link to="/laporan/riwayat" className="block p-4">
              <h4 className="font-medium text-gray-800 mb-2">Riwayat Laporan</h4>
              <p className="text-sm text-gray-600">Lihat seluruh riwayat laporan Anda</p>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reporter;