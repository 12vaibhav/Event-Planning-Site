import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

export default function Packages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <header className="relative w-full h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-primary-container mt-16 md:mt-20">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img alt="Elegant table setting with floral centerpieces" className="w-full h-full object-cover scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-DlK5Whm3TH37zyGxvXHItg0yEUrYAtOreZzpVbgVKGus3IF3HeQXU9PK4Aa2vFmcGid4W5O3B9tX6Q8hrpzkPIjvg_vMfxDksJtFj1A7TWWG2SpHTrOhvjLuyIyJFyIgW44vJhBb4tsEN3IjspoGQlaif9GPYLisqQhIiYS6HZU7rVw923VIx3qosJZB4SmfKLAphRZq3u4cHyO4qEJ2FlpYm2dHNqOEn5RkWY3s3ydEGR4iMOyMe4cHXJo2H3RV664bcakOeIkW"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-surface"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block font-label text-brand-gold text-[10px] md:text-xs tracking-[0.2rem] md:tracking-[0.3rem] uppercase mb-3 md:mb-4">Curated Experiences</span>
            <h1 className="font-headline text-4xl md:text-7xl text-white mb-4 md:mb-6 leading-tight tracking-tighter">Investment in Memories</h1>
            <p className="font-body text-white/90 text-sm md:text-xl font-light tracking-wide max-w-2xl mx-auto">
              Transparent, comprehensive design packages tailored to the scale and vision of your celebration.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="py-12 md:py-24 px-0 md:px-12 max-w-7xl mx-auto overflow-hidden relative">
        {/* Mobile Navigation Chevrons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 lg:hidden">
          <button 
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface/80 backdrop-blur-sm border border-brand-gold/20 text-primary transition-all duration-300 ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 lg:hidden">
          <button 
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === 2}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-surface/80 backdrop-blur-sm border border-brand-gold/20 text-primary transition-all duration-300 ${activeIndex === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <motion.div 
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-6 md:pb-0"
        >
          
          {/* Package 1 */}
          <motion.div 
            variants={cardVariants}
            className="min-w-[85vw] md:min-w-0 snap-center bg-surface-container-lowest rounded-2xl p-6 md:p-10 border border-brand-gold/20 editorial-shadow relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            <span className="font-label text-[10px] md:text-xs tracking-[0.15rem] md:tracking-[0.2rem] uppercase text-secondary mb-2 block">The Essential</span>
            <h3 className="font-headline text-2xl md:text-3xl text-primary mb-3 md:mb-4">Intimate Affair</h3>
            <p className="font-body text-on-surface/70 text-xs md:text-sm mb-6 md:mb-8 min-h-0 md:min-h-[60px]">Perfect for pre-wedding ceremonies, small family gatherings, or boutique birthdays up to 100 guests.</p>
            
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-brand-gold/20">
              <span className="text-3xl md:text-4xl font-headline text-primary">₹1.5L</span>
              <span className="text-xs md:text-sm text-on-surface/60 font-body"> onwards</span>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Custom backdrop & stage design</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Standard floral arrangements (local blooms)</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Basic ambient lighting setup</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Welcome signage & entrance decor</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>1 Dedicated design coordinator</span>
              </li>
            </ul>

            <Link to="/contact" className="w-full bg-surface text-primary border border-primary/20 px-6 py-4 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
              Inquire Now
            </Link>
          </motion.div>

          {/* Package 2 - Highlighted */}
          <motion.div 
            variants={cardVariants}
            className="min-w-[85vw] md:min-w-0 snap-center bg-primary text-on-primary rounded-2xl p-6 md:p-10 editorial-shadow relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 transform lg:-translate-y-4"
          >
            <div className="absolute inset-0 mandala-overlay opacity-10 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 bg-brand-gold text-primary font-label text-[8px] md:text-[10px] tracking-widest uppercase px-3 md:px-4 py-1 rounded-bl-lg font-bold">Most Popular</div>
            
            <span className="font-label text-[10px] md:text-xs tracking-[0.15rem] md:tracking-[0.2rem] uppercase text-brand-gold mb-2 block relative z-10">The Signature</span>
            <h3 className="font-headline text-2xl md:text-3xl mb-3 md:mb-4 relative z-10">Grand Celebration</h3>
            <p className="font-body text-on-primary/80 text-xs md:text-sm mb-6 md:mb-8 min-h-0 md:min-h-[60px] relative z-10">Comprehensive design for full-scale weddings and grand receptions up to 500 guests.</p>
            
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/20 relative z-10">
              <span className="text-3xl md:text-4xl font-headline text-brand-gold">₹5.0L</span>
              <span className="text-xs md:text-sm text-on-primary/60 font-body"> onwards</span>
            </div>

            <ul className="space-y-4 mb-10 relative z-10">
              <li className="flex items-start gap-3 font-body text-sm text-on-primary/90">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Bespoke Mandap / Stage architecture</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-primary/90">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Premium floral styling (exotic & local mix)</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-primary/90">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Advanced architectural & mood lighting</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-primary/90">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Thematic photo booths & interactive zones</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-primary/90">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Customized table centerpieces & linens</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-primary/90">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Full team of stylists & coordinators</span>
              </li>
            </ul>

            <Link to="/contact" className="w-full bg-brand-gold text-primary px-6 py-4 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors relative z-10 flex items-center justify-center">
              Book Consultation
            </Link>
          </motion.div>

          {/* Package 3 */}
          <motion.div 
            variants={cardVariants}
            className="min-w-[85vw] md:min-w-0 snap-center bg-surface-container-lowest rounded-2xl p-6 md:p-10 border border-brand-gold/20 editorial-shadow relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            <span className="font-label text-[10px] md:text-xs tracking-[0.15rem] md:tracking-[0.2rem] uppercase text-secondary mb-2 block">The Ultimate</span>
            <h3 className="font-headline text-2xl md:text-3xl text-primary mb-3 md:mb-4">Royal Heritage</h3>
            <p className="font-body text-on-surface/70 text-xs md:text-sm mb-6 md:mb-8 min-h-0 md:min-h-[60px]">A fully immersive, multi-day luxury experience. Unlimited design possibilities for destination weddings.</p>
            
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-brand-gold/20">
              <span className="text-3xl md:text-4xl font-headline text-primary">Custom</span>
              <span className="text-xs md:text-sm text-on-surface/60 font-body"> pricing</span>
            </div>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Multi-event cohesive design strategy</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Exclusive imported florals & rare blooms</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Custom fabricated structures & props</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Cinematic lighting & special effects (Pyro, Fog)</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Personalized branding & monogram integration</span>
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-on-surface/80">
                <span className="material-symbols-outlined text-brand-gold text-sm mt-0.5">check_circle</span> 
                <span>Dedicated Principal Designer access</span>
              </li>
            </ul>

            <Link to="/contact" className="w-full bg-surface text-primary border border-primary/20 px-6 py-4 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
              Request Proposal
            </Link>
          </motion.div>

        </motion.div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-6 bg-brand-gold' : 'w-1.5 bg-brand-gold/20'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-surface-container-low border-y border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-brand-gold text-3xl md:text-4xl mb-3 md:mb-4">info</span>
          <h3 className="font-headline text-xl md:text-2xl text-primary mb-3 md:mb-4">Important Note on Pricing</h3>
          <p className="font-body text-on-surface/70 text-xs md:text-base leading-relaxed">
            The investments listed above are starting points. Final pricing is highly dependent on venue size, guest count, specific floral choices (seasonal vs. imported), custom fabrications, and logistical requirements. We provide a detailed, transparent proposal after our initial design consultation.
          </p>
        </div>
      </section>
    </>
  );
}
