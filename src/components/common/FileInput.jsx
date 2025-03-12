import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

const FileInput = forwardRef(({
  id,
  name,
  label,
  accept,
  multiple = false,
  required = false,
  disabled = false,
  onChange,
  onBlur,
  variant = 'default',
  size = 'md',
  error,
  helperText,
  className = '',
  buttonClassName = '',
  ...rest
}, ref) => {
  const [fileName, setFileName] = useState('');
  
  // Generate a random ID if not provided
  const inputId = id || `file-input-${Math.random().toString(36).substring(2, 10)}`;
  
  // Handle file change
  const handleChange = (e) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name);
      setFileName(multiple ? fileNames.join(', ') : fileNames[0]);
    } else {
      setFileName('');
    }
    
    if (onChange) {
      onChange(e);
    }
  };
  
  // Base input classes
  const baseClasses = "block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  // Variant classes
  const variantClasses = {
    'default': "border-gray-200 focus:border-primary focus:ring-primary",
    'error': "border-danger focus:border-danger focus:ring-danger",
    'success': "border-success focus:border-success focus:ring-success",
  };
  
  // Size classes
  const sizeClasses = {
    'sm': "file:py-2 file:px-3",
    'md': "file:py-3 file:px-4",
    'lg': "file:py-4 file:px-5",
  };
  
  // Button style classes for file input
  const buttonClasses = {
    'default': "file:bg-gray-50 file:text-gray-700 file:hover:bg-gray-100",
    'primary': "file:bg-primary file:text-white file:hover:bg-primary-dark",
    'secondary': "file:bg-secondary file:text-white file:hover:bg-secondary-dark",
    'outline': "file:bg-white file:text-primary file:border file:border-primary file:hover:bg-primary/10",
    'ghost': "file:bg-transparent file:text-primary file:hover:bg-primary/10",
  };
  
  // Combine all classes
  const inputClasses = [
    baseClasses,
    variantClasses[error ? 'error' : variant],
    sizeClasses[size],
    "file:mr-4 file:border-0 file:font-medium file:cursor-pointer",
    buttonClasses[buttonClassName] || "file:bg-gray-50 file:text-gray-700 file:hover:bg-gray-100",
    className
  ].join(' ');
  
  return (
    <div className="w-full">
      {/* Visible or screen reader only label */}
      {label && (
        <label 
          htmlFor={inputId} 
          className={label === "sr-only" ? "sr-only" : "block text-sm font-medium text-gray-700 mb-1"}
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      {/* File input */}
      <input
        ref={ref}
        type="file"
        id={inputId}
        name={name}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
        className={inputClasses}
        {...rest}
      />
      
      {/* Display selected filename(s) */}
      {fileName && (
        <p className="mt-1 text-sm text-gray-500 truncate">
          Selected: {fileName}
        </p>
      )}
      
      {/* Error or helper text */}
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-danger' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
  /** Input id attribute */
  id: PropTypes.string,
  /** Input name attribute */
  name: PropTypes.string,
  /** Label text (use "sr-only" for screen reader only) */
  label: PropTypes.string,
  /** Accepted file types, e.g. "image/*,.pdf" */
  accept: PropTypes.string,
  /** Whether multiple files can be selected */
  multiple: PropTypes.bool,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Whether the field is disabled */
  disabled: PropTypes.bool,
  /** Function called when files are selected */
  onChange: PropTypes.func,
  /** Function called when field loses focus */
  onBlur: PropTypes.func,
  /** Style variant */
  variant: PropTypes.oneOf(['default', 'error', 'success']),
  /** Size variant */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Error message */
  error: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Additional CSS classes for the input */
  className: PropTypes.string,
  /** Button style for the file selector part */
  buttonClassName: PropTypes.oneOf(['default', 'primary', 'secondary', 'outline', 'ghost']),
};

export default FileInput;