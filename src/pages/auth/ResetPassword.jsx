import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: 'email.com', // Bisa diambil dari parameter URL atau state
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.password) newErrors.password = 'Password diperlukan';
    else if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password diperlukan';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Reset errors jika validasi berhasil
    setErrors({});
    setLoading(true);
    
    try {
      // Implementasi request ke API akan ditambahkan di sini
      console.log('Resetting password for:', formData);
      
      // Simulasi delay API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect ke halaman login setelah berhasil
      navigate('/login', { state: { resetSuccess: true } });
    } catch (error) {
      console.error('Password reset failed:', error);
      setErrors({ general: 'Gagal mengatur password baru. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <Link to="/verify-code" className="text-primary hover:text-primary-dark">
          <FiArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h1 className="text-2xl font-bold text-primary mb-2">Atur Password Baru</h1>
            <p className="text-gray-600 mb-6">
              Buat password baru yang kuat dan jangan lupa disimpan/dicatat.
            </p>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled={true}
                  readOnly={true}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password Baru
                </label>
                <Input 
                  id="password" 
                  name="password"
                  type={showPassword ? 'text' : 'password'} 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                  leftIcon={<FiLock className="text-gray-500" />}
                  rightIcon={
                    <button 
                      type="button" 
                      onClick={togglePasswordVisibility} 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? 
                        <FiEyeOff className="h-5 w-5" /> : 
                        <FiEye className="h-5 w-5" />
                      }
                    </button>
                  }
                  error={errors.password}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Password Baru
                </label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="••••••••" 
                  leftIcon={<FiLock className="text-gray-500" />}
                  rightIcon={
                    <button 
                      type="button" 
                      onClick={toggleConfirmPasswordVisibility} 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? 
                        <FiEyeOff className="h-5 w-5" /> : 
                        <FiEye className="h-5 w-5" />
                      }
                    </button>
                  }
                  error={errors.confirmPassword}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                block={true}
                loading={loading}
                disabled={loading}
              >
                Reset Password
              </Button>
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

export default ResetPassword;