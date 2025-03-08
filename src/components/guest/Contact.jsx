import React from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Button from '@/components/common/Button';

const Contact = () => {
  const contactInfo = [
    {
      id: 1,
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Alamat',
      content: 'Jalan Jenderal Sudirman No. 1, Kota Padang, Sumatera Barat',
    },
    {
      id: 2,
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: 'Surel',
      content: 'dpmptsp@padang.go.id',
    },
    {
      id: 3,
      icon: <PhoneIcon className="h-6 w-6" />,
      title: 'WhatsApp',
      content: '0813-7407-8088',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Kontak</h2>
        
        <div className="lg:flex gap-8">
          {/* Map placeholder */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="h-[400px] bg-gray-200 rounded-lg">
              {/* Placeholder for map or image */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1994.6363557506406!2d100.362793!3d-0.94756!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b9478dac36d3%3A0xc2d9755a20e8b0e1!2sDPMPTSP%20Kota%20Padang!5e0!3m2!1sid!2sid!4v1741412362337!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Contact info */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Hubungi Kami</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-primary/10 text-primary rounded-lg">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-lg">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="primary" 
                  block 
                  as="a" 
                  href="https://wa.me/6281374078088"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<PhoneIcon className="h-5 w-5" />}
                >
                  Hubungi via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;