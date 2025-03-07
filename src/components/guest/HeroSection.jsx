import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-accent to-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
          Laporkan Pelanggaran dengan Aman dan Terpercaya
        </h1>
        
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Sistem pelaporan digital yang menjamin kerahasiaan identitas Anda
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            as={Link}
            to="/login"
            variant="outline-primary"
            className="px-6 py-2.5 text-base border font-medium"
          >
            Pelajari Lebih Lanjut
          </Button>
          
          <Button
            as={Link}
            to="/register"
            variant="primary"
            className="px-6 py-2.5 text-base font-medium shadow-md hover:shadow-lg"
          >
            Buat Laporan
          </Button>
        </div>
      </div>
    </section>
  );
}