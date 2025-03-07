import { lazy } from 'react';

const Demo = lazy(() => import('@/pages/guest/Demo'));
const Home = lazy(() => import('@/pages/guest/Home'));
const About = lazy(() => import('@/pages/guest/About'));
const Help = lazy(() => import('@/pages/guest/Help'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));

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
];