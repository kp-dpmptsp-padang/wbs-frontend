import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar'; // Import the Avatar component

// Individual message bubble component
export const ChatBubble = ({
  message,
  sender,
  avatar,
  timestamp,
  isCurrentUser = false,
  status = null, // 'sent', 'delivered', 'read'
  links = [],
  listItems = [],
  variant = 'default',
  showHeader = false,
  headerText = '',
  className = '',
  ...rest
}) => {
  // Base classes for the list item container
  const containerBaseClasses = isCurrentUser
    ? "flex ms-auto gap-x-2 sm:gap-x-4 max-w-lg"
    : "max-w-lg flex gap-x-2 sm:gap-x-4 me-11";
  
  // Bubble variants
  const bubbleVariantClasses = {
    'default': isCurrentUser
      ? "bg-primary text-white rounded-2xl p-4 shadow-sm"
      : "bg-white border border-gray-200 rounded-2xl p-4",
    'light': isCurrentUser
      ? "bg-primary-100 text-primary-800 rounded-2xl p-4"
      : "bg-gray-100 text-gray-800 rounded-2xl p-4",
    'transparent': isCurrentUser
      ? "bg-primary-50 text-primary-800 rounded-2xl p-4"
      : "bg-gray-50 text-gray-800 rounded-2xl p-4",
    'outlined': isCurrentUser
      ? "bg-white border border-primary text-primary rounded-2xl p-4"
      : "bg-white border border-gray-200 text-gray-800 rounded-2xl p-4",
  };
  
  // Message text classes
  const messageTextClasses = "text-sm";
  
  // Status message indicator
  const renderStatus = () => {
    if (!status || !isCurrentUser) return null;
    
    const statusText = {
      'sent': 'Sent',
      'delivered': 'Delivered',
      'read': 'Read'
    }[status];
    
    const statusIcon = {
      'sent': (
        <svg className="size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 10 4 15 9 20"></polyline>
          <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
        </svg>
      ),
      'delivered': (
        <svg className="size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ),
      'read': (
        <svg className="size-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 7 17l-5-5"></path>
          <path d="m22 10-7.5 7.5L13 16"></path>
        </svg>
      )
    }[status];
    
    return (
      <div className="flex items-center gap-x-1 mt-1">
        {statusIcon}
        <span className="text-xs text-gray-500">{statusText}</span>
        {timestamp && <span className="text-xs text-gray-500 mx-1">·</span>}
      </div>
    );
  };
  
  // Render avatar or initials for the sender
  const renderAvatar = () => {
    if (isCurrentUser) {
      if (avatar) {
        return (
          <span className="shrink-0 order-2">
            {typeof avatar === 'string' ? (
              <Avatar size="md" src={avatar} alt={sender || 'User'} />
            ) : (
              avatar
            )}
          </span>
        );
      } else {
        return (
          <span className="shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-gray-600 order-2">
            <span className="text-sm font-medium text-white">
              {sender ? sender.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
            </span>
          </span>
        );
      }
    } else {
      if (avatar) {
        return (
          <span className="shrink-0">
            {typeof avatar === 'string' ? (
              <Avatar size="md" src={avatar} alt={sender || 'User'} />
            ) : (
              avatar
            )}
          </span>
        );
      } else {
        return (
          <span className="shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-gray-600">
            <span className="text-sm font-medium text-white">
              {sender ? sender.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
            </span>
          </span>
        );
      }
    }
  };
  
  // Render links if provided
  const renderLinks = () => {
    if (!links || links.length === 0) return null;
    
    return (
      <ul className="mt-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    );
  };
  
  // Render list items if provided
  const renderListItems = () => {
    if (!listItems || listItems.length === 0) return null;
    
    return (
      <div className="space-y-1.5 mt-2">
        <ul className="list-disc list-outside space-y-1.5 ps-3.5">
          {listItems.map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <li className={`${containerBaseClasses} ${className}`} {...rest}>
      {!isCurrentUser && renderAvatar()}
      
      <div className={isCurrentUser ? "grow text-end space-y-3" : "space-y-3"}>
        {/* Message bubble */}
        <div className={`${isCurrentUser ? 'inline-block ms-auto' : ''} ${bubbleVariantClasses[variant]} space-y-3`}>
          {showHeader && headerText && (
            <h2 className="font-medium text-inherit">
              {headerText}
            </h2>
          )}
          
          {message && <p className={messageTextClasses}>{message}</p>}
          
          {renderListItems()}
          {renderLinks()}
        </div>
        
        {/* Timestamp and status */}
        <div className={`flex items-center gap-x-1 text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : ''}`}>
          {renderStatus()}
          {timestamp && <span>{timestamp}</span>}
        </div>
      </div>
      
      {isCurrentUser && renderAvatar()}
    </li>
  );
};

// Main chat container component
const ChatBubbles = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <ul className={`space-y-5 ${className}`} {...rest}>
      {children}
    </ul>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.string,
  sender: PropTypes.string,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  timestamp: PropTypes.string,
  isCurrentUser: PropTypes.bool,
  status: PropTypes.oneOf([null, 'sent', 'delivered', 'read']),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      external: PropTypes.bool
    })
  ),
  listItems: PropTypes.arrayOf(PropTypes.node),
  variant: PropTypes.oneOf(['default', 'light', 'transparent', 'outlined']),
  showHeader: PropTypes.bool,
  headerText: PropTypes.string,
  className: PropTypes.string
};

ChatBubbles.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default ChatBubbles;