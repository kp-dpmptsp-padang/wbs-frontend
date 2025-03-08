import React, { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const HelpCenter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nama diperlukan';
    if (!formData.email) newErrors.email = 'Email diperlukan';
    if (!formData.message) newErrors.message = 'Pesan diperlukan';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Reset errors jika validasi berhasil
    setErrors({});
    setLoading(true);
    
    try {
      // Simulasi pengiriman data
      console.log('Sending data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form setelah berhasil
      setFormData({ name: '', email: '', message: '' });
      console.log('Form submitted successfully');
      
      // Bisa ditambahkan notifikasi sukses di sini
    } catch (error) {
      console.error('Form submission failed:', error);
      setErrors({ general: 'Gagal mengirim pesan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pusat Bantuan</h2>
          <p className="text-lg text-gray-700">
            Silahkan Hubungi Kami Jika Perlu Bantuan
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold mb-6">Isi Form Ini</h3>
            
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    leftIcon={<FiUser className="text-gray-500" />}
                    error={errors.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contoh@email.com"
                    leftIcon={<FiMail className="text-gray-500" />}
                    error={errors.email}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan
                  </label>
                  {/* Jika Anda memiliki komponen TextArea, gunakan di sini */}
                  {/* Jika tidak, gunakan tag textarea biasa dengan styling serupa Input */}
                  {/* Asumsi Anda memiliki komponen TextArea */}
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Jelaskan masalah yang Anda hadapi"
                    leftIcon={<FiMessageSquare className="text-gray-500 mt-3" />}
                    error={errors.message}
                  />
                  
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    block
                    loading={loading}
                    disabled={loading}
                    icon={<PaperAirplaneIcon className="h-5 w-5" />}
                  >
                    Kirim
                  </Button>
                  
                  <p className="text-center text-gray-600 mt-4">
                    Tunggu Balasan Kami Melalui Email
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;