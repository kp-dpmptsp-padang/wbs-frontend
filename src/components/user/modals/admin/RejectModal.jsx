// src/components/user/modals/admin/RejectModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiXCircle } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';

const RejectModal = ({ isOpen, onClose, onConfirm, report, isProcessing }) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [error, setError] = useState('');

  if (!report) return null;

  const handleRejectionChange = (e) => {
    setRejectionReason(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  const handleConfirm = () => {
    if (!rejectionReason.trim()) {
      setError('Alasan penolakan harus diisi');
      return;
    }
    
    onConfirm(rejectionReason);
  };

  const handleClose = () => {
    // Reset form state on close
    setRejectionReason('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Konfirmasi Penolakan</h2>
          <button 
            onClick={handleClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="mt-2">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <FiXCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <p className="text-center text-gray-900">
            Anda akan menolak laporan ini
          </p>
          <p className="text-center text-gray-600 mt-1">
            "{report.title}"
          </p>
          
          <div className="mt-4">
            <label htmlFor="rejection-reason" className="block text-sm font-medium text-gray-700">
              Alasan Penolakan <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <TextArea
                id="rejection-reason"
                name="rejection_reason"
                value={rejectionReason}
                onChange={handleRejectionChange}
                placeholder="Berikan alasan mengapa laporan ini ditolak..."
                rows={4}
                disabled={isProcessing}
                error={error}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Alasan penolakan akan ditampilkan kepada pelapor.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
          >
            Batal
          </Button>
          
          <Button
            variant="danger"
            icon={<FiXCircle />}
            onClick={handleConfirm}
            loading={isProcessing}
            disabled={isProcessing}
          >
            Tolak Laporan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

RejectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  report: PropTypes.object,
  isProcessing: PropTypes.bool
};

export default RejectModal;