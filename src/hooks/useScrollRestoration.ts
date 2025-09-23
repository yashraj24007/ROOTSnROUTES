import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for intelligent scroll restoration
 * - Saves scroll position before navigation
 * - Restores scroll position on page refresh
 * - Scrolls to top only on actual navigation
 */
export const useScrollRestoration = () => {
  const { pathname } = useLocation();
  const scrollPositions = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Save scroll position for current path
    const saveScrollPosition = () => {
      scrollPositions.current.set(pathname, window.scrollY);
      sessionStorage.setItem('scrollPositions', JSON.stringify(Array.from(scrollPositions.current.entries())));
    };

    // Restore scroll positions from sessionStorage on app start
    const restoreScrollPositions = () => {
      const saved = sessionStorage.getItem('scrollPositions');
      if (saved) {
        try {
          const entries = JSON.parse(saved);
          scrollPositions.current = new Map(entries);
        } catch (error) {
          console.warn('Failed to parse saved scroll positions:', error);
        }
      }
    };

    // Initialize on first load
    if (scrollPositions.current.size === 0) {
      restoreScrollPositions();
    }

    // Set up scroll saving
    const handleScroll = () => {
      scrollPositions.current.set(pathname, window.scrollY);
    };

    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveScrollPosition();
    };
  }, [pathname]);

  // Function to restore scroll position for current path
  const restoreScrollPosition = () => {
    const position = scrollPositions.current.get(pathname) || 0;
    window.scrollTo({
      top: position,
      left: 0,
      behavior: 'auto'
    });
  };

  // Function to scroll to top (for navigation)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return {
    restoreScrollPosition,
    scrollToTop,
    currentPosition: scrollPositions.current.get(pathname) || 0
  };
};