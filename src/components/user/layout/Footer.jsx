// src/components/user/layout/Footer.jsx
import React from 'react';

const Footer = ({ marginLeft }) => {
  return (
    <footer className={`mt-auto border-t border-gray-200 ${marginLeft}`}>
      <div className="px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center">
          <div className="text-center md:text-left text-sm text-gray-600">
            © 2025 WBS DPMPTSP Kota Padang. Semua Hak Dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;