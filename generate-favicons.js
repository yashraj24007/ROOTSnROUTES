const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

function drawFavicon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const scale = size / 100;
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Background circle with gradient
    const bgGradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    bgGradient.addColorStop(0, '#064E3B');
    bgGradient.addColorStop(1, '#065F46');
    
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2.2, 0, Math.PI * 2);
    ctx.fillStyle = bgGradient;
    ctx.fill();
    
    // Border gradient
    const borderGradient = ctx.createLinearGradient(0, 0, size, size);
    borderGradient.addColorStop(0, '#059669');
    borderGradient.addColorStop(0.5, '#0D9488');
    borderGradient.addColorStop(1, '#D97706');
    
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2.1, 0, Math.PI * 2);
    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = size * 0.04;
    ctx.stroke();
    
    // Mountains
    const mountainGradient = ctx.createLinearGradient(0, 0, 0, size);
    mountainGradient.addColorStop(0, '#10B981');
    mountainGradient.addColorStop(1, '#047857');
    
    ctx.beginPath();
    ctx.moveTo(size * 0.2, size * 0.65);
    ctx.lineTo(size * 0.35, size * 0.38);
    ctx.lineTo(size * 0.5, size * 0.52);
    ctx.lineTo(size * 0.65, size * 0.3);
    ctx.lineTo(size * 0.8, size * 0.65);
    ctx.closePath();
    ctx.fillStyle = mountainGradient;
    ctx.globalAlpha = 0.95;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Sun
    ctx.beginPath();
    ctx.arc(size * 0.78, size * 0.28, size * 0.05, 0, Math.PI * 2);
    ctx.fillStyle = '#FCD34D';
    ctx.globalAlpha = 0.8;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(size * 0.78, size * 0.28, size * 0.07, 0, Math.PI * 2);
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Climber (for larger sizes)
    if (size >= 32) {
        // Body
        ctx.beginPath();
        ctx.arc(size * 0.5, size * 0.48, size * 0.025, 0, Math.PI * 2);
        ctx.fillStyle = '#FBBF24';
        ctx.fill();
        
        // Head
        ctx.beginPath();
        ctx.arc(size * 0.5, size * 0.43, size * 0.02, 0, Math.PI * 2);
        ctx.fillStyle = '#FCD34D';
        ctx.fill();
        
        // Arms
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = size * 0.015;
        ctx.lineCap = 'round';
        
        // Reaching arm
        ctx.beginPath();
        ctx.moveTo(size * 0.51, size * 0.47);
        ctx.lineTo(size * 0.54, size * 0.4);
        ctx.stroke();
    }
    
    // Waterfall accent
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = size * 0.015;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(size * 0.68, size * 0.32);
    ctx.lineTo(size * 0.67, size * 0.45);
    ctx.lineTo(size * 0.665, size * 0.58);
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    return canvas;
}

async function generateFavicons() {
    const publicDir = path.join(__dirname, 'public');
    
    console.log('🎨 Generating ROOTSnROUTES favicons...');
    
    // Generate 16x16
    const favicon16 = drawFavicon(16);
    fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), favicon16.toBuffer('image/png'));
    console.log('✅ Created favicon-16x16.png');
    
    // Generate 32x32
    const favicon32 = drawFavicon(32);
    fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), favicon32.toBuffer('image/png'));
    console.log('✅ Created favicon-32x32.png');
    
    // Generate 64x64 (for .ico)
    const favicon64 = drawFavicon(64);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon64.toBuffer('image/png'));
    console.log('✅ Created favicon.ico');
    
    // Generate 180x180 (Apple touch icon)
    const favicon180 = drawFavicon(180);
    fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), favicon180.toBuffer('image/png'));
    console.log('✅ Created apple-touch-icon.png');
    
    console.log('🎉 All favicons generated successfully!');
}

generateFavicons().catch(console.error);
