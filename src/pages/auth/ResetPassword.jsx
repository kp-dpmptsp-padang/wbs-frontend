// src/pages/auth/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import authService from '@/services/auth.service';
import useApi from '@/hooks/useApi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetPasswordApi = useApi(authService.resetPassword);

  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [tokenError, setTokenError] = useState(false);

  // Ekstrak token dari URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setTokenError(true);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.password) newErrors.password = 'Password baru diperlukan';
    else if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password diperlukan';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Prepare data for API
    const resetData = {
      token: token,
      new_password: formData.password,
      new_password_confirmation: formData.confirmPassword
    };
    
    // Call API
    const result = await resetPasswordApi.execute(resetData);
    
    if (result.success) {
      // Redirect to login with success message
      navigate('/login', { 
        state: { 
          resetSuccess: true,
          message: 'Password Anda berhasil diubah. Silakan login dengan password baru Anda.'
        },
        replace: true
      });
    } else {
      setErrors({ general: result.error });
    }
  };

  // Tampilkan pesan error jika tidak ada token
  if (tokenError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h2 className="mt-3 text-lg font-medium text-gray-900">Link Reset Password Tidak Valid</h2>
              <p className="mt-2 text-sm text-gray-500">
                Link reset password tidak valid atau sudah kadaluarsa. Silakan meminta link reset password baru.
              </p>
              <div className="mt-5">
                <Link 
                  to="/lupa-password" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Kembali ke Halaman Lupa Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-primary mb-2">Atur Password Baru</h1>
            <p className="text-gray-600 mb-6">
              Buat password baru yang kuat dan jangan lupa disimpan dengan aman.
            </p>

            {(errors.general || resetPasswordApi.error) && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                {errors.general || resetPasswordApi.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
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
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
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
                loading={resetPasswordApi.loading}
                disabled={resetPasswordApi.loading}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Logo */}
        <div className="mt-auto py-8 flex justify-center space-x-6">
          <Logo variant="full" size="lg" isClickable={false} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;