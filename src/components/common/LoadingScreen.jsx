// src/components/common/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = ({ fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

export default LoadingScreen;