import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo.jsx';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validasi email
    if (!email) {
      setErrors({ email: 'Email diperlukan' });
      return;
    }

    // Simulasi request ke API
    setLoading(true);
    try {
      // Implementasi request ke API akan ditambahkan di sini
      console.log('Sending reset request for:', email);
      
      // Simulasi delay API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set success state setelah berhasil
      setSuccess(true);
    } catch (error) {
      console.error('Request failed:', error);
      setErrors({ general: 'Gagal mengirim link reset password. Silakan coba lagi.' });
    } finally {
      setLoading(false);
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
            <h1 className="text-2xl font-bold text-primary mb-2">Cari Akun Anda</h1>
            <p className="text-gray-600 mb-6">Masukkan Email Anda</p>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
                Instruksi reset password telah dikirim ke email Anda. Silakan cek inbox Anda.
              </div>
            ) : (
              <>
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                      leftIcon={<FiMail className="text-gray-500" />}
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
                </form>
              </>
            )}
          </div>
        </div>

        {/* Footer Logos */}
        <div className="mt-auto py-8 flex justify-center space-x-6">
            <a href="https://dpmptsp.padang.go.id" target="_blank" rel="noreferrer">
                <img src="/src/assets/images/dpmptsp.png" alt="DPMPTSP Kota Padang" className="h-12" />
            </a>
            <Logo variant="full" size="lg" isClickable={false} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;