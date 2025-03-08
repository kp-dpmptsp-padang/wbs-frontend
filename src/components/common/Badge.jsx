import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  icon,
  dot = false,
  count,
  maxCount = 99,
  showZero = false,
  onClick,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = "inline-flex items-center gap-x-1 font-medium";
  
  // Size classes - control padding and font size
  const sizeClasses = {
    xs: "py-0.5 px-1.5 text-xs",
    sm: "py-1 px-2 text-xs",
    md: "py-1.5 px-3 text-xs",
    lg: "py-1.5 px-3.5 text-sm"
  };
  
  // Shape classes
  const shapeClasses = {
    rounded: "rounded-md",
    pill: "rounded-full",
    square: "rounded-none"
  };
  
  // Variant classes - background and text colors
  const variantClasses = {
    // Default styles (gray)
    'default': "bg-gray-100 text-gray-800",
    'light': "bg-gray-50 text-gray-500",
    
    // Primary styles
    'primary': "bg-primary-100 text-primary-800",
    'primary-solid': "bg-primary text-white",
    
    // Semantic colors - soft variants
    'info': "bg-blue-100 text-blue-800",
    'success': "bg-green-100 text-green-800",
    'warning': "bg-yellow-100 text-yellow-800",
    'danger': "bg-red-100 text-red-800",
    
    // Semantic colors - solid variants
    'info-solid': "bg-blue-500 text-white",
    'success-solid': "bg-green-500 text-white",
    'warning-solid': "bg-yellow-500 text-white",
    'danger-solid': "bg-red-500 text-white",
    
    // Outlined variants
    'outline-default': "bg-white border border-gray-200 text-gray-800",
    'outline-primary': "bg-white border border-primary text-primary",
    'outline-info': "bg-white border border-blue-500 text-blue-500",
    'outline-success': "bg-white border border-green-500 text-green-500",
    'outline-warning': "bg-white border border-yellow-500 text-yellow-500",
    'outline-danger': "bg-white border border-red-500 text-red-500",
  };
  
  // Compose final className
  const badgeClasses = [
    baseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    variantClasses[variant],
    onClick ? 'cursor-pointer hover:opacity-80' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Handle dot notification style
  if (dot) {
    return (
      <span className={`relative ${className}`} {...rest}>
        {children}
        <span 
          className={`absolute top-0 right-0 block h-2 w-2 rounded-full transform -translate-y-1/2 translate-x-1/2 ${
            variant.includes('danger') ? 'bg-red-500' : 
            variant.includes('success') ? 'bg-green-500' : 
            variant.includes('warning') ? 'bg-yellow-500' : 
            variant.includes('info') ? 'bg-blue-500' : 
            variant.includes('primary') ? 'bg-primary' : 'bg-gray-500'
          }`}
        />
      </span>
    );
  }
  
  // Handle count notification style
  if (count !== undefined) {
    // Don't show if count is 0 and showZero is false
    if (count === 0 && !showZero) {
      return children;
    }
    
    // Determine what text to display (respect maxCount)
    const displayCount = count > maxCount ? `${maxCount}+` : count;
    
    return (
      <span className={`relative ${className}`} {...rest}>
        {children}
        <span 
          className={`absolute top-0 right-0 min-w-5 h-5 flex items-center justify-center rounded-full px-1.5 text-xs transform -translate-y-1/2 translate-x-1/2 ${
            variant.includes('danger') ? 'bg-red-500 text-white' : 
            variant.includes('success') ? 'bg-green-500 text-white' : 
            variant.includes('warning') ? 'bg-yellow-500 text-white' : 
            variant.includes('info') ? 'bg-blue-500 text-white' : 
            variant.includes('primary') ? 'bg-primary text-white' : 'bg-gray-500 text-white'
          }`}
        >
          {displayCount}
        </span>
      </span>
    );
  }
  
  // Regular badge
  return (
    <span 
      className={badgeClasses}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'default', 'light', 
    'primary', 'primary-solid',
    'info', 'success', 'warning', 'danger',
    'info-solid', 'success-solid', 'warning-solid', 'danger-solid',
    'outline-default', 'outline-primary', 'outline-info', 'outline-success', 'outline-warning', 'outline-danger'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  shape: PropTypes.oneOf(['rounded', 'pill', 'square']),
  icon: PropTypes.node,
  dot: PropTypes.bool,
  count: PropTypes.number,
  maxCount: PropTypes.number,
  showZero: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Badge;