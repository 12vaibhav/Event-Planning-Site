import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import PortfolioSection from '../components/PortfolioSection';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useVirtualPreview } from '../hooks/useVirtualPreview';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Mehndi Vibes');
  const themes = ['Mehndi Vibes', 'Sangeet Glow', 'Grand Wedding', 'Bride-Groom Entry', 'Birthday Fun', 'Custom'];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    previewState,
    selectedFile,
    filePreviewUrl,
    generatedImageUrl,
    error: previewError,
    remainingToday,
    processingTime,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    generateVirtualPreview,
    reset,
    checkDailyLimit,
  } = useVirtualPreview();

  // Check daily limit on mount if user is authenticated
  useEffect(() => {
    if (user) {
      checkDailyLimit();
    }
  }, [user, checkDailyLimit]);

  const handleUploadClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleGenerateClick = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!selectedFile) {
      handleUploadClick();
      return;
    }
    await generateVirtualPreview(selectedTheme);
  };

  const handleDropZone = (e: React.DragEvent<HTMLDivElement>) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    handleDrop(e);
  };

  useEffect(() => {
    // 1. Reveal on View
    // gsap.utils.toArray(".floating-item").forEach((item, i) => {
    //   gsap.from(item as HTMLElement, {
    //     scrollTrigger: {
    //       trigger: item as HTMLElement,
    //       start: "top 95%",
    //       toggleActions: "play none none none"
    //     },
    //     opacity: 0,
    //     scale: 0.8,
    //     y: 50,
    //     filter: "blur(10px)",
    //     duration: 1,
    //     delay: (i as number) * 0.1,
    //     ease: "power2.out"
    //   });
    // });

    // 2. Parallax Scrub (The "Floating" effect)
    // const brandTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".scroll-trigger-wrap",
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 1
    //   }
    // });

    // brandTimeline
    //   .to(".floating-item.one",   { yPercent: -20 }, 0)
    //   .to(".floating-item.two",   { yPercent: -50 }, 0)
    //   .to(".floating-item.three", { yPercent: -15 }, 0)
    //   .to(".floating-item.four",  { yPercent: -40 }, 0)
    //   .to(".floating-item.five",  { yPercent: -60 }, 0)
    //   .to(".floating-item.six",   { yPercent: -25 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <header className="relative min-h-[100svh] lg:h-[100dvh] w-full flex items-start lg:items-center justify-center lg:overflow-hidden bg-background pt-20 lg:pt-0">
        {/* Background Layer (Animated) */}
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <img 
            alt="Elegant wedding decorations" 
            className="w-full h-full object-cover hidden lg:block" 
            src="/Image Assets/hero_desktop_v2.png"
          />
          <img 
            alt="Mobile hero background" 
            className="w-full h-full object-cover lg:hidden blur-[2px]" 
            src="/Image Assets/hero_mobile_v3.jpg"
          />
          <div className="hero-grain"></div>
          <div className="absolute inset-0 hero-gradient-overlay opacity-20"></div>
          {/* Dark overlay for text visibility across all devices */}
          <div className="absolute inset-0 bg-black/0 z-10"></div>
        </motion.div>

        {/* Animated Motif (Modern Editorial Detail) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 opacity-10 pointer-events-none z-20 hidden lg:block will-change-transform"
        >
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCowLNlXGWT6QrwEazbg62CNvRF7pLbnNBe4k0LXbAsDnu8eivXC780VuGRU1vRSF8q8tkarj8Zel3C6jY5uboZr6GuwW5NCULZW8VL29B0Isjnq7zWWJJo4r57A62gt7_hx_a1y6JcuWxhvbtB7R0cHv0RCx5Fi26hzl1vpaEG-u15aSSj7myzq59IaU1OszQj82rRoRGTzqx-Tm3yTH_pcSG5jB4TbJtXXrUtI8nuv8187j4aqK5agy8MqqVCIVZHAKXIXKKtOZSr" alt="" className="w-full h-full object-contain" />
        </motion.div>

        {/* Vertical Rail Text (Editorial Detail) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-12">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 80 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
              className="w-[1px] bg-brand-gold/40" 
            />
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
              className="writing-mode-vertical-rl rotate-180 font-label text-[10px] uppercase tracking-[0.5em] text-white/60"
            >
              The Heirloom Editorial • Est. 2024
            </motion.span>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 80 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
              className="w-[1px] bg-brand-gold/40" 
            />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 pb-16 lg:pb-20 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-9">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
                    }
                  }}
                  className="flex flex-col gap-1 lg:gap-2 items-center md:items-start will-change-transform"
                >
                  <motion.div 
                    variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } } }}
                    className="flex lg:hidden items-center justify-center md:justify-start gap-3 lg:gap-4 mb-2 lg:mb-4"
                  >
                    <div className="w-8 lg:w-12 h-[1px] bg-white/40" />
                    <span className="font-serif text-xs lg:text-base font-bold italic tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      Premium Event Design
                    </span>
                  </motion.div>

                  <h1 className="font-serif italic text-brand-gold leading-[0.6] md:leading-[0.65] tracking-tight font-extrabold md:font-bold text-center md:text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }} className="text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] mb-0 md:mb-0">
                      Apne Sapno Ki
                    </motion.div>
                    
                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }} className="text-5xl md:text-8xl lg:text-9xl md:pl-24 gold-glow md:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] mb-0 md:mb-0 font-black md:font-bold text-brand-maroon">
                      Shaadi
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }} className="text-3xl md:text-5xl lg:text-6xl text-white md:pl-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] mb-0 md:mb-0">
                      Ko Humari
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }} className="text-5xl md:text-8xl lg:text-9xl md:pl-48 gold-glow md:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] mb-0 md:mb-0 font-black md:font-bold text-brand-maroon">
                      Mehndi
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } } }} className="text-3xl md:text-5xl lg:text-6xl text-white md:pl-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                      Se Shuru Karte Hain
                    </motion.div>
                  </h1>
                </motion.div>
            </div>

            {/* Right Column: Meta & CTA */}
            <div className="lg:col-span-3 lg:pt-32">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 lg:space-y-8 will-change-transform"
              >
                <div className="space-y-3 lg:space-y-4">
                  <p className="text-white font-serif font-bold italic text-sm lg:text-base leading-relaxed border-l-2 border-brand-gold pl-4 lg:pl-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    Crafting cinematic celebrations that honor tradition through modern editorial artistry.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 lg:pt-2">
                    {['Wedding', 'Mehndi', 'Sangeet'].map((tag) => (
                      <span key={tag} className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full border border-white/20 text-[8px] lg:text-[9px] uppercase tracking-[0.2em] text-white font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div 
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 1.2, delay: 2.1, ease: "easeOut" } } }}
                  className="hidden lg:flex items-center gap-4 mb-4"
                >
                  <div className="w-12 h-[1px] bg-white/40" />
                  <span className="font-serif text-base italic tracking-[0.2em] text-white">
                    Premium Event Design
                  </span>
                </motion.div>

                <div className="flex flex-col gap-3 lg:gap-4">
                  <Link to="/contact" className="bg-brand-maroon text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full shadow-2xl hover:scale-105 transition-transform font-bold tracking-widest uppercase text-[10px] lg:text-[11px] flex items-center justify-center gap-2 lg:gap-3 group border border-white/10">
                    Get Free Quote
                    <div className="w-5 lg:w-6 h-[1px] bg-white/50 group-hover:w-10 transition-all" />
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-xs lg:text-sm">trending_flat</span>
                  </Link>
                  <Link to="/portfolio" className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-md px-6 py-3 lg:px-8 lg:py-4 rounded-full hover:bg-white/20 transition-all font-bold tracking-widest uppercase text-[10px] lg:text-[11px] flex items-center justify-center shadow-lg">
                    View Portfolio
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Animated Marquee (Modern Editorial Detail) */}
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="inline-block">
                <span className="marquee-item">The Heirloom Editorial <span>•</span></span>
                <span className="marquee-item">Bespoke Wedding Design <span>•</span></span>
                <span className="marquee-item">Mehndi Artistry <span>•</span></span>
                <span className="marquee-item">Cinematic Celebrations <span>•</span></span>
                <span className="marquee-item">Modern Traditions <span>•</span></span>
                <span className="marquee-item">Exquisite Craftsmanship <span>•</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Refined Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 right-12 z-20 hidden lg:flex items-center gap-6 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
            Scroll to Explore
          </span>
          <div className="w-12 h-[1px] bg-white/40 group-hover:w-16 transition-all" />
          <span className="material-symbols-outlined text-white/60 group-hover:text-white transition-colors">south</span>
        </motion.div>
      </header>
      
      <section className="py-4 lg:py-12 px-4 lg:px-20 bg-surface relative overflow-hidden">
        {/* Decorative background elements for the transition */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 lg:h-32 bg-gradient-to-b from-brand-gold to-transparent opacity-30" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 lg:mb-20"
        >
          <span className="font-label text-[10px] lg:text-xs uppercase tracking-[0.2rem] text-secondary">The Craft</span>
          <h2 className="font-headline text-2xl lg:text-5xl text-primary mt-3 lg:mt-4">Exquisite Celebrations</h2>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 lg:gap-y-16 perspective-1000"
        >
          {[
            {
              title: "Wedding Decoration",
              desc: "Transforming spaces into timeless sanctuaries of love with bespoke floral architecture.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC82RFgA-zYKFCUoXytThF9scih1CBT0XH51cDxASmW09ScE6jpOcCntP3J7bQJ--Ty71LzzXUGwFH6nRAMuhmJKHHOp5etB85azDn_XD9-MV8KHLkinmw-8g9dGKlWuAOUQavcPvZL8wS0WzmcUaB49C2d4EFjnnHwqh-jVNFh_G0totLrwWfSqg74qbkODVW2NuSCDCEkhEULWJ4-SFlkZvsT1tMf3ieGAJsNh55SR4WaAlgona_5_XjKxYhgfWCG_uS1ymuUV6TS",
              icon: "auto_awesome",
              bg: "bg-surface-container-low"
            },
            {
              title: "Mehndi & Sangeet",
              desc: "Vibrant palettes and playful textures that capture the joy of the pre-wedding festivities.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiUDPQp58OGekOh1_9Ro_I8IOoCKECS-7-z4WGcpUtDV316JdtllyOtb2rSS9ejjj4VnYQF7q9hTNcEcMZm3M5BIiwdMCGFNSW9QXPAmjrLuAvwo1qLUHfjGKfAAJBTjb7Yn1ECz5dNDvFHZCjSgN5mfopHS_1Kt6pFcl_LlvIj_xBGZkjDdB27hIrxd_Mo4EKB_cmFCDI7sIR5By26nBKYK8ubyJnFST6PAJEUssShFxP8FJT9MmBWt0VW0466rUpnQL4dlfYtzmz",
              icon: "celebration",
              bg: "bg-[#f4c2c2]/20"
            },
            {
              title: "Bride & Groom Entry",
              desc: "Cinematic arrivals designed to leave a lasting impression on every guest's heart.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8NhyjXLPYP6v96T-FHB0YrUidMX8wrN4oFbV6SEaRiE1h4kPoWu869dITwinRRNJC_-lzHjz1r-DyWcrwcxHgY5PESgvOk9z8lc2egc8M59lcf8i3izRyj_fGPasdF2i42DSYS9nqXq7oUYeDFdxIs-OyKjTjc8clV1pampJvbQ5PS6N4oW6FVr6bLEV95OhN-rEYM_JbQLTgIR2RHPsib3KqAOpcAgWHe25hhX3O2C4CtR4n7q7lGf2BE4JLsq7NSBxJkGcMI--r",
              icon: "flare",
              bg: "bg-[#b2ac88]/10"
            },
            {
              title: "Ladies Sangeet",
              desc: "Intimate musical evenings filled with laughter, lore, and the rhythmic heartbeat of tradition.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1PBBqRdNlIbaObFVcS5XS02SZVDZga4QZ3Eztdm_J9ZJHg3BK5WfLsW9W8uCACD365Sb8yPiMxAIspZAgUQkmt33g6aBCXYN3Aumji9b0VYkpeBp5Guz0vnllVpJdfwMHCSwQY-0eD5aMqTEfWhmoBLl9oDoPzmkErli9-pkt_uzZb7uISg-CljmvbEkNpE3d6KXIFgc364Zhy4KqGKE05QKnKZP1b0BsjF56jHLxrPJ-3rcZhUIbFzcp-Dy0_E9z4rdmwdYfYJOW",
              icon: "music_note",
              bg: "bg-surface-container-low"
            },
            {
              title: "Birthday Planning",
              desc: "Curating whimsical wonderlands for milestones that deserve more than just a celebration.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAYrJ90PT4heTbf2vaOoB0Q4h72Ag59uxW1Z9RxtxebL48DXEF0_EFTwUp1xIrLrhoVFKu0aBGarXf09I7JaBKzXFINvgaGN_vBaj1rgSB-PCySWCPCDnN0lNOfD_-lJW4yAgFvHon8k1foraz2Szg-fHbGutKi1vg-AcbrD7KJFGmadBHo64MCcwfMT0YhMKHgkirzzWAS4JPte3Rv6-I3YoWWdpwRlIEA_OeQPCaj9I263CXnJjxewrMpZvTj8lXRqvqsukOXlSE",
              icon: "cake",
              bg: "bg-[#f4c2c2]/20"
            },
            {
              title: "Family Ceremonies",
              desc: "Honoring life's sacred transitions with dignity, grace, and an atmosphere of soulful reverence.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE7D0kgcHS2o_Jm6eVsdeZpBJSZT7Y6qfCRKD6nXoq_43e_uyS7z1zirTcy-vMzF04kmfmeYKh601tdiAj1ZBfn6ok-JRnXXe5WBVtZyrWvnjTtyHwOIwcHfuH-tavGNJjKkGTDRVz37nlwFVDnoXBnZ0DbmmJrKF8xlF9vpLdFBOkccsTr475YOh3tDB9HedgMZZNK_ie0kF821YDpRE1IdtFM6Le6If2JDALIcxPZ6Kwxu5ygF7pcAYfU2Tnm3JqPDZd4eVjctME",
              icon: "groups",
              bg: "bg-[#b2ac88]/10"
            }
          ].map((service, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 50, 
                  rotateX: -15,
                  scale: 0.9,
                  filter: 'blur(5px)'
                },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: {
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                    mass: 1.2
                  }
                }
              }}
              className={`${service.bg} p-4 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 lg:hover:-translate-y-4 hover:shadow-2xl hover:shadow-brand-maroon/10 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full translate-x-12 -translate-y-12 lg:translate-x-16 lg:-translate-y-16 group-hover:translate-x-6 lg:group-hover:translate-x-8 group-hover:-translate-y-6 lg:group-hover:-translate-y-8 transition-transform duration-700" />
              
              <div className="w-10 h-10 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-gold group-hover:rotate-12 transition-all duration-500 shadow-sm">
                <span className="material-symbols-outlined text-brand-maroon group-hover:text-white text-xl lg:text-3xl" style={{fontVariationSettings: "'FILL' 0"}}>
                  {service.icon}
                </span>
              </div>
              
              <h3 className="font-headline text-base lg:text-2xl text-primary mb-2 lg:mb-4 group-hover:text-brand-maroon transition-colors">{service.title}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-4 lg:mb-8 font-light text-[10px] lg:text-sm line-clamp-2 lg:line-clamp-none">{service.desc}</p>
              
              <div className="relative w-full h-32 lg:h-56 overflow-hidden rounded-xl lg:rounded-2xl">
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src={service.img}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3 lg:pb-6">
                  <span className="text-white font-label text-[8px] lg:text-[10px] uppercase tracking-widest border border-white/40 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full backdrop-blur-sm">
                    Explore
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section 
        id="virtual-3d"
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-6 lg:py-12 w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbf0] via-[#fefccf] to-[#f5efd5] z-0"></div>
        <div className="absolute inset-0 mandala-overlay opacity-[0.05] z-0"></div>
        <div className="absolute inset-0 z-0 opacity-[0.15] blur-md pointer-events-none scale-105">
          <img alt="Blurred Venue" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtfW5iQWueaJXMzmgHM7A2_dLIANZCKYBLoelu-xWOzTPBh9XvUrtompuWQDB7r7dI1MO2lXLwTP_NbRJBJA4lc1Qmx0YoxfrZ4fP153kOdM7sbdk3ofpCb48PLvF-46BCqQPw4l7EG7NXyA721tRgIVv7Lzw7DxmBgZBGjeUDMq8MAKXRQWFO2hnolpfVg6PV4BkeiT-X-WiikVeq4-f1SZwhYQnlN8h_tdyCDvCGpTFT70s11JGPDbJ_41VFOjdHDof1PZqU3TaB" loading="lazy" decoding="async"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8 lg:mb-16 max-w-4xl mx-auto">
            <h2 className="font-headline text-xl lg:text-6xl text-brand-maroon mb-4 lg:mb-6 leading-tight">See Your Venue Transformed – <span className="italic">Virtual 3D Preview Magic!</span></h2>
            <p className="text-on-surface-variant text-sm lg:text-xl leading-relaxed">
              Upload your venue photo now & instantly preview our stunning Mehndi, Sangeet, Wedding, Grand Entry or Birthday decorations in your actual space – <span className="text-brand-maroon font-bold">Free & Real-time!</span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-8 lg:mb-10">
              {themes.map((theme) => (
                <button 
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-4 py-1.5 lg:px-5 lg:py-2 rounded-full border border-brand-maroon/20 font-label text-[10px] lg:text-xs uppercase tracking-widest transition-all ${selectedTheme === theme ? 'bg-brand-maroon text-white chip-active' : 'text-brand-maroon hover:bg-brand-maroon hover:text-white'}`}
                >
                  {theme}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl">
              <div className="space-y-4 lg:space-y-6">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div 
                  onClick={(!selectedFile && previewState !== 'processing') ? handleUploadClick : undefined}
                  onDragOver={handleDragOver}
                  onDrop={handleDropZone}
                  className={`aspect-[5/4] w-full bg-white/50 border-2 border-dashed border-brand-gold rounded-3xl flex flex-col items-center justify-center p-6 lg:p-10 transition-all group backdrop-blur-sm ${(!selectedFile && previewState !== 'processing') ? 'cursor-pointer hover:bg-white/80' : 'opacity-90'}`}
                >
                  {!selectedFile && previewState !== 'processing' && previewState !== 'done' && (
                    <>
                      <span className="material-symbols-outlined text-4xl lg:text-6xl text-brand-maroon mb-3 lg:mb-4 group-hover:scale-110 transition-transform">add_a_photo</span>
                      <p className="font-headline text-base lg:text-xl text-primary mb-1 lg:mb-2">Drag & Drop Venue Photo</p>
                      <p className="text-on-surface-variant/60 font-label text-[8px] lg:text-[10px] uppercase tracking-widest text-center mb-4">Or Click to Upload • JPG, PNG, WebP (Max 10MB)</p>
                      
                      {!user && (
                        <div className="flex flex-col items-center gap-3">
                          <p className="text-brand-maroon/80 font-headline text-xs lg:text-sm text-center bg-brand-gold/10 px-4 py-2 rounded-lg border border-brand-gold/20">
                            Sign in required for real-time AI magic ✨
                          </p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAuthModal(true);
                            }}
                            className="bg-brand-maroon text-white font-label text-[10px] uppercase tracking-widest font-bold px-6 py-2.5 rounded-full hover:bg-brand-gold transition-colors shadow-sm active:scale-95"
                          >
                            Sign In / Sign Up
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {previewState === 'uploading' && (
                    <div className="flex flex-col items-center animate-pulse">
                      <span className="material-symbols-outlined text-4xl lg:text-6xl text-brand-maroon mb-3 lg:mb-4 animate-bounce">cloud_upload</span>
                      <p className="font-headline text-base lg:text-xl text-primary">Processing your venue photo...</p>
                    </div>
                  )}
                  {selectedFile && filePreviewUrl && previewState !== 'uploading' && (
                    <div className="w-full h-full relative rounded-2xl overflow-hidden">
                      <img alt="Uploaded Venue" className="w-full h-full object-cover" src={filePreviewUrl} />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="bg-white/90 text-primary font-label text-[10px] lg:text-xs px-3 py-1 rounded-full uppercase tracking-widest">Uploaded ✓</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); reset(); }} className="absolute top-2 right-2 bg-white/90 rounded-full p-1 hover:bg-white transition-colors shadow-md">
                        <span className="material-symbols-outlined text-sm text-brand-maroon">close</span>
                      </button>
                    </div>
                  )}
                </div>
                {/* Error display */}
                {previewError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {previewError}
                  </div>
                )}
                {/* Rate limit counter */}
                {user && (
                  <div className="text-center">
                    <p className="text-on-surface-variant/60 font-label text-[9px] lg:text-[10px] uppercase tracking-widest">
                      {remainingToday}/5 free previews remaining today
                    </p>
                  </div>
                )}
                <button 
                  onClick={handleGenerateClick}
                  disabled={previewState === 'processing' || (previewState === 'done' && !selectedFile)}
                  className={`w-full py-4 lg:py-5 rounded-xl text-base lg:text-lg font-bold shadow-xl transition-all flex items-center justify-center gap-2 lg:gap-3 ${previewState === 'processing' || previewState === 'done' ? 'bg-surface-container-high text-on-surface/50 cursor-not-allowed' : 'bg-brand-maroon text-on-primary hover:scale-[1.02] hover-gold-glow'}`}
                >
                  {previewState === 'processing' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm lg:text-base">sync</span>
                      AI is decorating with {selectedTheme}...
                    </>
                  ) : previewState === 'done' ? (
                    <>
                      <span className="material-symbols-outlined text-sm lg:text-base">check_circle</span>
                      Preview Generated! {processingTime ? `(${(processingTime / 1000).toFixed(1)}s)` : ''}
                    </>
                  ) : previewState === 'error' ? (
                    <>
                      <span className="material-symbols-outlined text-sm lg:text-base">refresh</span>
                      Try Again
                    </>
                  ) : !user ? (
                    <>
                      <span className="material-symbols-outlined text-sm lg:text-base">lock</span>
                      Sign In & Generate Preview
                    </>
                  ) : !selectedFile ? (
                    <>
                      <span className="material-symbols-outlined text-sm lg:text-base">add_a_photo</span>
                      Upload Venue Photo First
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm lg:text-base">magic_button</span>
                      Generate Your Preview Now
                    </>
                  )}
                </button>
                {previewState === 'done' && (
                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl text-sm font-bold border border-brand-maroon/20 text-brand-maroon hover:bg-brand-maroon/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                    Generate New Preview
                  </button>
                )}
                <div className="pt-4 lg:pt-6 border-t border-brand-gold/20">
                  <p className="text-on-surface-variant font-medium mb-4 lg:mb-6 text-xs lg:text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-gold text-sm lg:text-base">verified_user</span>
                    How It Works
                  </p>
                  <div className="grid grid-cols-3 gap-2 lg:gap-4">
                    <div className="text-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 text-brand-maroon">
                        <span className="material-symbols-outlined text-xs lg:text-sm">upload_file</span>
                      </div>
                      <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-tight text-brand-maroon">1. Upload Photo</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 text-brand-maroon">
                        <span className="material-symbols-outlined text-xs lg:text-sm">palette</span>
                      </div>
                      <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-tight text-brand-maroon">2. Choose Theme</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 text-brand-maroon">
                        <span className="material-symbols-outlined text-xs lg:text-sm">auto_fix_high</span>
                      </div>
                      <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-tight text-brand-maroon">3. See Magic</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-primary/5 p-3 lg:p-4 rounded-[2rem] lg:rounded-[2.5rem] border-4 lg:border-8 border-brand-maroon/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                  <div className="aspect-[5/6] bg-surface-container flex flex-col items-center justify-center text-center p-6 lg:p-8 border border-brand-gold/10 rounded-[1.5rem] lg:rounded-[2rem] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] floral-pattern"></div>
                    
                    {previewState === 'done' && generatedImageUrl ? (
                      <div className="absolute inset-0 w-full h-full animate-preview">
                        <img alt="AI Decorated Venue" className="w-full h-full object-cover" src={generatedImageUrl} />
                        <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-full shadow-xl flex items-center gap-2 lg:gap-3">
                          <span className="material-symbols-outlined text-brand-gold text-xs lg:text-base">auto_awesome</span>
                          <span className="font-headline text-primary text-[10px] lg:text-sm">{selectedTheme} Applied</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className={`material-symbols-outlined text-brand-gold/20 text-5xl lg:text-8xl mb-4 lg:mb-6 ${previewState === 'processing' ? 'animate-spin text-brand-gold/60' : ''}`}>
                          {previewState === 'processing' ? 'sync' : 'photo_frame'}
                        </span>
                        <p className="font-headline text-base lg:text-2xl text-primary/40 italic">
                          {previewState === 'processing' ? 'Generating magic...' : 'Your Decorated Venue Will Appear Here in Seconds!'}
                        </p>
                        <div className={`mt-8 lg:mt-12 flex gap-3 lg:gap-4 w-full ${previewState === 'processing' ? 'opacity-50' : ''}`}>
                          <div className="flex-1 relative rounded-xl overflow-hidden h-16 lg:h-24 border-2 border-white shadow-md">
                            <img alt="Transformation 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAYrJ90PT4heTbf2vaOoB0Q4h72Ag59uxW1Z9RxtxebL48DXEF0_EFTwUp1xIrLrhoVFKu0aBGarXf09I7JaBKzXFINvgaGN_vBaj1rgSB-PCySWCPCDnN0lNOfD_-lJW4yAgFvHon8k1foraz2Szg-fHbGutKi1vg-AcbrD7KJFGmadBHo64MCcwfMT0YhMKHgkirzzWAS4JPte3Rv6-I3YoWWdpwRlIEA_OeQPCaj9I263CXnJjxewrMpZvTj8lXRqvqsukOXlSE"/>
                            <div className="absolute top-1 left-1 bg-white/90 text-[6px] lg:text-[8px] font-bold px-1 rounded">BEF</div>
                          </div>
                          <div className="flex-1 relative rounded-xl overflow-hidden h-16 lg:h-24 border-2 border-brand-gold shadow-md">
                            <img alt="Transformation 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1iYT4SADUsuthOQLdtP7srXogR3bBANNFZUZz_kMBmlRC8kQhQeJQ0gXMo41e8GQAc0zzwXA6snNHmdlqEHFbX98Dso3nmivfUswdTPr4QEg50ljHBr4l-YkJMbx2h_Z1YnpS1DJsdnZ8onWfshKqxjK0bMi-J77Yix_iFSVLmk-Bv8qdLU-WZc5v1FCI_PvnvvQzxaoswP6cecEPOQCdluRszezAvEKf68Ib2EI4KCsCV3wIRkQr0tR-EM2TjO_ABDZ4w8j27BUl"/>
                            <div className="absolute top-1 left-1 bg-brand-gold text-white text-[6px] lg:text-[8px] font-bold px-1 rounded">AFT</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <span className="material-symbols-outlined absolute -top-2 -right-2 lg:-top-4 lg:-right-4 text-brand-gold text-2xl lg:text-4xl animate-pulse">star</span>
                <span className="material-symbols-outlined absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 text-brand-gold text-xl lg:text-3xl animate-pulse" style={{animationDelay: '0.5s'}}>auto_awesome</span>
              </div>
            </div>
            <div className="mt-10 lg:mt-16 text-center">
              <p className="text-on-surface-variant text-[10px] lg:text-sm font-medium tracking-wide mb-6 lg:mb-8 px-4 lg:px-0">
                <span className="text-brand-gold">★</span> Powered by Advanced AI – See Flowers, Lighting, Stages & More in Your Space! Results in seconds. <span className="italic">Get this design quoted today.</span>
              </p>
              <button className="bg-surface text-brand-maroon border border-brand-maroon/30 px-6 py-3 lg:px-10 lg:py-4 rounded-xl font-bold flex items-center justify-center gap-2 lg:gap-3 hover:bg-brand-maroon/5 transition-all mx-auto text-sm lg:text-base">
                <span className="material-symbols-outlined text-sm lg:text-base">chat</span> Chat on WhatsApp for Custom Preview
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <PortfolioSection />

      <motion.section 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-0 pb-4 lg:py-6 px-4 lg:px-20 bg-surface"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="text-center group">
            <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl mb-4 lg:mb-6 font-light" style={{fontVariationSettings: "'FILL' 1"}}>edit_note</span>
            <h4 className="font-headline text-lg lg:text-xl text-primary mb-2 lg:mb-3">Bespoke Design</h4>
            <p className="text-[10px] lg:text-sm text-on-surface-variant/80 font-body uppercase tracking-wider">Tailored exclusively to your vision</p>
          </div>
          <div className="text-center group">
            <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl mb-4 lg:mb-6 font-light" style={{fontVariationSettings: "'FILL' 1"}}>filter_vintage</span>
            <h4 className="font-headline text-lg lg:text-xl text-primary mb-2 lg:mb-3">Impeccable Detail</h4>
            <p className="text-[10px] lg:text-sm text-on-surface-variant/80 font-body uppercase tracking-wider">Perfection in every petal</p>
          </div>
          <div className="text-center group">
            <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl mb-4 lg:mb-6 font-light" style={{fontVariationSettings: "'FILL' 1"}}>history_edu</span>
            <h4 className="font-headline text-lg lg:text-xl text-primary mb-2 lg:mb-3">Heritage Focus</h4>
            <p className="text-[10px] lg:text-sm text-on-surface-variant/80 font-body uppercase tracking-wider">Respecting tradition through art</p>
          </div>
          <div className="text-center group">
            <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl mb-4 lg:mb-6 font-light" style={{fontVariationSettings: "'FILL' 1"}}>draw</span>
            <h4 className="font-headline text-lg lg:text-xl text-primary mb-2 lg:mb-3">Artful Execution</h4>
            <p className="text-[10px] lg:text-sm text-on-surface-variant/80 font-body uppercase tracking-wider">Masterfully crafted experiences</p>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-4 lg:py-10 bg-surface-container-high relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 lg:p-20 opacity-10">
          <span className="material-symbols-outlined text-7xl lg:text-9xl text-brand-maroon">format_quote</span>
        </div>
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <img alt="Portrait of a happy client couple" className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-6 lg:mb-8 object-cover border-4 border-white shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcIiUOVPEHfVOgOVy16pFrNzNc-rqMh29OrQIhVVGFcShe3okVNMrh3ILBAIrauVH7TrAJhTuMi8uF6IRxeE7ddEAFaTC12Qpm9AG7ykVTGpETEmat4JibKS94kGWN4CpjR9SiMWNuvAC94KqLHuZSt5oOK2keDStKegRqI6Dmpe3pyR9NU02srugwEyR9i55FEMDSsqn2WX6fy8IxRJfy3Mf2HMskNMvMHNdCj_pnIAG7CUPDqdJfaKa8QpNEQ-hVadBI17iv_x7t" loading="lazy" decoding="async"/>
          <p className="font-headline text-xl lg:text-3xl italic text-primary leading-relaxed mb-6 lg:mb-8">
            "The Heirloom Editorial transformed our ancestral home into a dreamscape we couldn't have imagined. Every corner told a story of our heritage with modern elegance."
          </p>
          <h5 className="font-label text-[10px] lg:text-xs uppercase tracking-[0.2rem] text-secondary">Aditi & Raghav Sharma, Udaipur</h5>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-4 lg:py-12 px-4 lg:px-20 bg-surface relative overflow-hidden"
      >
        <div className="absolute -left-20 top-20 w-64 h-80 rotate-12 opacity-40 hidden lg:block">
          <img alt="Decorative floral detail" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFvg53eVoiJvUDX9lwrsO8SYo8cWx9H4lpUYADd-UN5b6IJn7ERs9maVkKbeEf4GEjXqYs2GNJhMwLOwnmEibRnWxYWaa2SI2C9roAu3QAaYlHqc6xfcd1eYA2DqHOF_6-iWDGKPokblOkqUZ1tDLCXeH_ZjsFQV3kdnrlMbCrU5Dvvs53BvmLYr4sYB-m-JFiZz7AuJJElhjNBNlKzVAxdVJwCYnIeYTNfPtNmFqCdPkOZY70Sn8YogiMgjhVBXZHZY-dI0DkJDXA"/>
        </div>
        <div className="absolute -right-20 bottom-20 w-64 h-80 -rotate-12 opacity-40 hidden lg:block">
          <img alt="Elegant wedding table setting" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-DlK5Whm3TH37zyGxvXHItg0yEUrYAtOreZzpVbgVKGus3IF3HeQXU9PK4Aa2vFmcGid4W5O3B9tX6Q8hrpzkPIjvg_vMfxDksJtFj1A7TWWG2SpHTrOhvjLuyIyJFyIgW44vJhBb4tsEN3IjspoGQlaif9GPYLisqQhIiYS6HZU7rVw923VIx3qosJZB4SmfKLAphRZq3u4cHyO4qEJ2FlpYm2dHNqOEn5RkWY3s3ydEGR4iMOyMe4cHXJo2H3RV664bcakOeIkW" loading="lazy" decoding="async"/>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-2xl lg:text-7xl text-primary mb-6 lg:mb-8 tracking-tight">Ready to Create Magic?</h2>
          <p className="text-on-surface-variant text-sm lg:text-lg leading-relaxed mb-8 lg:mb-12">
            Let's design a celebration that tells your unique story. Begin the journey toward an unforgettable event today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link to="/contact" className="bg-brand-maroon text-on-primary px-6 py-4 lg:px-12 lg:py-5 rounded-xl text-sm lg:text-lg font-bold shadow-2xl hover:scale-105 transition-transform flex items-center justify-center">
              Book Consultation
            </Link>
            <button className="bg-surface text-brand-maroon border border-brand-maroon/20 px-6 py-4 lg:px-12 lg:py-5 rounded-xl text-sm lg:text-lg font-bold flex items-center justify-center gap-3 hover:bg-brand-maroon/5 transition-colors">
              <span className="material-symbols-outlined">chat</span> WhatsApp Inquiry
            </button>
          </div>
        </div>
      </motion.section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectMessage="Sign in to generate your free virtual decoration preview!"
      />
    </>
  );
}
