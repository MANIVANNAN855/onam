import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { FontProvider } from './contexts/FontContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WelcomePopup from './components/WelcomePopup';
import MarqueeBanner from './components/MarqueeBanner';
import Home from './pages/Home';
import Events from './pages/Events';
import Registration from './pages/Registration';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <FontProvider>
        <Router>
          <div className="app-container">
            <MarqueeBanner />
            <Navbar />
            <WelcomePopup />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/register" element={<Registration />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FontProvider>
    </LanguageProvider>
  );
}

export default App;
