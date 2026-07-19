import { useNavigate } from 'react-router-dom';
import EventList from '../components/EventList';
import BackgroundSlideshow from '../components/BackgroundSlideshow';
import { useLanguage } from '../contexts/LanguageContext';
import { useDynamicFont } from '../contexts/FontContext';
import pookolamImg from '../assets/pookolam.png';
import duoDanceImg from '../assets/duo_dance_real.jpg';
import fashionParadeImg from '../assets/fashion_parade.png';
import tugOfWarImg from '../assets/tug_of_war.png';

const EVENTS_DATA = [
  {
    id: 'Pookolam',
    titleKey: 'feature_pookolam_title',
    date: 'Sept 5, 2026',
    descKey: 'feature_pookolam_desc',
    color: '#F59E0B',
    image: '/pookolam.jpg',
    bgPosition: 'center'
  },
  {
    id: 'Duo Dance',
    titleKey: 'feature_dance_title',
    date: 'Sept 6, 2026',
    descKey: 'feature_dance_desc',
    color: '#8B5CF6',
    image: duoDanceImg,
    bgPosition: 'top'
  },
  {
    id: 'Fashion Parade',
    titleKey: 'feature_fashion_title',
    date: 'Sept 7, 2026',
    descKey: 'feature_fashion_desc',
    color: '#F43F5E',
    image: fashionParadeImg,
    bgPosition: 'top'
  },
  {
    id: 'Tug Of War',
    titleKey: 'feature_tug_title',
    date: 'Sept 8, 2026',
    descKey: 'feature_tug_desc',
    color: '#EF4444',
    image: '/tug_of_war_generated.png',
    bgPosition: 'center'
  }
];

const Events = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentFont } = useDynamicFont();

  // Transform data dynamically based on language
  const translatedEvents = EVENTS_DATA.map(event => ({
    ...event,
    title: t(event.titleKey),
    description: t(event.descKey)
  }));

  return (
    <>
      <BackgroundSlideshow />
      <div className="events-container">
        <header className="events-header">
          <button className="btn-back" onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
            {t('back_btn')}
          </button>
          <div className="title-badge">
            <h1 
              className="title-animate"
              style={{ 
                fontFamily: currentFont, 
                marginBottom: 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              {t('fest_events_title')}
            </h1>
          </div>
          <p className="subtitle">{t('fest_events_desc')}</p>
        </header>

        <EventList events={translatedEvents} />
      </div>
    </>
  );
};

export default Events;
