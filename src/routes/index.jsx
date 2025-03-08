import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import GuestLayout from '@/layouts/GuestLayout';
import Demo from '@/pages/Demo';  // Import langsung untuk testing
import Home from '@/pages/guest/Home';  // Import langsung untuk testing
import About from '@/pages/guest/About';  // Import langsung untuk testing
import Help from '@/pages/guest/Help';  // Import langsung untuk testing
import Login from '@/pages/auth/Login';  // Import langsung untuk teat
import Register from '@/pages/auth/Register';  // Import langsung untuk testing
import ForgotPassword from '@/pages/auth/ForgotPassword';  // Import langsung untuk testing
import VerificationCode from '@/pages/auth/VerifyCode';  // Import langsung untuk testing
import ResetPassword from '@/pages/auth/ResetPassword';  // Import langsung untuk testing

export default function Router() {
  console.log("Router rendered");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/components" element={<Demo />} />
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/bantuan" element={<Help />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lupa-password" element={<ForgotPassword />} />
          <Route path="/kode-verifikasi" element={<VerificationCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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