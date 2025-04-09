import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import PageTransition from "./components/layout/PageTransition";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import BackToTop from "./components/ui/BackToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Artists from "./pages/Artists";
import DJs from "./pages/DJS";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Success from "./pages/Success"; // Importation de la page Success

// AnimatedRoutes component pour permettre les transitions de page
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/artists"
          element={
            <PageTransition>
              <Artists />
            </PageTransition>
          }
        />
        <Route
          path="/djs"
          element={
            <PageTransition>
              <DJs />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        {/* Nouvelle route pour la page de succès */}
        <Route
          path="/success"
          element={
            <PageTransition>
              <Success />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white text-gray-800">
              <ScrollIndicator />
              <Header />
              <main className="pt-12 ">
                <AnimatedRoutes />
              </main>
              <Footer />
              <BackToTop />
            </div>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
