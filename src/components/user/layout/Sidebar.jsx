// src/components/user/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiFileText, 
  FiMessageSquare, 
  FiBell, 
  FiUser, 
  FiSettings,
  FiHelpCircle,
  FiChevronRight
} from 'react-icons/fi';

const Sidebar = ({ isVisible }) => {
  const navItems = [
    {
      title: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      title: 'Laporan',
      icon: <FiFileText className="w-5 h-5" />,
      path: '/laporan',
      hasSubmenu: true
    },
    {
      title: 'Percakapan',
      icon: <FiMessageSquare className="w-5 h-5" />,
      path: '/percakapan',
    },
    {
      title: 'Notifikasi',
      icon: <FiBell className="w-5 h-5" />,
      path: '/notifikasi',
    },
    {
      title: 'Profil',
      icon: <FiUser className="w-5 h-5" />,
      path: '/profil',
    },
    {
      title: 'Pengaturan',
      icon: <FiSettings className="w-5 h-5" />,
      path: '/pengaturan',
    },
    {
      title: 'Bantuan',
      icon: <FiHelpCircle className="w-5 h-5" />,
      path: '/bantuan',
    }
  ];

  return (
    <>
      <aside 
        id="application-sidebar" 
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-white border-r border-gray-200 transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm ${
                      isActive 
                        ? 'text-primary font-medium' 
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                  {item.hasSubmenu && (
                    <FiChevronRight className="ml-auto w-4 h-4" />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;