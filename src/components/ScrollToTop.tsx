import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  const isFirstRender = useRef(true);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // On first render (page load/refresh), try to restore scroll position
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      // Get saved scroll position for this path
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      
      if (savedPosition) {
        // Delay restoration to ensure content is loaded
        setTimeout(() => {
          const position = parseInt(savedPosition, 10);
          window.scrollTo({
            top: position,
            left: 0,
            behavior: 'auto' // No animation for restoration
          });
        }, 100);
      }
      return;
    }

    // Save current scroll position before navigation
    if (previousPathname.current !== pathname) {
      sessionStorage.setItem(`scroll-${previousPathname.current}`, window.scrollY.toString());
    }

    // Check if this is a real navigation (not a refresh)
    const isNavigation = previousPathname.current !== pathname;
    
    if (isNavigation) {
      // Scroll to top for new page navigation
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    previousPathname.current = pathname;
  }, [pathname, key]);

  // Save scroll position before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;