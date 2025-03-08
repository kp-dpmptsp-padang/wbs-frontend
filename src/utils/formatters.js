// src/utils/formatters.js
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  export const formatStatus = (status) => {
    const statusMap = {
      'menunggu-verifikasi': 'Menunggu Verifikasi',
      'diproses': 'Sedang Diproses',
      'ditolak': 'Ditolak',
      'selesai': 'Selesai'
    };
    
    return statusMap[status] || status;
  };
  
  export const formatStatusClass = (status) => {
    const classMap = {
      'menunggu-verifikasi': 'bg-yellow-100 text-yellow-800',
      'diproses': 'bg-blue-100 text-blue-800',
      'ditolak': 'bg-red-100 text-red-800',
      'selesai': 'bg-green-100 text-green-800'
    };
    
    return classMap[status] || 'bg-gray-100 text-gray-800';
};