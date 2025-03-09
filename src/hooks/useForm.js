// src/hooks/useForm.js
import { useState, useCallback } from 'react';
import { validateForm } from '@/utils/validators';

/**
 * Custom hook untuk pengelolaan form
 * @param {Object} initialValues - Nilai awal form
 * @param {Object} validationRules - Aturan validasi form
 * @param {Function} onSubmit - Fungsi yang dijalankan saat form valid dan di-submit
 * @returns {Object} - Object yang berisi state dan method form
 */
const useForm = (initialValues = {}, validationRules = {}, onSubmit = () => {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler untuk perubahan input
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Khusus untuk input type checkbox
    const inputValue = type === 'checkbox' ? checked : value;
    
    setValues((prev) => ({
      ...prev,
      [name]: inputValue
    }));
    
    // Tandai field sebagai "tersentuh"
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    
    // Validasi field jika ada aturan validasi
    if (validationRules[name]) {
      const { isValid, errors: fieldErrors } = validateForm(
        { [name]: inputValue },
        { [name]: validationRules[name] }
      );
      
      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? '' : fieldErrors[name]
      }));
    }
  }, [validationRules]);

  // Handler untuk blur input (ketika user meninggalkan field)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    // Tandai field sebagai "tersentuh"
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    
    // Validasi field jika ada aturan validasi
    if (validationRules[name]) {
      const { isValid, errors: fieldErrors } = validateForm(
        { [name]: values[name] },
        { [name]: validationRules[name] }
      );
      
      setErrors((prev) => ({
        ...prev,
        [name]: isValid ? '' : fieldErrors[name]
      }));
    }
  }, [validationRules, values]);

  // Handler untuk submit form
  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    // Tandai semua field sebagai "tersentuh"
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // Validasi seluruh form
    const { isValid, errors: formErrors } = validateForm(values, validationRules);
    
    setErrors(formErrors);
    
    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validationRules, onSubmit]);

  // Reset form ke nilai awal
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set nilai form
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Set error form
  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Periksa apakah form valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues
  };
};

export default useForm;