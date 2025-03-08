// src/App.jsx
import { useEffect } from 'react';
import Router from './routes';
import "preline/preline";
import { isAuthenticated } from './utils/token';

// Initialize any global configs, event listeners here
function App() {
  useEffect(() => {
    // Check authentication status when app loads
    const checkAuth = () => {
      if (isAuthenticated()) {
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
      }
    };
    
    checkAuth();
    
    // Preline UI initialization (already being done)
    
    // Log environment
    console.log(`Environment: ${import.meta.env.VITE_APP_ENV}`);
    console.log(`API URL: ${import.meta.env.VITE_APP_API_URL}`);
  }, []);

  return <Router />;
}

export default App;