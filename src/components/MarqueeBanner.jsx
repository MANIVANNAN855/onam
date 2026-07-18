import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../index.css';

const MarqueeBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* We repeat the content multiple times to ensure a smooth infinite scroll loop */}
        <span>
          <span className="marquee-icon">🎉</span> {t('marquee_text')} 
          <span className="marquee-icon" style={{ marginLeft: '1rem' }}>⏰</span> {t('marquee_date')} 
          <Link to="/register" className="marquee-btn">{t('marquee_btn')}</Link>
        </span>
        <span>
          <span className="marquee-icon">🎉</span> {t('marquee_text')} 
          <span className="marquee-icon" style={{ marginLeft: '1rem' }}>⏰</span> {t('marquee_date')} 
          <Link to="/register" className="marquee-btn">{t('marquee_btn')}</Link>
        </span>
        <span>
          <span className="marquee-icon">🎉</span> {t('marquee_text')} 
          <span className="marquee-icon" style={{ marginLeft: '1rem' }}>⏰</span> {t('marquee_date')} 
          <Link to="/register" className="marquee-btn">{t('marquee_btn')}</Link>
        </span>
      </div>
    </div>
  );
};

export default MarqueeBanner;
