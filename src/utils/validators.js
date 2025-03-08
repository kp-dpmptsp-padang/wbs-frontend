// src/utils/validators.js
export const isEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };
  
  export const validateForm = (data, rules) => {
    const errors = {};
    
    for (const field in rules) {
      const value = data[field];
      const fieldRules = rules[field];
      
      // Required validation
      if (fieldRules.required && (!value || value.trim() === '')) {
        errors[field] = fieldRules.requiredMessage || `${field} diperlukan`;
        continue;
      }
      
      // Skip other validations if field is empty and not required
      if (!value && !fieldRules.required) continue;
      
      // Email validation
      if (fieldRules.email && !isEmail(value)) {
        errors[field] = fieldRules.emailMessage || 'Format email tidak valid';
        continue;
      }
      
      // Min length validation
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = fieldRules.minLengthMessage || 
          `${field} minimal ${fieldRules.minLength} karakter`;
        continue;
      }
      
      // Max length validation
      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        errors[field] = fieldRules.maxLengthMessage || 
          `${field} maksimal ${fieldRules.maxLength} karakter`;
        continue;
      }
      
      // Password strength validation
      if (fieldRules.isStrongPassword && !isStrongPassword(value)) {
        errors[field] = fieldRules.isStrongPasswordMessage || 
          'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka';
        continue;
      }
      
      // Match validation (e.g., password confirmation)
      if (fieldRules.match && value !== data[fieldRules.match]) {
        errors[field] = fieldRules.matchMessage || 
          `${field} tidak cocok dengan ${fieldRules.match}`;
        continue;
      }
      
      // Custom validation
      if (fieldRules.custom && typeof fieldRules.custom === 'function') {
        const customError = fieldRules.custom(value, data);
        if (customError) {
          errors[field] = customError;
          continue;
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
};