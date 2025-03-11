// src/components/user/modals/admin/DetailModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiX, FiEye, FiDownload, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { formatDate } from '@/utils/formatters';

const DetailModal = ({ isOpen, onClose, report, onApprove, onReject }) => {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Detail Laporan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Judul Laporan</h3>
            <p className="mt-1 text-base text-gray-900">{report.title}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pelapor</h3>
            <p className="mt-1 text-base text-gray-900">
              {report.is_anonymous ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Anonim
                </span>
              ) : (
                report.reporter?.name || 'Unknown'
              )}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Pelanggaran yang Dilaporkan</h3>
            <p className="mt-1 text-base text-gray-900">{report.violation}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Lokasi</h3>
              <p className="mt-1 text-base text-gray-900">{report.location}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tanggal Kejadian</h3>
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
              <h3 className="text-sm font-medium text-gray-500">Bukti Pendukung</h3>
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
            <h3 className="text-sm font-medium text-gray-500">Tanggal Pelaporan</h3>
            <p className="mt-1 text-base text-gray-900">{formatDate(report.createdAt || report.created_at)}</p>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Tutup
          </Button>
          
          <Button
            variant="danger"
            icon={<FiXCircle />}
            onClick={onReject}
          >
            Tolak Laporan
          </Button>
          
          <Button
            variant="success"
            icon={<FiCheckCircle />}
            onClick={onApprove}
          >
            Proses Laporan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

DetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  report: PropTypes.object,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default DetailModal;