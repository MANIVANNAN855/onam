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
        <header className="hero hero-redesign">
          <div className="hero-content-left">
            <div className="hero-glass-box">

              <h1 
                className="hero-title"
                style={{ fontFamily: currentFont }}
              >
                {t('welcome_title')}
              </h1>
              <p className="hero-subtitle">{t('welcome_subtitle')}</p>
            </div>
            <div className="hero-actions">
              <Link to="/events" className="btn-primary-red">Register Now &rarr;</Link>
              <Link to="/events" className="btn-outline">View Events</Link>
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
