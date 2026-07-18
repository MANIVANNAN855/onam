import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDynamicFont } from '../contexts/FontContext';

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { currentFont } = useDynamicFont();

  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link 
          to="/"
          style={{ 
            fontFamily: currentFont,
            transition: 'font-family 0.5s ease-in-out'
          }}
        >
          OnamFest '26
        </Link>
      </div>
      <div className="navbar-pill">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active-pill' : ''}>{t('nav_home')}</NavLink>
        <NavLink to="/events" className={({isActive}) => isActive ? 'active-pill' : ''}>{t('nav_events')}</NavLink>
      </div>
      <div className="navbar-right-pill">
        <span className="navbar-reg-status">
          <strong>24 AUG</strong> <small>REG CLOSES</small>
        </span>
        <button onClick={toggleLanguage} className="lang-btn">
          <span style={{ fontSize: '1.1rem' }}>🌐</span> 
          {language === 'en' ? 'മ' : 'En'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
