// src/components/guest/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/contexts/AuthContext'; // Tetap menggunakan import dari contexts/AuthContext
import { useToast } from '@/contexts/ToastContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import useApi from '@/hooks/useApi';  // Tambahkan import useApi
import authService from '@/services/auth.service'; // Tambahkan import authService

const LoginForm = () => {
  // State untuk form fields (tetap sama)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Get auth context, navigation and location (tetap sama)
  const { login, setUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Tambahkan useApi hook untuk login
  const loginApi = useApi(authService.login);
  
  // Redirect to intended route or dashboard after login (tetap sama)
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Handle input change for email (tetap sama)
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };
  
  // Handle input change for password (tetap sama)
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };
  
  // Toggle password visibility (tetap sama)
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  // Form validation (tetap sama)
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email diperlukan';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!password) {
      newErrors.password = 'Password diperlukan';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  
  // Handle form submission - Ubah untuk menggunakan useApi
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      // console.log('Submitting login form with:', { email, password });
      
      // Panggil login API menggunakan useApi hook
      const result = await loginApi.execute(email, password);
      console.log('Login result:', result);
      
      if (result.success) {
        setUser(result.data.user); // Gunakan setUser yang di-destructure
        navigate(from, { replace: true });
      } else if (!result.success) {
        console.error('Login failed:', result.error);
        // Show error message
        addToast(result.error || 'Login gagal. Silakan coba lagi.', 'error', 0); // 0 = tetap tampil
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Terjadi kesalahan saat login. Silakan coba lagi nanti.' });
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <Logo variant="full" size="lg" className="mx-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Masuk ke Akun Anda
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Platform pelaporan digital yang menjamin kerahasiaan identitas.
        </p>
      </div>

      {/* Error message - Diubah untuk menampilkan error dari loginApi juga */}
      {(errors.general || loginApi.error) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {errors.general || loginApi.error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
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
              required
              placeholder="Masukkan email Anda"
              value={email}
              onChange={handleEmailChange}
              error={errors.email}
              leftIcon={<FiMail className="text-gray-500" />}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Masukkan password Anda"
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
              leftIcon={<FiLock className="text-gray-500" />}
              rightIcon={
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary-light border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Ingat saya
            </label>
          </div>

          <Link
            to="/lupa-password"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            Lupa password?
          </Link>
        </div>

        <div>
          {/* Tambahkan loading state dari loginApi */}
          <Button
            type="submit"
            variant="primary"
            block={true}
            loading={loginApi.loading}
            disabled={loginApi.loading}
          >
            Masuk
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Belum memiliki akun?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;