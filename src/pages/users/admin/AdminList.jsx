// Updated AdminList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiInfo, FiRefreshCw } from 'react-icons/fi';
import { useAdmin } from '@/contexts/AdminContext';
import Pagination from '@/components/common/Pagination';
import CreateAdmin from '@/components/user/modals/admin/CreateAdmin';
import EditAdmin from '@/components/user/modals/admin/EditAdmin';
import DeleteAdmin from '@/components/user/modals/admin/DeleteAdmin';
import DetailAdmin from '@/components/user/modals/admin/DetailAdmin';
import { useToast } from '@/contexts/ToastContext';

const AdminList = () => {
  const { admins, getAllAdmins, loading } = useAdmin();
  const { addToast: showToast } = useToast();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Used to force a re-fetch
  const [hasDataError, setHasDataError] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Fetch admins on component mount and when refreshKey changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching admins data...');
        const result = await getAllAdmins();
        console.log('Fetch result:', result);
        
        if (!result.success) {
          setHasDataError(true);
          showToast('Failed to load admin data: ' + (result.error || 'Unknown error'), 'error');
        } else if (result.usingMockData) {
          // If we're using mock data, show a warning
          showToast('Using sample data - Could not connect to server', 'warning');
          setHasDataError(true);
        } else {
          setHasDataError(false);
        }
      } catch (error) {
        console.error('Error in admin list component:', error);
        setHasDataError(true);
        showToast('Error fetching admin data', 'error');
      }
    };
    
    fetchData();
  }, [getAllAdmins, refreshKey, showToast]);
  
  // Force a refresh of the data
  const handleForceRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
    showToast('Refreshing admin data...', 'info');
  }, [showToast]);
  
  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin => 
    admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Modal handlers
  const handleOpenCreate = () => setShowCreateModal(true);
  const handleCloseCreate = () => setShowCreateModal(false);
  
  const handleOpenEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowEditModal(true);
  };
  const handleCloseEdit = () => {
    setSelectedAdmin(null);
    setShowEditModal(false);
  };
  
  const handleOpenDelete = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };
  const handleCloseDelete = () => {
    setSelectedAdmin(null);
    setShowDeleteModal(false);
  };
  
  const handleOpenDetail = (admin) => {
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };
  const handleCloseDetail = () => {
    setSelectedAdmin(null);
    setShowDetailModal(false);
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Handle refresh after operations
  const handleRefresh = () => {
    handleForceRefresh();
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Manajemen Admin</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleForceRefresh}
            className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            disabled={loading.admins}
          >
            <FiRefreshCw className={`mr-1 ${loading.admins ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <FiPlus className="mr-2" />
            Tambah Admin
          </button>
        </div>
      </div>
      
      {/* Debug info - You can remove this in production */}
      {hasDataError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm font-medium">
            Notice: Data might not be loading correctly from the server. 
            Make sure your API endpoints are configured properly.
          </p>
          <p className="text-yellow-700 text-xs mt-1">
            Check the browser console for more detailed error information.
          </p>
        </div>
      )}
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari admin berdasarkan nama atau email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
      
      {/* Admin Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Dibuat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading.admins ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Memuat data admin...</p>
                  </td>
                </tr>
              ) : currentAdmins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? "Tidak ada admin yang sesuai dengan pencarian" : "Belum ada data admin"}
                  </td>
                </tr>
              ) : (
                currentAdmins.map((admin, index) => (
                  <tr key={admin.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {admin.createdAt || admin.created_at ? 
                          new Date(admin.createdAt || admin.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'N/A'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenDetail(admin)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Lihat Detail"
                        >
                          <FiInfo className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(admin)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit Admin"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(admin)}
                          className="text-red-600 hover:text-red-900"
                          title="Hapus Admin"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {!loading.admins && totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      
      {/* Modals */}
      {showCreateModal && (
        <CreateAdmin 
          isOpen={showCreateModal} 
          onClose={handleCloseCreate} 
          onSuccess={handleRefresh} 
        />
      )}
      
      {showEditModal && selectedAdmin && (
        <EditAdmin 
          isOpen={showEditModal} 
          onClose={handleCloseEdit} 
          admin={selectedAdmin} 
          onSuccess={handleRefresh} 
        />
      )}
      
      {showDeleteModal && selectedAdmin && (
        <DeleteAdmin 
          isOpen={showDeleteModal} 
          onClose={handleCloseDelete} 
          admin={selectedAdmin} 
          onSuccess={handleRefresh} 
        />
      )}
      
      {showDetailModal && selectedAdmin && (
        <DetailAdmin 
          isOpen={showDetailModal} 
          onClose={handleCloseDetail} 
          admin={selectedAdmin} 
        />
      )}
    </div>
  );
};

export default AdminList;