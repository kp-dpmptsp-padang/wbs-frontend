import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { FiArrowLeft, FiLock } from 'react-icons/fi';

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validasi kode
    if (!verificationCode) {
      setErrors({ code: 'Kode verifikasi diperlukan' });
      return;
    }

    // Simulasi request ke API
    setLoading(true);
    try {
      // Implementasi request ke API akan ditambahkan di sini
      console.log('Verifying code:', verificationCode);
      
      // Simulasi delay API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect ke halaman reset password
      navigate('/reset-password');
    } catch (error) {
      console.error('Verification failed:', error);
      setErrors({ general: 'Kode verifikasi tidak valid. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    console.log('Resending verification code');
    // Implementasi untuk mengirim ulang kode
    // ...
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <Link to="/forgot-password" className="text-primary hover:text-primary-dark">
          <FiArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h1 className="text-2xl font-bold text-primary mb-2">Konfirmasi Akun Anda</h1>
            <p className="text-gray-600 mb-6">
              Kami sudah mengirimkan kode ke email Anda. Masukkan kode tersebut untuk mengonfirmasi akun Anda.
            </p>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Kode Verifikasi
                </label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="XXXXXXXXXXXXX"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  error={errors.code}
                  leftIcon={<FiLock className="text-gray-500" />}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                block={true}
                loading={loading}
                disabled={loading}
              >
                Kirim
              </Button>

              <div className="text-center">
                <button 
                  type="button" 
                  onClick={handleResendCode}
                  className="text-sm text-primary hover:text-primary-dark font-medium"
                >
                  Kirim Ulang Kode
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Logos */}
        <div className="mt-auto py-8 flex justify-center space-x-6">
          <img src="/logo-dpmptsp.png" alt="DPMPTSP Kota Padang" className="h-12" />
          <img src="/logo-clear.png" alt="CLEAR" className="h-12" />
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;