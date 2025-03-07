import { Shield } from 'lucide-react';

export default function MainFeature() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-900 text-white p-6 rounded-xl">
            <Shield className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Kerahasiaan Identitas</h3>
            <p className="text-sm">Jaminan Privasi Absolut untuk Keamanan Anda</p>
          </div>
          <div className="bg-blue-900 text-white p-6 rounded-xl">
            <Shield className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Kerahasiaan Identitas</h3>
            <p className="text-sm">Jaminan Privasi Absolut untuk Keamanan Anda</p>
          </div>
          <div className="bg-blue-900 text-white p-6 rounded-xl">
            <Shield className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Kerahasiaan Identitas</h3>
            <p className="text-sm">Jaminan Privasi Absolut untuk Keamanan Anda</p>
          </div>
          <div className="bg-blue-900 text-white p-6 rounded-xl">
            <Shield className="h-8 w-8 mb-4" />
            <h3 className="font-semibold mb-2">Kerahasiaan Identitas</h3>
            <p className="text-sm">Jaminan Privasi Absolut untuk Keamanan Anda</p>
          </div>
          {/* Tambahkan 3 fitur lainnya dengan pattern yang sama */}
        </div>
      </div>
    </section>
  );
}