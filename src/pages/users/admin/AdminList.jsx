// src/pages/users/admin/AdminList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiInfo, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/contexts/ToastContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import Badge from '@/components/common/Badge';

// Modals
import CreateAdmin from '@/components/user/modals/admin/CreateAdmin';
import EditAdmin from '@/components/user/modals/admin/EditAdmin';
import DeleteAdmin from '@/components/user/modals/admin/DeleteAdmin';
import DetailAdmin from '@/components/user/modals/admin/DetailAdmin';

const AdminList = () => {
  const { admins, getAllAdmins, loading } = useAdmin();
  const { addToast } = useToast();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasDataError, setHasDataError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
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
          addToast('Failed to load admin data: ' + (result.error || 'Unknown error'), 'error');
        } else if (result.usingMockData) {
          // If we're using mock data, show a warning
          addToast('Using sample data - Could not connect to server', 'warning');
          setHasDataError(true);
        } else {
          setHasDataError(false);
        }
      } catch (error) {
        console.error('Error in admin list component:', error);
        setHasDataError(true);
        addToast('Error fetching admin data', 'error');
      }
    };
    
    fetchData();
  }, [getAllAdmins, refreshKey, addToast]);
  
  // Update filtered admins when admins or searchTerm changes
  useEffect(() => {
    const filtered = admins.filter(admin => 
      admin.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(filtered);
  }, [admins, searchTerm]);
  
  // Force a refresh of the data
  const handleForceRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
    addToast('Refreshing admin data...', 'info');
  }, [addToast]);
  
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
  
  // Handle form search
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    const searchValue = e.target.elements.search.value;
    setSearchTerm(searchValue);
    setIsSearching(false);
  };
  
  // Reset search
  const resetSearch = () => {
    setSearchTerm('');
  };
  
  // Handle refresh after operations
  const handleRefresh = () => {
    handleForceRefresh();
  };
  
  if (loading.admins && admins.length === 0) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Admin</h1>
              <p className="text-sm text-gray-600 mt-1">Tambah, ubah, atau hapus admin sistem</p>
              
              {/* Debug info - You can remove this in production */}
              {hasDataError && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-xs font-medium">
                    Notice: Data might not be loading correctly from the server
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  name="search"
                  placeholder="Cari admin..."
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
                onClick={handleForceRefresh}
                loading={loading.admins}
              >
                Refresh
              </Button>
              
              <Button
                variant="primary"
                icon={<FiPlus />}
                onClick={handleOpenCreate}
              >
                Tambah Admin
              </Button>
            </div>
          </div>
          
          {/* Admin Table */}
          {currentAdmins.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Dibuat
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAdmins.map((admin, index) => (
                    <tr key={admin.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{admin.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={admin.role === 'super-admin' ? 'danger' : 'info'}
                          size="sm"
                        >
                          {admin.role}
                        </Badge>
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleOpenDetail(admin)}
                            className="inline-flex items-center justify-center size-8 rounded-full border border-transparent text-blue-600 hover:bg-blue-50"
                            title="Lihat Detail"
                          >
                            <FiInfo size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(admin)}
                            className="inline-flex items-center justify-center size-8 rounded-full border border-transparent text-yellow-600 hover:bg-yellow-50"
                            title="Edit Admin"
                            disabled={admin.role === 'super-admin'}
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(admin)}
                            className="inline-flex items-center justify-center size-8 rounded-full border border-transparent text-red-600 hover:bg-red-50"
                            title="Hapus Admin"
                            disabled={admin.role === 'super-admin'}
                          >
                            <FiTrash2 size={18} />
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
              title={searchTerm ? "Tidak Ada Hasil" : "Belum Ada Admin"}
              description={searchTerm 
                ? "Tidak ditemukan admin yang sesuai dengan pencarian Anda" 
                : "Belum ada data admin dalam sistem"}
              actionLabel={searchTerm ? "Reset Pencarian" : "Refresh"}
              actionOnClick={searchTerm ? resetSearch : handleForceRefresh}
            />
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </Card>
      
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