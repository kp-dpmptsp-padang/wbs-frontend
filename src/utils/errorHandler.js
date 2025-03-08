// src/utils/errorHandler.js
export const handleApiError = (error) => {
    if (error.response) {
      // Server responded with a status other than 200 range
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return {
            type: 'validation',
            message: data.message || 'Validation error',
            errors: data.errors || {}
          };
        case 401:
          return {
            type: 'auth',
            message: 'Unauthorized. Please login again.'
          };
        case 403:
          return {
            type: 'permission',
            message: 'You do not have permission to perform this action.'
          };
        case 404:
          return {
            type: 'not_found',
            message: 'The requested resource was not found.'
          };
        case 422:
          return {
            type: 'validation',
            message: data.message || 'Validation error',
            errors: data.errors || {}
          };
        case 500:
        default:
          return {
            type: 'server',
            message: 'Server error. Please try again later.'
          };
      }
    } else if (error.request) {
      // Request was made but no response received
      return {
        type: 'network',
        message: 'Network error. Please check your connection.'
      };
    } else {
      // Something else happened while setting up the request
      return {
        type: 'unknown',
        message: error.message || 'An unknown error occurred.'
      };
    }
};