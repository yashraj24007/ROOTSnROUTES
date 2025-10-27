const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// SVG template matching the Logo component
const createFaviconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#064E3B"/>
      <stop offset="100%" stop-color="#065F46"/>
    </radialGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="50%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0D9488"/>
      <stop offset="50%" stop-color="#14B8A6"/>
      <stop offset="100%" stop-color="#0D9488"/>
    </linearGradient>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="50" cy="50" r="44" fill="url(#bgGrad)"/>
  
  <!-- Border Ring -->
  <circle cx="50" cy="50" r="48" fill="none" stroke="url(#borderGrad)" stroke-width="2"/>
  
  <!-- Mountain Range -->
  <path d="M 20 65 L 35 38 L 50 52 L 65 30 L 80 65 Z" fill="url(#mountainGrad)" opacity="0.95"/>
  
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
  
  <!-- Ground Line -->
  <path d="M 18 65 Q 35 63 50 65 T 82 65" stroke="url(#groundGrad)" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
</svg>
`;

async function generateFavicons() {
  const publicDir = path.join(__dirname, 'public');
  
  console.log('🎨 Generating ROOTSnROUTES favicons matching header logo...\n');
  
  try {
    // Generate 16x16
    console.log('Creating favicon-16x16.png...');
    await sharp(Buffer.from(createFaviconSVG(16)))
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ Created favicon-16x16.png');
    
    // Generate 32x32
    console.log('Creating favicon-32x32.png...');
    await sharp(Buffer.from(createFaviconSVG(32)))
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ Created favicon-32x32.png');
    
    // Generate 64x64 for .ico
    console.log('Creating favicon.ico...');
    await sharp(Buffer.from(createFaviconSVG(64)))
      .resize(64, 64)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Created favicon.ico');
    
    // Generate 180x180 for Apple
    console.log('Creating apple-touch-icon.png...');
    await sharp(Buffer.from(createFaviconSVG(180)))
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png');
    
    console.log('\n🎉 All favicons generated successfully!');
    console.log('📁 Location: public/ folder');
    console.log('\n🚀 Design features:');
    console.log('   🏔️  Mountain range in emerald green');
    console.log('   🧗 Climber figure in golden amber');
    console.log('   ☀️  Sun with glow effect');
    console.log('   💧 Waterfall accent in blue');
    console.log('   🎨 Gradient border (emerald → teal → amber)');
    console.log('   🌲 Forest green circular background\n');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
