import React, { useState, useEffect, useRef } from 'react';
import styles from './GlowingLine.module.css';

interface GlowingLineProps {
  width?: string | number;
  height?: string | number;
  duration?: number;
  delay?: number;
  className?: string;
  responsive?: boolean; // New prop to enable automatic responsive sizing
}

const GlowingLine: React.FC<GlowingLineProps> = ({
  width,
  height,
  duration = 2000,
  delay = 500,
  className = '',
  responsive = true,
}) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      
      // Set responsive defaults if no explicit width/height provided
      if (responsive && !width) {
        // Let CSS handle responsive width
        element.style.removeProperty('--line-width');
      } else if (width) {
        element.style.setProperty('--line-width', typeof width === 'number' ? `${width}px` : width);
      }
      
      if (responsive && !height) {
        // Let CSS handle responsive height
        element.style.removeProperty('--line-height');
        element.style.removeProperty('--glow-height');
      } else if (height) {
        element.style.setProperty('--line-height', typeof height === 'number' ? `${height}px` : height);
        element.style.setProperty('--glow-height', typeof height === 'number' ? `${height * 3}px` : '24px');
      }
      
      element.style.setProperty('--duration', `${duration}ms`);
    }
  }, [width, height, duration, responsive]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div 
        ref={containerRef}
        className={styles.lineContainer}
      >
        <div 
          className={`${styles.glowEffect} ${isAnimated ? styles.lineAnimated : styles.lineInitial}`}
        />
        <div 
          className={`${styles.glowingLine} ${styles.pulse} ${isAnimated ? styles.lineAnimated : styles.lineInitial}`}
        />
      </div>
    </div>
  );
};

export default GlowingLine;