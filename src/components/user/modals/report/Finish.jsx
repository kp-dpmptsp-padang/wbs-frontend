// src/components/user/modals/report/Finish.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiUpload, FiFile, FiX } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';

const Finish = ({ isOpen, onClose, onConfirm, report, isProcessing }) => {
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  
  const fileInputRef = React.useRef(null);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    
    // Clear error when user types
    if (errors.notes) {
      setErrors(prev => ({ ...prev, notes: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size and type
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({
        ...prev,
        file: 'Ukuran file tidak boleh melebihi 5MB'
      }));
      return;
    }
    
    // Accept PDF, images, and common document formats
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        file: 'Format file tidak didukung. Gunakan PDF, JPG, PNG, DOC, atau DOCX'
      }));
      return;
    }
    
    setSelectedFile(file);
    
    // Clear error when file is selected
    if (errors.file) {
      setErrors(prev => ({ ...prev, file: null }));
    }
  };

  const handleFileClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    // Validate
    const newErrors = {};
    
    if (!notes.trim()) {
      newErrors.notes = 'Catatan penyelesaian harus diisi';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('admin_notes', notes);
    
    if (selectedFile) {
      formData.append('handling_proof', selectedFile);
    }
    
    onConfirm(formData);
  };

  const handleCancel = () => {
    // Reset form
    setNotes('');
    setSelectedFile(null);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Selesaikan Laporan"
      size="md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center text-green-500 my-4">
          <FiCheckCircle size={48} />
        </div>
        
        <p className="text-center text-gray-700">
          Pastikan laporan ini benar-benar telah ditangani dan diselesaikan. Setelah dikonfirmasi,
          status laporan akan diperbarui menjadi 'Selesai'
        </p>
        
        <div className="bg-gray-50 p-3 rounded text-center font-medium text-gray-800">
          {report?.title}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tambahkan catatan penyelesaian <span className="text-red-500">*</span>
          </label>
          <TextArea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Jelaskan tindakan yang telah dilakukan untuk menyelesaikan laporan ini..."
            rows={4}
            error={errors.notes}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lampiran bukti penanganan
          </label>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          
          {!selectedFile ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary cursor-pointer"
              onClick={handleFileClick}
            >
              <div className="flex flex-col items-center">
                <FiUpload className="text-gray-400 text-3xl mb-2" />
                <p className="text-sm text-primary">Pilih file</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, DOC (Maks. 5MB)</p>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiFile className="text-primary mr-2" />
                  <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>
          )}
          
          {errors.file && (
            <p className="mt-1 text-xs text-red-500">{errors.file}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
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

Finish.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  report: PropTypes.object,
  isProcessing: PropTypes.bool
};

export default Finish;