import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  initials,
  className = '',
  fallbackClassName = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = "inline-flex";
  
  // Size classes
  const sizeClasses = {
    xs: "size-6", // 24px
    sm: "size-8", // 32px
    md: "size-9.5", // 38px
    lg: "size-11", // 44px
    xl: "size-15.5", // 62px
    '2xl': "size-20", // 80px
  };
  
  // Shape classes
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-md",
  };
  
  // Status classes for position
  const statusPositionClasses = {
    'top-right': "absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4",
    'top-left': "absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4",
    'bottom-right': "absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4",
    'bottom-left': "absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4",
  };
  
  // Status colors
  const statusColorClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };
  
  // Determine size for status indicator (smaller for smaller avatars)
  const statusSizeClasses = {
    xs: "size-1.5",
    sm: "size-2",
    md: "size-2.5",
    lg: "size-3",
    xl: "size-3.5",
    '2xl': "size-4",
  };
  
  // Calculate font size for initials
  const initialsFontSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    '2xl': "text-2xl",
  };
  
  // Compose final className
  const avatarClasses = [
    baseClasses,
    sizeClasses[size],
    shapeClasses[shape],
    className
  ].join(' ');
  
  // Create initials from text if needed and no image is available
  const getInitials = () => {
    if (initials) return initials;
    if (alt && alt !== 'Avatar') {
      return alt
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }
    return '';
  };
  
  // Handle image loading error
  const [imgError, setImgError] = React.useState(false);
  const handleImgError = () => setImgError(true);
  
  // Render image or fallback
  const renderContent = () => {
    if (src && !imgError) {
      return (
        <img 
          src={src} 
          alt={alt} 
          className={`${shapeClasses[shape]} h-full w-full object-cover`} 
          onError={handleImgError}
        />
      );
    } else {
      // Render initials as fallback
      return (
        <div 
          className={`${shapeClasses[shape]} h-full w-full flex items-center justify-center bg-gray-200 text-gray-600 ${initialsFontSizeClasses[size]} font-medium ${fallbackClassName}`}
        >
          {getInitials()}
        </div>
      );
    }
  };
  
  return (
    <div className={`relative ${avatarClasses}`} {...rest}>
      {renderContent()}
      
      {status && (
        <span 
          className={`
            block border-2 border-white
            ${statusSizeClasses[size]} 
            ${statusPositionClasses[statusPosition]} 
            ${statusColorClasses[status]} 
            ${shapeClasses.circle}
          `}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  statusPosition: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  initials: PropTypes.string,
  className: PropTypes.string,
  fallbackClassName: PropTypes.string
};

export default Avatar;