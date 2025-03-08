import React from 'react';
import FeatureCard from './FeatureCard';
import { Shield, Search, MessageSquare, ClipboardCheck } from 'lucide-react';

export default function MainFeature() {
  // Data fitur-fitur utama
  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Kerahasiaan Identitas",
      description: "Jaminan Privasi Absolut untuk Keamanan Anda"
    },
    {
      icon: <Search className="h-12 w-12" />,
      title: "Pelacakan Laporan",
      description: "Pantau Status Laporan Anda Secara Langsung"
    },
    {
      icon: <MessageSquare className="h-12 w-12" />,
      title: "Komunikasi Dua Arah",
      description: "Dialog Aman dengan Tim Penangan"
    },
    {
      icon: <ClipboardCheck className="h-12 w-12" />,
      title: "Proses Terstruktur",
      description: "Proses Verifikasi Secara Profesional dan Terstandar"
    }
  ];

  return (
    <section className="py-20 bg-white" id="fitur-utama">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary-dark sm:text-4xl">
            Fitur Utama
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Dilengkapi dengan berbagai fitur yang dirancang untuk memastikan keamanan dan kemudahan proses pelaporan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              bgColor="bg-primary-dark"
              textColor="text-white"
              className="px-8 py-12 h-full" // Menambahkan padding dan height untuk card yang lebih besar
            />
          ))}
        </div>
      </div>
    </section>
  );
}