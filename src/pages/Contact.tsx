export default function Contact() {
  return (
    <>
      <header className="relative w-full h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-surface mt-16 md:mt-20">
        <div className="absolute inset-0 opacity-[0.03] floral-pattern pointer-events-none"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="block font-label text-secondary text-[10px] md:text-xs tracking-[0.2rem] md:tracking-[0.3rem] uppercase mb-3 md:mb-4">Get in Touch</span>
          <h1 className="font-headline text-3xl md:text-7xl text-primary mb-4 md:mb-6 leading-tight tracking-tighter">Let's Create Magic</h1>
        </div>
      </header>

      <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Contact Info */}
          <div className="space-y-10 md:space-y-12">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl text-primary mb-4 md:mb-6">Start the Conversation</h2>
              <p className="font-body text-on-surface/80 leading-relaxed text-sm md:text-base">
                We would love to hear about your upcoming celebration. Whether you have a clear vision or need guidance to find your style, our team is here to help you design an unforgettable event.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-high rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-brand-maroon text-xl md:text-2xl">location_on</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg md:text-xl text-primary mb-0.5 md:mb-1">Our Studio</h3>
                  <p className="font-body text-on-surface/70 text-xs md:text-sm">123 Heritage Lane, Design District<br/>New Delhi, India 110001</p>
                  <p className="font-body text-[10px] md:text-xs text-brand-gold mt-1 md:mt-2 italic">By Appointment Only</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-high rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-brand-maroon text-xl md:text-2xl">call</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg md:text-xl text-primary mb-0.5 md:mb-1">Phone & WhatsApp</h3>
                  <p className="font-body text-on-surface/70 text-xs md:text-sm">+91 98765 43210</p>
                  <a href="#" className="font-label text-[10px] md:text-xs text-brand-maroon uppercase tracking-widest mt-1 md:mt-2 inline-block hover:underline">Chat with us</a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-high rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-brand-maroon text-xl md:text-2xl">mail</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg md:text-xl text-primary mb-0.5 md:mb-1">Email</h3>
                  <p className="font-body text-on-surface/70 text-xs md:text-sm">hello@heirloomeditorial.com</p>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8 border-t border-brand-gold/20">
              <h3 className="font-headline text-xl text-primary mb-4">Follow Our Journey</h3>
              <div className="flex gap-4">
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <span className="font-label text-[10px] md:text-xs">IG</span>
                </a>
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <span className="font-label text-[10px] md:text-xs">PT</span>
                </a>
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <span className="font-label text-[10px] md:text-xs">FB</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-container-lowest p-6 md:p-10 rounded-2xl editorial-shadow border border-brand-gold/10">
            <h3 className="font-headline text-xl md:text-2xl text-primary mb-6">Inquiry Form</h3>
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="firstName" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">First Name *</label>
                  <input type="text" id="firstName" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm" required />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="lastName" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Last Name *</label>
                  <input type="text" id="lastName" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="email" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Email Address *</label>
                  <input type="email" id="email" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm" required />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="phone" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Phone Number *</label>
                  <input type="tel" id="phone" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="eventType" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Event Type *</label>
                  <select id="eventType" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm appearance-none" required>
                    <option value="">Select an event...</option>
                    <option value="wedding">Wedding</option>
                    <option value="mehndi">Mehndi / Sangeet</option>
                    <option value="reception">Reception</option>
                    <option value="birthday">Birthday</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="eventDate" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Event Date</label>
                  <input type="date" id="eventDate" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm text-on-surface/70" />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="venue" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Venue / Location</label>
                <input type="text" id="venue" placeholder="City or specific venue if known" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm" />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="message" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Tell us about your vision *</label>
                <textarea id="message" rows={4} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm resize-none" placeholder="Share your ideas, themes, estimated guest count, and any specific requirements..." required></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-maroon text-white py-3.5 md:py-4 rounded-xl font-label text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors editorial-shadow mt-2 md:mt-4">
                Submit Inquiry
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}
