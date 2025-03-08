import React from 'react';

export default function WBSMobile() {
  return (
    <section className="py-20 bg-white" id="wbs-mobile">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary-dark sm:text-4xl">
            WBS Mobile
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Pengaduan Cepat, Tepat & Aman di Genggaman Anda
          </p>
        </div>
        
        {/* Mockup Image with Overlay */}
        <div className="relative">
          {/* Mockup Image - Full Width */}
          <img 
            src="/images/mockup.png" 
            alt="WBS Mobile Application Screenshots" 
            className="w-full max-w-6xl mx-auto object-contain"
          />
          
          {/* Overlay Content - Positioned over the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg max-w-md text-center">
              <p className="text-lg text-primary-dark mb-6">
                Laporkan pelanggaran dengan mudah melalui smartphone Anda. 
                Download aplikasi WBS Mobile sekarang, eksklusif di Google Play Store.
              </p>
              
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition-colors"
              >
                <svg className="size-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                Download di Play Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}