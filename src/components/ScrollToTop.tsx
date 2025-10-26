import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  const isFirstRender = useRef(true);
  const previousPathname = useRef(pathname);
  const scrollRestored = useRef(false);

  useEffect(() => {
    // On first render (page load/refresh), try to restore scroll position
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      // Get saved scroll position for this path
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      
      if (savedPosition && !scrollRestored.current) {
        const position = parseInt(savedPosition, 10);
        
        // Use requestAnimationFrame to ensure DOM is ready
        const restoreScroll = () => {
          requestAnimationFrame(() => {
            // Check if page has enough content to scroll to saved position
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const targetScroll = Math.min(position, maxScroll);
            
            if (maxScroll > 0) {
              window.scrollTo({
                top: targetScroll,
                left: 0,
                behavior: 'auto' // No animation for restoration
              });
              scrollRestored.current = true;
            } else {
              // If content not fully loaded, try again
              setTimeout(restoreScroll, 50);
            }
          });
        };
        
        // Start restoration after a short delay to ensure content is rendered
        setTimeout(restoreScroll, 100);
      }
      return;
    }

    // Save current scroll position before navigation
    if (previousPathname.current !== pathname) {
      sessionStorage.setItem(`scroll-${previousPathname.current}`, window.scrollY.toString());
      scrollRestored.current = false; // Reset for next page
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

  // Save scroll position before page unload and during scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Debounce scroll saving
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
      }, 100);
    };
    
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;