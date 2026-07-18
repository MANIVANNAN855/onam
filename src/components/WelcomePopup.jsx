import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDynamicFont } from '../contexts/FontContext';
import '../index.css';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 39, hours: 19, minutes: 34, seconds: 41 });
  const { t } = useLanguage();
  const { currentFont } = useDynamicFont();

  useEffect(() => {
    // Always open popup for now
    setIsOpen(true);

    // Set target date for OnamFest (e.g. Aug 28, 2026)
    const targetDate = new Date('2026-08-28T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={() => setIsOpen(false)}>
      <div className="countdown-card" onClick={(e) => e.stopPropagation()}>
        <button className="countdown-close" onClick={() => setIsOpen(false)}>×</button>
        
        <div className="countdown-logo-container">
          <div className="countdown-logo">🎉</div>
        </div>

        <h2 style={{ fontFamily: currentFont }}>{t('popup_title')}</h2>
        
        <div className="countdown-badges">
          <span className="badge badge-red">{t('popup_reg_open')}</span>
          <span className="badge badge-outline">{t('popup_entry_free')}</span>
        </div>

        <p className="countdown-subtitle">{t('popup_begins_in')}</p>

        <div className="countdown-timer">
          <div className="countdown-box">
            <span className="countdown-number">{timeLeft.days}</span>
            <span className="countdown-label">{t('popup_days')}</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-number">{timeLeft.hours}</span>
            <span className="countdown-label">{t('popup_hours')}</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-number">{timeLeft.minutes}</span>
            <span className="countdown-label">{t('popup_minutes')}</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-number">{timeLeft.seconds}</span>
            <span className="countdown-label">{t('popup_seconds')}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomePopup;
