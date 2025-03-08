import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@/components/common/Button.jsx';
import Logo from '@/components/common/Logo.jsx';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the current path matches the link
  const isActive = (path) => location.pathname === path;

  // Track scrolling to add shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-md py-3' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex bg-white items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo 
              variant="full" 
              size={isScrolled ? "sm" : "md"} 
              className="transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={isActive('/')}>
              Beranda
            </NavLink>
            <NavLink to="/tentang" isActive={isActive('/tentang')}>
              Tentang
            </NavLink>
            <NavLink to="/bantuan" isActive={isActive('/bantuan')}>
              Bantuan
            </NavLink>
          </div>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline-primary" 
              size="small" 
              as={Link} 
              to="/register"
              className="rounded-lg font-medium"
            >
              Register
            </Button>
            <Button 
              variant="primary" 
              size="small" 
              as={Link} 
              to="/login"
              className="rounded-lg font-medium"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu, shown/hidden based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-3">
              <MobileNavLink to="/" isActive={isActive('/')} onClick={() => setIsMobileMenuOpen(false)}>
                Beranda
              </MobileNavLink>
              <MobileNavLink to="/tentang" isActive={isActive('/tentang')} onClick={() => setIsMobileMenuOpen(false)}>
                Tentang
              </MobileNavLink>
              <MobileNavLink to="/bantuan" isActive={isActive('/bantuan')} onClick={() => setIsMobileMenuOpen(false)}>
                Bantuan
              </MobileNavLink>
              
              <div className="flex flex-col space-y-2 pt-2 mt-2 border-t border-gray-200">
                <Button 
                  variant="outline-primary" 
                  size="small" 
                  as={Link} 
                  to="/register"
                  className="w-full justify-center rounded-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Button>
                <Button 
                  variant="primary" 
                  size="small" 
                  as={Link} 
                  to="/login"
                  className="w-full justify-center rounded-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Desktop NavLink component
const NavLink = ({ children, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`relative px-1 py-2 font-medium text-base transition-colors duration-300 ${
        isActive 
          ? 'text-primary' 
          : 'text-gray-700 hover:text-primary'
      }`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
      }`}></span>
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ children, to, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive 
          ? 'text-primary bg-primary-50' 
          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;