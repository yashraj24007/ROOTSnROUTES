import { useState, useEffect } from 'react';

// Breakpoints matching Tailwind CSS defaults
const breakpoints = {
  sm: 640,   // Small devices (landscape phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices (large desktops)
  '2xl': 1536 // 2X Extra large devices (larger desktops)
} as const;

type Breakpoint = keyof typeof breakpoints;
type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-desktop';

// Hook for responsive breakpoints
export const useBreakpoint = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAbove = (breakpoint: Breakpoint) => windowWidth >= breakpoints[breakpoint];
  const isBelow = (breakpoint: Breakpoint) => windowWidth < breakpoints[breakpoint];
  const isBetween = (min: Breakpoint, max: Breakpoint) => 
    windowWidth >= breakpoints[min] && windowWidth < breakpoints[max];

  return {
    width: windowWidth,
    isAbove,
    isBelow,
    isBetween,
    // Specific breakpoint checks
    isSm: isAbove('sm'),
    isMd: isAbove('md'),
    isLg: isAbove('lg'),
    isXl: isAbove('xl'),
    is2Xl: isAbove('2xl'),
    // Device categories
    isMobile: isBelow('md'),
    isTablet: isBetween('md', 'lg'),
    isDesktop: isAbove('lg')
  };
};

// Hook for device-specific dimensions
export const useDeviceDimensions = () => {
  const { width, isMobile, isTablet, isDesktop } = useBreakpoint();

  const getDeviceType = (): DeviceType => {
    if (width < breakpoints.md) return 'mobile';
    if (width < breakpoints.lg) return 'tablet';
    if (width < breakpoints['2xl']) return 'desktop';
    return 'large-desktop';
  };

  // Card dimensions based on device
  const getCardDimensions = () => {
    if (isMobile) {
      return {
        width: '100%',
        height: 'auto',
        padding: '1rem',
        gap: '0.75rem',
        fontSize: '0.875rem',
        titleSize: '1.25rem',
        iconSize: '1rem'
      };
    }
    if (isTablet) {
      return {
        width: 'calc(50% - 0.5rem)',
        height: 'auto',
        padding: '1.25rem',
        gap: '1rem',
        fontSize: '1rem',
        titleSize: '1.5rem',
        iconSize: '1.25rem'
      };
    }
    return {
      width: 'calc(33.333% - 0.667rem)',
      height: 'auto',
      padding: '1.5rem',
      gap: '1.25rem',
      fontSize: '1rem',
      titleSize: '1.75rem',
      iconSize: '1.5rem'
    };
  };

  // Container dimensions
  const getContainerDimensions = () => {
    if (isMobile) {
      return {
        maxWidth: '100%',
        padding: '1rem',
        margin: '0'
      };
    }
    if (isTablet) {
      return {
        maxWidth: '768px',
        padding: '2rem',
        margin: '0 auto'
      };
    }
    if (isDesktop) {
      return {
        maxWidth: '1024px',
        padding: '3rem',
        margin: '0 auto'
      };
    }
    return {
      maxWidth: '1280px',
      padding: '4rem',
      margin: '0 auto'
    };
  };

  // Grid configurations
  const getGridConfig = () => {
    if (isMobile) {
      return {
        columns: 1,
        gap: '1rem',
        itemMinWidth: '100%'
      };
    }
    if (isTablet) {
      return {
        columns: 2,
        gap: '1.5rem',
        itemMinWidth: '300px'
      };
    }
    return {
      columns: 3,
      gap: '2rem',
      itemMinWidth: '350px'
    };
  };

  // Typography scaling
  const getTypographyScale = () => {
    if (isMobile) {
      return {
        h1: '2rem',      // 32px
        h2: '1.75rem',   // 28px
        h3: '1.5rem',    // 24px
        h4: '1.25rem',   // 20px
        body: '0.875rem', // 14px
        small: '0.75rem'  // 12px
      };
    }
    if (isTablet) {
      return {
        h1: '2.5rem',    // 40px
        h2: '2rem',      // 32px
        h3: '1.75rem',   // 28px
        h4: '1.5rem',    // 24px
        body: '1rem',    // 16px
        small: '0.875rem' // 14px
      };
    }
    return {
      h1: '3rem',      // 48px
      h2: '2.5rem',    // 40px
      h3: '2rem',      // 32px
      h4: '1.75rem',   // 28px
      body: '1rem',    // 16px
      small: '0.875rem' // 14px
    };
  };

  // Animation variants based on device
  const getAnimationConfig = () => {
    if (isMobile) {
      return {
        duration: 0.3,
        stagger: 0.05,
        scale: 1.02,
        y: 10
      };
    }
    return {
      duration: 0.5,
      stagger: 0.1,
      scale: 1.05,
      y: 20
    };
  };

  return {
    deviceType: getDeviceType(),
    cardDimensions: getCardDimensions(),
    containerDimensions: getContainerDimensions(),
    gridConfig: getGridConfig(),
    typography: getTypographyScale(),
    animation: getAnimationConfig(),
    isMobile,
    isTablet,
    isDesktop
  };
};

// Hook for viewport dimensions
export const useViewportDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    aspectRatio: 0
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({
        width,
        height,
        aspectRatio: width / height
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...dimensions,
    isLandscape: dimensions.aspectRatio > 1,
    isPortrait: dimensions.aspectRatio <= 1,
    isSmallScreen: dimensions.width < 768,
    isLargeScreen: dimensions.width >= 1280
  };
};

// Hook for touch device detection
export const useTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Mobi|Android/i.test(navigator.userAgent)
      );
    };

    checkTouch();
    window.addEventListener('touchstart', checkTouch);
    
    return () => window.removeEventListener('touchstart', checkTouch);
  }, []);

  return isTouchDevice;
};

// Hook for CSS custom properties based on device
export const useDeviceCSS = () => {
  const { cardDimensions, containerDimensions, typography, gridConfig } = useDeviceDimensions();
  
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS custom properties
    root.style.setProperty('--card-padding', cardDimensions.padding);
    root.style.setProperty('--card-gap', cardDimensions.gap);
    root.style.setProperty('--container-max-width', containerDimensions.maxWidth);
    root.style.setProperty('--container-padding', containerDimensions.padding);
    root.style.setProperty('--grid-columns', gridConfig.columns.toString());
    root.style.setProperty('--grid-gap', gridConfig.gap);
    root.style.setProperty('--font-size-h1', typography.h1);
    root.style.setProperty('--font-size-h2', typography.h2);
    root.style.setProperty('--font-size-body', typography.body);
    
  }, [cardDimensions, containerDimensions, typography, gridConfig]);
};