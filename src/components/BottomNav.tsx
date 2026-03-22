import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import React from 'react';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { id: 'atelier', label: 'SERVICES', icon: 'auto_awesome', path: '/services' },
    { id: 'virtual', label: 'VIRTUAL 3D', icon: 'view_in_ar', path: '/#virtual-3d' },
    { id: 'portfolio', label: 'PORTFOLIO', icon: 'menu_book', path: '/portfolio' },
    { id: 'enquire', label: 'ENQUIRE', icon: 'chat_bubble', path: '/contact' },
  ];

  const handleScroll = (e: React.MouseEvent, targetPath: string) => {
    if (targetPath.includes('#')) {
      const [route, id] = targetPath.split('#');
      if (path === route || (route === '/' && path === '/')) {
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="fixed bottom-8 left-6 right-6 z-[100] bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-1.5 lg:hidden transform-gpu"
    >
      <div className="grid grid-cols-4 gap-1 w-full pb-[env(safe-area-inset-bottom,2px)]">
        {navItems.map((item) => {
          const itemPath = item.path.split('#')[0];
          const isActive = path === item.path || (item.path.includes('#') && path === itemPath);
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className={`flex flex-col items-center justify-center py-2.5 rounded-2xl transition-all duration-300 ${
                isActive ? 'bg-brand-gold text-primary shadow-lg scale-95' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] mb-1 ${isActive ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[8px] font-bold tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis px-1 w-full text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
