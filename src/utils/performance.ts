/**
 * Performance monitoring utilities for ROOTSnROUTES
 */

// Image loading performance tracker
export const trackImagePerformance = (imageSrc: string) => {
  const img = new Image();
  const startTime = performance.now();
  
  img.onload = () => {
    const loadTime = performance.now() - startTime;
    console.log(`Image loaded in ${loadTime.toFixed(2)}ms: ${imageSrc}`);
  };
  
  img.onerror = () => {
    console.warn(`Failed to load image: ${imageSrc}`);
  };
  
  img.src = imageSrc;
};

// Preload critical images
export const preloadCriticalImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Lazy load images with Intersection Observer
export const createImageObserver = () => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        entry.target.classList.remove('lazy-loading');
        entry.target.classList.add('lazy-loaded');
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
};

// Performance metrics
export const measurePerformance = (name: string, fn: () => void) => {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  console.log(`${name} took ${endTime - startTime} milliseconds`);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize video loading based on connection speed
export const getOptimalVideoQuality = () => {
  if ('connection' in navigator) {
    const connection = (navigator as Navigator & {
      connection?: {
        effectiveType?: string;
      };
    }).connection;
    if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
      return 'low';
    } else if (connection?.effectiveType === '3g') {
      return 'medium';
    }
  }
  return 'high';
};

// Debounce function for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};