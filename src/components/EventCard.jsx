import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const EventCard = ({ event }) => {
  const { t } = useLanguage();
  return (
    <div className="event-card">
      <div 
        className="event-card-image" 
        style={{ 
          backgroundColor: event.color,
          ...(event.image && { 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${event.image}')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          })
        }}
      >
        <h2>{event.title}</h2>
      </div>
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p className="event-date">Date: {event.date}</p>
        <p className="event-desc">{event.description}</p>
        <Link to={`/register?event=${encodeURIComponent(event.id || event.title)}`} className="btn-secondary">
          {t('register_for')} {event.title}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
