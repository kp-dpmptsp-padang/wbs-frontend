import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

const RadioButtonGroup = ({
  name,
  label,
  value,
  options = [],
  onChange,
  disabled = false,
  required = false,
  error,
  helperText,
  size = 'md',
  variant = 'default',
  inline = false,
  className = '',
  labelClassName = '',
  ...rest
}) => {
  // Generate a random ID for the group
  const groupId = `radio-group-${Math.random().toString(36).substring(2, 10)}`;
  
  // Handle change events from radio buttons
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };
  
  // Label size classes
  const labelSizeClasses = {
    'sm': "text-xs",
    'md': "text-sm",
    'lg': "text-base"
  };
  
  // Combine classes for the group label
  const groupLabelClasses = [
    "font-medium",
    labelSizeClasses[size],
    error ? "text-danger" : "text-gray-800",
    labelClassName
  ].filter(Boolean).join(' ');
  
  // Layout classes (inline or vertical)
  const layoutClasses = inline 
    ? "flex flex-wrap gap-x-6 gap-y-2" 
    : "space-y-2";
  
  return (
    <div className={className} role="radiogroup" aria-labelledby={`${groupId}-label`} {...rest}>
      {/* Group Label */}
      {label && (
        <div id={`${groupId}-label`} className={`mb-2 ${groupLabelClasses}`}>
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </div>
      )}
      
      {/* Radio Button Options */}
      <div className={layoutClasses}>
        {options.map((option, index) => (
          <RadioButton
            key={`${name}-${option.value}`}
            id={`${name}-${index}`}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={handleChange}
            disabled={disabled || option.disabled}
            size={size}
            variant={variant}
            // Only show error on the last option
            error={index === options.length - 1 ? error : null}
            // Only show helper text on the last option
            helperText={index === options.length - 1 ? helperText : null}
          />
        ))}
      </div>
    </div>
  );
};

RadioButtonGroup.propTypes = {
  /** Name for all radio buttons in the group */
  name: PropTypes.string.isRequired,
  /** Group label */
  label: PropTypes.node,
  /** Selected value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  /** Array of options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  /** Function called when selection changes */
  onChange: PropTypes.func,
  /** Whether all radio buttons are disabled */
  disabled: PropTypes.bool,
  /** Whether the field is required */
  required: PropTypes.bool,
  /** Error message */
  error: PropTypes.string,
  /** Helper text shown below the group */
  helperText: PropTypes.string,
  /** Size of all radio buttons */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Color variant for all radio buttons */
  variant: PropTypes.oneOf(['default', 'secondary', 'success', 'warning', 'danger']),
  /** Whether to display options inline */
  inline: PropTypes.bool,
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  /** Additional CSS classes for the label */
  labelClassName: PropTypes.string,
};

export default RadioButtonGroup;