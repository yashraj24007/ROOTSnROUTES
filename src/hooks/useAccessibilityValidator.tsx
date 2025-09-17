import { useEffect, useCallback } from 'react';

// Hook for runtime accessibility validation and enhancement
export const useAccessibilityValidator = () => {
  const validateImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    const issues: string[] = [];

    images.forEach((img, index) => {
      // Check for alt text
      if (!img.hasAttribute('alt')) {
        issues.push(`Image ${index + 1}: Missing alt attribute`);
      } else if (img.alt.trim() === '') {
        issues.push(`Image ${index + 1}: Empty alt text`);
      } else if (img.alt.length < 10) {
        issues.push(`Image ${index + 1}: Alt text too short (${img.alt.length} characters)`);
      }

      // Check for loading attribute
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });

    return issues;
  }, []);

  const validateForms = useCallback(() => {
    const forms = document.querySelectorAll('form');
    const issues: string[] = [];

    forms.forEach((form, formIndex) => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach((input, inputIndex) => {
        const inputElement = input as HTMLInputElement;
        
        // Check for labels
        const hasLabel = inputElement.labels && inputElement.labels.length > 0;
        const hasAriaLabel = inputElement.hasAttribute('aria-label');
        const hasAriaLabelledBy = inputElement.hasAttribute('aria-labelledby');
        
        if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
          issues.push(`Form ${formIndex + 1}, Input ${inputIndex + 1}: Missing label or aria-label`);
        }

        // Check for required fields
        if (inputElement.required && !inputElement.hasAttribute('aria-required')) {
          inputElement.setAttribute('aria-required', 'true');
        }

        // Check for error states
        if (inputElement.hasAttribute('aria-invalid') && inputElement.getAttribute('aria-invalid') === 'true') {
          if (!inputElement.hasAttribute('aria-describedby')) {
            issues.push(`Form ${formIndex + 1}, Input ${inputIndex + 1}: Invalid input without error description`);
          }
        }
      });
    });

    return issues;
  }, []);

  const validateHeadings = useCallback(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const issues: string[] = [];
    let hasH1 = false;
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (level === 1) {
        if (hasH1) {
          issues.push(`Multiple H1 elements found (heading ${index + 1})`);
        }
        hasH1 = true;
      }

      // Check for heading hierarchy
      if (previousLevel > 0 && level > previousLevel + 1) {
        issues.push(`Heading ${index + 1}: Skipped heading level (h${previousLevel} to h${level})`);
      }

      previousLevel = level;
    });

    if (!hasH1) {
      issues.push('No H1 element found on page');
    }

    return issues;
  }, []);

  const validateColorContrast = useCallback(() => {
    const issues: string[] = [];
    
    // Get all text elements
    const textElements = document.querySelectorAll('p, span, div, a, button, label, li');
    
    textElements.forEach((element, index) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Skip if transparent or no text content
      if (!element.textContent?.trim() || backgroundColor === 'rgba(0, 0, 0, 0)') {
        return;
      }

      // Simple color contrast check (basic implementation)
      if (color === backgroundColor) {
        issues.push(`Element ${index + 1}: Text and background colors are identical`);
      }
      
      // Check for extremely light text on light backgrounds
      if (color.includes('rgb(255') && backgroundColor.includes('rgb(255')) {
        issues.push(`Element ${index + 1}: Potentially poor contrast (light text on light background)`);
      }
    });

    return issues;
  }, []);

  const validateFocusManagement = useCallback(() => {
    const issues: string[] = [];
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');
      
      // Check for positive tabindex values
      if (tabIndex && parseInt(tabIndex) > 0) {
        issues.push(`Element ${index + 1}: Positive tabindex found (${tabIndex})`);
      }

      // Check for missing focus indicators
      const styles = window.getComputedStyle(element as HTMLElement);
      if (styles.outline === 'none' && !styles.boxShadow.includes('focus')) {
        issues.push(`Element ${index + 1}: Missing focus indicator`);
      }
    });

    return issues;
  }, []);

  const runFullValidation = useCallback(() => {
    const allIssues = [
      ...validateImages(),
      ...validateForms(), 
      ...validateHeadings(),
      ...validateColorContrast(),
      ...validateFocusManagement()
    ];

    if (allIssues.length > 0) {
      console.group('🔍 Accessibility Validation Issues');
      allIssues.forEach(issue => console.warn('⚠️', issue));
      console.groupEnd();
    } else {
      console.log('✅ No accessibility issues found');
    }

    return allIssues;
  }, [validateImages, validateForms, validateHeadings, validateColorContrast, validateFocusManagement]);

  const enhanceAccessibility = useCallback(() => {
    // Auto-enhance images
    validateImages();

    // Auto-enhance forms
    validateForms();

    // Add missing landmarks if needed
    const main = document.querySelector('main');
    if (!main) {
      const content = document.querySelector('.container, .content, #content');
      if (content && !content.hasAttribute('role')) {
        content.setAttribute('role', 'main');
        content.setAttribute('id', 'main-content');
      }
    }

    // Enhance buttons without proper labels
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (!button.hasAttribute('aria-label') && !button.textContent?.trim()) {
        const icon = button.querySelector('svg, i, .icon');
        if (icon) {
          button.setAttribute('aria-label', 'Button');
        }
      }
    });

  }, [validateImages, validateForms]);

  return {
    validateImages,
    validateForms,
    validateHeadings,
    validateColorContrast,
    validateFocusManagement,
    runFullValidation,
    enhanceAccessibility
  };
};

// Hook for accessibility announcements
export const useAccessibilityAnnouncements = () => {
  const announceRouteChange = useCallback((routeName: string) => {
    const announcement = `Navigated to ${routeName} page`;
    
    // Create or update live region
    let liveRegion = document.getElementById('route-announcer');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'route-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = announcement;
    
    // Clear after announcement
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = '';
      }
    }, 1000);
  }, []);

  const announceLoadingState = useCallback((isLoading: boolean, context: string = '') => {
    const message = isLoading 
      ? `Loading${context ? ` ${context}` : ''}...`
      : `${context ? `${context} l` : 'L'}oaded successfully`;
    
    let liveRegion = document.getElementById('loading-announcer');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'loading-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
    
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = '';
      }
    }, 1000);
  }, []);

  return {
    announceRouteChange,
    announceLoadingState
  };
};