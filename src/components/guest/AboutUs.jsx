import React from 'react';
import { ShieldCheckIcon, UserGroupIcon, DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const AboutUs = () => {
  const values = [
    {
      id: 1,
      icon: <ShieldCheckIcon className="h-12 w-12 text-primary" />,
      title: 'Kerahasiaan & Keamanan',
      description: 'Menjaga kerahasiaan identitas pelapor dan informasi yang dilaporkan dengan sistem enkripsi tingkat tinggi.',
    },
    {
      id: 2,
      icon: <UserGroupIcon className="h-12 w-12 text-primary" />,
      title: 'Profesionalisme',
      description: 'Tim yang berpengalaman dalam menangani laporan pelanggaran dengan prosedur standar internasional.',
    },
    {
      id: 3,
      icon: <DocumentTextIcon className="h-12 w-12 text-primary" />,
      title: 'Transparansi',
      description: 'Proses yang transparan dalam penanganan laporan dengan tetap menjaga kerahasiaan yang diperlukan.',
    },
    {
      id: 4,
      icon: <LightBulbIcon className="h-12 w-12 text-primary" />,
      title: 'Inovasi',
      description: 'Terus berinovasi dalam pengembangan sistem pelaporan yang aman, efisien, dan mudah digunakan.',
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Whistle Blowing System (WBS) adalah platform pelaporan digital yang memungkinkan pengguna untuk melaporkan 
          tindakan pelanggaran seperti suap dan tindakan serupa. Sistem ini dirancang dengan mempertimbangkan privasi 
          pelapor dan pengelolaan yang terstruktur dalam pemrosesan laporan.
        </p>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Nilai-Nilai Kami</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div 
              key={value.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              {value.icon}
              <h4 className="text-xl font-semibold mt-4 mb-2">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Tim Kami</h3>
        <div className="p-6 md:p-10 rounded-lg">
          <p className="text-lg text-gray-700 mb-6">
            Tim WBS terdiri dari para profesional yang berpengalaman dalam bidang kepatuhan, investigasi, dan teknologi.
            Kami berkomitmen untuk menciptakan lingkungan yang bebas dari korupsi dan pelanggaran etika melalui sistem 
            pelaporan yang aman dan efektif.
          </p>
          <p className="text-lg text-gray-700">
            Dipimpin oleh manajemen yang berpengalaman dalam tata kelola perusahaan yang baik (Good Corporate Governance),
            tim kami bekerja dengan integritas tinggi untuk memastikan setiap laporan ditangani dengan profesional dan
            menghasilkan tindak lanjut yang nyata.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;