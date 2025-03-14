import React from 'react';
import RegisterForm from '@/components/guest/RegisterForm';
import { FiShield, FiUserCheck, FiAlertTriangle } from 'react-icons/fi';

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Ilustrasi Sisi Kiri (untuk desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center">
              <FiShield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Bergabung dengan WBS</h1>
          <p className="text-xl text-blue-100 mb-8">
            Platform pelaporan digital yang menjamin kerahasiaan identitas Anda. Mudah, aman, dan dapat dipantau.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center text-white">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <FiUserCheck className="h-4 w-4" />
              </div>
              <span>Akun terverifikasi untuk keamanan pelaporan</span>
            </div>
            <div className="flex items-center text-white">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <FiAlertTriangle className="h-4 w-4" />
              </div>
              <span>Laporkan pelanggaran dengan aman dan terjamin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Sisi Kanan */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegisterForm />
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Whistle Blowing System. Semua Hak Dilindungi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}