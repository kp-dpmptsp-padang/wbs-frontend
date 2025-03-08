import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Logo from '@/components/common/Logo';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Simple validation
    let newErrors = {};
    if (!email) newErrors.email = 'Email diperlukan';
    if (!password) newErrors.password = 'Password diperlukan';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
      // Here you would integrate with your authentication service
      console.log('Login attempt with:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate programmatically after successful login
      // For now just log success
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ general: 'Email atau password tidak valid' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <Logo variant="icon" size="md" className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Masuk ke Akun Anda</h1>
        <p className="text-gray-600 text-center mt-2">
          Masuk untuk melaporkan atau memantau status laporan Anda
        </p>
      </div>
      
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
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="namo@company.com" 
            leftIcon={<FiMail className="text-gray-500" />}
            error={errors.email}
            required
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="/lupa-password" className="text-sm text-primary hover:text-primary-dark">
              Lupa password?
            </Link>
          </div>
          <Input 
            id="password" 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
        
        <Button
          type="submit"
          variant="primary"
          block={true}
          loading={loading}
          disabled={loading}
          className="mt-4"
        >
          Masuk
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Belum memiliki akun? {' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;