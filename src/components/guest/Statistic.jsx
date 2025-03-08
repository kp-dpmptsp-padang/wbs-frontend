import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';

export default function Statistic() {
  // Sample data - bisa diganti dengan data dinamis dari API
  const stats = [
    {
      value: 57000,
      label: "Jumlah Pengguna",
      prefix: "",
      suffix: "+",
      description: "Pengguna aktif"
    },
    {
      value: 28,
      label: "Laporan yang Ditangani",
      prefix: "",
      suffix: "",
      description: "Bulan ini"
    },
    {
      value: 72,
      label: "Tingkat Penyelesaian Kasus",
      prefix: "",
      suffix: "%",
      description: "Tingkat keberhasilan"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary-dark sm:text-4xl">
            Statistik
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Capaian kami dalam menegakkan integritas dan transparansi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

const StatCard = ({ stat }) => {
  const [count, setCount] = useState(0);
  
  // Animasi penghitung
  useEffect(() => {
    const duration = 2000; // durasi animasi dalam ms
    const steps = 60; // jumlah langkah animasi
    const stepValue = stat.value / steps;
    const stepTime = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current > stat.value) {
        current = stat.value;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [stat.value]);
  
  // Format angka dengan pemisah ribuan
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Konten untuk StatCard
  const cardContent = (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl sm:text-5xl font-bold text-primary mb-4">
        {stat.prefix}{formatNumber(count)}{stat.suffix}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {stat.label}
      </h3>
      <p className="text-gray-500">{stat.description}</p>
      
      {/* Indicator line */}
      <div className="mt-6 w-16 h-1 bg-primary rounded-full"></div>
    </div>
  );

  return (
    <Card 
      variant="outline"
      className="transform transition-all duration-500 hover:shadow-lg"
      bodyClassName="p-8"
    >
      {cardContent}
    </Card>
  );
};