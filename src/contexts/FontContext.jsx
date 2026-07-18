import { createContext, useState, useEffect, useContext } from 'react';

const FontContext = createContext();

export const FONTS = [
  'Algerian', 
  'Times New Roman', 
  'Bell MT', 
  'Candara', 
  'Footlight MT Light'
];

export const FontProvider = ({ children }) => {
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % FONTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentFont = FONTS[fontIndex];

  return (
    <FontContext.Provider value={{ currentFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useDynamicFont = () => useContext(FontContext);
