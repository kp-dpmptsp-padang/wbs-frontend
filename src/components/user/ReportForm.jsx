import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FiInfo, 
  FiFileText, 
  FiAlertTriangle, 
  FiMapPin, 
  FiCalendar, 
  FiUser, 
  FiSend
} from 'react-icons/fi';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import Checkbox from '@/components/common/Checkbox';
import PageContainer from '@/components/user/layout/PageContainer';
import DatePicker from '@/components/common/DatePicker';
import FileInput from '@/components/common/FileInput';

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

  // Handle date change from DatePicker
  const handleDateChange = (dateString, dateObj) => {
    // Convert dateString to required format (DD-MM-YYYY)
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    
    setReportForm(prev => ({
      ...prev,
      date: formattedDate
    }));
    
    // Clear error when date is selected
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: null }));
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    
    if (!file) {
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        evidence_files: 'Ukuran file maksimal 10MB'
      }));
      return;
    }
    
    // Check file type
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
    
    // Clear error when file is selected
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
      // Validasi format tanggal (DD-MM-YYYY)
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
    
    // Append each field with proper value type
    formData.append('title', reportForm.title);
    formData.append('violation', reportForm.violation);
    formData.append('location', reportForm.location);
    formData.append('date', reportForm.date);
    formData.append('actors', reportForm.actors);
    formData.append('detail', reportForm.detail);
    formData.append('is_anonymous', reportForm.is_anonymous ? 'true' : 'false'); // Convert boolean to string
    
    // Append file if exists
    if (reportForm.evidence_files) {
      formData.append('evidence_files', reportForm.evidence_files);
    }
    
    // Log only the field names and simple values for debugging
    console.log('Submitting report with data:', {
      title: reportForm.title,
      violation: reportForm.violation,
      location: reportForm.location,
      date: reportForm.date,
      actors: reportForm.actors,
      detail: reportForm.detail.substring(0, 30) + '...',
      is_anonymous: reportForm.is_anonymous ? 'true' : 'false',
      has_file: !!reportForm.evidence_files,
      file_name: reportForm.evidence_files ? reportForm.evidence_files.name : null
    });
    
    // Submit form
    onSubmit(formData);
  };

  // Create header action button for viewing guidelines
  const headerActions = (
    <Button
      variant="outline-primary"
      size="small"
      onClick={onViewGuidelines}
      icon={<FiInfo />}
    >
      Lihat Panduan
    </Button>
  );

  return (
    <PageContainer title="Buat Laporan Baru" actions={headerActions}>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            leftIcon={<FiFileText className="text-gray-400" />}
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
            leftIcon={<FiAlertTriangle className="text-gray-400" />}
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
            leftIcon={<FiMapPin className="text-gray-400" />}
          />
        </div>

        {/* Tanggal - Using DatePicker with icon */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <DatePicker
              id="date-picker"
              dateFormat="dd-MM-yyyy"
              placeholderText="Pilih tanggal kejadian"
              onChange={handleDateChange}
              value={reportForm.date}
              maxDate={new Date().toISOString()} // Cannot select future dates
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiCalendar className="text-gray-400" />
            </div>
          </div>
          {errors.date && (
            <p className="mt-1 text-xs text-red-500">{errors.date}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Pilih tanggal kejadian dalam format DD-MM-YYYY
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
            leftIcon={<FiUser className="text-gray-400" />}
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

        {/* File Bukti - Using FileInput component */}
        <div>
          <label htmlFor="evidence_files" className="block text-sm font-medium text-gray-700 mb-1">
            Bukti Pendukung <span className="text-red-500">*</span>
          </label>
          <FileInput
            id="evidence_files"
            name="evidence_files"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            onChange={handleFileChange}
            error={errors.evidence_files}
            helperText="File JPG, PNG, atau PDF (Maks. 10MB)"
            buttonClassName="primary"
          />
        </div>

        {/* Pelaporan Anonim */}
        <div>
          <Checkbox
            id="is_anonymous"
            name="is_anonymous"
            checked={reportForm.is_anonymous}
            onChange={handleChange}
            label="Kirim sebagai laporan anonim"
            helperText="Jika dicentang, identitas Anda akan dirahasiakan. Anda akan menerima kode unik untuk memantau laporan."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
            icon={<FiSend />}
            block
          >
            Kirim Laporan
          </Button>
        </div>
      </form>
    </PageContainer>
  );
};

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onViewGuidelines: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default ReportForm;