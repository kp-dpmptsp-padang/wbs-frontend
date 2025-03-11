// src/components/user/modals/admin/ApproveModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

const ApproveModal = ({ isOpen, onClose, onConfirm, report, isProcessing }) => {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Konfirmasi Persetujuan</h2>
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="mt-2">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <p className="text-center text-gray-900">
            Apakah Anda yakin ingin memproses laporan ini?
          </p>
          <p className="text-center text-gray-600 mt-1">
            "{report.title}"
          </p>
          <p className="text-center text-gray-500 text-sm mt-4">
            Laporan akan berpindah ke status "Sedang Diproses" dan pelapor akan menerima notifikasi.
          </p>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Batal
          </Button>
          
          <Button
            variant="success"
            icon={<FiCheckCircle />}
            onClick={onConfirm}
            loading={isProcessing}
            disabled={isProcessing}
          >
            Proses Laporan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ApproveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  report: PropTypes.object,
  isProcessing: PropTypes.bool
};

export default ApproveModal;