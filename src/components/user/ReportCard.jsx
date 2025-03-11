// src/components/user/ReportCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@/components/common/Card';

const ReportCard = ({
  title,
  date,
  description,
  status,
  icon,
  onClick,
  hasNewMessages = false,
  className = '',
  ...rest
}) => {
  // Status configurations
  const statusConfig = {
    'menunggu-verifikasi': {
      label: 'Menunggu Verifikasi',
      color: 'bg-yellow-400',
      iconBg: 'bg-yellow-400',
      textColor: 'text-yellow-800'
    },
    'diproses': {
      label: 'Sedang Diproses',
      color: 'bg-blue-400',
      iconBg: 'bg-blue-400',
      textColor: 'text-blue-800'
    },
    'selesai': {
      label: 'Selesai',
      color: 'bg-green-500',
      iconBg: 'bg-green-500',
      textColor: 'text-green-800'
    },
    'ditolak': {
      label: 'Ditolak',
      color: 'bg-red-500',
      iconBg: 'bg-red-500',
      textColor: 'text-red-800'
    }
  };
  
  const statusInfo = statusConfig[status] || statusConfig['menunggu-verifikasi'];
  
  // Truncate long text
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  return (
    <Card 
      variant="outline"
      className={`overflow-hidden h-full flex flex-col ${className}`}
      {...rest}
    >
      {/* Top section with status color */}
      <div className={`${statusInfo.color} p-4 flex justify-center`}>
        <div className="bg-white rounded-lg p-3 inline-flex justify-center items-center size-16">
          {icon ? (
            icon
          ) : (
            <svg 
              className={`size-10 ${statusInfo.textColor}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={
                  status === 'selesai' ? "M5 13l4 4L19 7" :
                  status === 'ditolak' ? "M6 18L18 6M6 6l12 12" :
                  "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              />
            </svg>
          )}
        </div>
      </div>
      
      {/* Report status label */}
      <div className={`text-center py-2 ${statusInfo.textColor} text-sm font-medium`}>
        {statusInfo.label}
      </div>
      
      {/* Report content */}
      <div className="p-4 flex-1">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3">Terjadi pada {date}</p>
        <p className="text-sm text-gray-600 mb-4">
          {truncateText(description)}
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="flex border-t border-gray-200 mt-auto">
        <button 
          className="flex-1 py-3 text-sm text-center text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => onClick && onClick('detail')}
        >
          Detail
        </button>
        
        <div className="border-r border-gray-200"></div>
        
        <button 
          className="flex-1 py-3 text-sm text-center text-gray-700 hover:bg-gray-50 transition-colors relative"
          onClick={() => onClick && onClick('komunikasi')}
        >
          Komunikasi
          {hasNewMessages && (
            <span className="absolute top-3 right-6 size-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </div>
    </Card>
  );
};

ReportCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['menunggu-verifikasi', 'diproses', 'selesai', 'ditolak']).isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  hasNewMessages: PropTypes.bool,
  className: PropTypes.string
};

export default ReportCard;