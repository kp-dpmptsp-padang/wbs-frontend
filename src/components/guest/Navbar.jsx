import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="WBS Logo" className="h-8 w-8" />
          <span className="font-semibold">Whistle Blowing System</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-900">Beranda</Link>
          <Link to="/tentang" className="hover:text-blue-900">Tentang</Link>
          <Link to="/bantuan" className="hover:text-blue-900">Bantuan</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hover:text-blue-900">Login</Link>
          <Link 
            to="/register" 
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;