// src/pages/users/Dashboard.jsx
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/common/Card';
import { FiUsers, FiFileText, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function Dashboard() {
    const { user, hasRole } = useAuth();

    // Stats data - pada implementasi nyata, ini akan diambil dari API
    const userStats = {
        totalReports: 5,
        activeReports: 2,
        completedReports: 2,
        pendingReports: 1
    };

    const adminStats = {
        totalReports: 45,
        pendingVerification: 8,
        inProgress: 12,
        completedThisMonth: 25
    };

    const superAdminStats = {
        totalUsers: 120,
        totalReports: 158,
        totalAdmins: 5,
        completionRate: "82%"
    };

    // Helper untuk mendapatkan konten berdasarkan role
    const getDashboardContent = () => {
        if (hasRole('super-admin')) {
            return (
                <>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Super Admin</h2>
                    <p className="mb-6 text-gray-600">
                        Selamat datang, <span className="font-semibold">{user.name}</span>. 
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
                                    <h3 className="text-2xl font-bold text-gray-800">{superAdminStats.totalUsers}</h3>
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
                                    <h3 className="text-2xl font-bold text-gray-800">{superAdminStats.totalReports}</h3>
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
                                    <h3 className="text-2xl font-bold text-gray-800">{superAdminStats.totalAdmins}</h3>
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
                                    <h3 className="text-2xl font-bold text-gray-800">{superAdminStats.completionRate}</h3>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Kinerja Admin" className="h-80">
                            {/* Chart atau tabel kinerja admin akan ditampilkan di sini */}
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Chart Kinerja Admin</p>
                            </div>
                        </Card>
                        
                        <Card title="Statistik Bulanan" className="h-80">
                            {/* Chart statistik bulanan akan ditampilkan di sini */}
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Chart Statistik Bulanan</p>
                            </div>
                        </Card>
                    </div>
                </>
            );
        } 
        else if (hasRole('admin')) {
            return (
                <>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview Admin</h2>
                    <p className="mb-6 text-gray-600">
                        Selamat datang, <span className="font-semibold">{user.name}</span>. 
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
                                    <h3 className="text-2xl font-bold text-gray-800">{adminStats.pendingVerification}</h3>
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
                                    <h3 className="text-2xl font-bold text-gray-800">{adminStats.inProgress}</h3>
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
                                    <h3 className="text-2xl font-bold text-gray-800">{adminStats.completedThisMonth}</h3>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-gray-50 border-gray-200">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-gray-500 text-white mr-4">
                                    <FiFileText size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Laporan</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{adminStats.totalReports}</h3>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Laporan Terbaru" className="h-80">
                            {/* Daftar laporan terbaru akan ditampilkan di sini */}
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Daftar Laporan Terbaru</p>
                            </div>
                        </Card>
                        
                        <Card title="Distribusi Status Laporan" className="h-80">
                            {/* Chart distribusi status laporan akan ditampilkan di sini */}
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Chart Distribusi Status</p>
                            </div>
                        </Card>
                    </div>
                </>
            );
        } 
        else {
            // Default untuk user biasa (pelapor)
            return (
                <>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Dashboard Pelapor</h2>
                    <p className="mb-6 text-gray-600">
                        Selamat datang, <span className="font-semibold">{user.name}</span>. 
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
                                    <h3 className="text-2xl font-bold text-gray-800">{userStats.totalReports}</h3>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-yellow-50 border-yellow-200">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-500 text-white mr-4">
                                    <FiAlertTriangle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Laporan Aktif</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{userStats.activeReports}</h3>
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
                                    <h3 className="text-2xl font-bold text-gray-800">{userStats.completedReports}</h3>
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="bg-orange-50 border-orange-200">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-orange-500 text-white mr-4">
                                    <FiFileText size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Menunggu Tanggapan</p>
                                    <h3 className="text-2xl font-bold text-gray-800">{userStats.pendingReports}</h3>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Aktivitas Terbaru" className="h-80">
                            {/* Aktivitas terbaru akan ditampilkan di sini */}
                            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Aktivitas Terbaru</p>
                            </div>
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
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {getDashboardContent()}
        </div>
    );
}