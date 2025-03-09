// src/pages/users/reporter/MakeReport.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
// import reportService from '@/services/report.service';
import LoadingScreen from '@/components/common/LoadingScreen';
import ReportRules from '@/components/user/ReportRules';
import ReportForm from '@/components/user/ReportForm';

const MakeReport = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);

  // Handle when user accepts guidelines
  const handleAcceptGuidelines = () => {
    setShowGuidelines(false);
  };

  // Handle when user wants to view guidelines again
  const handleViewGuidelines = () => {
    setShowGuidelines(true);
  };

  // Handle form submission
  const handleSubmitReport = async (formData) => {
    setIsSubmitting(true);
    
    try {
      const result = await reportService.createReport(formData);
      
      if (result.success) {
        addToast('Laporan berhasil dibuat', 'success');
        
        // If anonymous report, show unique code to user
        const isAnonymous = formData.get('is_anonymous') === 'true';
        if (isAnonymous && result.data.unique_code) {
          addToast(`Kode unik laporan anonim Anda: ${result.data.unique_code}. Harap simpan kode ini untuk memantau status laporan.`, 'success', 10000);
        }
        
        // Redirect to appropriate page
        if (isAnonymous) {
          navigate('/laporan/anonim', { state: { uniqueCode: result.data.unique_code } });
        } else {
          navigate('/laporan/pantau');
        }
      } else {
        addToast(result.error || 'Gagal membuat laporan', 'error');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      addToast('Terjadi kesalahan saat mengirim laporan', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen fullScreen={false} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {showGuidelines ? (
        <ReportRules 
          onAccept={handleAcceptGuidelines}
          accepted={acceptedGuidelines}
          onAcceptedChange={setAcceptedGuidelines}
        />
      ) : (
        <ReportForm 
          onSubmit={handleSubmitReport}
          onViewGuidelines={handleViewGuidelines}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default MakeReport;