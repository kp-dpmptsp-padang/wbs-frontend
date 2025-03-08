import { lazy } from 'react';

const Demo = lazy(() => import('@/pages/guest/Demo'));
const MakeReport = lazy(() => import('@/pages/guest/MakeReport'));

export const publicRoutes = [
  {
    path: '/components',
    element: <Demo />,
  },
  {
    path: '/buat-laporan',
    element: <MakeReport />,
  }
];