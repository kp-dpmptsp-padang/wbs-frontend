import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({
  children,
  variant = 'default',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = "rounded-lg p-4";
  
  // Variant styles
  const variantClasses = {
    // Default styles (blue info)
    'default': "bg-blue-50 text-blue-800",
    
    // Semantic colors
    'info': "bg-blue-50 text-blue-800",
    'success': "bg-green-50 text-green-800",
    'warning': "bg-yellow-50 text-yellow-800",
    'danger': "bg-red-50 text-red-800",
    
    // Border styles
    'border-info': "bg-blue-50 border-s-4 border-blue-500",
    'border-success': "bg-green-50 border-t-2 border-green-500",
    'border-warning': "bg-yellow-50 border-s-4 border-yellow-500",
    'border-danger': "bg-red-50 border-s-4 border-red-500",
    
    // Card style with shadow
    'card': "bg-white border border-gray-200 shadow-lg",
  };
  
  // Generate icon background based on variant
  const getIconClasses = (baseVariant) => {
    const color = baseVariant.replace('border-', '');
    
    switch (color) {
      case 'info':
      case 'default':
        return "inline-flex justify-center items-center size-8 rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800";
      case 'success':
        return "inline-flex justify-center items-center size-8 rounded-full border-4 border-green-100 bg-green-200 text-green-800";
      case 'warning':
        return "inline-flex justify-center items-center size-8 rounded-full border-4 border-yellow-100 bg-yellow-200 text-yellow-800";
      case 'danger':
        return "inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800";
      default:
        return "inline-flex justify-center items-center size-8 rounded-full border-4 border-blue-100 bg-blue-200 text-blue-800";
    }
  };
  
  // Default icons based on variant
  const getDefaultIcon = (baseVariant) => {
    const color = baseVariant.replace('border-', '');
    
    switch (color) {
      case 'info':
      case 'default':
      case 'card':
        return (
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        );
      case 'success':
        return (
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        );
      case 'danger':
        return (
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Determine base variant without border- prefix
  const baseVariant = variant.startsWith('border-') ? variant.substring(7) : variant;
  
  // Get icon element
  const iconElement = icon || getDefaultIcon(variant);
  
  // Compose final className
  const alertClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].join(' ');
  
  // Icon wrapper class
  const iconWrapperClass = getIconClasses(variant);
  
  return (
    <div 
      className={alertClasses} 
      role="alert" 
      {...rest}
    >
      <div className="flex">
        {iconElement && (
          <div className="shrink-0">
            <span className={iconWrapperClass}>
              {iconElement}
            </span>
          </div>
        )}
        
        <div className={iconElement ? "ms-3" : ""}>
          {title && (
            <h3 className="text-gray-800 font-semibold">{title}</h3>
          )}
          
          <div className={title ? "mt-2 text-sm text-gray-700" : "text-gray-700"}>
            {children}
          </div>
        </div>
        
        {dismissible && (
          <div className="ms-auto">
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="size-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'default', 'info', 'success', 'warning', 'danger',
    'border-info', 'border-success', 'border-warning', 'border-danger',
    'card'
  ]),
  title: PropTypes.node,
  icon: PropTypes.node,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  className: PropTypes.string
};

export default Alert;