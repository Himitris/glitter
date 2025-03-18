import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import PageTransition from './components/layout/PageTransition';
import ScrollIndicator from './components/ui/ScrollIndicator';
import BackToTop from './components/ui/BackToTop';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Artists from './pages/Artists';
import DJs from './pages/DJS';
import Services from './pages/Services';
import Contact from './pages/Contact';

// AnimatedRoutes component pour permettre les transitions de page
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/artists" element={<PageTransition><Artists /></PageTransition>} />
        <Route path="/djs" element={<PageTransition><DJs /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white text-gray-800">
            <ScrollIndicator />
            <Header />
            {/* Ajustement de l'espace pour le contenu principal en fonction de la hauteur de la navbar */}
            <main className="pt-12 md:pt-16">
              <AnimatedRoutes />
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;