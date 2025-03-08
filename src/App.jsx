// src/App.jsx
import { useEffect } from 'react';
import Router from './routes';
import "preline/preline";
import { AuthProvider } from './contexts/AuthContext';
import { isAuthenticated } from './utils/token';

function App() {
  useEffect(() => {
    // Check authentication status when app loads
    const checkAuth = () => {
      if (isAuthenticated()) {
        // Pastikan fungsi ini hanya memeriksa token, bukan user data
        console.log('Token ditemukan');
      } else {
        console.log('Token tidak ditemukan');
      }
    };
    
    checkAuth();
    
    // Preline UI initialization (already being done)
    
    // Log environment
    console.log(`Environment: ${import.meta.env.VITE_APP_ENV}`);
    console.log(`API URL: ${import.meta.env.VITE_APP_API_URL}`);
  }, []);

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;