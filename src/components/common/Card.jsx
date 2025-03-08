import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  title,
  subtitle,
  headerContent,
  footer,
  variant = 'default',
  size = 'default',
  hoverable = false,
  clickable = false,
  onClick,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = "bg-white rounded-lg overflow-hidden";
  
  // Variant classes
  const variantClasses = {
    'default': "border border-gray-200 shadow-sm",
    'elevated': "shadow-md",
    'outline': "border border-gray-200",
    'flat': "",
    'primary': "border border-primary-200 shadow-sm",
    'success': "border border-green-200 shadow-sm",
    'warning': "border border-yellow-200 shadow-sm",
    'danger': "border border-red-200 shadow-sm"
  };
  
  // Size classes
  const sizeClasses = {
    'sm': "p-3",
    'default': "p-4",
    'lg': "p-5"
  };
  
  // Hover effect classes
  const hoverClasses = hoverable ? "transition-shadow duration-200 hover:shadow-lg" : "";
  
  // Clickable classes
  const clickableClasses = clickable ? "cursor-pointer transition-all duration-200 hover:shadow-md active:shadow-sm active:translate-y-0.5" : "";
  
  // Compose final className
  const cardClasses = [
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    clickableClasses,
    className
  ].filter(Boolean).join(' ');
  
  // Create header if title, subtitle or headerContent is provided
  const renderHeader = () => {
    if (!title && !subtitle && !headerContent) return null;
    
    return (
      <div className={`border-b border-gray-200 ${sizeClasses[size]} ${headerClassName}`}>
        {headerContent ? (
          headerContent
        ) : (
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
        )}
      </div>
    );
  };
  
  // Create footer if provided
  const renderFooter = () => {
    if (!footer) return null;
    
    return (
      <div className={`border-t border-gray-200 ${sizeClasses[size]} ${footerClassName}`}>
        {footer}
      </div>
    );
  };
  
  // Handle card body padding based on whether header/footer exists
  const bodyClasses = `${sizeClasses[size]} ${bodyClassName}`;
  
  return (
    <div 
      className={cardClasses} 
      onClick={clickable ? onClick : undefined}
      {...rest}
    >
      {renderHeader()}
      
      <div className={bodyClasses}>
        {children}
      </div>
      
      {renderFooter()}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  headerContent: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'elevated', 'outline', 'flat', 'primary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string
};

export default Card;