import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FiHome, 
  FiFileText, 
  FiPlus,
  FiEye,
  FiClock,
  FiList,
  FiBarChart2,
  FiUsers,
  FiAlertTriangle,
  FiChevronRight,
  FiChevronDown
} from 'react-icons/fi';

const Sidebar = ({ isVisible }) => {
  const { user, hasRole } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  
  // Toggle submenu
  const toggleSubmenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if a menu item should be active based on exact path matching
  const isMenuActive = (path) => {
    return location.pathname === path;
  };

  // Check if a submenu has an active item
  const hasActiveSubmenu = (submenu) => {
    return submenu.some(item => location.pathname === item.path);
  };
  
  // Menu items for regular users (pelapor)
  const userMenuItems = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      key: 'create-report',
      title: 'Buat Laporan',
      icon: <FiPlus className="w-5 h-5" />,
      path: '/laporan/buat',
    },
    {
      key: 'monitor-reports',
      title: 'Pantau Laporan',
      icon: <FiEye className="w-5 h-5" />,
      hasSubmenu: true,
      submenu: [
        {
          title: 'Status Laporan',
          icon: <FiList className="w-4 h-4" />,
          path: '/laporan/pantau',
        },
        {
          title: 'Cek Laporan Anonim',
          icon: <FiAlertTriangle className="w-4 h-4" />,
          path: '/laporan/anonim',
        }
      ]
    },
    {
      key: 'report-history',
      title: 'Riwayat Laporan',
      icon: <FiClock className="w-5 h-5" />,
      path: '/laporan/riwayat',
    }
  ];
  
  // Menu items for admin users
  const adminMenuItems = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      key: 'new-reports',
      title: 'Laporan Baru',
      icon: <FiFileText className="w-5 h-5" />,
      path: '/admin/laporan',
      exact: true,
    },
    {
      key: 'processing',
      title: 'Penanganan',
      icon: <FiList className="w-5 h-5" />,
      path: '/admin/laporan/diproses',
    },
    {
      key: 'recap',
      title: 'Rekap',
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: '/admin/laporan/rekap',
    }
  ];
  
  // Additional menu items for super admin
  const superAdminItems = [
    {
      key: 'admin-list',
      title: 'Daftar Admin',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/admin/pengguna',
    }
  ];
  
  // Determine which menu items to show based on user role
  let menuItems = [...userMenuItems]; // Default as regular user
  
  if (user) {
    if (hasRole('super-admin')) {
      menuItems = [...adminMenuItems, ...superAdminItems];
    } else if (hasRole('admin')) {
      menuItems = [...adminMenuItems];
    }
  }

  // Auto-expand submenu that has active item
  React.useEffect(() => {
    menuItems.forEach(item => {
      if (item.hasSubmenu && hasActiveSubmenu(item.submenu)) {
        setExpandedMenus(prev => ({ ...prev, [item.key]: true }));
      }
    });
  }, [location.pathname]);

  return (
    <aside 
      id="application-sidebar" 
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-white border-r border-gray-200 transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.key} className="mb-1">
              {item.hasSubmenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.key)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg ${
                      expandedMenus[item.key] || hasActiveSubmenu(item.submenu)
                        ? 'text-primary bg-primary-light/10' 
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    {expandedMenus[item.key] ? (
                      <FiChevronDown className="w-4 h-4" />
                    ) : (
                      <FiChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  <div 
                    className={`mt-1 ml-6 pl-2 border-l border-gray-200 space-y-1 ${
                      expandedMenus[item.key] ? 'block' : 'hidden'
                    }`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        end
                        className={({ isActive }) => `flex items-center px-4 py-2 text-sm ${
                          isActive 
                            ? 'text-primary font-medium' 
                            : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                        } rounded-lg`}
                      >
                        <span className="mr-2">{subItem.icon}</span>
                        <span>{subItem.title}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm ${
                      isActive 
                        ? 'text-primary font-medium bg-primary-light/10' 
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    } rounded-lg`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 