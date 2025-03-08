import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Checkbox = forwardRef(({
  id,
  name,
  label,
  value,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  indeterminate = false,
  error = false,
  helperText = '',
  size = 'md',
  variant = 'default',
  labelClassName = '',
  className = '',
  ...rest
}, ref) => {
  // Create a random ID if none is provided
  const inputId = id || `checkbox-${Math.random().toString(36).substring(2, 10)}`;
  
  // Handle indeterminate state
  React.useEffect(() => {
    if (ref?.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [ref, indeterminate]);
  
  // Base checkbox classes
  const baseClasses = "shrink-0 mt-0.5 border-gray-200 focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none";
  
  // Size classes
  const sizeClasses = {
    'sm': "h-3.5 w-3.5",
    'md': "h-4 w-4",
    'lg': "h-5 w-5"
  };
  
  // Variant classes - shape and color
  const variantClasses = {
    'default': "rounded-sm text-primary focus:ring-primary checked:border-primary",
    'rounded': "rounded-md text-primary focus:ring-primary checked:border-primary",
    'circle': "rounded-full text-primary focus:ring-primary checked:border-primary",
    'success': "rounded-sm text-green-600 focus:ring-green-500 checked:border-green-500",
    'danger': "rounded-sm text-red-600 focus:ring-red-500 checked:border-red-500",
    'warning': "rounded-sm text-yellow-600 focus:ring-yellow-500 checked:border-yellow-500",
    'info': "rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500"
  };
  
  // Error state classes
  const errorClasses = error 
    ? "border-red-500 focus:ring-red-500" 
    : "";
  
  // Compose final className
  const checkboxClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    errorClasses,
    className
  ].filter(Boolean).join(' ');
  
  // Label size classes
  const labelSizeClasses = {
    'sm': "text-xs",
    'md': "text-sm",
    'lg': "text-base"
  };
  
  // Label classes
  const labelClasses = [
    labelSizeClasses[size],
    error ? "text-red-500" : "text-gray-700",
    disabled ? "opacity-50" : "",
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={checkboxClasses}
          aria-describedby={helperText ? `${inputId}-description` : undefined}
          {...rest}
        />
        
        {label && (
          <label 
            htmlFor={inputId} 
            className={`ms-3 ${labelClasses}`}
          >
            {label}
          </label>
        )}
      </div>
      
      {helperText && (
        <p 
          id={`${inputId}-description`} 
          className={`mt-1 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  indeterminate: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'rounded', 'circle', 'success', 'danger', 'warning', 'info']),
  labelClassName: PropTypes.string,
  className: PropTypes.string
};

export default Checkbox;