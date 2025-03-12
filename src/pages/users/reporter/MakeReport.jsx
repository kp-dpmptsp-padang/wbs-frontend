import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import reportService from '@/services/report.service';
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

  const handleAcceptGuidelines = () => {
    setShowGuidelines(false);
  };

  const handleViewGuidelines = () => {
    setShowGuidelines(true);
  };

  const handleSubmitReport = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Create a safe version of formData for logging
      const formDataEntries = {};
      formData.forEach((value, key) => {
        if (key !== 'evidence_files') {
          formDataEntries[key] = value;
        } else {
          formDataEntries[key] = '[File Object]';
        }
      });
      console.log('FormData entries:', formDataEntries);
      
      // Call the service
      const result = await reportService.createReport(formData);
      
      // Handle successful submission
      if (result && result.success) {
        // Show success message
        addToast('Laporan berhasil dibuat', 'success');
        
        // Determine if this is an anonymous report
        const isAnonymous = formData.get('is_anonymous') === 'true';
        
        try {
          // Safe navigation to next page
          setTimeout(() => {
            if (isAnonymous && result.data && result.data.unique_code) {
              // For anonymous reports with unique code
              const uniqueCode = result.data.unique_code;
              addToast(`Kode unik laporan anonim Anda: ${uniqueCode}`, 'success', 10000);
              navigate('/laporan/anonim', { state: { uniqueCode } });
            } else {
              // For regular reports
              navigate('/laporan/pantau');
            }
          }, 500); // Add delay to ensure toast shows before navigation
        } catch (navigationError) {
          console.error('Navigation error:', navigationError);
          // If navigation fails, at least stay on the page
        }
      } else {
        // Handle API error
        addToast(result?.error || 'Gagal membuat laporan', 'error');
      }
    } catch (error) {
      // Handle exception
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
    <div className="p-6 bg-white border rounded-lg shadow-sm border-gray-200 min-h-screen">
      <div className="container">
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
    </div>
  );
};

export default MakeReport;