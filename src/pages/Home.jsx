import { Link } from 'react-router-dom';
import BackgroundSlideshow from '../components/BackgroundSlideshow';
import { useLanguage } from '../contexts/LanguageContext';
import { useDynamicFont } from '../contexts/FontContext';

const Home = () => {
  const { t } = useLanguage();
  const { currentFont } = useDynamicFont();

  return (
    <>
      <BackgroundSlideshow />
      <div className="home-container">
        <header className="hero">
          <div className="hero-content">
            <div className="title-badge">
              <h1 
                className="title-animate" 
                style={{ 
                  fontFamily: currentFont, 
                  marginBottom: 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              >
                {t('welcome_title')}
              </h1>
            </div>
            <p className="subtitle">{t('welcome_subtitle')}</p>
            <div className="hero-actions">
              <Link to="/events" className="btn-primary">{t('explore_events')}</Link>
              <Link to="/events" className="btn-secondary">{t('register_now')}</Link>
            </div>
          </div>
        </header>

        <section className="highlights">
          <h2>{t('festival_highlights')}</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>{t('feature_pookolam_title')}</h3>
              <p>{t('feature_pookolam_desc')}</p>
            </div>
            <div className="feature">
              <h3>{t('feature_tug_title')}</h3>
              <p>{t('feature_tug_desc')}</p>
            </div>
            <div className="feature">
              <h3>{t('feature_dance_title')}</h3>
              <p>{t('feature_dance_desc')}</p>
            </div>
            <div className="feature">
              <h3>{t('feature_fashion_title')}</h3>
              <p>{t('feature_fashion_desc')}</p>
            </div>
            <div className="feature">
              <h3>{t('feature_fun_title')}</h3>
              <p>{t('feature_fun_desc')}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
