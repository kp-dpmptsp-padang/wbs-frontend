import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="WBS Logo" className="h-16 w-16" />
              <span className="font-semibold">Whistle Blowing System</span>
            </div>
            <p className="text-sm text-gray-600">
              Platform pelaporan digital yang memungkinkan pengguna untuk melaporkan tindakan pelanggaran seperti suap dan tindakan serupa.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Link Cepat</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-blue-900">Beranda</Link>
              <Link to="/tentang" className="text-sm hover:text-blue-900">Tentang</Link>
              <Link to="/bantuan" className="text-sm hover:text-blue-900">Bantuan</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hubungi Kami Di</h3>
            <div className="flex flex-col gap-2 text-sm">
              <p>dpmptsp@padang.go.id</p>
              <p>0813-7407-8088</p>
              <p>Jalan Jenderal Sudirman No. 1, Padang</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-gray-600">
          <p>Hak Cipta © 2025 DPMPTSP Kota Padang</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;