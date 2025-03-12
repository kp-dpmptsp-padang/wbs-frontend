// src/components/user/layout/PageContainer.jsx
import React from 'react';

const PageContainer = ({ title, children, actions }) => {
  return (
    <div className="rounded-lg shadow-sm mb-6">
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {actions && (
            <div className="mt-3 sm:mt-0 flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;