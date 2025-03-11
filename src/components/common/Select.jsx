// src/components/common/Select.jsx
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Select = ({
  id,
  name,
  value,
  onChange,
  children,
  placeholder,
  disabled = false,
  error = null,
  className = '',
  ...rest
}) => {
  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm';
  
  const selectClasses = classNames(
    baseClasses,
    {
      'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500': error,
      'bg-gray-100 cursor-not-allowed': disabled
    },
    className
  );
  
  return (
    <div className="w-full">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Select;