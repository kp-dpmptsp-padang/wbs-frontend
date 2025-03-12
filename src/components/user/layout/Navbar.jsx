import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/common/Logo';
import NotificationDropdown from '@/components/user/layout/NotificationDropdown';
import Avatar from '@/components/common/Avatar';
import AvatarIcon from '@/assets/images/logo.svg';

const Navbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

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

        <Link to="/dashboard" className="flex items-center">
          <Logo variant="icon" size="sm" className="mr-2 bg-white" isClickable={false} />
          <span className="text-xl font-semibold text-primary">CLEAR</span>
        </Link>
      </div>

      {/* Right side: Notifications & Profile */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Component */}
        <NotificationDropdown />
        
        {/* Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center focus:outline-none"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <Avatar 
              src={user?.profileImageUrl || AvatarIcon}
              alt={user?.name || 'User'} 
              size="sm" 
              shape="circle"
              fallbackClassName="bg-primary text-white"
            />
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
              {/* <Link
                to="/notifikasi"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowProfileMenu(false)}
              >
                Notifikasi
              </Link> */}
              <div className="border-t border-gray-100 my-1"></div>
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => {
                  setShowProfileMenu(false);
                  handleLogout();
                }}
              >
                <FiLogOut className="mr-2 h-4 w-4" />
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