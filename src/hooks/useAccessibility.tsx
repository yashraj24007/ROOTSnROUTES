import React, { useEffect, useRef, useState, useCallback } from 'react';

// Hook for keyboard navigation
export const useKeyboardNavigation = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardUser;
};

// Hook for focus management
export const useFocusManagement = () => {
  const focusableElementsString = 
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable]:not([contenteditable="false"])';

  const getFocusableElements = (container: HTMLElement) => {
    return Array.from(container.querySelectorAll(focusableElementsString)) as HTMLElement[];
  };

  const trapFocus = (container: HTMLElement, options?: { 
    initialFocus?: HTMLElement;
    onEscape?: () => void;
    restoreFocus?: boolean;
  }) => {
    const focusableElements = getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === 'Escape' && options?.onEscape) {
        e.preventDefault();
        options.onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    // Set initial focus
    const initialElement = options?.initialFocus || firstElement;
    initialElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus if requested
      if (options?.restoreFocus && previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    };
  };

  return { trapFocus, getFocusableElements };
};

// Hook for dropdown/menu focus management
export const useDropdownFocus = () => {
  const dropdownRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const handleDropdownKeyDown = useCallback((e: KeyboardEvent) => {
    if (!dropdownRef.current) return;

    const focusableElements = dropdownRef.current.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const focusableArray = Array.from(focusableElements);
    const currentIndex = focusableArray.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < focusableArray.length - 1) {
          focusableArray[currentIndex + 1].focus();
        } else {
          focusableArray[0].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          focusableArray[currentIndex - 1].focus();
        } else {
          focusableArray[focusableArray.length - 1].focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        triggerRef.current?.focus();
        break;
      case 'Home':
        e.preventDefault();
        focusableArray[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        focusableArray[focusableArray.length - 1]?.focus();
        break;
    }
  }, []);

  return { dropdownRef, triggerRef, handleDropdownKeyDown };
};

// Hook for announcements to screen readers
export const useAnnouncements = () => {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!liveRegionRef.current) return;

    liveRegionRef.current.setAttribute('aria-live', priority);
    liveRegionRef.current.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = '';
      }
    }, 1000);
  };

  const LiveRegion = () => (
    <div
      ref={liveRegionRef}
      className="live-region sr-only"
      aria-live="polite"
      aria-atomic="true"
    />
  );

  return { announce, LiveRegion };
};

// Hook for skip links
export const useSkipLinks = () => {
  const skipToContent = () => {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    if (main) {
      (main as HTMLElement).focus();
      (main as HTMLElement).scrollIntoView();
    }
  };

  const SkipLink = ({ href = '#main-content', children = 'Skip to main content' }: { href?: string; children?: string }) => (
    <a
      href={href}
      className="skip-nav sr-only-focusable"
      onClick={(e) => {
        e.preventDefault();
        skipToContent();
      }}
    >
      {children}
    </a>
  );

  return { SkipLink, skipToContent };
};

// Hook for keyboard shortcuts
export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = `${e.ctrlKey ? 'Ctrl+' : ''}${e.altKey ? 'Alt+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.key}`;
      
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for focus restoration
export const useFocusRestore = () => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    previousActiveElement.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  };

  return { saveFocus, restoreFocus };
};

// Hook for ARIA live regions
export const useAriaLive = () => {
  const [liveMessage, setLiveMessage] = useState('');
  const [livePriority, setLivePriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setLivePriority(priority);
    setLiveMessage(message);
    
    // Clear message after announcement
    setTimeout(() => setLiveMessage(''), 1000);
  };

  const AriaLiveRegion = () => {
    const ariaLive: "polite" | "assertive" = livePriority;
    return (
      <div
        aria-live={ariaLive}
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {liveMessage}
      </div>
    );
  };

  return { announce, AriaLiveRegion };
};

// Hook for accessible form validation
export const useAccessibleForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string, validators: Array<(value: string) => string | null>) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
        return false;
      }
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const getFieldProps = (name: string) => ({
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onBlur: () => handleBlur(name),
  });

  const getErrorProps = (name: string) => ({
    id: `${name}-error`,
    role: 'alert',
    className: 'form-error',
  });

  return {
    errors,
    touched,
    validateField,
    getFieldProps,
    getErrorProps,
    hasErrors: Object.keys(errors).length > 0,
  };
};