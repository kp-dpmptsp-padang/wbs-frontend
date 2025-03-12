import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Spinner = forwardRef(({
  size = 'md',
  color = 'primary',
  thickness = 'normal',
  label = 'Loading...',
  showLabel = false,
  labelPosition = 'right',
  className = '',
  containerClassName = '',
  variant = 'border',
  ...rest
}, ref) => {
  // Size variations (width and height)
  const sizeClasses = {
    xs: 'size-3',     // 12px
    sm: 'size-4',     // 16px
    md: 'size-6',     // 24px
    lg: 'size-8',     // 32px
    xl: 'size-10',    // 40px
    '2xl': 'size-12', // 48px
  };
  
  // Border thickness variations
  const thicknessClasses = {
    thin: 'border-2',
    normal: 'border-3',
    thick: 'border-4',
  };
  
  // Color variations
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-blue-500',
    light: 'text-gray-300',
    dark: 'text-gray-700',
    white: 'text-white',
  };
  
  // Label position classes
  const labelPositionClasses = {
    top: 'flex-col-reverse gap-2',
    right: 'flex-row gap-2',
    bottom: 'flex-col gap-2',
    left: 'flex-row-reverse gap-2',
  };

  // Variant styles
  const variantClasses = {
    border: `animate-spin ${thicknessClasses[thickness]} border-current border-t-transparent rounded-full`,
    dots: 'animate-pulse',
    grow: 'animate-ping opacity-75',
  };
  
  // Build the spinner component based on variant
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={`flex gap-1 ${sizeClasses[size]} ${colorClasses[color]}`}>
            <div className={`animate-bounce delay-0 inline-block rounded-full bg-current ${size === 'xs' || size === 'sm' ? 'size-1' : 'size-2'}`}></div>
            <div className={`animate-bounce delay-150 inline-block rounded-full bg-current ${size === 'xs' || size === 'sm' ? 'size-1' : 'size-2'}`}></div>
            <div className={`animate-bounce delay-300 inline-block rounded-full bg-current ${size === 'xs' || size === 'sm' ? 'size-1' : 'size-2'}`}></div>
          </div>
        );
      case 'grow':
        return (
          <div className={`relative ${sizeClasses[size]}`}>
            <div className={`absolute inset-0 rounded-full ${colorClasses[color]} opacity-75 animate-ping`}></div>
            <div className={`relative rounded-full ${colorClasses[color]} ${sizeClasses[size]}`}></div>
          </div>
        );
      case 'border':
      default:
        return (
          <div 
            className={`inline-block ${sizeClasses[size]} ${thicknessClasses[thickness]} ${colorClasses[color]} ${variantClasses[variant]} ${className}`}
            role="status"
            aria-label={label}
          >
            <span className="sr-only">{label}</span>
          </div>
        );
    }
  };
  
  // If showLabel is true, render spinner with visible label
  if (showLabel) {
    return (
      <div ref={ref} className={`flex items-center ${labelPositionClasses[labelPosition]} ${containerClassName}`} {...rest}>
        {renderSpinner()}
        <span className={colorClasses[color]}>{label}</span>
      </div>
    );
  }
  
  // Otherwise, render spinner alone
  return (
    <div ref={ref} className={`inline-flex ${containerClassName}`} {...rest}>
      {renderSpinner()}
    </div>
  );
});

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white']),
  thickness: PropTypes.oneOf(['thin', 'normal', 'thick']),
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  variant: PropTypes.oneOf(['border', 'dots', 'grow']),
};

// Overlay spinner component that covers its parent container
export const SpinnerOverlay = forwardRef(({
  size = 'lg',
  color = 'primary',
  label = 'Loading...',
  showLabel = true,
  transparent = true,
  backdropClass = '',
  className = '',
  ...rest
}, ref) => {
  // Background color based on transparency setting
  const bgClass = transparent ? 'bg-white/80' : 'bg-white';
  
  return (
    <div 
      ref={ref}
      className={`absolute inset-0 flex flex-col items-center justify-center ${bgClass} ${backdropClass}`}
      {...rest}
    >
      <Spinner 
        size={size} 
        color={color} 
        label={label} 
        showLabel={showLabel}
        labelPosition="bottom"
        className={className}
      />
    </div>
  );
});

SpinnerOverlay.displayName = 'SpinnerOverlay';

SpinnerOverlay.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white']),
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  transparent: PropTypes.bool,
  backdropClass: PropTypes.string,
  className: PropTypes.string,
};

// Fullscreen spinner overlay
export const FullscreenSpinner = forwardRef(({
  size = 'xl',
  color = 'primary',
  label = 'Loading...',
  showLabel = true,
  transparent = true,
  backdropClass = '',
  className = '',
  zIndex = 'z-50',
  ...rest
}, ref) => {
  // Background color based on transparency setting
  const bgClass = transparent ? 'bg-white/80' : 'bg-white';
  
  return (
    <div 
      ref={ref}
      className={`fixed inset-0 flex flex-col items-center justify-center ${bgClass} ${zIndex} ${backdropClass}`}
      {...rest}
    >
      <Spinner 
        size={size} 
        color={color} 
        label={label} 
        showLabel={showLabel}
        labelPosition="bottom"
        className={className}
      />
    </div>
  );
});

FullscreenSpinner.displayName = 'FullscreenSpinner';

FullscreenSpinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white']),
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  transparent: PropTypes.bool,
  backdropClass: PropTypes.string,
  className: PropTypes.string,
  zIndex: PropTypes.string,
};

// Button spinner for use inside buttons
export const ButtonSpinner = forwardRef(({
  size = 'sm',
  color = 'current',
  thickness = 'thin',
  className = '',
  ...rest
}, ref) => {
  return (
    <Spinner
      ref={ref}
      size={size}
      color={color}
      thickness={thickness}
      className={`shrink-0 ${className}`}
      {...rest}
    />
  );
});

ButtonSpinner.displayName = 'ButtonSpinner';

ButtonSpinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'current']),
  thickness: PropTypes.oneOf(['thin', 'normal', 'thick']),
  className: PropTypes.string,
};

export default Spinner;