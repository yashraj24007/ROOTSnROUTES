import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  Info
} from 'lucide-react';

interface Panoramic360ViewerProps {
  imageUrl: string;
  onClose: () => void;
  itemName: string;
  itemType: string;
  description?: string;
}

const Panoramic360Viewer: React.FC<Panoramic360ViewerProps> = ({
  imageUrl,
  onClose,
  itemName,
  itemType,
  description
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrameRef = useRef<number>();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Load panoramic image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
      drawPanorama();
    };
    img.onerror = () => {
      console.error('Failed to load panoramic image');
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Animation loop for auto-rotation
  useEffect(() => {
    if (isAutoRotating && isLoaded) {
      const animate = () => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.2 // Slow rotation
        }));
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoRotating, isLoaded]);

  // Draw panorama on canvas
  const drawPanorama = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Apply zoom and rotation
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoom, zoom);
    ctx.rotate((rotation.y * Math.PI) / 180);
    
    // Draw panoramic image with perspective effect
    const sourceWidth = image.width;
    const sourceHeight = image.height;
    
    // Calculate visible portion based on rotation
    const normalizedRotationY = ((rotation.y % 360) + 360) % 360;
    const sourceX = (normalizedRotationY / 360) * sourceWidth;
    
    // Draw main section
    const sectionWidth = sourceWidth / 3; // Show 1/3 of image width
    const drawWidth = width / zoom;
    const drawHeight = height / zoom;
    
    ctx.drawImage(
      image,
      sourceX, 0, sectionWidth, sourceHeight,
      -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight
    );
    
    // Draw wrap-around if needed
    if (sourceX + sectionWidth > sourceWidth) {
      const overflowWidth = (sourceX + sectionWidth) - sourceWidth;
      ctx.drawImage(
        image,
        0, 0, overflowWidth, sourceHeight,
        drawWidth / 2 - (overflowWidth / sectionWidth) * drawWidth, -drawHeight / 2,
        (overflowWidth / sectionWidth) * drawWidth, drawHeight
      );
    }
    
    ctx.restore();
    
    // Draw hotspots/points of interest
    drawHotspots(ctx, width, height);
  }, [zoom, rotation]);

  // Draw interactive hotspots
  const drawHotspots = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const hotspots = [
      { x: 0.3, y: 0.4, label: 'Main View', type: 'info' },
      { x: 0.7, y: 0.3, label: 'Detail', type: 'zoom' },
      { x: 0.5, y: 0.6, label: 'Features', type: 'feature' }
    ];

    hotspots.forEach(hotspot => {
      const x = hotspot.x * width;
      const y = hotspot.y * height;
      
      // Pulsating circle
      const time = Date.now() / 1000;
      const radius = 8 + Math.sin(time * 3) * 2;
      
      ctx.save();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner dot
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  };

  // Redraw when rotation or zoom changes
  useEffect(() => {
    if (isLoaded) {
      drawPanorama();
    }
  }, [drawPanorama, isLoaded]);

  // Mouse/touch event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.2)), // Limit vertical rotation
      y: prev.y + deltaX * 0.3
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setIsAutoRotating(false);
      setLastMouse({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouse.x;
    const deltaY = touch.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.2)),
      y: prev.y + deltaX * 0.3
    }));
    
    setLastMouse({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.2));
  };

  // Reset view
  const handleReset = () => {
    setZoom(1);
    setRotation({ x: 0, y: 0 });
    setIsAutoRotating(true);
  };

  // Fullscreen
  const handleFullscreen = () => {
    if (canvasRef.current) {
      canvasRef.current.requestFullscreen?.();
    }
  };

  const getItemEmoji = (type: string) => {
    switch (type) {
      case 'destination': return '🏔️';
      case 'marketplace': return '🎨';
      case 'restaurant': return '🍽️';
      case 'hotel': return '🏨';
      default: return '📍';
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getItemEmoji(itemType)}</span>
            <div>
              <h3 className="text-white font-semibold text-lg">{itemName}</h3>
              <p className="text-emerald-400 text-sm">360° Immersive View</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowInfo(!showInfo)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Info className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 160}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <RotateCw className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-lg">Loading 360° experience...</p>
            </div>
          </div>
        )}

        {/* Info Panel */}
        {showInfo && description && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 max-w-md text-white">
            <h4 className="font-semibold mb-2">About this view</h4>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        )}

        {/* Navigation Hint */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm">
              {isDragging ? 'Looking around...' : 
               'Drag to look around • Pinch to zoom • Tap controls below'}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center items-center space-x-4">
          {/* Playback Controls */}
          <div className="flex items-center space-x-2 bg-black/50 rounded-lg p-2">
            <Button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 bg-black/50 rounded-lg p-2">
            <Button
              onClick={handleZoomOut}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            
            <span className="text-white text-sm px-2">
              {Math.round(zoom * 100)}%
            </span>
            
            <Button
              onClick={handleZoomIn}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center space-x-2 bg-black/50 rounded-lg p-2">
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={handleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center mt-2">
          <div className="flex items-center space-x-2 text-xs text-white/70">
            <div className={`w-2 h-2 rounded-full ${isLoaded ? 'bg-emerald-400' : 'bg-gray-400'}`}></div>
            <span>{isLoaded ? 'Connected' : 'Loading'}</span>
            
            <div className="w-px h-3 bg-white/30 mx-2"></div>
            
            <div className={`w-2 h-2 rounded-full ${isAutoRotating ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isAutoRotating ? 'Auto-rotating' : 'Manual control'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panoramic360Viewer;