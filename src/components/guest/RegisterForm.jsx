import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.fullName) newErrors.fullName = 'Nama lengkap diperlukan';
    if (!formData.email) newErrors.email = 'Email diperlukan';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    
    if (!formData.password) newErrors.password = 'Password diperlukan';
    else if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password diperlukan';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Anda harus menyetujui syarat dan ketentuan';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Reset errors if validation passes
    setErrors({});
    setLoading(true);
    
    try {
      // Here you would integrate with your registration service
      console.log('Registration attempt with:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate programmatically after successful registration
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Gagal mendaftar. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <Logo variant="icon" size="md" className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Daftar Akun Baru</h1>
        <p className="text-gray-600 text-center mt-2">
          Bergabung dengan WBS untuk melaporkan pelanggaran dengan aman
        </p>
      </div>
      
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <Input 
            id="fullName" 
            name="fullName"
            type="text" 
            value={formData.fullName} 
            onChange={handleChange} 
            placeholder="Khalied Rahman" 
            leftIcon={<FiUser className="text-gray-500" />}
            error={errors.fullName}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="namo@mail.com" 
            leftIcon={<FiMail className="text-gray-500" />}
            error={errors.email}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
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
            Konfirmasi Password
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
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
              Saya menyetujui <a href="#" className="text-primary hover:text-primary-dark">Syarat dan Ketentuan</a>
            </label>
            {errors.agreeToTerms && (
              <p className="text-danger text-xs mt-1">{errors.agreeToTerms}</p>
            )}
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          block={true}
          loading={loading}
          disabled={loading}
          className="mt-6"
        >
          Daftar
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;