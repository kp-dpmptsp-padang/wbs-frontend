// src/pages/auth/Login.jsx (modifikasi untuk menampilkan pesan sukses reset password)
import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "@/components/guest/LoginForm";
import { FiShield, FiLock, FiEye } from 'react-icons/fi';

export default function Login() {
  const location = useLocation();
  const resetSuccess = location.state?.resetSuccess;
  const successMessage = location.state?.message;

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
                <FiLock className="h-4 w-4" />
              </div>
              <span>Pelaporan anonim dan terenkripsi</span>
            </div>
            <div className="flex items-center text-white">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <FiEye className="h-4 w-4" />
              </div>
              <span>Pantau status laporan secara real-time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Sisi Kanan */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Tampilkan pesan sukses reset password jika ada */}
          {resetSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              <div className="flex">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{successMessage || 'Password berhasil direset. Silakan login dengan password baru Anda.'}</span>
              </div>
            </div>
          )}
          
          <LoginForm />
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Whistle Blowing System. Semua Hak Dilindungi.</p>
          </div>
        </div>
      </div>
    </div>
  );
}