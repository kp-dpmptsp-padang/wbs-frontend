// src/routes/index.jsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import AuthLayout from '@/layouts/AuthLayout';
import GuestLayout from '@/layouts/GuestLayout';
import UserLayout from '@/layouts/UserLayout';
import { publicRoutes } from './public.routes';
import { privateRoutes } from './private.routes';

// Loading component for suspense fallback
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// GuestGuard - untuk halaman tamu (redirect ke dashboard jika sudah login)
const GuestGuard = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (isAuthenticated) {
    console.log('GuestGuard: User is authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

// ProtectedRoute - untuk halaman yang memerlukan autentikasi
const ProtectedRoute = ({ requiredRoles }) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    console.log('ProtectedRoute: User role not allowed, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes with GuestGuard - redirect to dashboard if authenticated */}
          <Route element={<GuestGuard />}>
            <Route element={<GuestLayout />}>
              <Route path="/" element={publicRoutes.find(r => r.path === '/').element} />
              <Route path="/tentang" element={publicRoutes.find(r => r.path === '/tentang').element} />
              <Route path="/bantuan" element={publicRoutes.find(r => r.path === '/bantuan').element} />
            </Route>
          
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={publicRoutes.find(r => r.path === '/login').element} />
              <Route path="/register" element={publicRoutes.find(r => r.path === '/register').element} />
              <Route path="/lupa-password" element={publicRoutes.find(r => r.path === '/lupa-password').element} />
              <Route path="/kode-verifikasi" element={publicRoutes.find(r => r.path === '/kode-verifikasi').element} />
              <Route path="/reset-password" element={publicRoutes.find(r => r.path === '/reset-password').element} />
            </Route>
          </Route>
          
          {/* Demo route - public without guard */}
          <Route path="/components" element={publicRoutes.find(r => r.path === '/components').element} />
          
          {/* Protected Routes - redirect to login if not authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/dashboard" element={publicRoutes.find(r => r.path === '/dashboard').element} />
              {privateRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Route>
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}