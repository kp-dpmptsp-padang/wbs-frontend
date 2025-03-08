// src/components/user/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiMenu } from 'react-icons/fi';
import Logo from '@/components/common/Logo';

const Navbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex h-16 items-center bg-white border-b border-gray-200 px-4">
      {/* Left side: Mobile Menu toggle and Logo */}
      <div className="flex items-center">
        <button
          type="button"
          className="text-gray-600 hover:text-primary focus:outline-none mr-3 lg:hidden"
          onClick={toggleSidebar}
        >
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Perbaikan: Gunakan Logo tanpa Link di dalamnya */}
        <Link to="/dashboard" className="flex items-center">
          {/* Gunakan Logo dengan isClickable={false} agar tidak membuat Link */}
          <Logo variant="icon" size="sm" className="mr-2 bg-white" isClickable={false} />
          <span className="text-xl font-semibold text-primary">CLEAR</span>
        </Link>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center space-x-3 ml-auto">
        <button
          type="button"
          className="relative p-1 text-gray-600 hover:text-primary rounded-full focus:outline-none"
        >
          <FiBell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-primary text-white flex items-center justify-center">
              <span className="font-medium text-sm">US</span>
            </div>
          </button>

          {/* Dropdown menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
              <Link
                to="/profil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Profil
              </Link>
              <Link
                to="/pengaturan"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Pengaturan
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;