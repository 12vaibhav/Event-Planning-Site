import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Reset scroll restoration on component mount (reload)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // Check if we have a hash in the URL
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }

    // Always scroll the window to the top instantly on route change
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.style.scrollBehavior = '';

    // Also scroll the main container if it's acting as a scroll area (e.g., Services page)
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.style.scrollBehavior = 'auto';
      mainContainer.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      mainContainer.style.scrollBehavior = '';
    }
  }, [pathname, hash]);

  return null;
}
