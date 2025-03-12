// src/components/user/modals/ReportDetailModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiX, FiEye, FiDownload } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { formatDate } from '@/utils/formatters';

const ReportDetailModal = ({ isOpen, onClose, report }) => {
  if (!report) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      'menunggu-verifikasi': { label: 'Menunggu Verifikasi', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
      'diproses': { label: 'Sedang Diproses', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      'selesai': { label: 'Selesai', bgColor: 'bg-green-100', textColor: 'text-green-800' },
      'ditolak': { label: 'Ditolak', bgColor: 'bg-red-100', textColor: 'text-red-800' },
    };
    
    const config = statusConfig[status] || { label: status, bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bgColor} ${config.textColor}`}>
        {config.label}
      </span>
    );
  };

  // Check if communication button should be shown
  const showCommunicationButton = report.status === 'diproses' || report.status === 'selesai';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Detail Laporan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX size={24} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">Monitoring Proses Laporan Anda</p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Judul Laporan</h3>
            <p className="mt-1 text-base text-gray-900">{report.title}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pelanggaran yang Dilakukan</h3>
            <p className="mt-1 text-base text-gray-900">{report.violation}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Lokasi</h3>
              <p className="mt-1 text-base text-gray-900">{report.location}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tanggal</h3>
              <p className="mt-1 text-base text-gray-900">{formatDate(report.date)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pihak yang Terlibat</h3>
            <p className="mt-1 text-base text-gray-900">{report.actors}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Detil Kejadian</h3>
            <p className="mt-1 text-base text-gray-900 whitespace-pre-line">{report.detail}</p>
          </div>
          
          {report.files && report.files.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Lampiran</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {report.files.map((file, index) => (
                  <a
                    key={index}
                    href={file.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {file.file_type === 'image' ? (
                      <FiEye className="mr-2" />
                    ) : (
                      <FiDownload className="mr-2" />
                    )}
                    {file.file_path.split('/').pop()}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <div className="mt-2">
              {getStatusBadge(report.status)}
            </div>
          </div>
          
          {report.status === 'ditolak' && report.rejection_reason && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-md">
              <h3 className="text-sm font-medium text-red-800">Alasan Penolakan:</h3>
              <p className="mt-1 text-sm text-red-700">{report.rejection_reason}</p>
            </div>
          )}
          
          {report.status === 'selesai' && report.admin_notes && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-md">
              <h3 className="text-sm font-medium text-green-800">Catatan Penyelesaian:</h3>
              <p className="mt-1 text-sm text-green-700">{report.admin_notes}</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Tutup
          </Button>
          
          {showCommunicationButton && (
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                window.location.href = `/chat?reportId=${report.id}`;
              }}
            >
              Komunikasi
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

ReportDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  report: PropTypes.object
};

export default ReportDetailModal;