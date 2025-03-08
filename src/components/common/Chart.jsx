import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({
  title,
  subtitle,
  children,
  footer,
  height = 'auto',
  loading = false,
  error = null,
  emptyText = 'No data available',
  isEmpty = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  actions,
  variant = 'default',
  ...rest
}) => {
  // Base classes
  const baseClasses = "chart-container";
  
  // Variant classes
  const variantClasses = {
    'default': "bg-white border border-gray-200 rounded-lg shadow-sm",
    'plain': "",
    'elevated': "bg-white rounded-lg shadow-md",
    'outlined': "bg-white border border-gray-200 rounded-lg"
  };
  
  // Calculate height style
  const heightStyle = height === 'auto' ? {} : { height };
  
  // Compose final className
  const chartClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');
  
  // Handle loading state
  const renderLoading = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
      <div className="chart-loading-spinner">
        <svg className="animate-spin size-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
  );
  
  // Handle error state
  const renderError = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg">
      <div className="text-red-500 mb-2">
        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-gray-700 font-medium">{error || 'Failed to load chart data'}</p>
    </div>
  );
  
  // Handle empty state
  const renderEmpty = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg">
      <div className="text-gray-400 mb-2">
        <svg className="size-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <p className="text-gray-500">{emptyText}</p>
    </div>
  );
  
  return (
    <div 
      className={chartClasses}
      style={heightStyle}
      {...rest}
    >
      {/* Chart Header */}
      {(title || subtitle || actions) && (
        <div className={`chart-header p-4 ${headerClassName}`}>
          <div className="flex justify-between items-start">
            <div>
              {title && <h3 className="text-lg font-medium text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {actions && (
              <div className="chart-actions">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Chart Body */}
      <div className={`chart-body p-4 pt-0 relative ${bodyClassName}`} style={heightStyle}>
        {loading && renderLoading()}
        {error && renderError()}
        {isEmpty && renderEmpty()}
        {children}
      </div>
      
      {/* Chart Footer */}
      {footer && (
        <div className={`chart-footer p-4 border-t border-gray-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

Chart.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool,
  error: PropTypes.string,
  emptyText: PropTypes.string,
  isEmpty: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'plain', 'elevated', 'outlined'])
};

export default Chart;