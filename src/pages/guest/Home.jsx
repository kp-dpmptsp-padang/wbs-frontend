import { Link } from 'react-router-dom';
import { Shield, Clock, MessageSquare, CheckSquare } from 'lucide-react';

export default function Home() {
  console.log("Home component rendered");
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Laporkan Pelanggaran dengan Aman dan Terpercaya
          </h1>
          <p className="text-gray-600 mb-8">
            Sistem pelaporan digital yang menjamin kerahasiaan identitas Anda
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
            >
              Buat Laporan
            </Link>
            <Link 
              to="/login" 
              className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-900 text-white p-6 rounded-xl">
              <Shield className="h-8 w-8 mb-4" />
              <h3 className="font-semibold mb-2">Kerahasiaan Identitas</h3>
              <p className="text-sm">Jaminan Privasi Absolut untuk Keamanan Anda</p>
            </div>
            {/* Tambahkan 3 fitur lainnya dengan pattern yang sama */}
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Statistik</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-4xl font-bold text-blue-900">57,000</p>
              <p className="text-gray-600">Jumlah Pengguna</p>
            </div>
            {/* Tambahkan 2 statistik lainnya */}
          </div>
        </div>
      </section>

      {/* WBS Mobile */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">WBS Mobile</h2>
          <p className="text-center text-gray-600 mb-12">
            Pengaduan Cepat, Tepat & Aman di Genggaman Anda
          </p>
          {/* Tambahkan ilustrasi mobile app */}
        </div>
      </section>
    </div>
  );
}