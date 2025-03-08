import React from 'react';
import PropTypes from 'prop-types';

const FeatureCard = ({
  title,
  description,
  icon,
  bgColor = 'bg-primary-dark',
  textColor = 'text-white',
  iconColor = 'text-white',
  className = '',
  onClick,
  ...rest
}) => {
  // Base classes
  const baseClasses = "rounded-lg p-6 h-full flex flex-col";
  
  // Interactive classes
  const interactiveClasses = onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : "";
  
  // Compose final className
  const cardClasses = [
    baseClasses,
    bgColor,
    textColor,
    interactiveClasses,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      {...rest}
    >
      {icon && (
        <div className={`mb-4 ${iconColor}`}>
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <p className="text-sm opacity-90 mt-auto">
        {description}
      </p>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  iconColor: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default FeatureCard;