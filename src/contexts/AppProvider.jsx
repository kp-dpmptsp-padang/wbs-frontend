// src/contexts/AppProviders.jsx
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { ReportProvider } from './ReportContext';
import { ChatProvider } from './ChatContext';
import { NotificationProvider } from './NotificationContext';
import { AdminProvider } from './AdminContext';

/**
 * Provider wrapper untuk mengelola semua context providers
 * Susun providers dengan urutan yang tepat berdasarkan dependensi
 */
export const AppProviders = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <ReportProvider>
            <ChatProvider>
              <AdminProvider>
                {children}
              </AdminProvider>
            </ChatProvider>
          </ReportProvider>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default AppProviders;