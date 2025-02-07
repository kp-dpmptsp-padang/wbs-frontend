import { lazy } from 'react';

const Home = lazy(() => import('@/pages/guest/Home'));
const About = lazy(() => import('@/pages/guest/About'));
const Help = lazy(() => import('@/pages/guest/Help'));
const Login = lazy(() => import('@/pages/guest/Login'));
const Register = lazy(() => import('@/pages/guest/Register'));

export const publicRoutes = [
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
];