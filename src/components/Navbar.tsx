import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Reset scrolled state on path change
    setScrolled(false);
    setIsMenuOpen(false);
    
    // Check initial scroll position
    const checkScroll = () => {
      const mainContainer = document.getElementById('main-scroll-container');
      const scrollTop = mainContainer ? mainContainer.scrollTop : window.scrollY;
      setScrolled(scrollTop > 20);
    };
    
    checkScroll();
  }, [path]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;
      const scrollTop = target === document ? window.scrollY : (target as HTMLElement).scrollTop;
      
      // Only update if it's the window or a main scrolling container
      if (target === document || (target as HTMLElement).id === 'main-scroll-container') {
        setScrolled(scrollTop > 20);
      }
    };
    
    window.addEventListener('scroll', handleScroll, true); // Use capture to catch internal scrolls
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const getLinkClass = (targetPath: string) => {
    const isActive = path === targetPath;
    if (isActive) {
      return "text-brand-gold font-bold border-b border-brand-gold pb-1 font-headline tracking-tight";
    }
    return "text-on-background font-medium hover:text-brand-gold transition-all duration-300 font-headline tracking-tight";
  };

  const isHome = path === '/';
  const navPosition = 'fixed';
  const navBackground = scrolled 
    ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-brand-gold/10' 
    : 'glass-nav';

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between lg:hidden bg-background/80 backdrop-blur-md border-b border-brand-gold/20">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center text-primary hover:text-brand-gold transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Link to="/" className="font-serif text-lg tracking-[0.3em] text-primary italic font-bold">HEIRLOOM</Link>
        <div className="flex items-center gap-1">
          {user ? (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-brand-gold transition-colors"
            >
              <span className="material-symbols-outlined text-xl">account_circle</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-primary group-hover:text-brand-gold transition-colors"
            >
              <span className="material-symbols-outlined text-xl">login</span>
            </button>
          )}
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-primary hover:text-brand-gold transition-colors">
            <WhatsAppIcon />
          </a>
        </div>
      </header>

      {/* Mobile Side Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-surface z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-brand-gold/10">
                <span className="font-headline italic text-primary text-xl">The Heirloom</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-primary hover:text-brand-gold transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto no-scrollbar py-8 px-6 space-y-6">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Virtual 3D', path: '/#virtual-3d' },
                  { name: 'Services', path: '/services' },
                  { name: 'Portfolio', path: '/portfolio' },
                  { name: 'Packages', path: '/packages' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                ].map((item) => {
                  const itemPath = item.path.split('#')[0];
                  const isActive = path === item.path || (item.path.includes('#') && path === itemPath);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={(e) => {
                        if (item.path.includes('#')) {
                          const [route, id] = item.path.split('#');
                          if (path === route || (route === '/' && path === '/')) {
                            const element = document.getElementById(id);
                            if (element) {
                              e.preventDefault();
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }
                        setIsMenuOpen(false);
                      }}
                      className={`block font-headline text-2xl tracking-tight transition-all duration-300 ${
                        isActive ? 'text-brand-gold pl-4 border-l-2 border-brand-gold font-bold' : 'text-primary hover:text-brand-gold'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-8 border-t border-brand-gold/10 bg-surface-container-low">
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">Start your journey</p>
                
                {user ? (
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full border border-brand-gold/30 text-primary py-4 rounded-xl flex items-center justify-center gap-2 font-label text-xs uppercase tracking-widest font-bold mb-4 hover:bg-brand-gold/5 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-surface-container-high text-primary py-4 rounded-xl flex items-center justify-center gap-2 font-label text-xs uppercase tracking-widest font-bold mb-4 hover:bg-brand-gold/10 transition-all border border-brand-gold/20"
                  >
                    <span className="material-symbols-outlined text-sm">login</span>
                    Sign In
                  </button>
                )}

                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-brand-gold text-primary py-4 rounded-xl flex items-center justify-center gap-3 font-label text-xs uppercase tracking-widest font-bold shadow-md active:scale-95 transition-all"
                >
                  <WhatsAppIcon />
                  WhatsApp Inquiry
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <nav className={`${navPosition} top-0 w-full z-50 transition-all duration-300 hidden lg:flex justify-between items-center px-6 md:px-10 py-4 max-w-full mx-auto ${navBackground}`}>
        <Link to="/" className="text-2xl font-headline italic text-primary hover:text-brand-gold transition-colors">The Heirloom Editorial</Link>
        <div className="hidden md:flex gap-10 items-center">
          <Link to="/services" className={getLinkClass('/services')}>Services</Link>
          <Link to="/portfolio" className={getLinkClass('/portfolio')}>Portfolio</Link>
          <Link to="/packages" className={getLinkClass('/packages')}>Packages</Link>
          <Link to="/about" className={getLinkClass('/about')}>About</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-secondary font-label text-[10px] uppercase tracking-widest">
                {user.email?.split('@')[0]}
              </span>
              <button 
                onClick={() => signOut()}
                className="text-primary hover:text-brand-gold transition-colors font-label text-[10px] uppercase tracking-widest font-bold px-3 py-1 border border-brand-gold/20 rounded-full hover:bg-brand-gold/5"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="text-primary hover:text-brand-gold transition-colors font-label text-[10px] uppercase tracking-widest font-bold"
            >
              Sign In
            </button>
          )}
          
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group text-white bg-[#25D366] px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#25D366]/90 hover:shadow-lg transition-all duration-300 font-label text-xs uppercase tracking-widest"
          >
            <div className="p-1 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-300"><WhatsAppIcon /></div> WhatsApp
          </a>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
