// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import authService from '@/services/auth.service';
import useApi from '@/hooks/useApi';

const ForgotPassword = () => {
  const forgotPasswordApi = useApi(authService.forgotPassword);
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validasi email
    if (!email) {
      setErrors({ email: 'Email diperlukan' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Format email tidak valid' });
      return;
    }

    // Panggil API
    const result = await forgotPasswordApi.execute(email);
    
    if (result.success) {
      // Set success state
      setSuccess(true);
    } else {
      setErrors({ general: result.error });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <Link to="/login" className="text-primary hover:text-primary-dark">
          <FiArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {success ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="mt-3 text-lg font-medium text-gray-900">Instruksi Reset Password Terkirim</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Kami telah mengirimkan link reset password ke email Anda. 
                  Silakan cek inbox dan folder spam Anda.
                </p>
                <p className="mt-5 text-sm text-gray-500">
                  Link reset password akan kadaluarsa dalam 1 jam. Jika Anda tidak menerima email,
                  pastikan alamat email yang dimasukkan benar dan coba lagi.
                </p>
                <div className="mt-5">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Kembali ke Login
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-primary mb-2">Cari Akun Anda</h1>
                <p className="text-gray-600 mb-6">
                  Masukkan Email Anda untuk menerima link reset password. 
                  Link akan dikirim ke alamat email yang terdaftar.
                </p>

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Masukkan email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        leftIcon={<FiMail className="text-gray-500" />}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    block={true}
                    loading={forgotPasswordApi.loading}
                    disabled={forgotPasswordApi.loading}
                  >
                    Kirim Link Reset
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Footer Logos */}
        <div className="mt-auto py-8 flex justify-center space-x-6">
          <Logo variant="full" size="lg" isClickable={false} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;