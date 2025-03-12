// src/components/user/modals/admin/FinishModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import FileInput from '@/components/common/FileInput';

const FinishModal = ({ isOpen, onClose, onConfirm, report, isProcessing }) => {
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');

  if (!report) return null;

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Clear previous file error if the user selects a new file
    if (file) {
      setFileError('');
    }
  };

  const handleConfirm = () => {
    if (!notes.trim()) {
      setError('Catatan penyelesaian harus diisi');
      return;
    }
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('admin_notes', notes);
    
    // Add file if selected
    const fileInput = document.getElementById('handling-proof');
    if (fileInput && fileInput.files[0]) {
      formData.append('handling_proof', fileInput.files[0]);
    }
    
    onConfirm(formData);
  };

  const handleClose = () => {
    // Reset form state on close
    setNotes('');
    setError('');
    setFileError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">Selesaikan Laporan</h2>
          <button 
            onClick={handleClose}
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
            Pastikan laporan ini benar-benar telah ditangani dan diselesaikan
          </p>
          <p className="text-center text-gray-600 mt-1">
            "{report.title}"
          </p>
          
          <div className="mt-4">
            <label htmlFor="completion-notes" className="block text-sm font-medium text-gray-700">
              Catatan Penyelesaian <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <TextArea
                id="completion-notes"
                name="admin_notes"
                value={notes}
                onChange={handleNotesChange}
                placeholder="Jelaskan tindakan yang telah dilakukan untuk menyelesaikan laporan ini..."
                rows={4}
                disabled={isProcessing}
                error={error}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Catatan penyelesaian akan ditampilkan kepada pelapor.
            </p>
          </div>
          
          <div className="mt-4">
            <FileInput
              id="handling-proof"
              name="handling_proof"
              label="Lampiran Bukti Penanganan"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              disabled={isProcessing}
              error={fileError}
              helperText="PDF, JPG, PNG, DOC (Maks. 5MB)"
              buttonClassName="primary"
              size="md"
            />
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
            variant="primary"
            icon={<FiCheckCircle />}
            onClick={handleConfirm}
            loading={isProcessing}
            disabled={isProcessing}
          >
            Selesaikan Laporan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

FinishModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  report: PropTypes.object,
  isProcessing: PropTypes.bool
};

export default FinishModal;