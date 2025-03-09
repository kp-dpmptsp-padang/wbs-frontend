// src/routes/public.routes.jsx
import { lazy } from 'react';

// Lazy-loaded components - public pages
const Demo = lazy(() => import('@/pages/Demo'));
const Home = lazy(() => import('@/pages/guest/Home'));
const About = lazy(() => import('@/pages/guest/About'));
const Help = lazy(() => import('@/pages/guest/Help'));

// Auth pages
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const VerificationCode = lazy(() => import('@/pages/auth/VerifyCode'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));

// Define public routes (accessible without authentication)
export const publicRoutes = [
  {
    path: '/components',
    element: <Demo />,
    layout: 'guest' // Bisa digunakan untuk menentukan layout
  },
  {
    path: '/',
    element: <Home />,
    layout: 'guest'
  },
  {
    path: '/tentang',
    element: <About />,
    layout: 'guest'
  },
  {
    path: '/bantuan',
    element: <Help />,
    layout: 'guest'
  },
  // Auth routes
  {
    path: '/login',
    element: <Login />,
    layout: 'auth'
  },
  {
    path: '/register',
    element: <Register />,
    layout: 'auth'
  },
  {
    path: '/lupa-password',
    element: <ForgotPassword />,
    layout: 'auth'
  },
  {
    path: '/kode-verifikasi',
    element: <VerificationCode />,
    layout: 'auth'
  },
  // Di routes/public.routes.jsx
  {
    path: '/reset-password',
    element: <ResetPassword />,
    layout: 'auth'
  }
];