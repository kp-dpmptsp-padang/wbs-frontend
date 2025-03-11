// src/components/user/UpdatePasswordForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const UpdatePasswordForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current_password: false,
    new_password: false,
    new_password_confirmation: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.current_password) {
      newErrors.current_password = 'Password saat ini harus diisi';
    }
    
    if (!formData.new_password) {
      newErrors.new_password = 'Password baru harus diisi';
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = 'Password baru minimal 6 karakter';
    }
    
    if (!formData.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Konfirmasi password harus diisi';
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Konfirmasi password tidak sesuai';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Pastikan data sesuai dengan yang diharapkan API
    const passwordData = {
      current_password: formData.current_password,
      new_password: formData.new_password,
      new_password_confirmation: formData.new_password_confirmation
    };
    
    onSubmit(passwordData);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthMap = [
      { label: 'Sangat Lemah', color: 'bg-red-500' },
      { label: 'Lemah', color: 'bg-orange-500' },
      { label: 'Sedang', color: 'bg-yellow-500' },
      { label: 'Kuat', color: 'bg-blue-500' },
      { label: 'Sangat Kuat', color: 'bg-green-500' }
    ];
    
    return {
      strength: Math.max(0, Math.min(strength, 5)),
      label: strengthMap[strength - 1]?.label || '',
      color: strengthMap[strength - 1]?.color || ''
    };
  };

  const passwordStrength = getPasswordStrength(formData.new_password);

  return (
    <Card title="Update Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
            Password Saat Ini
          </label>
          <div className="relative">
            <Input
              id="current_password"
              name="current_password"
              type={showPassword.current_password ? 'text' : 'password'}
              value={formData.current_password}
              onChange={handleChange}
              error={errors.current_password}
              placeholder="Masukkan password saat ini"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility('current_password')}
            >
              {showPassword.current_password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
            Password Baru
          </label>
          <div className="relative">
            <Input
              id="new_password"
              name="new_password"
              type={showPassword.new_password ? 'text' : 'password'}
              value={formData.new_password}
              onChange={handleChange}
              error={errors.new_password}
              placeholder="Masukkan password baru"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility('new_password')}
            >
              {showPassword.new_password ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          
          {/* Password strength indicator */}
          {formData.new_password && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-gray-600">
                Kekuatan Password: {passwordStrength.label || 'Sangat Lemah'}
              </p>
            </div>
          )}
          
          <p className="mt-1 text-xs text-gray-500">
            Password minimal 6 karakter, disarankan kombinasi huruf dan angka
          </p>
        </div>
        
        <div>
          <label htmlFor="new_password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <Input
              id="new_password_confirmation"
              name="new_password_confirmation"
              type={showPassword.new_password_confirmation ? 'text' : 'password'}
              value={formData.new_password_confirmation}
              onChange={handleChange}
              error={errors.new_password_confirmation}
              placeholder="Masukkan konfirmasi password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => togglePasswordVisibility('new_password_confirmation')}
            >
              {showPassword.new_password_confirmation ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            icon={<FiSave />}
          >
            Update Password
          </Button>
        </div>
      </form>
    </Card>
  );
};

UpdatePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default UpdatePasswordForm;