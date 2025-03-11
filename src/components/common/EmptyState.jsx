// src/components/common/EmptyState.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionUrl,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg border border-gray-200 ${className}`}>
      {icon && <div className="text-gray-400 mb-4">{icon}</div>}
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      
      {description && (
        <p className="text-sm text-gray-500 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      
      {actionLabel && (
        onAction ? (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : (
          <Button 
            as={Link} 
            to={actionUrl || '#'}
            variant="primary"
          >
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  actionUrl: PropTypes.string,
  onAction: PropTypes.func,
  className: PropTypes.string,
};

export default EmptyState;