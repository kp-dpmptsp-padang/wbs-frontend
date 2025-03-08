import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  id,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  variant = 'default',
  size = 'default',
  className = '',
  leftIcon,
  rightIcon,
  onChange,
  onBlur,
  onFocus,
  ...rest
}, ref) => {
  // Base classes with explicit focus color
  const baseClasses = "block w-full rounded-lg border sm:text-sm focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  // Variant classes
  const variantClasses = {
    default: "border-gray-200 bg-white",
    gray: "bg-gray-100 border-transparent",
    error: "border-danger bg-white text-danger focus:border-danger focus:ring-danger"
  };
  
  // Size classes
  const sizeClasses = {
    sm: "py-2 px-3",
    default: "py-2.5 sm:py-3 px-4",
    lg: "py-3 sm:py-4 px-5"
  };
  
  // Icon padding
  const iconPaddingClasses = {
    left: "ps-11",
    right: "pe-11",
    both: "ps-11 pe-11",
    none: ""
  };
  
  // Determine icon padding
  let iconPadding = "none";
  if (leftIcon && rightIcon) iconPadding = "both";
  else if (leftIcon) iconPadding = "left";
  else if (rightIcon) iconPadding = "right";
  
  // If there's an error, override the variant
  const currentVariant = error ? 'error' : variant;
  
  // Combine all classes
  const inputClasses = [
    baseClasses,
    variantClasses[currentVariant],
    sizeClasses[size],
    iconPaddingClasses[iconPadding],
    className
  ].join(' ');
  
  // Error message styling
  const errorMessageClasses = "text-sm text-danger mt-1";
  
  return (
    <div className="relative">
      {/* Input element */}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
        style={{
          "--tw-ring-color": "var(--color-primary)",
          "--tw-border-opacity": 1,
          "--tw-ring-opacity": 0.5
        }}
      />
      
      {/* Left icon */}
      {leftIcon && (
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          {leftIcon}
        </div>
      )}
      
      {/* Right icon */}
      {rightIcon && (
        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          {rightIcon}
        </div>
      )}
      
      {/* Error message */}
      {error && typeof error === 'string' && (
        <p className={errorMessageClasses}>{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'gray', 'error']),
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default Input;