import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const CardSection = forwardRef(({
  title,
  subtitle,
  cards = [],
  columns = 3,
  gap = 6,
  className = '',
  containerClassName = '',
  cardClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  rounded = 'xl',
  shadow = '2xs',
  border = true,
  maxWidth = '85rem',
  padding = 'default',
  ...rest
}, ref) => {
  // Determine grid columns based on prop
  const gridCols = {
    1: 'grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  // Determine gap size
  const gapSize = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  // Determine padding
  const paddingClasses = {
    'none': '',
    'small': 'px-4 py-6 sm:px-6 lg:px-6 lg:py-8',
    'default': 'px-4 py-10 sm:px-6 lg:px-8 lg:py-14',
    'large': 'px-6 py-12 sm:px-8 lg:px-10 lg:py-16',
  };

  // Determine rounded corners
  const roundedClasses = {
    'none': '',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    'full': 'rounded-full',
  };

  // Determine shadow
  const shadowClasses = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    '2xs': 'shadow-2xs',
  };

  return (
    <div 
      ref={ref}
      className={`max-w-[${maxWidth}] mx-auto ${paddingClasses[padding]} ${className}`}
      {...rest}
    >
      {/* Section Header */}
      {(title || subtitle) && (
        <div className={`mb-6 ${headerClassName}`}>
          {title && <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Grid */}
      <div className={`grid ${gridCols[columns]} ${gapSize[gap]} ${containerClassName}`}>
        {cards.map((card, index) => (
          <div 
            key={card.id || index}
            className={`group flex flex-col h-full bg-white ${border ? 'border border-gray-200' : ''} ${shadowClasses[shadow]} ${roundedClasses[rounded]} ${cardClassName}`}
          >
            {/* Card Header/Image */}
            {card.image && (
              <div className={`h-52 flex flex-col justify-center items-center ${card.bgColor || 'bg-primary'} ${roundedClasses[rounded].replace('rounded', 'rounded-t')}`}>
                {typeof card.image === 'string' ? (
                  <img 
                    src={card.image} 
                    alt={card.title || `Card image ${index}`} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  card.image
                )}
              </div>
            )}

            {/* Card Body */}
            <div className={`p-4 md:p-6 ${bodyClassName}`}>
              {card.tag && (
                <span className={`block mb-1 text-xs font-semibold uppercase ${card.tagColor || 'text-primary'}`}>
                  {card.tag}
                </span>
              )}
              {card.title && (
                <h3 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h3>
              )}
              {card.description && (
                <p className="mt-3 text-gray-500">
                  {card.description}
                </p>
              )}
              {card.content && card.content}
            </div>

            {/* Card Footer */}
            {card.actions && (
              <div className={`mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ${footerClassName}`}>
                {Array.isArray(card.actions) ? (
                  card.actions.map((action, actionIndex) => (
                    <a 
                      key={actionIndex}
                      className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium 
                        ${actionIndex === 0 ? `rounded-es-${rounded}` : ''} 
                        ${actionIndex === card.actions.length - 1 ? `rounded-ee-${rounded}` : ''} 
                        bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 
                        disabled:opacity-50 disabled:pointer-events-none`}
                      href={action.href || "#"}
                      onClick={action.onClick}
                    >
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.text}
                    </a>
                  ))
                ) : (
                  card.actions
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

CardSection.displayName = 'CardSection';

CardSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      bgColor: PropTypes.string,
      tag: PropTypes.string,
      tagColor: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      content: PropTypes.node,
      actions: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            href: PropTypes.string,
            onClick: PropTypes.func,
            icon: PropTypes.node
          })
        )
      ])
    })
  ).isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  gap: PropTypes.oneOf([2, 4, 6, 8]),
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  cardClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', '2xs']),
  border: PropTypes.bool,
  maxWidth: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
};

export default CardSection;