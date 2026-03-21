import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const servicesData = [
  {
    id: '01',
    title: 'Wedding Decoration',
    shortDesc: 'Transform your special day with our bespoke wedding decoration services. From magnificent mandaps to elegant floral arrangements, we create breathtaking environments that reflect your unique love story and cultural heritage.',
    features: ['Custom Mandap Design', 'Floral Architecture & Walkways', 'Ambient Lighting & Draping'],
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC82RFgA-zYKFCUoXytThF9scih1CBT0XH51cDxASmW09ScE6jpOcCntP3J7bQJ--Ty71LzzXUGwFH6nRAMuhmJKHHOp5etB85azDn_XD9-MV8KHLkinmw-8g9dGKlWuAOUQavcPvZL8wS0WzmcUaB49C2d4EFjnnHwqh-jVNFh_G0totLrwWfSqg74qbkODVW2NuSCDCEkhEULWJ4-SFlkZvsT1tMf3ieGAJsNh55SR4WaAlgona_5_XjKxYhgfWCG_uS1ymuUV6TS',
    additionalImages: [
      'https://picsum.photos/seed/wedding1/800/600',
      'https://picsum.photos/seed/wedding2/800/600',
      'https://picsum.photos/seed/wedding3/800/600'
    ],
    detailedInfo: 'Our wedding decoration service is a comprehensive journey from concept to execution. We work closely with you to understand your vision, incorporating traditional elements with modern aesthetics. Our team of expert florists, lighting technicians, and set designers collaborate to build immersive environments. Whether you dream of a royal Rajasthani palace setting or a minimalist contemporary floral wonderland, we bring it to life with meticulous attention to detail.'
  },
  {
    id: '02',
    title: 'Mehndi & Sangeet',
    shortDesc: 'Vibrant, playful, and full of life. Our pre-wedding event designs focus on creating interactive, colorful spaces that encourage celebration, dance, and joy. We blend traditional motifs with contemporary color palettes.',
    features: ['Vibrant Seating Lounges', 'Interactive Photo Booths', 'Thematic Dance Floors'],
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiUDPQp58OGekOh1_9Ro_I8IOoCKECS-7-z4WGcpUtDV316JdtllyOtb2rSS9ejjj4VnYQF7q9hTNcEcMZm3M5BIiwdMCGFNSW9QXPAmjrLuAvwo1qLUHfjGKfAAJBTjb7Yn1ECz5dNDvFHZCjSgN5mfopHS_1Kt6pFcl_LlvIj_xBGZkjDdB27hIrxd_Mo4EKB_cmFCDI7sIR5By26nBKYK8ubyJnFST6PAJEUssShFxP8FJT9MmBWt0VW0466rUpnQL4dlfYtzmz',
    additionalImages: [
      'https://picsum.photos/seed/mehndi1/800/600',
      'https://picsum.photos/seed/mehndi2/800/600',
      'https://picsum.photos/seed/mehndi3/800/600'
    ],
    detailedInfo: 'For Mehndi and Sangeet ceremonies, we focus on vibrant colors, playful elements, and interactive spaces. We design comfortable yet stylish seating arrangements, stunning backdrops for photos, and energetic dance floor setups. Our goal is to create an atmosphere that encourages your guests to let loose and celebrate the upcoming union with joy and enthusiasm.'
  },
  {
    id: '03',
    title: 'Bride & Groom Entry',
    shortDesc: 'The moment you arrive should stop time. We choreograph cinematic entrances utilizing specialized lighting, floral pathways, cold pyrotechnics, and thematic elements to ensure your first appearance is unforgettable.',
    features: ['Floral Chadar & Phoolon Ki Holi', 'Cold Pyro & Special Effects', 'Vintage Car & Chariot Styling'],
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8NhyjXLPYP6v96T-FHB0YrUidMX8wrN4oFbV6SEaRiE1h4kPoWu869dITwinRRNJC_-lzHjz1r-DyWcrwcxHgY5PESgvOk9z8lc2egc8M59lcf8i3izRyj_fGPasdF2i42DSYS9nqXq7oUYeDFdxIs-OyKjTjc8clV1pampJvbQ5PS6N4oW6FVr6bLEV95OhN-rEYM_JbQLTgIR2RHPsib3KqAOpcAgWHe25hhX3O2C4CtR4n7q7lGf2BE4JLsq7NSBxJkGcMI--r',
    additionalImages: [
      'https://picsum.photos/seed/entry1/800/600',
      'https://picsum.photos/seed/entry2/800/600',
      'https://picsum.photos/seed/entry3/800/600'
    ],
    detailedInfo: 'Your entry sets the tone for the entire event. We specialize in creating dramatic, cinematic entrances that leave a lasting impression. From traditional floral chadars and phoolon ki holi to modern cold pyrotechnics and specialized lighting, we choreograph every detail to ensure your arrival is nothing short of spectacular.'
  },
  {
    id: '04',
    title: 'Ladies Sangeet',
    shortDesc: 'Celebrate the joyous traditions of the Ladies Sangeet with setups designed for music, dance, and intimate family bonding. We provide comfortable floor seating, vibrant backdrops, and traditional props to set the perfect mood.',
    features: ['Traditional Floor Seating (Gaddas)', 'Dholak & Musical Instrument Props', 'Colorful Marigold Backdrops'],
    mainImage: 'https://picsum.photos/seed/sangeet/1920/1080',
    additionalImages: [
      'https://picsum.photos/seed/ladiessangeet1/800/600',
      'https://picsum.photos/seed/ladiessangeet2/800/600',
      'https://picsum.photos/seed/ladiessangeet3/800/600'
    ],
    detailedInfo: 'The Ladies Sangeet is a time-honored tradition filled with music, dance, and laughter. We create intimate and inviting setups that encourage participation and celebration. Our designs feature traditional floor seating, vibrant marigold backdrops, and authentic musical instrument props, setting the perfect stage for unforgettable family performances.'
  },
  {
    id: '05',
    title: 'Birthday Planning',
    shortDesc: 'From milestone adult birthdays to magical kids\' parties, we design and execute celebrations that are fun, personalized, and visually stunning. Let us handle the decor, entertainment, and details while you enjoy the day.',
    features: ['Themed Decor & Balloon Styling', 'Custom Cake Tables & Backdrops', 'Engaging Entertainment Setups'],
    mainImage: 'https://picsum.photos/seed/birthday/1920/1080',
    additionalImages: [
      'https://picsum.photos/seed/birthday1/800/600',
      'https://picsum.photos/seed/birthday2/800/600',
      'https://picsum.photos/seed/birthday3/800/600'
    ],
    detailedInfo: 'Whether it\'s a 1st birthday or a 50th milestone, we bring creativity and flair to every celebration. We work with you to develop a unique theme, designing custom decor, cake tables, and backdrops that perfectly capture the guest of honor\'s personality. We also coordinate engaging entertainment setups to ensure a memorable experience for guests of all ages.'
  },
  {
    id: '06',
    title: 'Family Ceremonies',
    shortDesc: 'Honor life\'s special milestones with grace and elegance. Whether it\'s a Roka, Haldi, Housewarming (Griha Pravesh), or Anniversary, we provide beautiful, culturally rich decorations tailored to your intimate family gatherings.',
    features: ['Intimate Floral Setups', 'Traditional Puja Decor', 'Elegant Home Transformations'],
    mainImage: 'https://picsum.photos/seed/ceremony/1920/1080',
    additionalImages: [
      'https://picsum.photos/seed/ceremony1/800/600',
      'https://picsum.photos/seed/ceremony2/800/600',
      'https://picsum.photos/seed/ceremony3/800/600'
    ],
    detailedInfo: 'We believe that every family milestone deserves to be celebrated beautifully. For intimate gatherings like Roka, Haldi, or Housewarming ceremonies, we offer elegant and culturally authentic decoration services. We transform your home or chosen venue with delicate floral setups and traditional puja decor, creating a warm and inviting atmosphere for your loved ones.'
  }
];

export default function Services() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll('.service-section');
    
    const observerOptions = {
      root: document.getElementById('main-scroll-container'),
      threshold: 0.5, // Section is active when 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.service-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = () => {
    setSelectedService(null);
    navigate('/contact');
  };

  return (
    <div className="w-full">
      <div className="sticky-progress hidden md:flex flex-col">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div 
            key={index} 
            className={`progress-dot cursor-pointer ${activeSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="service-section snap-section bg-surface relative pt-20 md:pt-32 pb-6 md:pb-20">
        <div className="absolute inset-0 floral-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="h-full flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto w-full">
          <span className="font-label text-xs tracking-[0.3rem] uppercase text-secondary mb-4 md:mb-6 block">Our Expertise</span>
          <h1 className="font-headline text-5xl md:text-8xl text-primary mb-6 md:mb-8 leading-none md:leading-tight tracking-tighter font-bold md:font-normal">
            Crafting <br/><span className="italic text-brand-gold">Timeless</span> <br/>Celebrations
          </h1>
          <p className="font-body text-sm md:text-xl text-on-surface/70 max-w-2xl leading-relaxed mb-8 md:mb-12">
            From intimate gatherings to grand spectacles, we bring an editorial eye and heritage craftsmanship to every event we design.
          </p>
          <div className="hidden md:flex items-center gap-4 text-primary animate-bounce mt-auto cursor-pointer" onClick={() => scrollToSection(1)}>
            <span className="font-label text-[10px] md:text-xs tracking-widest uppercase">Scroll to Discover</span>
            <span className="material-symbols-outlined text-sm md:text-base">arrow_downward</span>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {servicesData.map((service, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? 'bg-surface-container-lowest' : 'bg-surface-container-low';
        
        return (
          <section key={service.id} className={`service-section snap-section ${bgClass} relative flex flex-col cursor-pointer group`} onClick={() => setSelectedService(service)}>
            <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
              <div className={`editorial-img-container md:h-full min-h-[35vh] md:min-h-[50vh] overflow-hidden ${isEven ? 'order-1' : 'order-1 md:order-2'}`}>
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={service.mainImage} 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className={`editorial-content md:h-full px-6 md:px-20 z-10 py-10 md:py-0 ${bgClass} ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                <span className="font-label text-[10px] md:text-xs tracking-[0.2rem] uppercase text-brand-gold mb-3 md:mb-4 block">{service.id}</span>
                <h2 className="font-headline text-4xl md:text-6xl text-primary mb-4 md:mb-6 leading-tight group-hover:text-brand-gold transition-colors">{service.title}</h2>
                <p className="font-body text-sm md:text-base text-on-surface/70 leading-relaxed mb-6 md:mb-8">
                  {service.shortDesc}
                </p>
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 font-body text-sm text-on-surface/80">
                      <span className="material-symbols-outlined text-brand-gold text-sm">check_circle</span> {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className="w-fit font-label text-xs tracking-widest uppercase border-b border-primary pb-1 text-primary group-hover:text-brand-gold group-hover:border-brand-gold transition-colors flex items-center gap-2"
                >
                  View Details <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="service-section snap-section bg-primary text-on-primary relative flex items-center justify-center text-center px-6 py-14 md:py-20">
        <div className="absolute inset-0 mandala-overlay opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-3xl">
          <span className="material-symbols-outlined text-brand-gold text-5xl md:text-6xl mb-6 md:mb-8">auto_awesome</span>
          <h2 className="font-headline text-4xl md:text-6xl mb-6 md:mb-8 leading-tight">Ready to begin designing your dream celebration?</h2>
          <p className="font-body text-on-primary/80 text-sm md:text-lg mb-8 md:mb-12">
            Connect with our design team to discuss your vision, venue, and how we can bring your story to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Link to="/contact" className="bg-brand-gold text-primary px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-label text-[10px] md:text-xs tracking-widest uppercase font-bold hover:scale-105 transition-transform editorial-shadow flex items-center justify-center">
              Book Consultation
            </Link>
            <button className="bg-transparent border border-brand-gold/50 text-brand-gold px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-label text-[10px] md:text-xs tracking-widest uppercase font-bold hover:bg-brand-gold/10 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">chat</span> WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <span className="font-label text-xs tracking-widest text-brand-gold uppercase">{selectedService.id}</span>
                  <h3 className="font-headline text-xl md:text-2xl text-primary">{selectedService.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full hover:bg-surface-variant text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column: Text & Features */}
                  <div>
                    <p className="font-body text-base md:text-lg text-on-surface/80 leading-relaxed mb-8">
                      {selectedService.detailedInfo}
                    </p>
                    
                    <h4 className="font-headline text-2xl text-primary mb-4">Key Features</h4>
                    <motion.ul 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2
                          }
                        }
                      }}
                      className="space-y-4 mb-10"
                    >
                      {selectedService.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          variants={{
                            hidden: { opacity: 0, x: -50, scale: 0.9 },
                            visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
                          }}
                          className="flex items-start gap-3 font-body text-base text-on-surface/80"
                        >
                          <span className="material-symbols-outlined text-brand-gold mt-0.5">star</span> 
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <button 
                      onClick={handleRequestQuote}
                      className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:bg-brand-maroon transition-colors flex items-center justify-center gap-2 editorial-shadow"
                    >
                      Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>

                  {/* Right Column: Images */}
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.15,
                          delayChildren: 0.3
                        }
                      }
                    }}
                    className="space-y-4"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 20 },
                        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
                      }}
                      className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
                    >
                      <img 
                        src={selectedService.mainImage} 
                        alt={selectedService.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedService.additionalImages.map((img, idx) => (
                        <motion.div 
                          key={idx} 
                          variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 20 },
                            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
                          }}
                          className="w-full h-24 md:h-32 rounded-lg overflow-hidden"
                        >
                          <img 
                            src={img} 
                            alt={`${selectedService.title} detail ${idx + 1}`} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
