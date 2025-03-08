import { lazy } from 'react';

// const Dashboard = lazy(() => import('@/pages/users/Dashboard'));
const MakeReport = lazy(() => import('@/pages/guest/MakeReport'));

export const privateRoutes = [
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
  // },
  {
    path: '/buat-laporan',
    element: <MakeReport />,
  }
];