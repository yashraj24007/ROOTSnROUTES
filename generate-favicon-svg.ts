import { writeFileSync } from 'fs';
import { resolve } from 'path';

// SVG content for favicon
const createFaviconSVG = (size: number) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Ring -->
  <circle cx="50" cy="50" r="48" fill="none" stroke="url(#borderGradient)" stroke-width="2"/>
  
  <!-- Inner Background Circle -->
  <circle cx="50" cy="50" r="44" fill="url(#bgGradient)"/>

  <!-- Mountain Range -->
  <path d="M 20 65 L 35 38 L 50 52 L 65 30 L 80 65 Z" fill="url(#mountainGradient)" opacity="0.95"/>
  
  <!-- Mountain Highlight -->
  <path d="M 35 38 L 50 52 L 42.5 65 Z" fill="white" opacity="0.1"/>

  <!-- Climber -->
  <g transform="translate(50, 48)">
    <circle cx="0" cy="0" r="2.5" fill="#FBBF24"/>
    <circle cx="0" cy="-5" r="2" fill="#FCD34D"/>
    <line x1="-1" y1="-1" x2="-3" y2="-6" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="1" y1="-1" x2="4" y2="-8" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="-1" y1="2" x2="-2" y2="6" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="1" y1="2" x2="3" y2="5" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="4" y1="-8" x2="8" y2="-16" stroke="#94A3B8" stroke-width="1" stroke-linecap="round" stroke-dasharray="2,1" opacity="0.7"/>
  </g>

  <!-- Waterfall -->
  <path d="M 68 32 L 67 45 L 66.5 58" stroke="#60A5FA" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>

  <!-- Sun -->
  <circle cx="78" cy="28" r="5" fill="#FCD34D" opacity="0.8"/>
  <circle cx="78" cy="28" r="7" fill="#FCD34D" opacity="0.2"/>

  <!-- Base Ground Line -->
  <path d="M 18 65 Q 35 63 50 65 T 82 65" stroke="url(#groundGradient)" stroke-width="2" stroke-linecap="round" opacity="0.6"/>

  <defs>
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="50%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>

    <radialGradient id="bgGradient" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#064E3B"/>
      <stop offset="100%" stop-color="#065F46"/>
    </radialGradient>

    <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0D9488"/>
      <stop offset="50%" stop-color="#14B8A6"/>
      <stop offset="100%" stop-color="#0D9488"/>
    </linearGradient>
  </defs>
</svg>
`;

// Generate SVG files
const publicDir = resolve(process.cwd(), 'public');

console.log('🎨 Generating ROOTSnROUTES favicon SVG files...');

// Create favicon.svg for modern browsers
writeFileSync(resolve(publicDir, 'favicon.svg'), createFaviconSVG(32));
console.log('✅ Created favicon.svg');

console.log('🎉 Favicon SVG generated successfully!');
console.log('📝 Note: SVG favicons work in modern browsers. For full compatibility, you can convert to PNG/ICO using online tools.');
