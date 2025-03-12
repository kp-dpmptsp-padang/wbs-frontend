import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const RadioButton = forwardRef(({
  id,
  name,
  value,
  checked = false,
  onChange,
  onBlur,
  onFocus,
  label,
  disabled = false,
  required = false,
  error,
  helperText,
  size = 'md',
  variant = 'default',
  labelClassName = '',
  className = '',
  ...rest
}, ref) => {
  // Generate a random ID if not provided
  const inputId = id || `radio-${Math.random().toString(36).substring(2, 10)}`;
  
  // Base classes for the radio input
  const baseClasses = "shrink-0 mt-0.5 border-gray-200 rounded-full focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none";
  
  // Size classes
  const sizeClasses = {
    'sm': "h-3.5 w-3.5",
    'md': "h-4 w-4",
    'lg': "h-5 w-5"
  };
  
  // Variant classes - colors
  const variantClasses = {
    'default': "text-primary focus:ring-primary checked:border-primary",
    'secondary': "text-secondary focus:ring-secondary checked:border-secondary",
    'success': "text-success focus:ring-success checked:border-success",
    'warning': "text-warning focus:ring-warning checked:border-warning",
    'danger': "text-danger focus:ring-danger checked:border-danger"
  };
  
  // Error state
  const errorClasses = error ? "border-danger focus:ring-danger" : "";
  
  // Label size classes
  const labelSizeClasses = {
    'sm': "text-xs",
    'md': "text-sm",
    'lg': "text-base"
  };
  
  // Combine all classes for the radio input
  const radioClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    errorClasses,
    className
  ].filter(Boolean).join(' ');

  // Combine classes for the label
  const combinedLabelClasses = [
    labelSizeClasses[size],
    error ? "text-danger" : "text-gray-700",
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className="flex">
      <div className="flex items-start">
        {/* Radio input */}
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={radioClasses}
          aria-describedby={helperText ? `${inputId}-description` : undefined}
          {...rest}
        />
        
        {/* Label and helper text container */}
        <div className="ms-2">
          {/* Label */}
          {label && (
            <label 
              htmlFor={inputId} 
              className={combinedLabelClasses}
            >
              {label}
              {required && <span className="text-danger ml-1">*</span>}
            </label>
          )}
          
          {/* Helper text or error message */}
          {(helperText || error) && (
            <p 
              id={`${inputId}-description`}
              className={`mt-1 text-xs ${error ? 'text-danger' : 'text-gray-500'}`}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
  /** ID for the input element */
  id: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string.isRequired,
  /** Value of the radio button */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  /** Whether the radio is checked */
  checked: PropTypes.bool,
  /** Function called when value changes */
  onChange: PropTypes.func,
  /** Function called when input loses focus */
  onBlur: PropTypes.func,
  /** Function called when input gains focus */
  onFocus: PropTypes.func,
  /** Label text */
  label: PropTypes.node,
  /** Whether the radio is disabled */
  disabled: PropTypes.bool,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Error message */
  error: PropTypes.string,
  /** Helper text shown below the input */
  helperText: PropTypes.string,
  /** Size of the radio button */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Color variant */
  variant: PropTypes.oneOf(['default', 'secondary', 'success', 'warning', 'danger']),
  /** Additional CSS classes for label */
  labelClassName: PropTypes.string,
  /** Additional CSS classes for input */
  className: PropTypes.string,
};

export default RadioButton;