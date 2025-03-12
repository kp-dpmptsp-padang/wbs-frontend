// src/components/user/ReportCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiEye, FiMessageSquare } from 'react-icons/fi';

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
      label: 'MENUNGGU VERIFIKASI',
      color: 'bg-yellow-400',
      textColor: 'text-yellow-800'
    },
    'diproses': {
      label: 'SEDANG DIPROSES',
      color: 'bg-blue-400',
      textColor: 'text-blue-800'
    },
    'selesai': {
      label: 'SELESAI',
      color: 'bg-green-500',
      textColor: 'text-green-800'
    },
    'ditolak': {
      label: 'DITOLAK',
      color: 'bg-red-500',
      textColor: 'text-red-800'
    }
  };
  
  const statusInfo = statusConfig[status] || statusConfig['menunggu-verifikasi'];
  
  // Truncate long text
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  // Determine which actions to show based on status
  const showCommunication = status === 'diproses' || status === 'selesai';
  
  return (
    <div 
      className={`rounded-lg overflow-hidden border border-gray-200 bg-white ${className}`}
      {...rest}
    >
      {/* Header with status color */}
      <div className={`${statusInfo.color} flex items-center justify-center`}>
        <div className="h-16 relative w-full">
          <div className="absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white size-20 flex items-center justify-center rounded-full border border-gray-200 shadow-sm">
              {icon}
            </div>
          </div>
        </div>
      </div>
      
      {/* Status label */}
      <div className={`text-center pt-10 pb-2 ${statusInfo.textColor} text-xs font-bold tracking-wide`}>
        {statusInfo.label}
      </div>
      
      {/* Report content */}
      <div className="px-4 py-3">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3">Terjadi pada {date}</p>
        <p className="text-sm text-gray-600">
          {truncateText(description)}
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="border-t border-gray-200 flex divide-x divide-gray-200 mt-4">
        <button 
          className="py-3 flex-1 flex items-center justify-center text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => onClick && onClick('detail')}
        >
          <FiEye className="mr-2" />
          Lihat Detail
        </button>
        
        {showCommunication && (
          <button 
            className="py-3 flex-1 flex items-center justify-center text-sm text-blue-600 hover:bg-gray-50"
            onClick={() => onClick && onClick('komunikasi')}
          >
            <FiMessageSquare className="mr-2" />
            Komunikasi
          </button>
        )}
      </div>
    </div>
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