// src/components/user/ReportForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FiInfo, 
  FiFileText, 
  FiAlertTriangle, 
  FiMapPin, 
  FiCalendar, 
  FiUser, 
  FiUploadCloud, 
  FiSend, 
  FiX 
} from 'react-icons/fi';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';

const ReportForm = ({ onSubmit, onViewGuidelines, isSubmitting }) => {
  const [reportForm, setReportForm] = useState({
    title: '',
    violation: '',
    location: '',
    date: '',
    actors: '',
    detail: '',
    is_anonymous: false,
    evidence_files: null
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        evidence_files: 'Ukuran file maksimal 10MB'
      }));
      return;
    }

    // Check file type (allow images, PDFs, docs)
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        evidence_files: 'Format file tidak didukung. Gunakan JPG, PNG, atau PDF'
      }));
      return;
    }

    setReportForm(prev => ({
      ...prev,
      evidence_files: file
    }));
    setSelectedFile(file);

    // Create preview for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, just show the file name
      setFilePreview(null);
    }

    // Clear error
    if (errors.evidence_files) {
      setErrors(prev => ({ ...prev, evidence_files: null }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!reportForm.title.trim()) {
      newErrors.title = 'Judul laporan harus diisi';
    } else if (reportForm.title.trim().split(' ').length < 3) {
      newErrors.title = 'Judul minimal 3 kata';
    }

    if (!reportForm.violation.trim()) {
      newErrors.violation = 'Jenis pelanggaran harus diisi';
    }

    if (!reportForm.location.trim()) {
      newErrors.location = 'Lokasi kejadian harus diisi';
    }

    if (!reportForm.date.trim()) {
      newErrors.date = 'Tanggal kejadian harus diisi';
    } else {
      // Validate date format (DD-MM-YYYY)
      const datePattern = /^\d{2}-\d{2}-\d{4}$/;
      if (!datePattern.test(reportForm.date)) {
        newErrors.date = 'Format tanggal harus DD-MM-YYYY';
      }
    }

    if (!reportForm.actors.trim()) {
      newErrors.actors = 'Pihak terlibat harus diisi';
    }

    if (!reportForm.detail.trim()) {
      newErrors.detail = 'Detail kejadian harus diisi';
    } else if (reportForm.detail.trim().length < 50) {
      newErrors.detail = 'Detail minimal 50 karakter';
    }

    if (!reportForm.evidence_files) {
      newErrors.evidence_files = 'Bukti pendukung harus dilampirkan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Create FormData object for file upload
    const formData = new FormData();
    Object.keys(reportForm).forEach(key => {
      if (key === 'evidence_files') {
        formData.append('evidence_files', reportForm.evidence_files);
      } else {
        formData.append(key, reportForm[key]);
      }
    });
    
    onSubmit(formData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Buat Laporan Baru</h2>
        <Button
          variant="outline-primary"
          size="small"
          onClick={onViewGuidelines}
          icon={<FiInfo />}
        >
          Lihat Panduan
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Judul Laporan */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Judul Laporan <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={reportForm.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Masukkan judul laporan (minimal 3 kata)"
              leftIcon={<FiFileText />}
            />
            <p className="mt-1 text-xs text-gray-500">
              Contoh: "Pungli dalam Perizinan Mendirikan Bangunan di Kota Padang"
            </p>
          </div>

          {/* Jenis Pelanggaran */}
          <div>
            <label htmlFor="violation" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Pelanggaran <span className="text-red-500">*</span>
            </label>
            <Input
              id="violation"
              name="violation"
              type="text"
              value={reportForm.violation}
              onChange={handleChange}
              error={errors.violation}
              placeholder="Masukkan jenis pelanggaran"
              leftIcon={<FiAlertTriangle />}
            />
            <p className="mt-1 text-xs text-gray-500">
              Contoh: "Korupsi", "Penyalahgunaan Wewenang", "Kecurangan", dll.
            </p>
          </div>

          {/* Lokasi */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Lokasi Kejadian <span className="text-red-500">*</span>
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              value={reportForm.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="Masukkan lokasi kejadian"
              leftIcon={<FiMapPin />}
            />
          </div>

          {/* Tanggal */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Kejadian <span className="text-red-500">*</span>
            </label>
            <Input
              id="date"
              name="date"
              type="text"
              value={reportForm.date}
              onChange={handleChange}
              error={errors.date}
              placeholder="Format: DD-MM-YYYY"
              leftIcon={<FiCalendar />}
            />
            <p className="mt-1 text-xs text-gray-500">
              Gunakan format DD-MM-YYYY, contoh: 15-06-2023
            </p>
          </div>

          {/* Pihak Terlibat */}
          <div>
            <label htmlFor="actors" className="block text-sm font-medium text-gray-700 mb-1">
              Pihak Terlibat <span className="text-red-500">*</span>
            </label>
            <Input
              id="actors"
              name="actors"
              type="text"
              value={reportForm.actors}
              onChange={handleChange}
              error={errors.actors}
              placeholder="Sebutkan individu/instansi yang terlibat"
              leftIcon={<FiUser />}
            />
            <p className="mt-1 text-xs text-gray-500">
              Sebutkan nama lengkap atau jabatan pihak yang dilaporkan
            </p>
          </div>

          {/* Detail Kejadian */}
          <div>
            <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
              Detail Kejadian <span className="text-red-500">*</span>
            </label>
            <TextArea
              id="detail"
              name="detail"
              value={reportForm.detail}
              onChange={handleChange}
              error={errors.detail}
              placeholder="Jelaskan kronologi dan detail kejadian secara lengkap"
              rows={6}
            />
            <p className="mt-1 text-xs text-gray-500">
              Tuliskan kronologi kejadian secara rinci mencakup waktu, tempat, dan bagaimana pelanggaran terjadi (minimal 50 karakter)
            </p>
          </div>

          {/* File Bukti */}
          <div>
            <label htmlFor="evidence_files" className="block text-sm font-medium text-gray-700 mb-1">
              Bukti Pendukung <span className="text-red-500">*</span>
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 ${errors.evidence_files ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-primary'}`}>
              <div className="flex flex-col items-center">
                {!selectedFile ? (
                  <>
                    <FiUploadCloud className="text-gray-400 text-3xl mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Klik atau seret file ke sini</p>
                    <p className="text-xs text-gray-400">JPG, PNG, atau PDF (Max. 10MB)</p>
                  </>
                ) : (
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FiFileText className="text-primary mr-2" />
                        <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
                      </div>
                      <button
                        type="button" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedFile(null);
                          setFilePreview(null);
                          setReportForm(prev => ({ ...prev, evidence_files: null }));
                        }}
                      >
                        <FiX />
                      </button>
                    </div>
                    {filePreview && (
                      <div className="mt-2 rounded-lg overflow-hidden">
                        <img src={filePreview} alt="Preview" className="max-h-40 mx-auto" />
                      </div>
                    )}
                  </div>
                )}
                <input
                  id="evidence_files"
                  name="evidence_files"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <label htmlFor="evidence_files" className="mt-3">
                  <Button
                    type="button"
                    variant={selectedFile ? "outline-primary" : "primary"}
                    size="small"
                    icon={selectedFile ? <FiFileText /> : <FiUploadCloud />}
                  >
                    {selectedFile ? "Ganti File" : "Pilih File"}
                  </Button>
                </label>
              </div>
            </div>
            {errors.evidence_files && (
              <p className="mt-1 text-xs text-red-500">{errors.evidence_files}</p>
            )}
          </div>

          {/* Pelaporan Anonim */}
          <div>
            <div className="flex items-center">
              <input
                id="is_anonymous"
                name="is_anonymous"
                type="checkbox"
                checked={reportForm.is_anonymous}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="is_anonymous" className="ml-2 block text-sm font-medium text-gray-700">
                Kirim sebagai laporan anonim
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500 pl-6">
              Jika dicentang, identitas Anda akan dirahasiakan. Anda akan menerima kode unik untuk memantau laporan.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
              icon={<FiSend />}
            >
              Kirim Laporan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onViewGuidelines: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default ReportForm;