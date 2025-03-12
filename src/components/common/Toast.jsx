import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

// Individual Toast component
const Toast = forwardRef(({
  message,
  type = 'default',
  title,
  duration = 5000,
  position = 'bottom-right',
  onClose,
  showClose = true,
  showIcon = true,
  isVisible = true, 
  action,
  actionText,
  onAction,
  variant = 'default',
  autoClose = true,
  showProgress = false,
  id,
  className = '',
  ...rest
}, ref) => {
  // State to control visibility for animation
  const [visible, setVisible] = useState(isVisible);
  
  // Ref for storing timeout ID
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  
  // Clear timer when component unmounts or when duration/autoClose changes
  useEffect(() => {
    if (autoClose && duration > 0) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);
      
      // Set up progress animation if needed
      if (showProgress && progressRef.current) {
        progressRef.current.style.transition = `width ${duration}ms linear`;
        progressRef.current.style.width = '0%';
        
        // Force a reflow to ensure the transition takes effect
        void progressRef.current.offsetWidth;
        
        progressRef.current.style.width = '100%';
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, autoClose, showProgress]);
  
  // Close the toast
  const handleClose = () => {
    setVisible(false);
    // Delay actually calling onClose to allow animation to complete
    setTimeout(() => {
      if (onClose) {
        onClose(id);
      }
    }, 300); // Match the transition duration
  };
  
  // Handle action button click
  const handleAction = () => {
    if (onAction) {
      onAction(id);
    }
  };
  
  // Toast icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="shrink-0 size-4 text-success mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="shrink-0 size-4 text-danger mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="shrink-0 size-4 text-warning mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="shrink-0 size-4 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
          </svg>
        );
    }
  };
  
  // Toast variants
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    colored: type === 'success' ? 'bg-success-50 border border-success-200' :
             type === 'error' ? 'bg-danger-50 border border-danger-200' :
             type === 'warning' ? 'bg-warning-50 border border-warning-200' :
             'bg-primary-50 border border-primary-200',
    outline: 'bg-white border-2',
    minimal: 'bg-white shadow-sm border-0'
  };
  
  // Apply border color based on type for outline variant
  const outlineBorderColor = variant === 'outline' 
    ? type === 'success' ? 'border-success' :
      type === 'error' ? 'border-danger' :
      type === 'warning' ? 'border-warning' :
      'border-primary'
    : '';
  
  // Compose the toast classes
  const toastClasses = [
    'max-w-xs rounded-xl shadow-lg',
    variantClasses[variant],
    outlineBorderColor,
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
    'transition-all duration-300 ease-in-out',
    className
  ].filter(Boolean).join(' ');
  
  // If not visible at all, don't render
  if (!isVisible && !visible) return null;
  
  return (
    <div 
      ref={ref}
      className={toastClasses}
      role="alert"
      tabIndex="-1"
      aria-labelledby={`toast-${id}-label`}
      {...rest}
    >
      {/* Progress bar */}
      {showProgress && autoClose && (
        <div className="h-1 w-full bg-gray-200 rounded-t-xl overflow-hidden">
          <div 
            ref={progressRef}
            className={`h-full ${
              type === 'success' ? 'bg-success' :
              type === 'error' ? 'bg-danger' :
              type === 'warning' ? 'bg-warning' :
              'bg-primary'
            }`}
            style={{ width: '100%' }}
          ></div>
        </div>
      )}
      
      {/* Toast content */}
      <div className="flex p-4">
        {/* Icon */}
        {showIcon && (
          <div className="shrink-0">
            {getIcon()}
          </div>
        )}
        
        {/* Message */}
        <div className={`${showIcon ? 'ms-3' : ''} ${(actionText || showClose) ? 'me-2' : ''} flex-grow`}>
          {title && (
            <h5 className="font-medium text-sm text-gray-800 mb-1">{title}</h5>
          )}
          <p id={`toast-${id}-label`} className="text-sm text-gray-700">
            {message}
          </p>
        </div>
        
        {/* Action button and close button */}
        {(actionText || showClose) && (
          <div className="ms-auto flex items-center space-x-3">
            {actionText && (
              <button 
                type="button" 
                className="text-primary decoration-2 hover:underline font-medium text-sm focus:outline-hidden focus:underline"
                onClick={handleAction}
              >
                {actionText}
              </button>
            )}
            {showClose && (
              <button 
                type="button" 
                className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100" 
                aria-label="Close"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

Toast.displayName = 'Toast';

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'info', 'success', 'error', 'warning']),
  title: PropTypes.string,
  duration: PropTypes.number,
  position: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right', 
    'bottom-left', 'bottom-center', 'bottom-right'
  ]),
  onClose: PropTypes.func,
  showClose: PropTypes.bool,
  showIcon: PropTypes.bool,
  isVisible: PropTypes.bool,
  action: PropTypes.node,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'colored', 'outline', 'minimal']),
  autoClose: PropTypes.bool,
  showProgress: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};

// Toast Container component to manage multiple toasts
export const ToastContainer = forwardRef(({
  position = 'bottom-right',
  className = '',
  ...rest
}, ref) => {
  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  };
  
  // Compose the container classes
  const containerClasses = [
    'fixed z-50 w-full sm:max-w-xs flex flex-col gap-2',
    positionClasses[position],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      ref={ref}
      className={containerClasses}
      {...rest}
    />
  );
});

ToastContainer.displayName = 'ToastContainer';

ToastContainer.propTypes = {
  position: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right', 
    'bottom-left', 'bottom-center', 'bottom-right'
  ]),
  className: PropTypes.string
};

// Toast Provider context for managing toasts application-wide
const ToastContext = React.createContext(undefined);

// Toast Provider component
export const ToastProvider = ({ children, defaultPosition = 'bottom-right' }) => {
  // State to store all active toasts
  const [toasts, setToasts] = useState([]);
  
  // Generate a unique ID for each toast
  const generateId = () => {
    return `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  
  // Add a new toast
  const addToast = (props) => {
    const id = props.id || generateId();
    
    // Create new toast with defaults
    const newToast = {
      id,
      type: 'default',
      duration: 5000,
      position: defaultPosition,
      showClose: true,
      showIcon: true,
      isVisible: true,
      autoClose: true,
      ...props
    };
    
    // Add new toast to the state
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Return the ID so it can be used to remove the toast if needed
    return id;
  };
  
  // Remove a toast by ID
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  // Remove all toasts
  const clearToasts = () => {
    setToasts([]);
  };
  
  // Shorthand methods for different toast types
  const success = (message, options = {}) => 
    addToast({ type: 'success', message, ...options });
  
  const error = (message, options = {}) => 
    addToast({ type: 'error', message, ...options });
  
  const warning = (message, options = {}) => 
    addToast({ type: 'warning', message, ...options });
  
  const info = (message, options = {}) => 
    addToast({ type: 'info', message, ...options });
  
  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || defaultPosition;
    
    if (!acc[position]) {
      acc[position] = [];
    }
    
    acc[position].push(toast);
    
    return acc;
  }, {});
  
  return (
    <ToastContext.Provider 
      value={{ 
        addToast, 
        removeToast, 
        clearToasts, 
        success, 
        error, 
        warning, 
        info 
      }}
    >
      {children}
      
      {/* Render toast containers for each position where there are toasts */}
      {Object.entries(toastsByPosition).map(([position, toastsAtPosition]) => (
        <ToastContainer key={position} position={position}>
          {toastsAtPosition.map(toast => (
            <Toast 
              key={toast.id} 
              {...toast} 
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </ToastContainer>
      ))}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultPosition: PropTypes.oneOf([
    'top-left', 'top-center', 'top-right', 
    'bottom-left', 'bottom-center', 'bottom-right'
  ])
};

// Hook to use the toast context
export const useToast = () => {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

// export { ToastContainer, ToastContext };
export default Toast;