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
    <nav className="fixed bottom-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg px-2 py-2 flex items-center justify-between lg:hidden">
      {navItems.map((item) => {
        const itemPath = item.path.split('#')[0];
        const isActive = path === item.path || (item.path.includes('#') && path === itemPath);
        
        return (
          <Link
            key={item.id}
            to={item.path}
            onClick={(e) => handleScroll(e, item.path)}
            className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all flex-1 ${
              isActive ? 'bg-brand-maroon text-white shadow-md' : 'text-primary/60 hover:text-brand-maroon'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[9px] font-bold tracking-tight uppercase whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
