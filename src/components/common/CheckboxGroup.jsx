import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const CheckboxGroup = ({
  name,
  label,
  options = [],
  values = [],
  onChange,
  disabled = false,
  required = false,
  error = false, 
  helperText = '',
  inline = false,
  size = 'md',
  variant = 'default',
  labelClassName = '',
  checkboxClassName = '',
  className = '',
  ...rest
}) => {
  // Handle change for individual checkbox
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    
    if (onChange) {
      if (checked) {
        // Add value to array if checked
        onChange([...values, value]);
      } else {
        // Remove value from array if unchecked
        onChange(values.filter((val) => val !== value));
      }
    }
  };
  
  // Determine layout classes
  const layoutClasses = inline ? "flex flex-wrap gap-x-6 gap-y-2" : "space-y-2";
  
  return (
    <div className={className} {...rest}>
      {label && (
        <div className={`mb-2 font-medium text-gray-800 ${labelClassName}`}>
          {label}
          {required && <span className="ms-1 text-red-500">*</span>}
        </div>
      )}
      
      <div className={layoutClasses}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            label={option.label}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={handleCheckboxChange}
            disabled={disabled || option.disabled}
            size={size}
            variant={variant}
            className={checkboxClassName}
          />
        ))}
      </div>
      
      {helperText && (
        <p className={`mt-2 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]).isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  values: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  inline: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'rounded', 'circle', 'success', 'danger', 'warning', 'info']),
  labelClassName: PropTypes.string,
  checkboxClassName: PropTypes.string,
  className: PropTypes.string
};

export default CheckboxGroup;