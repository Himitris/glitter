import React, { lazy, Suspense } from "react";
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
import { ScrollIndicator, BackToTop, Loader } from "./components/ui";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";

// Pages - Lazy loaded for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Artists = lazy(() => import("./pages/Artists"));
const DJs = lazy(() => import("./pages/DJS"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Success = lazy(() => import("./pages/Success"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ArtistForm = lazy(() => import("./pages/ArtistForm"));
const DeleteConfirmation = lazy(() => import("./pages/DeleteConfirmation"));

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// AnimatedRoutes component pour permettre les transitions de page
const AnimatedRoutes = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#FFFFF6]">
            <Loader size="lg" />
          </div>
        }
      >
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
        <Route
          path="/success"
          element={
            <PageTransition>
              <Success />
            </PageTransition>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route
          path="/admin/login"
          element={
            currentUser ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <PageTransition>
                <AdminLogin />
              </PageTransition>
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/artist/add"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ArtistForm isEdit={false} type="artist" />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/artist/edit/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ArtistForm isEdit={true} type="artist" />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dj/add"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ArtistForm isEdit={false} type="dj" />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dj/edit/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ArtistForm isEdit={true} type="dj" />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/artist/delete/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <DeleteConfirmation type="artist" />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dj/delete/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <DeleteConfirmation type="dj" />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-[#FFFFF6] text-[#0B0B0B]">
                <ScrollIndicator />
                <Header />
                <main>
                  <AnimatedRoutes />
                </main>
                <Footer />
                <BackToTop />
              </div>
            </Router>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
