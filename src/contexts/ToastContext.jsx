// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // In ToastContext.jsx, ensure addToast has proper type checking:

  const addToast = useCallback((message, type = 'error', duration = 5000) => {
    // Ensure message is a string
    const safeMessage = typeof message === 'string' ? message : 
                      (message && typeof message.toString === 'function' ? 
                        message.toString() : 'Notification');
    
    const id = Date.now();
    const newToast = { id, message: safeMessage, type };
    
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  // Use useCallback for removeToast as well
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const value = {
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`max-w-xs p-4 rounded-lg shadow-lg ${
                toast.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
                toast.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
                toast.type === 'warning' ? 'bg-yellow-50 border border-yellow-200 text-yellow-700' :
                'bg-blue-50 border border-blue-200 text-blue-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <span>{toast.message}</span>
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="ml-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};