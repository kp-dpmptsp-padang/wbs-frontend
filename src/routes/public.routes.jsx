import { lazy } from 'react';

const Demo = lazy(() => import('@/pages/Demo'));
const Home = lazy(() => import('@/pages/guest/Home'));
const About = lazy(() => import('@/pages/guest/About'));
const Help = lazy(() => import('@/pages/guest/Help'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const VerificationCode = lazy(() => import('@/pages/auth/VerifyCode'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const Dashboard = lazy(() => import('@/pages/users/Dashboard'));

export const publicRoutes = [
  {
    path: '/components',
    element: <Demo />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/tentang',
    element: <About />,
  },
  {
    path: '/bantuan',
    element: <Help />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/lupa-password',
    element: <ForgotPassword />,
  },
  {
    path: '/kode-verifikasi',
    element: <VerificationCode />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  }
];