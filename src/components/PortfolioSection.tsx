import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { title: "Royal Wedding", img: "https://cdn.prod.website-files.com/69033ae4ef2bfddf07f31d02/69033ae4ef2bfddf07f31e7d_photo-gallery-01.avif", class: "one" },
  { title: "Boho Mehndi", img: "https://cdn.prod.website-files.com/69033ae4ef2bfddf07f31d02/691c3b34e7b529bdef85fdc6_gallery-img-03.avif", class: "two" },
  { title: "Grand Sangeet", img: "https://picsum.photos/seed/sangeet/400/400", class: "three" },
  { title: "Floral Entry", img: "https://cdn.prod.website-files.com/69033ae4ef2bfddf07f31d02/691c3b35d7db4d2e6de5df1c_gallery-img-02.avif", class: "four" },
  { title: "Birthday Bash", img: "https://cdn.prod.website-files.com/69033ae4ef2bfddf07f31d02/691c3b356d48a26d0d1258a4_gallery-img-01.avif", class: "five" },
  { title: "Family Gala", img: "https://picsum.photos/seed/gala/400/400", class: "six" },
  { title: "Engagement", img: "https://picsum.photos/seed/engagement/400/400", class: "seven" },
  { title: "Reception", img: "https://picsum.photos/seed/reception/400/400", class: "eight" },
  { title: "Haldi", img: "https://picsum.photos/seed/haldi/400/400", class: "nine" },
  { title: "Cocktail", img: "https://picsum.photos/seed/cocktail/400/400", class: "ten" },
  { title: "Anniversary", img: "https://picsum.photos/seed/anniversary/400/400", class: "eleven" }
];

export default function PortfolioSection() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 640px)", () => {
      // 1. Entrance Animation
      gsap.fromTo(".image-gallery-wrapper", 
        {
          opacity: 0,
          x: (i) => {
            if (i % 3 === 0) return -150; // From left
            if (i % 3 === 2) return 150;  // From right
            return 0;
          },
          y: (i) => {
            if (i % 3 === 1) return -150; // From top
            return 0;
          }
        },
        {
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true
        }
      );

      // 2. Parallax Floating Animation
      const galleryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        defaults: { force3D: true }
      });

      galleryTimeline
        .to(".image-gallery-wrapper.one .image-gallery-block",   { yPercent: -20, rotate: -5, scale: 0.95 }, 0)
        .to(".image-gallery-wrapper.two .image-gallery-block",   { yPercent: -50, rotate: 5, scale: 1.05 }, 0)
        .to(".image-gallery-wrapper.three .image-gallery-block", { yPercent: -15, rotate: 2, scale: 0.98 }, 0)
        .to(".image-gallery-wrapper.four .image-gallery-block",  { yPercent: -40, rotate: -3, scale: 1.02 }, 0)
        .to(".image-gallery-wrapper.five .image-gallery-block",  { yPercent: -60, rotate: 4, scale: 0.9 }, 0)
        .to(".image-gallery-wrapper.six .image-gallery-block",   { yPercent: -25, rotate: -2, scale: 1.08 }, 0)
        .to(".image-gallery-wrapper.seven .image-gallery-block",  { yPercent: -30, rotate: 2, scale: 1.0 }, 0)
        .to(".image-gallery-wrapper.eight .image-gallery-block",  { yPercent: -45, rotate: -4, scale: 0.95 }, 0)
        .to(".image-gallery-wrapper.nine .image-gallery-block",   { yPercent: -20, rotate: 3, scale: 1.05 }, 0)
        .to(".image-gallery-wrapper.ten .image-gallery-block",    { yPercent: -35, rotate: -2, scale: 0.9 }, 0)
        .to(".image-gallery-wrapper.eleven .image-gallery-block", { yPercent: -55, rotate: 5, scale: 1.1 }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="image-gallery-section pt-2 pb-1 sm:pt-24 sm:pb-12 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="big-heading-block image-gallery-heading mb-8 sm:mb-16">
          <h2 className="big-heading text-reveal-animation font-headline text-5xl text-primary text-center">
            Our Curated Portfolio
          </h2>
          <p className="text-center text-on-surface-variant/80 mt-4 max-w-2xl mx-auto font-body text-lg">
            A glimpse into the timeless celebrations we have crafted, where tradition meets modern editorial artistry.
          </p>
        </div>
        
        <div id="photo-gallery-trigger" ref={triggerRef} className="relative pt-8 sm:pt-32 pb-16">
          {/* Desktop Absolute/GSAP Layout */}
          <div className="hidden sm:block image-gallery-inner w-full max-w-[1400px] h-[70vh] relative mx-auto">
            {portfolioItems.map((item) => (
              <div key={item.class} className={`image-gallery-wrapper ${item.class} absolute will-change-transform`}>
                <a href="#" className="image-gallery-block w-full h-full block overflow-hidden rounded-xl shadow-xl group will-change-transform">
                  <img src={item.img} loading="lazy" alt={item.title} className="image-gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-headline text-2xl tracking-wide">{item.title}</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        
          {/* Mobile Bento Grid Layout */}
          <div className="sm:hidden grid grid-cols-2 gap-3 w-full">
            {portfolioItems.map((item, index) => {
              // Create a Bento-style layout: 
              // First item spans 2 columns, others alternate or follow a pattern
              const isLarge = index % 5 === 0;
              return (
                <motion.div 
                  key={item.class} 
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`group relative ${isLarge ? 'col-span-2' : 'col-span-1'} ${index === 0 ? '-mt-4' : ''}`}
                >
                  <a href="#" className="block overflow-hidden rounded-2xl shadow-sm">
                    <div className={`overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                      <img 
                        src={item.img} 
                        loading="lazy" 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="font-headline text-lg text-primary truncate">{item.title}</h3>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
