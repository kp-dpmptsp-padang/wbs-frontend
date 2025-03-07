import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
  className = '',
  disabled = false,
  onChange,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    if (disabled) return;
    const newState = !isOpen;
    setIsOpen(newState);
    if (onChange) onChange(newState);
  };

  // Combine classNames manually without external library
  const buttonClasses = [
    'py-3',
    'inline-flex',
    'items-center',
    'justify-between',
    'gap-x-3',
    'w-full',
    'font-medium',
    'text-start',
    'text-gray-800',
    'hover:text-primary',
    'rounded-lg',
    'transition-colors',
    isOpen ? 'text-primary' : '',
    disabled ? 'opacity-50 pointer-events-none' : '',
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'overflow-hidden transition-all duration-300',
    isOpen ? 'max-h-96' : 'max-h-0',
  ].join(' ');

  return (
    <div 
      className={`border-b border-gray-200 last:border-0 ${className}`}
      {...rest}
    >
      <button
        className={buttonClasses}
        aria-expanded={isOpen}
        onClick={toggleAccordion}
        disabled={disabled}
      >
        {title}
        {/* Down arrow when closed, up arrow when open */}
        {isOpen ? (
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"></path>
          </svg>
        ) : (
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        )}
      </button>
      <div
        className={contentClasses}
        role="region"
      >
        <div className="p-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  // Variant styles
  let variantClass = '';
  
  switch (variant) {
    case 'bordered':
      variantClass = 'border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200';
      break;
    case 'card':
      variantClass = 'shadow-sm rounded-lg overflow-hidden divide-y divide-gray-200 bg-white';
      break;
    default:
      variantClass = '';
      break;
  }

  // Combine classes
  const accordionClasses = [
    'w-full',
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={accordionClasses} {...props}>
      {children}
    </div>
  );
};

// PropTypes
AccordionItem.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Accordion.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'bordered', 'card'])
};

export default Accordion;