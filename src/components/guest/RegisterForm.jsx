// src/components/guest/RegisterForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import authService from '@/services/auth.service';
import useApi from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const registerApi = useApi(authService.register);
  
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    // Prepare data for API
    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    };
    
    console.log('Submitting registration form with:', userData);
    
    // Call registration API
    const result = await registerApi.execute(userData);
    
      if (result.success) {
        console.log('Registration successful:', result.data);
        
        // Tambahkan log untuk memeriksa user data
        console.log('User data to be set:', result.data.user);
        
        // Update auth context with user data
        if (result.data.user) {
          setUser(result.data.user);
          console.log('User state set in context');
        }
        
        console.log('About to navigate to dashboard');
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
        console.log('Navigation function called');
        
      } else {
      console.error('Registration failed:', result.error);
      
      // Handle API validation errors
      if (result.error.includes('Email')) {
        setErrors(prev => ({ ...prev, email: result.error }));
      } else {
        setErrors(prev => ({ ...prev, general: result.error }));
      }
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
      
      {/* Display general error if any */}
      {(errors.general || registerApi.error) && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {errors.general || registerApi.error}
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
                className="text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
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
          loading={registerApi.loading}
          disabled={registerApi.loading}
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