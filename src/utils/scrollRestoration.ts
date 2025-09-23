// Global scroll restoration setup
// This script enables browser's built-in scroll restoration for better UX

// Enable browser's scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Store scroll positions in session storage
const storeScrollPosition = () => {
  sessionStorage.setItem('scrollY', window.scrollY.toString());
  sessionStorage.setItem('scrollPath', window.location.pathname);
};

// Restore scroll position if on same path
const restoreScrollPosition = () => {
  const storedPath = sessionStorage.getItem('scrollPath');
  const storedScrollY = sessionStorage.getItem('scrollY');
  
  if (storedPath === window.location.pathname && storedScrollY) {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo(0, parseInt(storedScrollY, 10));
    });
  }
};

// Store position before page unload
window.addEventListener('beforeunload', storeScrollPosition);

// Restore position after page load
window.addEventListener('DOMContentLoaded', restoreScrollPosition);

// Also try on load event as fallback
window.addEventListener('load', restoreScrollPosition);

export {};