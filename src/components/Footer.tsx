import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1412] text-[#fdfbf0] pt-6 pb-4 lg:pt-12 lg:pb-8 px-6 lg:px-12 snap-end relative overflow-hidden">
      <div className="absolute inset-0 floral-pattern opacity-[0.02] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Desktop Footer Content (Hidden on Mobile) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12 lg:gap-16 mb-12 lg:mb-16">
          {/* Brand Column */}
          <div className="text-center lg:text-left space-y-6">
            <h2 className="text-3xl lg:text-4xl font-headline italic text-brand-gold">The Heirloom Editorial</h2>
            <p className="text-white/70 font-light leading-relaxed text-sm max-w-sm mx-auto lg:mx-0">
              Crafting bespoke celebrations and timeless memories with unparalleled elegance and meticulous attention to detail.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-brand-gold hover:text-[#1a1412] transition-all">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-brand-gold hover:text-[#1a1412] transition-all">
                <span className="material-symbols-outlined text-sm">play_arrow</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-brand-gold hover:text-[#1a1412] transition-all">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </a>
            </div>
          </div>
          
          {/* Explore Column */}
          <div className="text-center lg:text-left">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2rem] text-brand-gold mb-8">Explore</h3>
            <ul className="space-y-3 text-white/80 font-light text-sm">
              <li><Link to="/" className="hover:text-brand-gold transition-colors block py-0.5">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors block py-0.5">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-gold transition-colors block py-0.5">Portfolio</Link></li>
              <li><Link to="/packages" className="hover:text-brand-gold transition-colors block py-0.5">Packages</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors block py-0.5">About Us</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="text-center lg:text-left">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2rem] text-brand-gold mb-8">Services</h3>
            <ul className="space-y-3 text-white/80 font-light text-sm">
              <li><Link to="/services" className="hover:text-brand-gold transition-colors block py-0.5">Wedding Decor</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors block py-0.5">Mehndi & Sangeet</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors block py-0.5">Grand Entries</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors block py-0.5">Ladies Sangeet</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors block py-0.5">Birthday Planning</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="text-center lg:text-left space-y-8">
            <div>
              <h3 className="font-label text-[10px] uppercase tracking-[0.2rem] text-brand-gold mb-6">Stay Inspired</h3>
              <form className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-gold transition-colors w-full font-light text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-brand-gold text-[#1a1412] px-6 py-3 rounded-xl font-bold hover:bg-white transition-all transform active:scale-95 text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            <ul className="space-y-4 text-white/80 font-light text-xs">
              <li className="flex items-center justify-start gap-3 group">
                <span className="material-symbols-outlined text-brand-gold text-sm group-hover:scale-110 transition-transform">location_on</span>
                <span>Udaipur, Rajasthan</span>
              </li>
              <li className="flex items-center justify-start gap-3 group">
                <span className="material-symbols-outlined text-brand-gold text-sm group-hover:scale-110 transition-transform">call</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-start gap-3 group">
                <span className="material-symbols-outlined text-brand-gold text-sm group-hover:scale-110 transition-transform">mail</span>
                <span>hello@heirloomeditorial.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Mobile Footer (Visible only on Mobile) */}
        <div className="lg:hidden flex flex-col items-center py-4 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-headline italic text-brand-gold mb-2">The Heirloom Editorial</h2>
            <p className="text-white/50 font-label text-[8px] uppercase tracking-[0.3em]">Exquisite Celebrations</p>
          </div>
          
          <div className="flex gap-8">
            <Link to="/services" className="font-label text-[9px] uppercase tracking-widest text-white/80 border-b border-brand-gold/30 pb-1">Services</Link>
            <Link to="/portfolio" className="font-label text-[9px] uppercase tracking-widest text-white/80 border-b border-brand-gold/30 pb-1">Portfolio</Link>
            <Link to="/contact" className="font-label text-[9px] uppercase tracking-widest text-white/80 border-b border-brand-gold/30 pb-1">Contact</Link>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </a>
            <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">
              <span className="material-symbols-outlined text-xl">play_arrow</span>
            </a>
            <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">
              <span className="material-symbols-outlined text-xl">mail</span>
            </a>
          </div>
          
          <div className="w-full pt-8 border-t border-white/5 text-center">
             <p className="text-[8px] font-label uppercase tracking-widest text-white/30 italic">© {new Date().getFullYear()} The Heirloom Editorial</p>
          </div>
        </div>

        {/* Desktop Copyright Info (Hidden on Mobile) */}
        <div className="hidden lg:flex border-t border-white/10 pt-8 items-center justify-between gap-6 text-[9px] font-label uppercase tracking-widest text-white/40">
          <p>© {new Date().getFullYear()} The Heirloom Editorial. Crafted for Excellence.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

