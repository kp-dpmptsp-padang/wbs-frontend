// src/components/guest/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/contexts/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Get auth context, navigation and location
  const { login, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect to intended route or dashboard after login
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Handle input change for email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };
  
  // Handle input change for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  // Form validation
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
  
  // Handle form submission
// src/components/guest/LoginForm.jsx - Update handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  try {
    console.log('Submitting login form with:', { email, password });
    const result = await login(email, password);
    console.log('Login result:', result);
    
    if (result.success) {
      console.log('Login successful, redirecting to dashboard');
      // Gunakan replace: true untuk mencegah kembali ke halaman login dengan tombol Back
      navigate('/dashboard', { replace: true });
    } else {
      console.error('Login failed:', result.error);
      // Show error message
      setErrors({ general: result.error || 'Login gagal. Silakan coba lagi.' });
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

      {/* Error message */}
      {(errors.general || authError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {errors.general || authError}
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
          <Button
            type="submit"
            variant="primary"
            block={true}
            loading={loading}
            disabled={loading}
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