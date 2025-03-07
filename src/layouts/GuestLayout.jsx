import { Outlet } from 'react-router-dom';
import Navbar from '@/components/guest/partials/Navbar';
import Footer from '@/components/guest/partials/Footer';

export default function GuestLayout() {
  console.log("GuestLayout rendered");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}