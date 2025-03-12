import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Individual skeleton item component
export const SkeletonItem = forwardRef(({
  width = 'full',
  height = '4',
  variant = 'default',
  shape = 'rounded-full',
  animation = true,
  className = '',
  ...rest
}, ref) => {
  // Base classes
  const baseClasses = "bg-gray-200";
  
  // Animation class
  const animationClass = animation ? "animate-pulse" : "";
  
  // Variant classes (different color options)
  const variantClasses = {
    'default': "bg-gray-200",
    'light': "bg-gray-100",
    'dark': "bg-gray-300",
    'primary': "bg-primary/10",
    'secondary': "bg-secondary/10",
  };
  
  // Handle custom width
  let widthClass;
  if (width === 'full') {
    widthClass = 'w-full';
  } else if (width === 'auto') {
    widthClass = 'w-auto';
  } else if (typeof width === 'string' && width.includes('%')) {
    // For percentage values like "40%", apply as inline style
    widthClass = '';
  } else if (typeof width === 'string') {
    // For Tailwind width classes like "w-20"
    widthClass = width.startsWith('w-') ? width : `w-${width}`;
  } else {
    widthClass = 'w-full';
  }
  
  // Handle custom height
  const heightClass = height.startsWith('h-') ? height : `h-${height}`;
  
  // Compose final className
  const skeletonClasses = [
    baseClasses,
    variantClasses[variant],
    animationClass,
    widthClass,
    heightClass,
    shape,
    className
  ].filter(Boolean).join(' ');
  
  // If percentage width is provided, use inline style
  const style = typeof width === 'string' && width.includes('%') 
    ? { width: width, ...rest.style } 
    : rest.style;
  
  return (
    <div 
      ref={ref}
      className={skeletonClasses}
      style={style}
      {...rest}
      aria-hidden="true"
    />
  );
});

SkeletonItem.displayName = 'SkeletonItem';

// Main skeleton component
const Skeleton = forwardRef(({
  variant = 'default',
  animation = true,
  count = 1,
  width = 'full',
  height = '4',
  gap = '3',
  shape = 'rounded-full',
  children,
  className = '',
  wrapper: Wrapper = 'div',
  ...rest
}, ref) => {
  // Handle array of skeleton items
  if (count > 1) {
    const gapClass = `space-y-${gap}`;
    
    return (
      <Wrapper ref={ref} className={`${gapClass} ${className}`} {...rest}>
        {Array(count).fill(0).map((_, index) => (
          <SkeletonItem 
            key={index}
            variant={variant}
            animation={animation}
            width={width}
            height={height}
            shape={shape}
          />
        ))}
      </Wrapper>
    );
  }
  
  // If children are provided, render custom skeleton structure
  if (children) {
    return (
      <Wrapper ref={ref} className={`${animation ? 'animate-pulse' : ''} ${className}`} {...rest}>
        {children}
      </Wrapper>
    );
  }
  
  // Single skeleton item
  return (
    <SkeletonItem 
      ref={ref}
      variant={variant}
      animation={animation}
      width={width}
      height={height}
      shape={shape}
      className={className}
      {...rest}
    />
  );
});

Skeleton.displayName = 'Skeleton';

// Avatar skeleton component for convenience
export const SkeletonAvatar = forwardRef(({
  size = 'md',
  variant = 'default',
  animation = true,
  className = '',
  ...rest
}, ref) => {
  // Size mapping
  const sizeClasses = {
    'xs': 'size-6',
    'sm': 'size-8',
    'md': 'size-12',
    'lg': 'size-16',
    'xl': 'size-20',
  };
  
  // Get size class
  const sizeClass = sizeClasses[size] || (size.startsWith('size-') ? size : `size-${size}`);
  
  return (
    <SkeletonItem
      ref={ref}
      width="auto"
      height="auto"
      variant={variant}
      animation={animation}
      className={`${sizeClass} rounded-full shrink-0 ${className}`}
      {...rest}
    />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Text block skeleton for convenience
export const SkeletonText = forwardRef(({
  lines = 3,
  lastLineWidth = '75%', // Width of the last line
  variant = 'default',
  animation = true,
  height = '4',
  shape = 'rounded-full',
  gap = '3',
  className = '',
  ...rest
}, ref) => {
  const gapClass = `space-y-${gap}`;
  
  return (
    <div ref={ref} className={`${gapClass} ${className}`} {...rest}>
      {Array(lines - 1).fill(0).map((_, index) => (
        <SkeletonItem 
          key={index}
          variant={variant}
          animation={animation}
          height={height}
          shape={shape}
        />
      ))}
      {lines > 0 && (
        <SkeletonItem 
          variant={variant}
          animation={animation}
          width={lastLineWidth}
          height={height}
          shape={shape}
        />
      )}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';

// Profile card skeleton for convenience
export const SkeletonCard = forwardRef(({
  hasAvatar = true,
  hasTitle = true,
  hasSubtitle = true,
  lines = 4,
  variant = 'default',
  animation = true,
  className = '',
  ...rest
}, ref) => {
  return (
    <div ref={ref} className={`flex ${className}`} {...rest}>
      {hasAvatar && (
        <div className="shrink-0">
          <SkeletonAvatar 
            variant={variant} 
            animation={animation} 
            size="md" 
          />
        </div>
      )}
      
      <div className={`${hasAvatar ? 'ms-4 mt-1' : ''} w-full`}>
        {hasTitle && (
          <SkeletonItem 
            variant={variant}
            animation={animation}
            width="40%"
            height="5"
            className="mb-2"
          />
        )}
        
        {hasSubtitle && (
          <SkeletonItem 
            variant={variant}
            animation={animation}
            width="25%"
            height="4"
            className="mb-4"
          />
        )}
        
        <SkeletonText 
          variant={variant}
          animation={animation}
          lines={lines}
          gap="2"
        />
      </div>
    </div>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

// Table skeleton for convenience
export const SkeletonTable = forwardRef(({
  rows = 5,
  columns = 4,
  hasHeader = true,
  variant = 'default',
  animation = true,
  className = '',
  ...rest
}, ref) => {
  return (
    <div ref={ref} className={`space-y-3 ${className}`} {...rest}>
      {hasHeader && (
        <div className="flex gap-4 mb-2">
          {Array(columns).fill(0).map((_, index) => (
            <SkeletonItem 
              key={index}
              variant={variant}
              animation={animation}
              width={`${Math.floor(85 / columns)}%`}
              height="6"
            />
          ))}
        </div>
      )}
      
      {Array(rows).fill(0).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 py-2">
          {Array(columns).fill(0).map((_, colIndex) => (
            <SkeletonItem 
              key={colIndex}
              variant={variant}
              animation={animation}
              width={`${Math.floor(85 / columns)}%`}
              height="4"
            />
          ))}
        </div>
      ))}
    </div>
  );
});

SkeletonTable.displayName = 'SkeletonTable';

// PropTypes
SkeletonItem.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary']),
  shape: PropTypes.string,
  animation: PropTypes.bool,
  className: PropTypes.string
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary']),
  animation: PropTypes.bool,
  count: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.string,
  gap: PropTypes.string,
  shape: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  wrapper: PropTypes.elementType
};

SkeletonAvatar.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary']),
  animation: PropTypes.bool,
  className: PropTypes.string
};

SkeletonText.propTypes = {
  lines: PropTypes.number,
  lastLineWidth: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary']),
  animation: PropTypes.bool,
  height: PropTypes.string,
  shape: PropTypes.string,
  gap: PropTypes.string,
  className: PropTypes.string
};

SkeletonCard.propTypes = {
  hasAvatar: PropTypes.bool,
  hasTitle: PropTypes.bool,
  hasSubtitle: PropTypes.bool,
  lines: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary']),
  animation: PropTypes.bool,
  className: PropTypes.string
};

SkeletonTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  hasHeader: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary']),
  animation: PropTypes.bool,
  className: PropTypes.string
};


export default Skeleton;