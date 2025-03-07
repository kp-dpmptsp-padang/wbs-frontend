import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "default",
  block = false,
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = "left",
  className = "",
  onClick,
  as: Component = "button", // Tambahkan prop "as" dengan default "button"
  ...rest
}) => {
  const baseClasses = "inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none transition-colors";
  
  // Size classes
  const sizeClasses = {
    small: "py-2 px-3",
    default: "py-3 px-4",
    large: "p-4 sm:p-5",
    icon: "size-11 justify-center items-center" // For icon-only buttons
  };
  
  // Variant classes (colors)
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:bg-secondary-dark",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900",
    gray: "bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600",
    teal: "bg-teal-500 text-white hover:bg-teal-600 focus:bg-teal-600",
    blue: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
    red: "bg-danger text-white hover:bg-red-600 focus:bg-red-600",
    yellow: "bg-warning text-white hover:bg-yellow-600 focus:bg-yellow-600",
    white: "bg-white text-gray-800 hover:bg-gray-200 focus:bg-gray-200",
    success: "bg-success text-white hover:bg-green-600 focus:bg-green-600",
    danger: "bg-danger text-white hover:bg-red-600 focus:bg-red-600",
    warning: "bg-warning text-white hover:bg-yellow-600 focus:bg-yellow-600",
    
    // Outline variants
    "outline-primary": "bg-transparent border-primary text-primary hover:bg-primary/10 focus:bg-primary/10",
    "outline-secondary": "bg-transparent border-secondary text-secondary hover:bg-secondary/10 focus:bg-secondary/10",
    "outline-dark": "bg-transparent border-gray-800 text-gray-800 hover:bg-gray-100 focus:bg-gray-100",
    "outline-gray": "border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50",
    "outline-danger": "bg-transparent border-danger text-danger hover:bg-danger/10 focus:bg-danger/10",
    "outline-warning": "bg-transparent border-warning text-warning hover:bg-warning/10 focus:bg-warning/10",
    "outline-success": "bg-transparent border-success text-success hover:bg-success/10 focus:bg-success/10",
    
    // Ghost variants (text only)
    "ghost-primary": "bg-transparent text-primary hover:bg-primary/10 focus:bg-primary/10",
    "ghost-secondary": "bg-transparent text-secondary hover:bg-secondary/10 focus:bg-secondary/10",
    "ghost-dark": "bg-transparent text-gray-800 hover:bg-gray-100 focus:bg-gray-100",
    "ghost-danger": "bg-transparent text-danger hover:bg-danger/10 focus:bg-danger/10",
  };

  // For outline variants, add border class
  const isOutline = variant.startsWith('outline-');
  const borderClass = isOutline ? 'border' : '';

  // Block width class
  const blockClass = block ? 'w-full justify-center' : '';

  // Icon only
  const currentSize = icon && !children ? 'icon' : size;
  
  // Compose final className
  const buttonClasses = [
    baseClasses,
    sizeClasses[currentSize],
    variantClasses[variant],
    borderClass,
    blockClass,
    className
  ].join(' ');
  
  // Props that only apply to actual button elements
  const buttonOnlyProps = Component === 'button' ? {
    type,
    disabled: disabled || loading
  } : {};
  
  return (
    <Component
      className={buttonClasses}
      onClick={onClick}
      {...buttonOnlyProps}
      {...rest}
    >
      {loading && (
        <span className="animate-spin inline-block size-4 border-3 border-current border-t-transparent rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Loading...</span>
        </span>
      )}

      {icon && iconPosition === "left" && !loading && icon}
      {children}
      {icon && iconPosition === "right" && !loading && icon}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'dark', 'gray', 'teal', 'blue', 'red', 'yellow', 'white', 'success', 'danger', 'warning',
    'outline-primary', 'outline-secondary', 'outline-dark', 'outline-gray', 'outline-danger', 'outline-warning', 'outline-success',
    'ghost-primary', 'ghost-secondary', 'ghost-dark', 'ghost-danger'
  ]),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  block: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  as: PropTypes.elementType, // Tambahkan prop "as" ke propTypes
};

export default Button;