// src/layouts/UserLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/user/layout/Navbar';
import Sidebar from '@/components/user/layout/Sidebar';
import Footer from '@/components/user/layout/Footer';

export default function UserLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  // Only control sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Close sidebar when screen resizes from mobile to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarVisible(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isVisible={sidebarVisible} />
      
      {/* Mobile sidebar overlay */}
      {sidebarVisible && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Main content */}
      <main className="flex-1 pt-16 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      
      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
}