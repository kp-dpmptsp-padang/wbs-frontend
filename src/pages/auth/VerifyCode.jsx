// src/pages/auth/VerifyCode.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import authService from '@/services/auth.service';
import useApi from '@/hooks/useApi';

const VerifyCode = () => {
  const navigate = useNavigate();
  const verifyCodeApi = useApi(authService.verifyResetCode);
  const resendCodeApi = useApi(authService.forgotPassword);
  
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Ambil email dari session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Jika tidak ada email tersimpan, kembali ke halaman lupa password
      navigate('/lupa-password');
    }
  }, [navigate]);

  // Countdown timer untuk fitur resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validasi kode
    if (!verificationCode) {
      setErrors({ code: 'Kode verifikasi diperlukan' });
      return;
    }

    // Panggil API verifikasi kode
    const result = await verifyCodeApi.execute(email, verificationCode);
    
    if (result.success) {
      // Simpan token reset jika ada
      if (result.data?.reset_token) {
        sessionStorage.setItem('resetToken', result.data.reset_token);
      }
      
      // Arahkan ke halaman reset password
      navigate('/reset-password');
    } else {
      setErrors({ general: result.error || 'Kode verifikasi tidak valid' });
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    setResendDisabled(true);
    setCountdown(60); // Countdown 60 detik
    
    try {
      const result = await resendCodeApi.execute(email);
      
      if (!result.success) {
        setErrors({ general: result.error || 'Gagal mengirim ulang kode' });
      }
    } catch (error) {
      setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <Link to="/lupa-password" className="text-primary hover:text-primary-dark">
          <FiArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h1 className="text-2xl font-bold text-primary mb-2">Verifikasi Kode</h1>
            <p className="text-gray-600 mb-6">
              Kami telah mengirimkan kode ke email <span className="font-semibold">{email}</span>. 
              Masukkan kode tersebut untuk melanjutkan proses reset password.
            </p>

            {(errors.general || verifyCodeApi.error) && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                {errors.general || verifyCodeApi.error}
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
                  placeholder="Masukkan kode verifikasi"
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
                loading={verifyCodeApi.loading}
                disabled={verifyCodeApi.loading}
              >
                Verifikasi Kode
              </Button>

              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={handleResendCode}
                  disabled={resendDisabled || resendCodeApi.loading}
                  className={`text-sm ${resendDisabled ? 'text-gray-400' : 'text-primary hover:text-primary-dark'} font-medium`}
                >
                  {resendDisabled 
                    ? `Kirim Ulang Kode (${countdown}s)` 
                    : resendCodeApi.loading
                      ? 'Mengirim...'
                      : 'Kirim Ulang Kode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;