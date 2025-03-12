import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const List = forwardRef(({
  children,
  type = 'ul',
  variant = 'disc',
  size = 'md',
  spacing = 'normal',
  marker = 'inside',
  compact = false,
  className = '',
  itemClassName = '',
  ...rest
}, ref) => {
  // Determine the list element (ul or ol)
  const Component = type === 'ol' ? 'ol' : 'ul';
  
  // Base list classes
  const baseClasses = "";
  
  // Variant classes (list style)
  const variantClasses = {
    'disc': 'list-disc',
    'decimal': 'list-decimal',
    'none': 'list-none',
    'circle': 'list-[circle]',
    'square': 'list-[square]',
    'alpha': 'list-[lower-alpha]',
    'roman': 'list-[lower-roman]',
    'uppercase-alpha': 'list-[upper-alpha]',
    'uppercase-roman': 'list-[upper-roman]',
  };
  
  // Marker position classes
  const markerClasses = {
    'inside': 'list-inside',
    'outside': 'list-outside',
  };
  
  // Size classes (font size)
  const sizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
  };
  
  // Spacing classes (margin between list items)
  const spacingClasses = {
    'tight': compact ? 'space-y-0' : 'space-y-0.5',
    'normal': compact ? 'space-y-1' : 'space-y-2',
    'loose': compact ? 'space-y-2' : 'space-y-4',
  };
  
  // Apply the appropriate variant if using an ordered list (ol)
  const resolvedVariant = type === 'ol' && variant === 'disc' ? 'decimal' : variant;
  
  // Compose all classes
  const listClasses = [
    baseClasses,
    variantClasses[resolvedVariant] || '',
    markerClasses[marker] || '',
    sizeClasses[size] || '',
    spacingClasses[spacing] || '',
    'text-gray-800',
    className
  ].filter(Boolean).join(' ');
  
  // Add className to child list items if provided
  const renderChildren = () => {
    if (!itemClassName) return children;
    
    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === 'li') {
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${itemClassName}`.trim()
        });
      }
      return child;
    });
  };

  return (
    <Component ref={ref} className={listClasses} {...rest}>
      {renderChildren()}
    </Component>
  );
});

List.displayName = 'List';

// ListItem component
const ListItem = forwardRef(({
  children,
  className = '',
  ...rest
}, ref) => {
  return (
    <li ref={ref} className={className} {...rest}>
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';

List.propTypes = {
  /** List content (typically ListItem components) */
  children: PropTypes.node,
  /** List element type */
  type: PropTypes.oneOf(['ul', 'ol']),
  /** List style variant */
  variant: PropTypes.oneOf([
    'disc', 'decimal', 'none', 'circle', 'square', 
    'alpha', 'roman', 'uppercase-alpha', 'uppercase-roman'
  ]),
  /** Font size of the list */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Spacing between list items */
  spacing: PropTypes.oneOf(['tight', 'normal', 'loose']),
  /** Marker position (inside or outside) */
  marker: PropTypes.oneOf(['inside', 'outside']),
  /** Whether to use compact spacing */
  compact: PropTypes.bool,
  /** Additional class names for the list */
  className: PropTypes.string,
  /** Additional class names for all list items */
  itemClassName: PropTypes.string,
};

ListItem.propTypes = {
  /** List item content */
  children: PropTypes.node,
  /** Additional class names for the item */
  className: PropTypes.string,
};

export { ListItem };
export default List;