import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative background elements */}
        {/* <div className="absolute -top-12 right-0 opacity-10 md:opacity-20">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="3" className="text-primary" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#pattern-circles)" />
          </svg>
        </div>
        <div className="absolute -bottom-24 -left-12 opacity-10 md:opacity-20">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-primary" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#pattern-squares)" />
          </svg>
        </div> */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-dark leading-tight">
              Laporkan Pelanggaran dengan Aman dan Terpercaya
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Sistem pelaporan digital yang menjamin kerahasiaan identitas Anda
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="primary" 
                size="large" 
                as={Link} 
                to="/login"
                className="px-6 font-medium"
              >
                Buat Laporan
              </Button>
              <Button 
                variant="outline-primary" 
                size="large" 
                as={Link} 
                to="/tentang"
                className="px-6 font-medium"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
          
          {/* Image/illustration */}
          <div className="relative">
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg border border-gray-100 max-w-md mx-auto">
              <div className="flex items-center justify-center size-16 rounded-full bg-primary-50 mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-dark text-center mb-2">
                Keamanan & Kerahasiaan Terjamin
              </h3>
              <p className="text-gray-600 text-center">
                Kami menjamin kerahasiaan identitas Anda dalam setiap pelaporan. Laporan Anda diproses secara profesional dan terstruktur.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="bg-primary-50 p-2 rounded text-center">
                  <svg className="h-6 w-6 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-xs text-primary-dark mt-1">Aman</p>
                </div>
                <div className="bg-primary-50 p-2 rounded text-center">
                  <svg className="h-6 w-6 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-primary-dark mt-1">Cepat</p>
                </div>
                <div className="bg-primary-50 p-2 rounded text-center">
                  <svg className="h-6 w-6 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-xs text-primary-dark mt-1">Terlacak</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements around the card */}
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-primary-50 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-primary-50 rounded-full opacity-70"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
              <svg className="text-primary opacity-5" width="404" height="404" fill="currentColor" viewBox="0 0 200 200">
                <path d="M36.8,-61.7C49,-56.5,61,-48.6,69.4,-37.5C77.8,-26.3,82.6,-13.2,81.2,-0.8C79.9,11.5,72.3,23.1,64,33C55.7,43,46.5,51.4,35.5,58.3C24.6,65.3,12.3,70.9,-0.3,71.3C-12.9,71.8,-25.9,67.1,-37.7,60.2C-49.5,53.4,-60.1,44.3,-65.3,32.7C-70.5,21,-70.2,6.7,-69.7,-7.9C-69.1,-22.5,-68.3,-37.3,-60.9,-47.7C-53.6,-58.1,-39.8,-64,-26.8,-67.9C-13.8,-71.8,-1.4,-73.8,10.1,-70.9C21.5,-68,33,-66.9,36.8,-61.7Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;