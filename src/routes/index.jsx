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
  
  // Jika requiredRoles disediakan, periksa apakah user memiliki role yang diperlukan
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
          {/* Public routes - accessible without authentication */}
          <Route element={<GuestGuard />}>
            {/* Guest layout routes */}
            <Route element={<GuestLayout />}>
              {publicRoutes
                .filter(route => route.layout === 'guest')
                .map(route => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
              }
            </Route>
            
            {/* Auth layout routes */}
            <Route element={<AuthLayout />}>
              {publicRoutes
                .filter(route => route.layout === 'auth')
                .map(route => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
              }
            </Route>
          </Route>
          
          {/* Demo route - public without guard */}
          <Route path="/components" element={publicRoutes.find(r => r.path === '/components').element} />
          
          {/* Protected routes grouped by role requirement */}
          {/* Routes for all authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              {privateRoutes
                .filter(route => 
                  route.roles?.includes('user') || 
                  route.roles?.includes('admin') || 
                  route.roles?.includes('super-admin'))
                .map(route => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
              }
            </Route>
          </Route>
          
          {/* Admin-only routes */}
          <Route element={<ProtectedRoute requiredRoles={['admin', 'super-admin']} />}>
            <Route element={<UserLayout />}>
              {privateRoutes
                .filter(route => 
                  (route.roles?.includes('admin') || route.roles?.includes('super-admin')) &&
                  !route.roles?.includes('user'))
                .map(route => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
              }
            </Route>
          </Route>
          
          {/* Super-admin-only routes */}
          <Route element={<ProtectedRoute requiredRoles={['super-admin']} />}>
            <Route element={<UserLayout />}>
              {privateRoutes
                .filter(route => route.roles?.includes('super-admin') && 
                  !route.roles?.includes('admin') && 
                  !route.roles?.includes('user'))
                .map(route => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))
              }
            </Route>
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}