import { useState, useEffect } from 'react';

const slides = [
  { img: '/aa.jpg', filter: 'none', position: 'center 10%' }, // Kathakali boat
  { img: '/bb.jpg', filter: 'none', position: 'center center' }, // Boat race
  { img: '/cc.avif', filter: 'none', position: 'center 25%' },   // Yellow beard
  { img: '/dd.jpg', filter: 'none', position: 'center top' }, // Mahabali
  { img: '/ee.png', filter: 'none', position: 'center 15%', mobilePosition: 'center center' },    // Pookolam women
  { img: '/ff.jpg', filter: 'none', position: 'center center', mobilePosition: 'center center' } // New image
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
