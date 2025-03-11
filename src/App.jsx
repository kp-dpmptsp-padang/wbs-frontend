// src/App.jsx
import { useEffect } from 'react';
import Router from './routes';
import "preline/preline";
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ReportProvider } from './contexts/ReportContext';
import { ChatProvider } from './contexts/ChatContext';
import { AdminProvider } from './contexts/AdminContext';
import { isAuthenticated } from './utils/token';
import { preemptiveTokenRefresh } from './services/api';

function App() {
  useEffect(() => {
    // Check authentication status when app loads
    const checkAuth = async () => {
      if (isAuthenticated()) {
        // Verify and refresh token if needed
        await preemptiveTokenRefresh();
        console.log('Token verified and refreshed if needed');
      } else {
        console.log('Not authenticated');
      }
    };
    
    checkAuth();
    
    // Set up interval to check token validity periodically (e.g., every 5 minutes)
    const tokenRefreshInterval = setInterval(() => {
      if (isAuthenticated()) {
        preemptiveTokenRefresh();
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    // Preline UI initialization
    
    // Log environment
    console.log(`Environment: ${import.meta.env.VITE_APP_ENV}`);
    console.log(`API URL: ${import.meta.env.VITE_APP_API_URL}`);
    
    // Cleanup interval on unmount
    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <ReportProvider>
            <ChatProvider>
              <AdminProvider>
                <Router />
              </AdminProvider>
            </ChatProvider>
          </ReportProvider>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;