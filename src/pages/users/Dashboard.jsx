// src/pages/users/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/common/Card';
import LoadingScreen from '@/components/common/LoadingScreen';
import dashboardService from '@/services/dashboard.service';
import useApi from '@/hooks/useApi';
import { FiUsers, FiFileText, FiAlertTriangle, FiCheckCircle, FiBarChart2, FiList } from 'react-icons/fi';

export default function Dashboard() {
    const { user, hasRole } = useAuth();
    
    // Menggunakan useApi untuk setiap jenis dashboard
    const userDashboardApi = useApi(dashboardService.getUserDashboard);
    const adminDashboardApi = useApi(dashboardService.getAdminDashboard);
    const superAdminDashboardApi = useApi(dashboardService.getSuperAdminDashboard);
    
    useEffect(() => {
        console.log("Dashboard mounted, user:", user);
        
        // Panggil API dashboard sesuai role user
        if (hasRole('super-admin')) {
            superAdminDashboardApi.execute();
        } else if (hasRole('admin')) {
            adminDashboardApi.execute();
        } else {
            userDashboardApi.execute();
        }
    }, [user?.role]); // Re-fetch jika role berubah

    // Render dashboard untuk super admin
    const renderSuperAdminDashboard = () => {
        if (superAdminDashboardApi.loading) return <LoadingScreen fullScreen={false} />;
        if (superAdminDashboardApi.error) {
            return (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    Error: {superAdminDashboardApi.error}
                </div>
            );
        }
        
        // Data dari API atau fallback ke dummy data jika belum tersedia
        const stats = superAdminDashboardApi.data?.system_stats || {
            total_users: 120,
            total_reports: 158,
            total_admins: 5,
            completion_rate: "82%"
        };
        
        return (
            <>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Super Admin</h2>
                <p className="mb-6 text-gray-600">
                    Selamat datang, <span className="font-semibold">{user?.name}</span>. 
                    Anda memiliki akses penuh untuk mengelola seluruh sistem WBS.
                </p>

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
                                <FiUsers size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Admin</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stats.total_admins}</h3>
                            </div>
                        </div>
                    </Card>
                    
                    <Card className="bg-yellow-50 border-yellow-200">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
                                <FiCheckCircle size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tingkat Penyelesaian</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stats.completion_rate}</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Kinerja Admin" className="h-80">
                        {/* Tampilkan data admin_performance jika tersedia */}
                        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Chart Kinerja Admin</p>
                        </div>
                    </Card>
                    
                    <Card title="Statistik Bulanan" className="h-80">
                        {/* Tampilkan data monthly_reports jika tersedia */}
                        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Chart Statistik Bulanan</p>
                        </div>
                    </Card>
                </div>
            </>
        );
    };

    // Render dashboard untuk admin
    const renderAdminDashboard = () => {
        if (adminDashboardApi.loading) return <LoadingScreen fullScreen={false} />;
        if (adminDashboardApi.error) {
            return (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    Error: {adminDashboardApi.error}
                </div>
            );
        }
        
        // Data dari API atau fallback ke dummy data jika belum tersedia
        const stats = adminDashboardApi.data?.stats || {
            pending_verification: 8,
            in_process: 12,
            completed_this_month: 25,
            rejected_this_month: 5
        };
        
        const recentReports = adminDashboardApi.data?.recent_reports || [];
        
        return (
            <>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Admin</h2>
                <p className="mb-6 text-gray-600">
                    Selamat datang, <span className="font-semibold">{user?.name}</span>. 
                    Anda bertanggung jawab untuk memproses laporan yang masuk.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-orange-50 border-orange-200">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-orange-500 text-white mr-4">
                                <FiAlertTriangle size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stats.pending_verification}</h3>
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
                                <p className="text-sm text-gray-500">Selesai Bulan Ini</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stats.completed_this_month}</h3>
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
                                <h3 className="text-2xl font-bold text-gray-800">{stats.rejected_this_month}</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Laporan Terbaru" className="h-80">
                        {recentReports.length > 0 ? (
                            <div className="overflow-auto max-h-64">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentReports.map((report) => (
                                            <tr key={report.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        report.status === 'selesai' ? 'bg-green-100 text-green-800' :
                                                        report.status === 'menunggu-verifikasi' ? 'bg-yellow-100 text-yellow-800' :
                                                        report.status === 'diproses' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {report.status === 'menunggu-verifikasi' ? 'Menunggu Verifikasi' :
                                                         report.status === 'diproses' ? 'Diproses' :
                                                         report.status === 'selesai' ? 'Selesai' : 'Ditolak'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(report.createdAt).toLocaleDateString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">Tidak ada laporan terbaru</p>
                            </div>
                        )}
                    </Card>
                    
                    <Card title="Distribusi Status Laporan" className="h-80">
                        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Chart Distribusi Status</p>
                        </div>
                    </Card>
                </div>
            </>
        );
    };

    // Render dashboard untuk user biasa (pelapor)
    const renderUserDashboard = () => {
        if (userDashboardApi.loading) return <LoadingScreen fullScreen={false} />;
        if (userDashboardApi.error) {
            return (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    Error: {userDashboardApi.error}
                </div>
            );
        }
        
        // Data dari API atau fallback ke dummy data jika belum tersedia
        const stats = userDashboardApi.data?.active_reports || {
            total: 5,
            waiting_verification: 1,
            in_process: 2,
            completed: 2
        };
        
        const activities = userDashboardApi.data?.latest_activities || [];
        
        return (
            <>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Dashboard Pelapor</h2>
                <p className="mb-6 text-gray-600">
                    Selamat datang, <span className="font-semibold">{user?.name}</span>. 
                    Di sini Anda dapat membuat dan memantau laporan.
                </p>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Aktivitas Terbaru" className="h-80">
                        {activities.length > 0 ? (
                            <div className="space-y-4 overflow-auto max-h-64">
                                {activities.map((activity, index) => (
                                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                                        <p className="text-sm text-gray-800">{activity.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(activity.timestamp).toLocaleString('id-ID')}
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
                    
                    <Card title="Buat Laporan Baru" className="h-80 flex items-center justify-center">
                        <div className="text-center">
                            <div className="mb-4">
                                <FiFileText size={48} className="mx-auto text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Laporkan Tindakan Korupsi atau Pelanggaran</h3>
                            <p className="text-sm text-gray-600 mb-4 max-w-md">
                                Bantu kami menciptakan lingkungan yang bersih dan transparan dengan melaporkan tindakan korupsi atau pelanggaran.
                            </p>
                            <a 
                                href="/laporan/buat" 
                                className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Buat Laporan Baru
                            </a>
                        </div>
                    </Card>
                </div>
            </>
        );
    };

    // Render dashboard berdasarkan role
    const renderDashboardByRole = () => {
        if (hasRole('super-admin')) {
            return renderSuperAdminDashboard();
        } else if (hasRole('admin')) {
            return renderAdminDashboard();
        } else {
            return renderUserDashboard();
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {renderDashboardByRole()}
        </div>
    );
}