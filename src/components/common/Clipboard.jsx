import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Clipboard = forwardRef(({
  value,
  displayText,
  variant = 'default',
  size = 'md',
  successText = 'Copied',
  tooltipPosition = 'top',
  tooltipDuration = 2000,
  tooltipVisible = false,
  monospace = false,
  showCopyIcon = true,
  className = '',
  disabled = false,
  onCopy,
  ...rest
}, ref) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(tooltipVisible);
  const inputRef = useRef(null);
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);
  const combinedRef = ref || buttonRef;
  
  // Base classes for the button
  const baseClasses = "relative inline-flex justify-center items-center gap-x-2 rounded-lg border shadow-sm transition";
  
  // Variant styles
  const variantClasses = {
    'default': "border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50",
    'primary': "border-primary bg-primary text-white hover:bg-primary-dark focus:outline-hidden focus:bg-primary-dark",
    'outline-primary': "border-primary bg-white text-primary hover:bg-primary/10 focus:outline-hidden focus:bg-primary/10",
    'ghost-primary': "border-transparent bg-transparent text-primary hover:bg-primary/10 focus:outline-hidden focus:bg-primary/10",
    'secondary': "border-secondary bg-secondary text-white hover:bg-secondary-dark focus:outline-hidden focus:bg-secondary-dark",
    'outline-secondary': "border-secondary bg-white text-secondary hover:bg-secondary/10 focus:outline-hidden focus:bg-secondary/10",
    'gray': "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200",
  };
  
  // Size classes for the button
  const sizeClasses = {
    'sm': "py-2 px-3 text-xs",
    'md': "py-2.5 px-4 text-sm",
    'lg': "py-3 px-5 text-base",
  };
  
  // Font style based on monospace prop
  const fontClasses = monospace ? "font-mono" : "";
  
  // Compose button classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fontClasses,
    "disabled:opacity-50 disabled:pointer-events-none",
    className
  ].filter(Boolean).join(' ');
  
  // Tooltip position classes
  const tooltipPositionClasses = {
    'top': "bottom-full left-1/2 -translate-x-1/2 -translate-y-1 mb-1",
    'bottom': "top-full left-1/2 -translate-x-1/2 translate-y-1 mt-1",
    'left': "right-full top-1/2 -translate-y-1/2 -translate-x-1 mr-1",
    'right': "left-full top-1/2 -translate-y-1/2 translate-x-1 ml-1",
  };
  
  // Compose tooltip classes
  const tooltipClasses = [
    "absolute",
    tooltipPositionClasses[tooltipPosition],
    "z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm",
    showTooltip ? "opacity-100 visible" : "opacity-0 invisible",
    "transition-opacity duration-300"
  ].join(' ');
  
  // Copy handler function
  const handleCopy = () => {
    if (disabled) return;
    
    // Create a temporary input to copy text from
    const textToCopy = value;
    
    // Try to use the Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setShowTooltip(true);
          if (onCopy) onCopy(textToCopy);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
          fallbackCopy();
        });
    } else {
      // Fallback for browsers without clipboard API
      fallbackCopy();
    }
  };
  
  // Fallback copy method using document.execCommand
  const fallbackCopy = () => {
    try {
      // Create a temporary input element
      const tempInput = document.createElement('textarea');
      tempInput.value = value;
      
      // Make the element not visible
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      
      // Add to DOM, select content, and execute copy command
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(tempInput);
      
      // Update state and call onCopy callback
      setCopied(true);
      setShowTooltip(true);
      if (onCopy) onCopy(value);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
  };
  
  // Reset copied state after a timeout
  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
        setShowTooltip(false);
      }, tooltipDuration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [copied, tooltipDuration]);
  
  // Handle click outside to hide tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <>
      {/* Hidden input for the value to copy */}
      <input 
        type="hidden" 
        ref={inputRef} 
        value={value} 
        readOnly 
      />
      
      {/* Button to trigger copy */}
      <button
        ref={combinedRef}
        type="button"
        className={buttonClasses}
        onClick={handleCopy}
        disabled={disabled}
        {...rest}
      >
        {displayText || value}
        
        {showCopyIcon && (
          <span className={`border-s ${variant.startsWith('primary') ? 'border-white/20' : 'border-gray-200'} ps-3`}>
            {/* Default copy icon */}
            {!copied && (
              <svg className="size-4 transition" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              </svg>
            )}
            
            {/* Success icon */}
            {copied && (
              <svg className={`size-4 ${variant.includes('primary') ? 'text-white' : 'text-primary'} rotate-6`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </span>
        )}
        
        {/* Tooltip */}
        <span 
          ref={tooltipRef}
          className={tooltipClasses}
          role="tooltip"
        >
          {successText}
        </span>
      </button>
    </>
  );
});

Clipboard.displayName = 'Clipboard';

Clipboard.propTypes = {
  /** Text value to be copied */
  value: PropTypes.string.isRequired,
  /** Text to display on the button (if different from value) */
  displayText: PropTypes.string,
  /** Style variant */
  variant: PropTypes.oneOf([
    'default', 'primary', 'outline-primary', 'ghost-primary', 
    'secondary', 'outline-secondary', 'gray'
  ]),
  /** Size of the button */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Text shown in tooltip after copying */
  successText: PropTypes.string,
  /** Position of the tooltip */
  tooltipPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Duration in ms to show tooltip after copying */
  tooltipDuration: PropTypes.number,
  /** Whether to always show the tooltip */
  tooltipVisible: PropTypes.bool,
  /** Whether to use monospace font */
  monospace: PropTypes.bool,
  /** Whether to show the copy icon */
  showCopyIcon: PropTypes.bool,
  /** Additional class names */
  className: PropTypes.string,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Callback function called after successful copy */
  onCopy: PropTypes.func,
};

export default Clipboard;