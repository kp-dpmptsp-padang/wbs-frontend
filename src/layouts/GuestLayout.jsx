import { Outlet } from 'react-router-dom';
import Navbar from '@/components/guest/Navbar';
import Footer from '@/components/guest/Footer';

export default function GuestLayout() {
  console.log("GuestLayout rendered");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Gunakan Outlet, bukan children */}
      </main>
      <Footer />
    </div>
  );
}