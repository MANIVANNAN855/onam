import { useState, useEffect } from 'react';

const slides = [
  { img: '/slide_1.png', filter: 'none', position: 'center 10%' }, // Kathakali boat
  { img: '/slide_2.png', filter: 'none', position: 'center center' }, // Boat race
  { img: '/slide_3.png', filter: 'none', position: 'center 25%' },   // Theyyam
  { img: '/slide_4.png', filter: 'none', position: 'center top' }, // Mahabali
  { img: '/slide_5.png', filter: 'none', position: 'center 15%', mobilePosition: 'center center' },    // Pookolam women
  { img: '/slide_6.png', filter: 'none', position: 'center center', mobilePosition: 'center center' } // Onasadya
];

const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`bg-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ 
            backgroundImage: `url(${slide.img})`,
            '--bg-pos-desktop': slide.position || 'center center',
            '--bg-pos-mobile': 'center center',
            filter: slide.filter 
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundSlideshow;
