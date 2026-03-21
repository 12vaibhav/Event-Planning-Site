import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const portfolioItems = [
  {
    id: 1,
    category: 'Mehndi Ceremony',
    title: 'Ayesha & Kabir',
    location: 'Udaipur, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-6eDAXj46iGP_S5VSr2U9N42AcEJ1wJajaJ_s41ZEcoXXZxDBDC1mLuy1a4hKiea_BoHD2hVgpzgsi4vQXly2Gm0vzRo8zX_RWgk3nqo2jf29Jfak96MVohPISrbsHcZY0vfYAxh_aeBIEk0176V6DvcZzLBqJuO4Z58xqTeBMjp1v_qEuYVMS-RJ-7BzCvhqETKd2ihSo7nutiZ4ji0BiyuOaYDkSyEktG-tjoCdnb19jf9ye62DlL_UiuwcusHyyOa1kOyw7tIR',
    description: 'A vibrant and colorful Mehndi celebration featuring traditional marigold installations, custom seating arrangements, and interactive food stations. The design focused on creating a playful and joyous atmosphere for the couple and their guests.'
  },
  {
    id: 2,
    category: 'Reception',
    title: 'The Malhotra Legacy',
    location: 'Mumbai, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYI1qxZLaN1E1mX5Oy3Ril7Rr7og1h6n-jEi2N18O99u0cVj65SZkFpaV7RbAP3gBDtZaEf8eyJfhpDhe8hkajIWsp99-40FAZdYmhMJM837IbddIT9X4ie9cV_3mwgYRvz53vhZGCI8xAhwegmVQ-mFOhiJmYvwriFGdVQKw92wpI5muymDFPEIPxXccNsABWlMyVoRVKu_6jrfrkgJvzaK8U53POreUsNz0kDL3BC8BCu4q7VpPcsfekc-fmZ1L35lv2LWjTKg8k',
    description: 'A grand reception characterized by its opulent floral arrangements, crystal chandeliers, and a sophisticated color palette of white, gold, and deep emerald. The stage design was a masterpiece of architectural floral work.'
  },
  {
    id: 3,
    category: 'Grand Entry',
    title: 'Saanvi & Rohan',
    location: 'Jaipur, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6b0Fl-Q5n0abm3TvUGOsqmk6hDlATzwysDp9dHdJpB-4Vh_j4DoSGsL3kGO-Ri2c6wCfNAoZOwfxy7z35Cp2UIPzEL3RSIC4Uaxp8X8rX2J9rgaPZ3Nlgc2QAYpNU3DFXaoY8ial26KVvhbrokkE1QTVGNtZvyzRbCnBksFnAGI5uzhIwXip-dppQmI5MoxYdHO9auEs7sRiwDE4eSuakdb6cvxOg0M0hJGJNaMXyF_IyWXnSV0zOzgDbfwC8FeAel9N9O5zSzS6i',
    description: 'A cinematic bride and groom entry featuring cold pyro effects, a floral canopy, and traditional musicians. The lighting was carefully choreographed to highlight the couple as they made their way to the mandap.'
  },
  {
    id: 4,
    category: 'Birthday',
    title: 'Aria\'s First Jubilee',
    location: 'Delhi, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOBX2EjYByhtsCdpuZIFdSDH4RC_0XogQKf0BCz4XHNyPVHhhgGA6fmCexvUbIGp_t_Rs9xMwVQib-3wCXAbz68HX-qCPWU6Y10Cyxet5Z3jI4BXRzdhVVDX4xPaBOIr1n32stZHlv0K1mKA9sFvm8Nc1QJ7kpEL_PrjfZcZ6TuHslruIPtTU4f65_HdTSWNM4k0a9kkLADoGRMY8z_kDlYMBhVgnfqOu6xzGkkroiQPofKwaOqe2qrYYTZxHKvNblqN7NHQNzexNa',
    description: 'A whimsical and elegant first birthday party with a pastel floral theme, custom dessert carts, and interactive play areas designed to look like a magical garden.'
  },
  {
    id: 5,
    category: 'Sangeet',
    title: 'Neon Nights Celebration',
    location: 'Goa, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFICy--4C9zafjvyN3t_O2BZKFSp4tORRHu8wUH8Co1tbuH5j5Nr-VLU6QTR48rbU8n4W_VnLF-2iuuaHjSY5oqPCXWrjpxlLVGEGQ5QGz6OUaCvP-eYqKfbK4qNSNC6S3_iNNWwVtB_7FEMuadNX0BbrXrMxLffnotHOs3LdW9oCooatTmJ1mvvKrSIFz8LZMeq1jOiULfRUcM8qorPtCvmR_R6FW2r2ydF2ViL3DT8gRtoGgc9LSKkZ175eSO--Jd2fbC2jiA_jE',
    description: 'A high-energy Sangeet night featuring a custom LED dance floor, neon signage, and contemporary floral installations that glowed under UV light.'
  },
  {
    id: 6,
    category: 'Family Ceremony',
    title: 'The Gupta Soirée',
    location: 'Agra, 2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zjSTC4D7d9Zjj3BLIo-BCgj7NrVNuutWVCZ59PUuRzpfW9NJuS_He6aY3f_zHpE2mLfYQzx4J1eYkW9vJRYzGUZ58ZaXIuNRx5HiQ1nbL6MD0swgESyY6gg_IKQRJD2LtTWX-jttoq_egDK1n-06_VHjFhaF8vxx-HpwWrmVqAu1NNhHYgEpnXu1v3LJkhJT9rqweEH3lLNHeHNvdnQbkv74F2VrGaeqMn4vFxWhqoutGXrMNWoS5IUew01QVKGn5OJCPivNLGc2',
    description: 'An intimate family gathering set in a heritage courtyard. The design utilized traditional brass elements, deep red roses, and hundreds of diyas to create a warm, sacred atmosphere.'
  },
  {
    id: 7,
    category: 'Details',
    title: 'Ethereal Florals',
    location: 'Private Estate, 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTibaLA9PuziofVfpImdgHDnee6U_2J1banFUJua4_87MRkSS0_pMNEUzgHg6H-ppCnHOXeOJ-eKLf0v1U-DflLqd4MtfNTGtIRlIn0YdvCElPlmuN4G_Zkgm2IeBjTlPhpFZZJSPka0TsKjpwUE66Ckn6opiNpQ--4lzW1WQea9sMjyRAq8f1nVOD1AVWJ4pekASjRIdnkAhPvJLAEGt-M6UAY19LVdYlj3fy5A3HpOHhdXk5bvERiDDjwsnNbY2_AECu0fggn3n8',
    description: 'A close-up look at our signature floral styling, featuring a mix of imported orchids and local jasmine, arranged to create a cascading, organic feel.'
  },
  {
    id: 8,
    category: 'Wedding',
    title: 'Floral Mandap',
    location: 'Jaipur, 2024',
    image: 'https://picsum.photos/seed/wedding-decor-1/800/600',
    description: 'A breathtaking floral mandap designed with thousands of fresh roses and marigolds, creating a sacred and vibrant space for the wedding vows.'
  },
  {
    id: 9,
    category: 'Reception',
    title: 'Grand Entrance',
    location: 'Mumbai, 2024',
    image: 'https://picsum.photos/seed/wedding-decor-2/800/600',
    description: 'A dramatic grand entrance featuring a custom-built floral archway and elegant lighting, setting the tone for an opulent reception.'
  },
  {
    id: 10,
    category: 'Mehndi',
    title: 'Traditional Setup',
    location: 'Udaipur, 2024',
    image: 'https://picsum.photos/seed/wedding-decor-3/800/600',
    description: 'A traditional Mehndi setup with vibrant colors, intricate fabric drapes, and comfortable floor seating for a relaxed and festive atmosphere.'
  },
  {
    id: 11,
    category: 'Sangeet',
    title: 'Lighting Design',
    location: 'Goa, 2024',
    image: 'https://picsum.photos/seed/wedding-decor-4/800/600',
    description: 'A stunning Sangeet lighting design featuring fairy lights, chandeliers, and spotlights that highlight the dance floor and stage.'
  },
  {
    id: 12,
    category: 'Wedding',
    title: 'Outdoor Decor',
    location: 'Agra, 2024',
    image: 'https://picsum.photos/seed/wedding-decor-5/800/600',
    description: 'A romantic outdoor wedding setup with elegant drapes, floral centerpieces, and a clear view of the heritage courtyard.'
  },
  {
    id: 13,
    category: 'Reception',
    title: 'Table Styling',
    location: 'Delhi, 2024',
    image: 'https://picsum.photos/seed/wedding-decor-6/800/600',
    description: 'Sophisticated table styling with premium linens, crystal glassware, and custom floral arrangements for an unforgettable reception dinner.'
  }
];

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
    setTimeout(() => {
      loadMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <>
      <header className="relative w-full h-[50vh] md:h-[716px] flex items-center justify-center overflow-hidden bg-primary-container mt-16 md:mt-20">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img alt="Grand Indian wedding decor with gold and maroon accents" className="w-full h-full object-cover scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATT-U1DS7ziCqjWnDObdomSkYD-DLKO-5hH58wWkax8lOFEvskqIh4iOFQCh1LgYAjlZMQRAuPq_WidD4oj4rttM8oJ_ceqCcsB3XotAuL2gFSo2NouxcKX_rQQDKXKc20lVQEQbjP_4gJicqvfdNmDMl_vFHX30qZPtrE9Jk2W7omvJjSX1sS2SpISQj-S7eUdJHcXjzeUerjci3hFb9G3QVT6Nnn8otDVqzQfqWsTUYX68B-bse0rdYO6PEQPav_5CEnnUxMmpCJ"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-surface"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="block font-label text-white/80 text-[10px] md:text-xs tracking-[0.2rem] md:tracking-[0.3rem] uppercase mb-3 md:mb-4">A Legacy of Celebration</span>
          <h1 className="font-headline text-4xl md:text-8xl text-white mb-4 md:mb-6 leading-tight tracking-tighter">Our Magical Creations</h1>
          <p className="font-body text-white/90 text-sm md:text-xl font-light tracking-wide max-w-2xl mx-auto italic">
            Real Weddings • Mehndi • Sangeet • Grand Entries • Birthdays & Family Events
          </p>
        </div>
        <div className="absolute bottom-10 right-10 text-secondary opacity-20 hidden lg:block">
          <span className="material-symbols-outlined text-9xl" style={{fontVariationSettings: "'FILL' 0"}}>filter_vintage</span>
        </div>
      </header>

      <section className="sticky top-16 md:top-20 z-40 bg-surface/95 backdrop-blur-md py-3 md:py-4 px-4 md:px-8 shadow-sm border-b border-brand-gold/10 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 min-w-max md:min-w-0">
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 border-b-2 border-primary text-primary font-bold">All</button>
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 text-on-surface/60 hover:text-primary transition-colors">Wedding</button>
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 text-on-surface/60 hover:text-primary transition-colors">Mehndi & Sangeet</button>
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 text-on-surface/60 hover:text-primary transition-colors">Ladies Sangeet</button>
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 text-on-surface/60 hover:text-primary transition-colors">Bride & Groom Entry</button>
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 text-on-surface/60 hover:text-primary transition-colors">Birthday</button>
          <button className="whitespace-nowrap font-label text-[10px] md:text-xs tracking-widest uppercase px-3 md:px-4 py-2 text-on-surface/60 hover:text-primary transition-colors">Family Ceremony</button>
        </div>
      </section>

      <main className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <div className="masonry-grid gap-4 md:gap-8">
          {portfolioItems.slice(0, visibleCount).map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              ref={index === visibleCount - 6 ? loadMoreRef : null}
              className="masonry-item group relative overflow-hidden rounded-md cursor-pointer editorial-shadow mb-4 md:mb-8" 
              onClick={() => setSelectedItem(item)}
            >
              <img alt={item.title} className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src={item.image}/>
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-8 text-white">
                <span className="font-label text-[8px] md:text-[10px] tracking-widest uppercase mb-1 md:mb-2">{item.category}</span>
                <h3 className="font-headline text-lg md:text-2xl mb-1">{item.title}</h3>
                <p className="font-body text-[10px] md:text-sm opacity-80 mb-4 md:mb-6">{item.location}</p>
                <button className="w-fit font-label text-[8px] md:text-[10px] tracking-widest uppercase border border-white/40 px-3 md:px-4 py-1.5 md:py-2 hover:bg-white hover:text-primary transition-colors">View Details</button>
              </div>
            </motion.div>
          ))}
        </div>
        {visibleCount < portfolioItems.length && (
          <div className="mt-12 md:mt-20 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-3 md:gap-4 bg-transparent border border-secondary text-secondary px-8 md:px-10 py-3 md:py-4 rounded-full font-label text-[10px] md:text-xs tracking-[0.15rem] md:tracking-[0.2rem] uppercase font-bold hover:bg-secondary hover:text-white transition-all duration-500"
            >
              Load More Magic
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        )}
      </main>

      <section className="py-16 md:py-24 bg-surface-container-low overflow-hidden relative">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-secondary/10 pointer-events-none">
          <span className="material-symbols-outlined text-[10rem] md:text-[20rem]">filter_vintage</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="font-headline text-3xl md:text-6xl text-primary mb-6 md:mb-8 leading-tight">Want This Magic for Your Event?</h2>
          <p className="font-body text-on-surface/70 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto">
            Every story is unique. Let us curate an experience that echoes your soul and celebrates your legacy with timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link to="/contact" className="w-full sm:w-auto bg-primary text-on-primary px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-label text-[10px] md:text-xs tracking-widest uppercase font-bold hover:scale-105 transition-all duration-300 editorial-shadow flex items-center justify-center">
              Get Free Quote
            </Link>
            <button className="w-full sm:w-auto bg-surface-container-lowest text-primary border border-primary/20 px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-label text-[10px] md:text-xs tracking-widest uppercase font-bold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-base">chat_bubble</span>
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-surface w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 left-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors md:hidden">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-on-surface/50 hover:text-primary transition-colors hidden md:block">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <span className="font-label text-xs tracking-widest uppercase text-brand-gold mb-4">{selectedItem.category}</span>
              <h2 className="font-headline text-4xl text-primary mb-2">{selectedItem.title}</h2>
              <p className="font-body text-sm text-on-surface/60 mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {selectedItem.location}
              </p>
              <p className="font-body text-on-surface/80 leading-relaxed mb-10">
                {selectedItem.description}
              </p>
              <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:bg-brand-maroon transition-colors w-fit flex items-center justify-center">
                Inquire About This Design
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
