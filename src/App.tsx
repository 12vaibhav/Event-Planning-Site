import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import About from './pages/About';

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isServices = location.pathname === '/services';

  return (
    <div className={`min-h-[100dvh] flex flex-col bg-surface overflow-x-hidden text-on-surface font-body antialiased selection:bg-primary/20 ${isServices ? 'md:h-[100dvh] md:overflow-hidden' : ''}`}>
      <ScrollToTop />
      <Navbar />
      <main id="main-scroll-container" className={`flex-grow pb-24 lg:pb-0 ${isServices ? 'snap-container md:overscroll-none' : ''}`}>
        {children}
        {isServices && <div className="snap-start"><Footer /></div>}
      </main>
      {!isServices && <Footer />}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
