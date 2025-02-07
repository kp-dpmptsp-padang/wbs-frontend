import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GuestLayout from '@/layouts/GuestLayout';
import Home from '@/pages/guest/Home';  // Import langsung untuk testing

export default function Router() {
  console.log("Router rendered");
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// import { Suspense } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import GuestLayout from '@/layouts/GuestLayout';
// import { publicRoutes } from './public.routes';

// export default function Router() {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {/* Public Routes */}
//           <Route element={<GuestLayout />}>
//             {publicRoutes.map((route) => (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={route.element}
//               />
//             ))}
//           </Route>

//           {/* Protected Routes akan ditambahkan nanti */}
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }