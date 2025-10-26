import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Camera, 
  Smartphone, 
  Monitor, 
  X, 
  RotateCw, 
  ZoomIn, 
  ZoomOut,
  Settings,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';
import { allDestinations, type Destination } from '@/data/completeDestinations';
import { handicrafts, type MarketplaceItem } from '@/data/marketplaceData';
import { allRestaurants, type Restaurant } from '@/data/restaurantData';

// Types for AR/VR content
interface ExploreItem {
  id: string;
  name: string;
  type: 'destination' | 'marketplace' | 'restaurant' | 'hotel';
  image: string;
  description: string;
  category?: string;
  location?: string;
  rating?: number;
  // AR/VR specific properties
  modelUrl?: string;
  panoramaUrl?: string;
  arMarkerUrl?: string;
}

interface DeviceCapabilities {
  hasWebXR: boolean;
  hasWebAR: boolean;
  hasVRSupport: boolean;
  hasGyroscope: boolean;
  isDesktop: boolean;
  isMobile: boolean;
}

interface ExploreARVRProps {
  category?: 'destinations' | 'marketplace' | 'restaurants' | 'hotels' | 'all';
  itemId?: string;
  className?: string;
}

const ExploreARVR: React.FC<ExploreARVRProps> = ({ 
  category = 'all', 
  itemId, 
  className = '' 
}) => {
  const [isVRMode, setIsVRMode] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities>({
    hasWebXR: false,
    hasWebAR: false,
    hasVRSupport: false,
    hasGyroscope: false,
    isDesktop: false,
    isMobile: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const vrSceneRef = useRef<HTMLDivElement>(null);
  const arSceneRef = useRef<HTMLDivElement>(null);

  // Convert data to unified format
  const convertToExploreItems = (): ExploreItem[] => {
    const items: ExploreItem[] = [];

    // Add destinations
    if (category === 'all' || category === 'destinations') {
      allDestinations.slice(0, 20).forEach(dest => {
        items.push({
          id: `dest-${dest.id}`,
          name: dest.name,
          type: 'destination',
          image: dest.image,
          description: dest.description,
          category: dest.category,
          location: dest.district,
          rating: dest.rating,
          // Sample 3D model URLs (you would replace these with actual URLs)
          modelUrl: dest.category === 'temple' 
            ? 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg'
            : 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg',
          panoramaUrl: `https://source.unsplash.com/1920x960/?${dest.category},panorama`,
          arMarkerUrl: 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png'
        });
      });
    }

    // Add marketplace items
    if (category === 'all' || category === 'marketplace') {
      handicrafts.slice(0, 10).forEach((item, index) => {
        items.push({
          id: `market-${index}`,
          name: item.name,
          type: 'marketplace',
          image: item.image,
          description: item.description,
          category: item.category,
          location: item.location,
          rating: item.rating,
          modelUrl: 'https://cdn.aframe.io/examples/ar/models/magnemite/scene.gltf',
          arMarkerUrl: 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png'
        });
      });
    }

    // Add restaurants
    if (category === 'all' || category === 'restaurants') {
      allRestaurants.slice(0, 10).forEach(restaurant => {
        items.push({
          id: `restaurant-${restaurant.id}`,
          name: restaurant.name,
          type: 'restaurant',
          image: restaurant.image,
          description: restaurant.specialty,
          category: restaurant.cuisine,
          location: restaurant.location,
          rating: restaurant.rating,
          panoramaUrl: `https://source.unsplash.com/1920x960/?restaurant,interior,${restaurant.cuisine}`,
          arMarkerUrl: 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png'
        });
      });
    }

    return items;
  };

  const exploreItems = convertToExploreItems();

  // Detect device capabilities
  useEffect(() => {
    const detectCapabilities = async () => {
      const capabilities: DeviceCapabilities = {
        hasWebXR: 'xr' in navigator,
        hasWebAR: 'xr' in navigator,
        hasVRSupport: false,
        hasGyroscope: 'DeviceOrientationEvent' in window,
        isDesktop: window.innerWidth >= 1024,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      };

      // Check for VR support
      if (capabilities.hasWebXR) {
        try {
          const xr = (navigator as any).xr;
          if (xr) {
            capabilities.hasVRSupport = await xr.isSessionSupported('immersive-vr');
            capabilities.hasWebAR = await xr.isSessionSupported('immersive-ar');
          }
        } catch (error) {
          console.log('WebXR detection failed:', error);
        }
      }

      setDeviceCapabilities(capabilities);
    };

    detectCapabilities();
  }, []);

  // Initialize A-Frame dynamically
  useEffect(() => {
    const loadAFrame = async () => {
      try {
        // Dynamic import to avoid SSR issues
        if (typeof window !== 'undefined') {
          await import('aframe');
          console.log('A-Frame loaded successfully');
        }
      } catch (error) {
        console.error('Failed to load A-Frame:', error);
        setError('Failed to load VR components');
      }
    };

    if (isVRMode || isARMode) {
      loadAFrame();
    }
  }, [isVRMode, isARMode]);

  const handleEnterVR = (item: ExploreItem) => {
    setSelectedItem(item);
    setIsVRMode(true);
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 2000);
  };

  const handleEnterAR = (item: ExploreItem) => {
    if (!deviceCapabilities.isMobile) {
      setError('AR mode is best experienced on mobile devices');
      return;
    }
    
    setSelectedItem(item);
    setIsARMode(true);
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleExitVR = () => {
    setIsVRMode(false);
    setSelectedItem(null);
    setIsPlaying(false);
    setError(null);
  };

  const handleExitAR = () => {
    setIsARMode(false);
    setSelectedItem(null);
    setError(null);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'destination': return '🏔️';
      case 'marketplace': return '🎨';
      case 'restaurant': return '🍽️';
      case 'hotel': return '🏨';
      default: return '📍';
    }
  };

  const getCapabilityBadge = () => {
    const badges = [];
    if (deviceCapabilities.hasVRSupport) badges.push('VR Ready');
    if (deviceCapabilities.hasWebAR) badges.push('AR Ready');
    if (deviceCapabilities.hasGyroscope) badges.push('360° Ready');
    if (badges.length === 0) badges.push('Preview Only');
    return badges;
  };

  // VR Scene Component
  const VRScene = ({ item }: { item: ExploreItem }) => (
    <div 
      ref={vrSceneRef}
      className="fixed inset-0 z-50 bg-black"
      style={{ zIndex: 9999 }}
    >
      {/* A-Frame VR Scene */}
      <a-scene 
        id="vr-scene"
        embedded 
        style={{ height: '100vh', width: '100vw' }}
        vr-mode-ui={{ enabled: deviceCapabilities.hasVRSupport }}
        background="color: #000"
        loading-screen="dotsColor: red; backgroundColor: black"
      >
        {/* Assets */}
        <a-assets>
          <img id="panorama" src={item.panoramaUrl || item.image} crossOrigin="anonymous" />
          {item.modelUrl && (
            <a-asset-item id="model" src={item.modelUrl}></a-asset-item>
          )}
        </a-assets>

        {/* Sky with panoramic image */}
        <a-sky src="#panorama" rotation="0 -130 0"></a-sky>

        {/* Lighting */}
        <a-light type="ambient" color="#404040" intensity="0.4"></a-light>
        <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.6"></a-light>

        {/* Ground */}
        <a-plane 
          position="0 0 -4" 
          rotation="-90 0 0" 
          width="4" 
          height="4" 
          color="#7BC8A4" 
          opacity="0.7"
        ></a-plane>

        {/* Interactive elements based on item type */}
        {item.type === 'destination' && (
          <>
            <a-text 
              position="0 4 -3" 
              value={`Welcome to ${item.name}`}
              color="#ffffff"
              align="center"
              geometry="primitive: plane; width: 6; height: 1"
              material="color: rgba(0,0,0,0.7); opacity: 0.8"
            ></a-text>
            
            <a-box 
              position="-2 0.5 -3" 
              rotation="0 45 0" 
              color="#4CC3D9"
              animation="property: rotation; to: 0 405 0; loop: true; dur: 10000"
            ></a-box>
            
            <a-cylinder 
              position="2 0.75 -3" 
              radius="0.5" 
              height="1.5" 
              color="#EF2D5E"
              animation="property: position; to: 2 1.5 -3; dir: alternate; dur: 2000; loop: true"
            ></a-cylinder>
          </>
        )}

        {item.type === 'marketplace' && item.modelUrl && (
          <a-entity
            position="0 1 -3"
            rotation="0 0 0"
            scale="0.5 0.5 0.5"
            gltf-model="#model"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 8000"
          ></a-entity>
        )}

        {item.type === 'restaurant' && (
          <>
            <a-text 
              position="0 3 -2" 
              value={`Taste of ${item.name}`}
              color="#ff6b35"
              align="center"
            ></a-text>
            
            {/* Table and chairs simulation */}
            <a-box position="0 0.5 -2" width="2" height="0.1" depth="1" color="#8B4513"></a-box>
            <a-box position="-0.7 0.3 -1.5" width="0.4" height="0.6" depth="0.4" color="#654321"></a-box>
            <a-box position="0.7 0.3 -1.5" width="0.4" height="0.6" depth="0.4" color="#654321"></a-box>
          </>
        )}

        {/* Info panel */}
        <a-text 
          position="0 -1 -2" 
          value={`${getItemIcon(item.type)} ${item.description}`}
          color="#ffffff"
          align="center"
          width="8"
          geometry="primitive: plane; width: 6; height: 2"
          material="color: rgba(0,0,0,0.7); opacity: 0.9"
        ></a-text>

        {/* Camera with controls */}
        <a-camera 
          look-controls="enabledDesktop: true; enabledMobile: true"
          wasd-controls="enabled: true"
          position="0 1.6 0"
        >
          <a-cursor 
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: white; shader: flat"
          ></a-cursor>
        </a-camera>
      </a-scene>

      {/* VR Controls Overlay */}
      <div className="absolute top-4 left-4 z-50 space-y-2">
        <Button
          onClick={handleExitVR}
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700"
        >
          <X className="w-4 h-4 mr-2" />
          Exit VR
        </Button>
        
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="secondary"
          size="sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
          {deviceCapabilities.isMobile ? 
            "Move your device to look around • Tap VR icon for full experience" :
            "Use mouse to look around • WASD to move • Click VR icon for headset mode"
          }
        </div>
      </div>
    </div>
  );

  // AR Scene Component
  const ARScene = ({ item }: { item: ExploreItem }) => (
    <div 
      ref={arSceneRef}
      className="fixed inset-0 z-50 bg-black"
      style={{ zIndex: 9999 }}
    >
      <a-scene
        id="ar-scene"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* Assets for AR */}
        <a-assets>
          {item.modelUrl && (
            <a-asset-item id="ar-model" src={item.modelUrl}></a-asset-item>
          )}
        </a-assets>

        {/* AR Marker */}
        <a-marker preset="hiro">
          {item.type === 'marketplace' && item.modelUrl ? (
            <a-entity
              gltf-model="#ar-model"
              scale="0.1 0.1 0.1"
              position="0 0.5 0"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
            ></a-entity>
          ) : (
            <>
              <a-box 
                position="0 0.5 0" 
                material={`color: ${item.type === 'restaurant' ? '#ff6b35' : '#4CC3D9'}`}
                animation="property: rotation; to: 360 360 360; loop: true; dur: 3000"
              ></a-box>
              
              <a-text 
                value={item.name}
                position="0 1.5 0"
                align="center"
                color="#ffffff"
                geometry="primitive: plane; width: 3; height: 0.5"
                material="color: rgba(0,0,0,0.8)"
              ></a-text>
            </>
          )}
        </a-marker>

        {/* AR Camera */}
        <a-entity camera></a-entity>
      </a-scene>

      {/* AR Controls */}
      <div className="absolute top-4 left-4 z-50 space-y-2">
        <Button
          onClick={handleExitAR}
          variant="destructive"
          size="sm"
          className="bg-red-600 hover:bg-red-700"
        >
          <X className="w-4 h-4 mr-2" />
          Exit AR
        </Button>
      </div>

      {/* AR Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm text-center">
          <div>Point your camera at the AR marker</div>
          <div className="text-xs mt-1 opacity-80">
            Download and print the marker from: bit.ly/hiro-marker
          </div>
        </div>
      </div>
    </div>
  );

  if (itemId) {
    const specificItem = exploreItems.find(item => item.id === itemId);
    if (specificItem) {
      return (
        <Card className={`w-full max-w-md ${className}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{getItemIcon(specificItem.type)}</span>
              {specificItem.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src={specificItem.image} 
              alt={specificItem.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            
            <div className="flex gap-2">
              <Button
                onClick={() => handleEnterVR(specificItem)}
                className="flex-1"
                disabled={!deviceCapabilities.hasWebXR && !deviceCapabilities.hasGyroscope}
              >
                <Eye className="w-4 h-4 mr-2" />
                VR View
              </Button>
              
              <Button
                onClick={() => handleEnterAR(specificItem)}
                variant="outline"
                className="flex-1"
                disabled={!deviceCapabilities.isMobile}
              >
                <Camera className="w-4 h-4 mr-2" />
                AR View
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Device Capabilities Status */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4" />
          <span className="font-medium">Device Capabilities</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {getCapabilityBadge().map((capability, index) => (
            <Badge key={index} variant="secondary">
              {capability}
            </Badge>
          ))}
        </div>
        
        {deviceCapabilities.isMobile && (
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Smartphone className="w-4 h-4" />
            Mobile device detected - AR features available
          </div>
        )}
        
        {deviceCapabilities.isDesktop && (
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Monitor className="w-4 h-4" />
            Desktop device - VR and 360° experiences available
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        </div>
      )}

      {/* Explore Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exploreItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-2 left-2" variant="secondary">
                {getItemIcon(item.type)} {item.type}
              </Badge>
              {item.rating && (
                <Badge className="absolute top-2 right-2" variant="outline">
                  ⭐ {item.rating}
                </Badge>
              )}
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              {item.location && (
                <p className="text-sm text-muted-foreground">{item.location}</p>
              )}
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEnterVR(item)}
                  size="sm"
                  className="flex-1"
                  disabled={isLoading}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  VR View
                </Button>
                
                <Button
                  onClick={() => handleEnterAR(item)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={!deviceCapabilities.isMobile || isLoading}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  AR View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
            <RotateCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading AR/VR experience...</p>
          </div>
        </div>
      )}

      {/* VR Mode */}
      {isVRMode && selectedItem && (
        <VRScene item={selectedItem} />
      )}

      {/* AR Mode */}
      {isARMode && selectedItem && (
        <ARScene item={selectedItem} />
      )}
    </div>
  );
};

export default ExploreARVR;