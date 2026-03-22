/**
 * Contact Page
 * 
 * Fully functional contact form that submits to Supabase.
 * No authentication required for contact form submission.
 */
import React, { useState } from 'react';
import { submitContactForm } from '../lib/data-service';
import type { ContactFormData } from '../lib/validation';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData: ContactFormData = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      eventType: (form.elements.namedItem('eventType') as HTMLSelectElement).value as ContactFormData['eventType'],
      eventDate: (form.elements.namedItem('eventDate') as HTMLInputElement).value || undefined,
      venue: (form.elements.namedItem('venue') as HTMLInputElement).value || undefined,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSuccess(true);
        form.reset();
      } else {
        setError(result.error || 'Failed to submit your inquiry');
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="relative w-full h-auto flex items-center justify-center overflow-hidden bg-surface mt-12 md:mt-14 pt-10 pb-4 md:pt-16 md:pb-10">
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
            
            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-green-600 mt-0.5">check_circle</span>
                <div>
                  <p className="font-bold text-sm">Thank you for reaching out!</p>
                  <p className="text-xs mt-1">We've received your inquiry and will get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Global Error */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="firstName" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">First Name *</label>
                  <input type="text" id="firstName" name="firstName" className={`w-full bg-surface border ${fieldErrors.firstName ? 'border-red-400' : 'border-outline-variant'} rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm`} required />
                  {fieldErrors.firstName && <p className="text-red-500 text-xs">{fieldErrors.firstName}</p>}
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="lastName" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" className={`w-full bg-surface border ${fieldErrors.lastName ? 'border-red-400' : 'border-outline-variant'} rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm`} required />
                  {fieldErrors.lastName && <p className="text-red-500 text-xs">{fieldErrors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="email" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Email Address *</label>
                  <input type="email" id="email" name="email" className={`w-full bg-surface border ${fieldErrors.email ? 'border-red-400' : 'border-outline-variant'} rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm`} required />
                  {fieldErrors.email && <p className="text-red-500 text-xs">{fieldErrors.email}</p>}
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="phone" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" className={`w-full bg-surface border ${fieldErrors.phone ? 'border-red-400' : 'border-outline-variant'} rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm`} required />
                  {fieldErrors.phone && <p className="text-red-500 text-xs">{fieldErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="eventType" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Event Type *</label>
                  <select id="eventType" name="eventType" className={`w-full bg-surface border ${fieldErrors.eventType ? 'border-red-400' : 'border-outline-variant'} rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm appearance-none`} required>
                    <option value="">Select an event...</option>
                    <option value="wedding">Wedding</option>
                    <option value="mehndi">Mehndi / Sangeet</option>
                    <option value="reception">Reception</option>
                    <option value="birthday">Birthday</option>
                    <option value="other">Other</option>
                  </select>
                  {fieldErrors.eventType && <p className="text-red-500 text-xs">{fieldErrors.eventType}</p>}
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label htmlFor="eventDate" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Event Date</label>
                  <input type="date" id="eventDate" name="eventDate" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm text-on-surface/70" />
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="venue" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Venue / Location</label>
                <input type="text" id="venue" name="venue" placeholder="City or specific venue if known" className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm" />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="message" className="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface/70">Tell us about your vision *</label>
                <textarea id="message" name="message" rows={4} className={`w-full bg-surface border ${fieldErrors.message ? 'border-red-400' : 'border-outline-variant'} rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors font-body text-sm resize-none`} placeholder="Share your ideas, themes, estimated guest count, and any specific requirements..." required></textarea>
                {fieldErrors.message && <p className="text-red-500 text-xs">{fieldErrors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-maroon text-white py-3.5 md:py-4 rounded-xl font-label text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-primary transition-colors editorial-shadow mt-2 md:mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}
