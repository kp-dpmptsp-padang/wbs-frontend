import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '@/assets/images/logo.png';

const Logo = ({ className = '', isClickable = true }) => {
  // Base component
const LogoContent = () => (
    <div className={`flex items-center gap-3 ${className}`}>
        {/* Logo Image */}
        <img 
            src={logo} 
            alt="CLEAR Logo" 
            className="w-10 h-10"
        />
        
        {/* Logo Text */}
        <span className="text-[#1A237E] text-2xl font-bold tracking-wide">
            CLEAR
        </span>
    </div>
);

  // Return clickable or non-clickable version
  return isClickable ? (
    <Link 
      to="/" 
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A237E]/50 rounded-lg"
      aria-label="CLEAR - Whistleblowing System"
    >
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  isClickable: PropTypes.bool,
};

export default Logo;