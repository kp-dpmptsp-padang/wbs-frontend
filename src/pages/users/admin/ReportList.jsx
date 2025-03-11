// src/pages/users/admin/ReportList.jsx - Dengan beberapa perbaikan
import React, { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import adminService from '@/services/admin.service';
import reportService from '@/services/report.service';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import { formatDate } from '@/utils/formatters';

// Modals
import ReportDetailModal from '@/components/user/modals/admin/DetailModal';
import ApproveReportModal from '@/components/user/modals/admin/ApproveModal';
import RejectReportModal from '@/components/user/modals/admin/RejectModal';

const ReportList = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Modal states
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  
  // Helper function to safely extract pagination data
  const extractPaginationData = (result, currentPage) => {
    try {
      // Check for standard meta format
      if (result.meta) {
        return {
          currentPage: result.meta.current_page || currentPage,
          totalPages: result.meta.last_page || 1,
          totalItems: result.meta.total || 0,
          perPage: result.meta.per_page || 10
        };
      }
      
      // Check for alternative pagination format
      if (result.pagination) {
        return {
          currentPage: result.pagination.page || result.pagination.current_page || currentPage,
          totalPages: result.pagination.pages || result.pagination.last_page || 1,
          totalItems: result.pagination.count || result.pagination.total || 0,
          perPage: result.pagination.limit || result.pagination.per_page || 10
        };
      }
      
      // Fallback to existing pagination with updated current page
      return {
        ...pagination,
        currentPage
      };
    } catch (error) {
      console.error('Error extracting pagination data:', error);
      return {
        ...pagination,
        currentPage
      };
    }
  };

  useEffect(() => {
    fetchReports(pagination.currentPage);
  }, [pagination.currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = reports.filter(report => 
        report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.violation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [reports, searchTerm]);

  const fetchReports = async (page = 1) => {
    setIsLoading(true);
    try {
      console.log('Fetching reports for page:', page);
      
      // Pastikan parameter yg digunakan sesuai dengan API
      const params = {
        page,
        per_page: pagination.perPage,
        status: 'menunggu-verifikasi'
      };
      
      const result = await adminService.getAllReports(params);

      console.log('API result:', result);

      if (result.success) {
        // Handle berbagai kemungkinan struktur data
        const reportData = Array.isArray(result.data) ? result.data : 
                         (result.data?.reports || result.data || []);
        
        console.log('Extracted report data:', reportData);
        
        // Filter report berdasarkan status jika perlu
        // Ini hanya bila API tidak mendukung filter
        const filteredReportData = params.status ? 
          reportData.filter(report => 
            report.status === params.status || 
            report.status === 'menunggu-verifikasi' ||
            report.status === 'pending' ||
            report.status === 'waiting'
          ) : reportData;
        
        setReports(filteredReportData);
        
        // Extract pagination data dengan aman
        const newPagination = extractPaginationData(result, page);
        setPagination(newPagination);
      } else {
        console.error('API returned error:', result.error);
        
        // Tampilkan pesan error tetapi tetap gunakan data yang mungkin ada
        addToast(result.error || 'Gagal memuat daftar laporan', 'warning');
        
        // Jika tidak ada data, gunakan data contoh
        if (!reports.length) {
          // Panggil fungsi tambahan untuk mendapatkan data contoh
          // Fungsi ini bisa ditambahkan ke adminService
          generateMockData();
        }
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      addToast('Terjadi kesalahan saat memuat laporan', 'error');
      
      // Jika tidak ada data, gunakan data contoh
      if (!reports.length) {
        generateMockData();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Tambahkan fungsi untuk membuat data contoh
  const generateMockData = () => {
    const mockReports = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Laporan Pengaduan #${i + 1}`,
      violation: ['Korupsi', 'Pelanggaran Etika', 'Penyalahgunaan Wewenang'][i % 3],
      location: ['Kota Padang', 'Kantor DPMPTSP', 'Kecamatan Kuranji'][i % 3],
      date: '2023-05-15',
      created_at: '2023-05-15T08:00:00Z',
      createdAt: '2023-05-15T08:00:00Z',
      status: 'menunggu-verifikasi',
      is_anonymous: i % 2 === 0,
      reporter: { id: 1, name: 'John Doe' },
      detail: 'Detail laporan untuk pengujian sistem...',
      actors: 'Pihak terkait dalam laporan'
    }));
    
    setReports(mockReports);
    setPagination({
      currentPage: 1,
      totalPages: 3,
      totalItems: 30,
      perPage: 10
    });
    
    // Tampilkan notifikasi bahwa ini adalah data contoh
    addToast('Menampilkan data contoh - API belum tersedia', 'info');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    const searchValue = e.target.elements.search.value;
    setSearchTerm(searchValue);
    setIsSearching(false);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      // Reset search when changing pages
      setSearchTerm('');
      // Update current page
      setPagination(prev => ({
        ...prev,
        currentPage: newPage
      }));
    }
  };

  const viewReportDetail = (report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  const openApproveModal = (report) => {
    setSelectedReport(report);
    setIsApproveModalOpen(true);
  };

  const openRejectModal = (report) => {
    setSelectedReport(report);
    setIsRejectModalOpen(true);
  };

  const handleApproveReport = async () => {
    if (!selectedReport) return;
    
    setIsProcessingAction(true);
    try {
      const result = await reportService.processReport(selectedReport.id);
      if (result.success) {
        addToast('Laporan berhasil disetujui', 'success');
        // Update the local data
        setReports(reports.filter(report => report.id !== selectedReport.id));
        // Close the modal
        setIsApproveModalOpen(false);
      } else {
        addToast(result.error || 'Gagal menyetujui laporan', 'error');
      }
    } catch (error) {
      console.error('Error approving report:', error);
      addToast('Terjadi kesalahan saat menyetujui laporan', 'error');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleRejectReport = async (rejectionReason) => {
    if (!selectedReport || !rejectionReason) return;
    
    setIsProcessingAction(true);
    try {
      const result = await reportService.rejectReport(selectedReport.id, rejectionReason);
      if (result.success) {
        addToast('Laporan berhasil ditolak', 'success');
        // Update the local data
        setReports(reports.filter(report => report.id !== selectedReport.id));
        // Close the modal
        setIsRejectModalOpen(false);
      } else {
        addToast(result.error || 'Gagal menolak laporan', 'error');
      }
    } catch (error) {
      console.error('Error rejecting report:', error);
      addToast('Terjadi kesalahan saat menolak laporan', 'error');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    // Clear selected report after animation
    setTimeout(() => {
      setSelectedReport(null);
    }, 300);
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  const displayedReports = searchTerm ? filteredReports : reports;
  
  console.log('Reports to display:', displayedReports);

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Daftar Laporan</h1>
              <p className="text-sm text-gray-600 mt-1">Verifikasi Daftar Laporan yang Baru Ditambahkan Masyarakat</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  name="search"
                  placeholder="Cari laporan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-r-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-l-none"
                  loading={isSearching}
                  disabled={isSearching}
                >
                  <FiSearch />
                </Button>
              </form>
              
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={resetSearch}
                >
                  Reset
                </Button>
              )}
              
              <Button
                variant="primary"
                icon={<FiRefreshCw />}
                onClick={() => fetchReports(pagination.currentPage)}
              >
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Reports Table */}
          {displayedReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pelanggaran
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokasi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Dibuat
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pelapor
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedReports.map((report, index) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {report.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.violation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(report.createdAt || report.created_at)}</div>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {report.is_anonymous ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Anonim
                        </span>
                        ) : (
                        report.reporter?.name || report.user?.name || report.userId || "Unknown"
                        )}
                    </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => viewReportDetail(report)}
                            title="Lihat Detail"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900"
                            onClick={() => openApproveModal(report)}
                            title="Proses Laporan"
                          >
                            <FiCheckCircle size={18} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => openRejectModal(report)}
                            title="Tolak Laporan"
                          >
                            <FiXCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={<FiSearch size={48} />}
              title={searchTerm ? "Tidak Ada Hasil" : "Tidak Ada Laporan Baru"}
              description={searchTerm 
                ? "Tidak ditemukan laporan yang sesuai dengan pencarian Anda" 
                : "Saat ini tidak ada laporan baru yang menunggu verifikasi"}
              actionLabel={searchTerm ? "Reset Pencarian" : "Refresh"}
              actionOnClick={searchTerm ? resetSearch : () => fetchReports(1)}
            />
          )}
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </Card>
      
      {/* Modals */}
      {selectedReport && (
        <>
          <ReportDetailModal
            isOpen={isDetailModalOpen}
            onClose={closeDetailModal}
            report={selectedReport}
            onApprove={() => {
              closeDetailModal();
              openApproveModal(selectedReport);
            }}
            onReject={() => {
              closeDetailModal();
              openRejectModal(selectedReport);
            }}
          />
          
          <ApproveReportModal
            isOpen={isApproveModalOpen}
            onClose={closeApproveModal}
            onConfirm={handleApproveReport}
            report={selectedReport}
            isProcessing={isProcessingAction}
          />
          
          <RejectReportModal
            isOpen={isRejectModalOpen}
            onClose={closeRejectModal}
            onConfirm={handleRejectReport}
            report={selectedReport}
            isProcessing={isProcessingAction}
          />
        </>
      )}
    </div>
  );
};

export default ReportList;