import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextArea = forwardRef(({
  id,
  name,
  value,
  defaultValue,
  placeholder,
  rows = 3,
  minRows,
  maxRows,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  variant = 'default',
  size = 'default',
  className = '',
  onChange,
  onBlur,
  onFocus,
  resize = 'vertical',
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
    default: "py-2 px-3 sm:py-3 sm:px-4",
    lg: "py-3 px-4 sm:py-4 sm:px-5"
  };

  // Resize classes
  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize"
  };
  
  // If there's an error, override the variant
  const currentVariant = error ? 'error' : variant;
  
  // Combine all classes
  const textareaClasses = [
    baseClasses,
    variantClasses[currentVariant],
    sizeClasses[size],
    resizeClasses[resize],
    className
  ].join(' ');
  
  // Error message styling
  const errorMessageClasses = "text-sm text-danger mt-1";
  
  return (
    <div className="relative">
      {/* Textarea element */}
      <textarea
        ref={ref}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        className={textareaClasses}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={{
          "--tw-ring-color": "var(--color-primary)",
          "--tw-border-opacity": 1,
          "--tw-ring-opacity": 0.5,
          minHeight: minRows ? `${minRows * 1.5}rem` : undefined,
          maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined
        }}
        {...rest}
      />
      
      {/* Error message */}
      {error && typeof error === 'string' && (
        <p className={errorMessageClasses}>{error}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'gray', 'error']),
  size: PropTypes.oneOf(['sm', 'default', 'lg']),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  resize: PropTypes.oneOf(['none', 'vertical', 'horizontal', 'both'])
};

export default TextArea;