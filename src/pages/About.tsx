import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <header className="relative w-full h-auto flex items-center justify-center overflow-hidden bg-surface mt-12 md:mt-14 pt-10 pb-4 md:pt-16 md:pb-10">
        <div className="absolute inset-0 opacity-[0.03] floral-pattern pointer-events-none"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="block font-label text-secondary text-[10px] md:text-xs tracking-[0.2rem] md:tracking-[0.3rem] uppercase mb-3 md:mb-4">Our Story</span>
          <h1 className="font-headline text-3xl md:text-7xl text-primary mb-4 md:mb-6 leading-tight tracking-tighter">The Artisans of Celebration</h1>
        </div>
      </header>

      <section className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden editorial-shadow h-[400px] md:h-[600px]">
            <img alt="Founder arranging flowers" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTibaLA9PuziofVfpImdgHDnee6U_2J1banFUJua4_87MRkSS0_pMNEUzgHg6H-ppCnHOXeOJ-eKLf0v1U-DflLqd4MtfNTGtIRlIn0YdvCElPlmuN4G_Zkgm2IeBjTlPhpFZZJSPka0TsKjpwUE66Ckn6opiNpQ--4lzW1WQea9sMjyRAq8f1nVOD1AVWJ4pekASjRIdnkAhPvJLAEGt-M6UAY19LVdYlj3fy5A3HpOHhdXk5bvERiDDjwsnNbY2_AECu0fggn3n8"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
              <p className="text-white font-headline text-lg md:text-xl italic">"Design is not just what it looks like, it's how it makes you feel."</p>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="font-headline text-2xl md:text-4xl text-primary mb-4 md:mb-6">Rooted in Tradition, Designed for Today.</h2>
              <p className="font-body text-on-surface/80 leading-relaxed text-sm md:text-lg">
                The Heirloom Editorial was born from a deep appreciation for the rich tapestry of Indian celebrations and a desire to elevate them through meticulous design. We believe that every event is a living heirloom—a memory to be passed down through generations.
              </p>
            </div>
            <div>
              <p className="font-body text-on-surface/80 leading-relaxed text-sm md:text-lg">
                Our approach blends architectural precision with organic beauty. We don't just decorate spaces; we transform them into immersive environments that tell your unique story. From the grandest structural mandaps to the most delicate table centerpieces, our focus is always on artful execution and impeccable detail.
              </p>
            </div>
            <div className="pt-6 border-t border-brand-gold/20">
              <h3 className="font-headline text-xl md:text-2xl text-primary mb-4">Our Philosophy</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="material-symbols-outlined text-brand-gold text-xl mt-1">diamond</span>
                  <div>
                    <strong className="font-headline text-primary block mb-0.5 md:mb-1 text-base md:text-lg">Uncompromising Quality</strong>
                    <span className="font-body text-xs md:text-sm text-on-surface/70">We source only the finest materials and freshest blooms, working with master craftsmen to build our sets.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="material-symbols-outlined text-brand-gold text-xl mt-1">palette</span>
                  <div>
                    <strong className="font-headline text-primary block mb-0.5 md:mb-1 text-base md:text-lg">Bespoke Curation</strong>
                    <span className="font-body text-xs md:text-sm text-on-surface/70">No two events are the same. Every design is a custom creation tailored to your vision and venue.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="material-symbols-outlined text-brand-gold text-xl mt-1">favorite</span>
                  <div>
                    <strong className="font-headline text-primary block mb-0.5 md:mb-1 text-base md:text-lg">Heartfelt Service</strong>
                    <span className="font-body text-xs md:text-sm text-on-surface/70">We pour our passion into every project, ensuring a seamless and stress-free experience for our clients.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-on-primary text-center px-6">
        <div className="max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-brand-gold text-4xl md:text-5xl mb-4 md:mb-6">diversity_3</span>
          <h2 className="font-headline text-3xl md:text-5xl mb-4 md:mb-6">Meet the Team</h2>
          <p className="font-body text-on-primary/80 text-base md:text-lg mb-8 md:mb-12">
            A collective of visionary designers, meticulous planners, and master florists dedicated to making your dream a reality.
          </p>
          <Link to="/contact" className="inline-block bg-transparent border border-brand-gold text-brand-gold px-6 md:px-8 py-3 rounded-xl font-label text-[10px] md:text-xs tracking-widest uppercase font-bold hover:bg-brand-gold hover:text-primary transition-colors">
            Join Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
