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
      <ul className="navbar-links">
        <li><NavLink to="/" end>{t('nav_home')}</NavLink></li>
        <li><NavLink to="/events">{t('nav_events')}</NavLink></li>
        <li>
          <button 
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--text-light)',
              padding: '0.4rem 0.8rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              marginLeft: '1rem'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🌐</span> 
            {language === 'en' ? 'മ' : 'En'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
