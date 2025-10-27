import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 64, showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Logo - Professional Circular Badge Design */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer Ring - Gradient Border */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none"
          stroke="url(#borderGradient)" 
          strokeWidth="2"
        />
        
        {/* Inner Background Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="44" 
          fill="url(#bgGradient)"
        />

        {/* Mountain Range - Clean Geometric Design */}
        <path
          d="M 20 65 L 35 38 L 50 52 L 65 30 L 80 65 Z"
          fill="url(#mountainGradient)"
          opacity="0.95"
        />
        
        {/* Mountain Highlight */}
        <path
          d="M 35 38 L 50 52 L 42.5 65 Z"
          fill="white"
          opacity="0.1"
        />

        {/* Minimalist Climber Figure */}
        <g transform="translate(50, 48)">
          {/* Body */}
          <circle cx="0" cy="0" r="2.5" fill="#FBBF24" />
          
          {/* Head */}
          <circle cx="0" cy="-5" r="2" fill="#FCD34D" />
          
          {/* Left Arm */}
          <line x1="-1" y1="-1" x2="-3" y2="-6" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Right Arm - Reaching Up */}
          <line x1="1" y1="-1" x2="4" y2="-8" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Legs */}
          <line x1="-1" y1="2" x2="-2" y2="6" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="2" x2="3" y2="5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Climbing Rope */}
          <line x1="4" y1="-8" x2="8" y2="-16" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" strokeDasharray="2,1" opacity="0.7" />
        </g>

        {/* Waterfall Accent Line */}
        <path
          d="M 68 32 L 67 45 L 66.5 58"
          stroke="#60A5FA"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Sun Element */}
        <circle cx="78" cy="28" r="5" fill="#FCD34D" opacity="0.8" />
        <circle cx="78" cy="28" r="7" fill="#FCD34D" opacity="0.2" />

        {/* Base Ground Line */}
        <path
          d="M 18 65 Q 35 63 50 65 T 82 65"
          stroke="url(#groundGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Definitions */}
        <defs>
          {/* Border Gradient */}
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Background Gradient */}
          <radialGradient id="bgGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#065F46" />
          </radialGradient>

          {/* Mountain Gradient */}
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Ground Gradient */}
          <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
            ROOTSnROUTES
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground font-medium tracking-wider">
            Discover Jharkhand
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
