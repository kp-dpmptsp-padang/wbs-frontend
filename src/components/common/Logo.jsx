import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '@/assets/images/logo.png';

const Logo = ({ 
  variant = 'full', 
  size = 'md', 
  className = '', 
  logoClassName = '',
  textClassName = '',
  isClickable = true,
  to = '/',
  ...rest
}) => {
  // Size configurations for the logo image
  const imageSizeClasses = {
    'xs': 'w-6 h-6',
    'sm': 'w-8 h-8',
    'md': 'w-10 h-10',
    'lg': 'w-12 h-12',
    'xl': 'w-16 h-16'
  };
  
  // Size configurations for the text
  const textSizeClasses = {
    'xs': 'text-lg',
    'sm': 'text-xl',
    'md': 'text-2xl',
    'lg': 'text-3xl',
    'xl': 'text-4xl'
  };
  
  // Gap between logo and text
  const gapClasses = {
    'xs': 'gap-1.5',
    'sm': 'gap-2',
    'md': 'gap-3',
    'lg': 'gap-3.5',
    'xl': 'gap-4'
  };
  
  // Compose image classes
  const imageClasses = [
    imageSizeClasses[size],
    'object-contain',
    logoClassName
  ].filter(Boolean).join(' ');
  
  // Compose text classes
  const fullTextClasses = [
    textSizeClasses[size],
    'text-[#1A237E] font-bold tracking-wide',
    textClassName
  ].filter(Boolean).join(' ');
  
  // Base component classes
  const baseClasses = [
    variant === 'full' ? 'flex items-center' : '',
    variant === 'full' ? gapClasses[size] : '',
    className
  ].filter(Boolean).join(' ');
  
  // Logo content component
  const LogoContent = () => (
    <div className={baseClasses} {...rest}>
      {/* Logo Image */}
      <div className="logo-image-container relative">
        <img 
          src={logo} 
          alt="CLEAR Logo" 
          className={imageClasses}
          loading="eager"
        />
        
        {/* Optional enhancement: Add a subtle shadow or glow effect */}
        <div className="absolute inset-0 rounded-full shadow-md -z-10 opacity-20 bg-primary"></div>
      </div>
      
      {/* Logo Text (only for full variant) */}
      {variant === 'full' && (
        <span className={fullTextClasses}>
          CLEAR
        </span>
      )}
    </div>
  );
  
  // Return clickable or non-clickable version
  return isClickable ? (
    <Link 
      to={to} 
      className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A237E]/50 rounded-lg"
      aria-label="CLEAR - Whistleblowing System"
    >
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['full', 'icon']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  logoClassName: PropTypes.string,
  textClassName: PropTypes.string,
  isClickable: PropTypes.bool,
  to: PropTypes.string,
};

export default Logo;