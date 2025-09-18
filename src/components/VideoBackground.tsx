import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import styles from './VideoBackground.module.css';

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  className?: string;
  children?: React.ReactNode;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", // Sample waterfall video
  fallbackImage = "/src/assets/jharkhand-hero.jpg",
  className = "",
  children,
  showControls = true,
  autoPlay = true,
  muted = true,
  overlay = true,
  overlayOpacity = 0.4,
}) => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [autoPlay]);

  useEffect(() => {
    // Update CSS custom properties for overlay gradients
    if (overlayRef.current) {
      const lightGradient = `linear-gradient(135deg, rgba(232, 245, 232, ${overlayOpacity}) 0%, rgba(230, 243, 255, ${overlayOpacity * 0.8}) 50%, rgba(255, 229, 204, ${overlayOpacity * 0.6}) 100%)`;
      const darkGradient = `linear-gradient(135deg, rgba(42, 74, 42, ${overlayOpacity}) 0%, rgba(26, 43, 61, ${overlayOpacity * 0.8}) 50%, rgba(61, 42, 26, ${overlayOpacity * 0.6}) 100%)`;
      
      overlayRef.current.style.setProperty('--overlay-gradient-light', lightGradient);
      overlayRef.current.style.setProperty('--overlay-gradient-dark', darkGradient);
    }
  }, [overlayOpacity, theme]);

  useEffect(() => {
    // Update fallback image
    if (fallbackRef.current) {
      fallbackRef.current.style.backgroundImage = `url(${fallbackImage})`;
    }
  }, [fallbackImage]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  return (
    <div className={`${styles.videoContainer} ${className}`}>
      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          className={`${styles.video} ${videoLoaded ? styles.videoLoaded : styles.videoNotLoaded}`}
          autoPlay={autoPlay}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          poster={fallbackImage}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image */}
      <div
        ref={fallbackRef}
        className={`${styles.fallbackImage} ${
          videoLoaded && !videoError ? styles.fallbackHidden : styles.fallbackVisible
        }`}
      />

      {/* Gradient Overlay */}
      {overlay && (
        <div
          ref={overlayRef}
          className={`${styles.overlay} ${
            theme === 'dark' ? styles.overlayDark : styles.overlayLight
          }`}
        />
      )}

      {/* Tourism-themed animated elements */}
      <div className={styles.particlesContainer}>
        <div className={`${styles.particle1} ${
          theme === 'dark' ? styles.particleWaterfallDark : styles.particleWaterfall
        }`} />
        <div className={`${styles.particle2} ${
          theme === 'dark' ? styles.particleForestDark : styles.particleForest
        }`} />
        <div className={`${styles.particle3} ${
          theme === 'dark' ? styles.particleSunsetDark : styles.particleSunset
        }`} />
      </div>

      {/* Video Controls */}
      {showControls && videoLoaded && !videoError && (
        <div className={styles.controls}>
          <Button
            onClick={togglePlay}
            size="sm"
            variant="ghost"
            className="
              bg-pastel-cloud/80 dark:bg-pastel-cloud-dark/80
              hover:bg-pastel-mint/90 dark:hover:bg-pastel-mint-dark/90
              text-tourism-forest dark:text-tourism-forest-dark
              backdrop-blur-sm border border-pastel-sage/50 dark:border-pastel-sage-dark/50
              h-10 w-10 p-0
              transition-all duration-300 ease-smooth
              hover:scale-105 active:scale-95
            "
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            onClick={toggleMute}
            size="sm"
            variant="ghost"
            className="
              bg-pastel-cloud/80 dark:bg-pastel-cloud-dark/80
              hover:bg-pastel-mint/90 dark:hover:bg-pastel-mint-dark/90
              text-tourism-forest dark:text-tourism-forest-dark
              backdrop-blur-sm border border-pastel-sage/50 dark:border-pastel-sage-dark/50
              h-10 w-10 p-0
              transition-all duration-300 ease-smooth
              hover:scale-105 active:scale-95
            "
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;