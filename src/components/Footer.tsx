import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1412] text-[#fdfbf0] pt-10 pb-4 px-4 snap-end relative overflow-hidden">
      <div className="absolute inset-0 floral-pattern opacity-[0.02] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-10 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-headline italic text-brand-gold mb-4">The Heirloom Editorial</h2>
            <p className="text-white/70 font-light leading-relaxed text-sm mb-6">
              Crafting bespoke celebrations and timeless memories with unparalleled elegance and meticulous attention to detail.
            </p>
            <div className="flex justify-center gap-4">
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
          
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <h3 className="font-label text-[10px] uppercase tracking-[0.2rem] text-brand-gold mb-4">Explore</h3>
              <ul className="space-y-2 text-white/80 font-light text-sm">
                <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-brand-gold transition-colors">Services</Link></li>
                <li><Link to="/portfolio" className="hover:text-brand-gold transition-colors">Portfolio</Link></li>
                <li><Link to="/packages" className="hover:text-brand-gold transition-colors">Packages</Link></li>
                <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-label text-[10px] uppercase tracking-[0.2rem] text-brand-gold mb-4">Services</h3>
              <ul className="space-y-2 text-white/80 font-light text-sm">
                <li><Link to="/services" className="hover:text-brand-gold transition-colors">Wedding Decor</Link></li>
                <li><Link to="/services" className="hover:text-brand-gold transition-colors">Mehndi & Sangeet</Link></li>
                <li><Link to="/services" className="hover:text-brand-gold transition-colors">Grand Entries</Link></li>
                <li><Link to="/services" className="hover:text-brand-gold transition-colors">Corporate Events</Link></li>
                <li><Link to="/services" className="hover:text-brand-gold transition-colors">Birthday Planning</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-label text-[10px] uppercase tracking-[0.2rem] text-brand-gold mb-4">Stay Inspired</h3>
            <p className="text-white/70 font-light leading-relaxed mb-4 text-xs">
              Subscribe for inspiration and trends.
            </p>
            <form className="flex flex-col gap-3 mb-8">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-gold transition-colors w-full font-light text-sm"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-gold text-[#1a1412] px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors w-full text-sm"
              >
                Subscribe
              </button>
            </form>
            
            <ul className="space-y-3 text-white/80 font-light text-xs">
              <li className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-gold text-sm">location_on</span>
                <span>Udaipur, Rajasthan</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-gold text-sm">call</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-brand-gold text-sm">mail</span>
                <span>hello@heirloomeditorial.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-4 text-[9px] font-label uppercase tracking-widest text-white/50">
          <p>© {new Date().getFullYear()} The Heirloom Editorial.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
