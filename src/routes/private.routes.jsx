// src/routes/private.routes.jsx
import { lazy } from 'react';

// Lazy-loaded components - dashboard pages
const Dashboard = lazy(() => import('@/pages/users/Dashboard'));

// User report pages
const MakeReport = lazy(() => import('@/pages/users/reporter/MakeReport'));
const MonitorReport = lazy(() => import('@/pages/users/reporter/MonitorReport'));
const MonitorAnonymReport = lazy(() => import('@/pages/users/reporter/MonitorAnonymReport'));
const ReportHistory = lazy(() => import('@/pages/users/reporter/ReportHistory'));

// Admin pages
const ReportList = lazy(() => import('@/pages/users/admin/ReportList'));
const ProcessedReportList = lazy(() => import('@/pages/users/admin/ProcessedReportList'));
const ReportDetail = lazy(() => import('@/pages/users/admin/ReportDetail'));
const ReportRecap = lazy(() => import('@/pages/users/admin/ReportRecap'));

// Super admin pages
const AdminList = lazy(() => import('@/pages/users/admin/AdminList'));

// Profile & settings
const Profile = lazy(() => import('@/pages/users/UserProfile'));
const Notification = lazy(() => import('@/pages/users/Notification'));
const Chat = lazy(() => import('@/pages/users/Chat'));

// Define private routes with required roles
export const privateRoutes = [
  // Dashboard - accessible by all authenticated users
  {
    path: '/dashboard',
    element: <Dashboard />,
    roles: ['user', 'admin', 'super-admin'] // Semua role bisa akses
  },
  
  // Reporter routes
  {
    path: '/laporan/buat',
    element: <MakeReport />,
    roles: ['user'] // Semua user bisa membuat laporan
  },
  {
    path: '/laporan/pantau',
    element: <MonitorReport />,
    roles: ['user']
  },
  {
    path: '/laporan/anonim',
    element: <MonitorAnonymReport />,
    roles: ['user']
  },
  {
    path: '/laporan/riwayat',
    element: <ReportHistory />,
    roles: ['user']
  },
  
  // Admin routes
  {
    path: '/admin/laporan',
    element: <ReportList />,
    roles: ['admin', 'super-admin'] // Hanya admin & super-admin
  },
  {
    path: '/admin/laporan/diproses',
    element: <ProcessedReportList />,
    roles: ['admin', 'super-admin']
  },
  {
    path: '/admin/laporan/:id',
    element: <ReportDetail />,
    roles: ['admin', 'super-admin']
  },
  {
    path: '/admin/laporan/rekap',
    element: <ReportRecap />,
    roles: ['admin', 'super-admin']
  },
  
  // Super admin routes
  {
    path: '/admin/pengguna',
    element: <AdminList />,
    roles: ['super-admin'] // Hanya super-admin
  },
  
  // Common authenticated user routes
  {
    path: '/profil',
    element: <Profile />,
    roles: ['user', 'admin', 'super-admin'] // Semua user bisa akses profil
  },
  {
    path: '/notifikasi',
    element: <Notification />,
    roles: ['user', 'admin', 'super-admin']
  },
  {
    path: '/chat',
    element: <Chat />,
    roles: ['user', 'admin', 'super-admin']
  }
];