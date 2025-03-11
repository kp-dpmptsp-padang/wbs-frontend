// src/pages/users/admin/ReportRecap.jsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiDownload, FiRefreshCw, FiFilter } from 'react-icons/fi';
import adminService from '@/services/admin.service';
import reportService from '@/services/report.service';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import Badge from '@/components/common/Badge';
import { formatDate } from '@/utils/formatters';

// Modals
import ReportDetailModal from '@/components/user/modals/admin/DetailModal';

const ReportRecap = () => {
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
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'ditolak', 'selesai'
  const [isSearching, setIsSearching] = useState(false);

  // Modal states
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
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
  }, [pagination.currentPage, statusFilter]);

  useEffect(() => {
    if (searchTerm) {
      filterReports();
    } else {
      setFilteredReports(reports);
    }
  }, [reports, searchTerm]);

  const filterReports = () => {
    const filtered = reports.filter(report => 
      (report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       report.violation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       report.location?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredReports(filtered);
  };

  const fetchReports = async (page = 1) => {
    setIsLoading(true);
    try {
      console.log('Fetching reports for page:', page);
      
      // Filter parameter based on statusFilter
      const statusParam = statusFilter === 'all' ? null : statusFilter;
      
      // Pastikan parameter yang digunakan sesuai dengan API
      const params = {
        page,
        per_page: pagination.perPage,
        status: statusParam
      };
      
      // For recap, we need to get reports with status 'ditolak' or 'selesai'
      let result;
      
      // In case API doesn't support multiple status filter, we need to make separate calls
      if (statusFilter === 'all') {
        // Try to get all completed reports
        const completedResult = await adminService.getAllReports({
          ...params,
          status: 'selesai'
        });
        
        // Try to get all rejected reports
        const rejectedResult = await adminService.getAllReports({
          ...params,
          status: 'ditolak'
        });
        
        // Combine the results
        if (completedResult.success && rejectedResult.success) {
          const completedReports = Array.isArray(completedResult.data) ? completedResult.data : 
                              (completedResult.data?.reports || completedResult.data || []);
          
          const rejectedReports = Array.isArray(rejectedResult.data) ? rejectedResult.data : 
                              (rejectedResult.data?.reports || rejectedResult.data || []);
          
          // Combine and use
          result = {
            success: true,
            data: [...completedReports, ...rejectedReports],
            meta: {
              current_page: page,
              last_page: Math.max(completedResult.meta?.last_page || 1, rejectedResult.meta?.last_page || 1),
              total: (completedResult.meta?.total || 0) + (rejectedResult.meta?.total || 0),
              per_page: params.per_page
            }
          };
        } else {
          // If either call fails, use mock data
          result = getMockData(statusFilter);
        }
      } else {
        // Just get reports with specific status
        result = await adminService.getAllReports(params);
      }

      console.log('API result:', result);

      if (result.success) {
        // Handle berbagai kemungkinan struktur data
        const reportData = Array.isArray(result.data) ? result.data : 
                         (result.data?.reports || result.data || []);
        
        console.log('Extracted report data:', reportData);
        
        // Filter report berdasarkan status jika perlu (hanya untuk 'all')
        let filteredReportData = reportData;
        
        if (statusFilter === 'all') {
          filteredReportData = reportData.filter(report => 
            report.status === 'ditolak' || 
            report.status === 'rejected' ||
            report.status === 'selesai' ||
            report.status === 'completed'
          );
        } else if (statusFilter === 'ditolak') {
          filteredReportData = reportData.filter(report => 
            report.status === 'ditolak' || 
            report.status === 'rejected'
          );
        } else if (statusFilter === 'selesai') {
          filteredReportData = reportData.filter(report => 
            report.status === 'selesai' || 
            report.status === 'completed'
          );
        }
        
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
          // Gunakan mock data
          const mockResult = getMockData(statusFilter);
          setReports(mockResult.data);
          setPagination({
            currentPage: page,
            totalPages: Math.ceil(mockResult.data.length / pagination.perPage),
            totalItems: mockResult.data.length,
            perPage: pagination.perPage
          });
        }
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      addToast('Terjadi kesalahan saat memuat laporan', 'error');
      
      // Jika tidak ada data, gunakan data contoh
      if (!reports.length) {
        const mockResult = getMockData(statusFilter);
        setReports(mockResult.data);
        setPagination({
          currentPage: page,
          totalPages: Math.ceil(mockResult.data.length / pagination.perPage),
          totalItems: mockResult.data.length,
          perPage: pagination.perPage
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk membuat data contoh
  const getMockData = (status) => {
    // Generate 30 data contoh
    const mockReports = [];
    
    for (let i = 1; i <= 30; i++) {
      // For demonstration, let's make odd numbers 'ditolak' and even numbers 'selesai'
      const reportStatus = i % 2 === 0 ? 'selesai' : 'ditolak';
      
      // Skip if we're filtering and this doesn't match
      if (status !== 'all' && status !== reportStatus) continue;
      
      mockReports.push({
        id: i,
        title: `Laporan ${reportStatus === 'selesai' ? 'Selesai' : 'Ditolak'} #${i}`,
        violation: ['Korupsi', 'Pelanggaran Etika', 'Penyalahgunaan Wewenang'][i % 3],
        location: ['Kota Padang', 'Kantor DPMPTSP', 'Kecamatan Kuranji'][i % 3],
        date: '2023-05-15',
        created_at: '2023-05-15T08:00:00Z',
        createdAt: '2023-05-15T08:00:00Z',
        status: reportStatus,
        is_anonymous: i % 3 === 0,
        reporter: { 
          id: i % 10 + 1, 
          name: ['Budi Santoso', 'Rina Wijaya', 'Ahmad Hidayat'][i % 3] 
        },
        detail: 'Detail laporan untuk pengujian sistem...',
        actors: 'Pihak terkait dalam laporan',
        rejection_reason: reportStatus === 'ditolak' ? 'Laporan tidak memenuhi syarat karena kurangnya bukti yang memadai.' : null,
        admin_notes: reportStatus === 'selesai' ? 'Laporan telah ditindaklanjuti dengan melakukan penyelidikan dan penanganan oleh tim terkait.' : null,
        completed_at: reportStatus === 'selesai' ? '2023-06-15T10:30:00Z' : null
      });
    }
    
    return {
      success: true,
      data: mockReports
    };
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

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({
      ...prev,
      currentPage: 1 // Reset to first page on filter change
    }));
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

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    // Clear selected report after animation
    setTimeout(() => {
      setSelectedReport(null);
    }, 300);
  };

  // Status badge functionality
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ditolak':
      case 'rejected':
        return <Badge variant="danger">Ditolak</Badge>;
      case 'selesai':
      case 'completed':
        return <Badge variant="success">Selesai</Badge>;
      default:
        return <Badge variant="gray">{status}</Badge>;
    }
  };

  // Download report functionality (mockup)
  const downloadReportRecap = () => {
    addToast('Fitur unduh rekap laporan sedang dikembangkan', 'info');
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
              <h1 className="text-2xl font-bold text-gray-900">Rekap Laporan</h1>
              <p className="text-sm text-gray-600 mt-1">Daftar laporan yang sudah diselesaikan atau ditolak</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <div className="flex">
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
                    className="ml-2"
                  >
                    Reset
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="w-40"
                >
                  <option value="all">Semua</option>
                  <option value="selesai">Selesai</option>
                  <option value="ditolak">Ditolak</option>
                </Select>
                
                <Button
                  variant="primary"
                  icon={<FiRefreshCw />}
                  onClick={() => fetchReports(pagination.currentPage)}
                >
                  Refresh
                </Button>
                
                <Button
                  variant="success"
                  icon={<FiDownload />}
                  onClick={downloadReportRecap}
                >
                  Unduh Rekap
                </Button>
              </div>
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
                      Pelapor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Dibuat
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                        <div className="text-sm text-gray-900">
                          {report.is_anonymous ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Anonim
                            </span>
                          ) : (
                            report.reporter?.name || report.user?.name || 'Pelapor'
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(report.createdAt || report.created_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(report.status)}
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
              title={searchTerm ? "Tidak Ada Hasil" : "Tidak Ada Laporan"}
              description={searchTerm 
                ? "Tidak ditemukan laporan yang sesuai dengan pencarian Anda" 
                : `Tidak ada laporan yang ${statusFilter === 'ditolak' ? 'ditolak' : statusFilter === 'selesai' ? 'selesai' : 'selesai atau ditolak'}`}
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
        <ReportDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          report={selectedReport}
        />
      )}
    </div>
  );
};

export default ReportRecap;