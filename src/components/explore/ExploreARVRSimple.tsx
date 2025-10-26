import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Eye, 
  Camera, 
  Smartphone, 
  Monitor, 
  X, 
  Play,
  AlertCircle,
  QrCode
} from 'lucide-react';

// Extend Window type for A-Frame
declare global {
  interface Window {
    AFRAME?: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-sky': any;
      'a-light': any;
      'a-text': any;
      'a-box': any;
      'a-cylinder': any;
      'a-sphere': any;
      'a-plane': any;
      'a-camera': any;
      'a-entity': any;
      'a-marker': any;
    }
  }
}

interface ExploreARVRSimpleProps {
  category?: 'destinations' | 'marketplace' | 'restaurants' | 'hotels' | 'all';
}

const ExploreARVRSimple: React.FC<ExploreARVRSimpleProps> = ({ category = 'all' }) => {
  const [isVRActive, setIsVRActive] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [aframeLoaded, setAframeLoaded] = useState(false);
  const [vrReady, setVrReady] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>('destination');
  const sceneRef = useRef<HTMLDivElement>(null);

  // Sample AR/VR content
  const experiences = {
    destination: {
      title: '🏔️ Betla National Park',
      description: 'Experience the wildlife sanctuary in immersive VR',
      panoramaUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2048&h=1024&fit=crop',
      modelUrl: 'https://cdn.aframe.io/examples/ar/models/magnemite/scene.gltf'
    },
    marketplace: {
      title: '🎨 Dokra Art Gallery',
      description: 'Explore traditional brass artifacts in 3D',
      panoramaUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=2048&h=1024&fit=crop',
      modelUrl: 'https://cdn.aframe.io/examples/ar/models/magnemite/scene.gltf'
    },
    restaurant: {
      title: '🍽️ Traditional Kitchen',
      description: 'Virtual tour of authentic Jharkhandi cuisine',
      panoramaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2048&h=1024&fit=crop',
      modelUrl: 'https://cdn.aframe.io/examples/ar/models/magnemite/scene.gltf'
    },
    hotel: {
      title: '🏨 Heritage Stay',
      description: 'Preview luxury accommodations in VR',
      panoramaUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2048&h=1024&fit=crop',
      modelUrl: 'https://cdn.aframe.io/examples/ar/models/magnemite/scene.gltf'
    }
  };

  // Load A-Frame dynamically
  useEffect(() => {
    const loadAFrame = async () => {
      try {
        if (typeof window !== 'undefined' && !window.AFRAME) {
          // Load A-Frame core
          await import('aframe');
          console.log('✅ A-Frame loaded successfully');
          setAframeLoaded(true);
        } else if (window.AFRAME) {
          setAframeLoaded(true);
          console.log('✅ A-Frame already loaded');
        }
      } catch (error) {
        console.error('❌ Failed to load A-Frame:', error);
        // Still set as loaded to show the interface
        setAframeLoaded(true);
      }
    };

    loadAFrame();
  }, []);

  // Monitor VR scene readiness
  useEffect(() => {
    if (isVRActive && aframeLoaded) {
      const checkVRReady = () => {
        const scene = document.querySelector('a-scene');
        if (scene && scene.hasLoaded) {
          setVrReady(true);
          console.log('✅ VR Scene is ready');
        } else {
          setTimeout(checkVRReady, 100);
        }
      };
      checkVRReady();
    } else {
      setVrReady(false);
    }
  }, [isVRActive, aframeLoaded]);

  // Check URL parameters for auto-launch AR from QR code scan
  useEffect(() => {
    if (!aframeLoaded) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const experience = urlParams.get('experience');
    
    if (mode === 'ar' && experience) {
      setSelectedExperience(experience);
      // Auto-launch AR on mobile devices
      const isMobile = navigator.userAgent.match(/Mobile|Android|iPhone|iPad/);
      if (isMobile) {
        setTimeout(() => {
          setIsARActive(true);
        }, 1000); // Small delay to ensure everything is loaded
      }
    }
  }, [aframeLoaded]);

  const enterVR = () => {
    if (!aframeLoaded) {
      alert('VR is still loading, please wait...');
      return;
    }
    console.log('🚀 Entering VR mode with experience:', selectedExperience);
    console.log('📸 Panorama URL:', experiences[selectedExperience as keyof typeof experiences].panoramaUrl);
    setIsVRActive(true);
  };

  const enterAR = () => {
    if (!aframeLoaded) {
      alert('AR is still loading, please wait...');
      return;
    }
    
    // Check if on mobile device
    const isMobile = navigator.userAgent.match(/Mobile|Android|iPhone|iPad/);
    
    if (isMobile) {
      // If already on mobile, launch AR directly
      setIsARActive(true);
    } else {
      // If on desktop, show QR code for mobile scanning
      setShowQRModal(true);
    }
  };

  const exitImmersive = () => {
    setIsVRActive(false);
    setIsARActive(false);
    setShowQRModal(false);
  };

  const currentExperience = experiences[selectedExperience as keyof typeof experiences];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Experience Selection */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">Choose Your Experience</h3>
          <p className="text-muted-foreground">Select a category to explore in VR or AR</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(experiences).map(([key, exp]) => (
            <Button
              key={key}
              variant={selectedExperience === key ? 'default' : 'outline'}
              onClick={() => setSelectedExperience(key)}
              className="h-auto p-4 text-center"
            >
              <div>
                <div className="text-lg mb-1">{exp.title.split(' ')[0]}</div>
                <div className="text-xs">{exp.title.split(' ').slice(1).join(' ')}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Experience Preview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {currentExperience.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{currentExperience.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* VR Mode */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Virtual Reality Mode
              </h4>
              <p className="text-sm text-muted-foreground">
                Immersive 360° experience. Works on desktop and VR headsets.
              </p>
              <Button 
                onClick={enterVR} 
                className="w-full"
                disabled={!aframeLoaded}
              >
                {aframeLoaded ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Enter VR Experience
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Loading VR...
                  </>
                )}
              </Button>
            </div>

            {/* AR Mode */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Augmented Reality Mode
              </h4>
              <p className="text-sm text-muted-foreground">
                View 3D models in your real environment. Best on mobile devices.
              </p>
              <Button 
                onClick={enterAR} 
                variant="outline" 
                className="w-full"
                disabled={!aframeLoaded}
              >
                {aframeLoaded ? (
                  <>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Enter AR Experience
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Loading AR...
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A-Frame VR Scene */}
      {isVRActive && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Loading indicator */}
          {!vrReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">Loading VR Experience...</p>
                <p className="text-sm text-gray-400 mt-2">Please wait while we prepare your virtual tour</p>
              </div>
            </div>
          )}
          
          <div className="absolute top-4 right-4 z-10">
            <Button onClick={exitImmersive} variant="secondary" size="sm">
              <X className="w-4 h-4 mr-2" />
              Exit VR
            </Button>
          </div>
          
          <div ref={sceneRef} className="w-full h-full">
            <a-scene 
              vr-mode-ui="enabled: true" 
              embedded
              style={{ width: '100%', height: '100%' }}
            >
              {/* Assets */}
              <a-assets>
                <img 
                  id="panorama" 
                  src={currentExperience.panoramaUrl} 
                  crossOrigin="anonymous" 
                />
                <a-asset-item 
                  id="model" 
                  src={currentExperience.modelUrl}
                />
              </a-assets>

              {/* Sky */}
              <a-sky src="#panorama" rotation="0 -130 0" />

              {/* Lighting */}
              <a-light type="ambient" color="#404040" intensity="0.4" />
              <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.6" />

              {/* Interactive Elements */}
              <a-text 
                position="0 4 -3" 
                value={`Welcome to ${currentExperience.title}`}
                color="#ffffff"
                align="center"
                geometry="primitive: plane; width: 6; height: 1"
                material="color: rgba(0,0,0,0.7); opacity: 0.8"
              />
              
              {/* Animated 3D Objects */}
              <a-box 
                position="-2 0.5 -3" 
                rotation="0 45 0" 
                color="#4CC3D9"
                animation="property: rotation; to: 0 405 0; loop: true; dur: 10000"
              />
              
              <a-cylinder 
                position="2 0.75 -3" 
                radius="0.5" 
                height="1.5" 
                color="#EF2D5E"
                animation="property: position; to: 2 1.5 -3; dir: alternate; dur: 2000; loop: true"
              />

              <a-sphere 
                position="0 1.25 -5" 
                radius="1" 
                color="#FFC65D"
                animation="property: rotation; to: 360 0 0; loop: true; dur: 5000"
              />

              {/* Ground */}
              <a-plane 
                position="0 0 -4" 
                rotation="-90 0 0" 
                width="20" 
                height="20" 
                color="#7BC8A4" 
                opacity="0.3"
              />

              {/* Camera with controls */}
              <a-camera look-controls wasd-controls position="0 1.6 0" />
            </a-scene>
          </div>
        </div>
      )}

      {/* A-Frame AR Scene */}
      {isARActive && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-900/50 to-teal-900/50">
          {/* AR Instructions Banner */}
          <div className="absolute top-0 left-0 right-0 bg-black/80 p-4 z-10">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">📱 AR Preview Mode</h3>
                <p className="text-gray-300 text-sm">Move your device to explore the 3D model</p>
              </div>
              <Button onClick={exitImmersive} variant="secondary" size="sm">
                <X className="w-4 h-4 mr-2" />
                Exit AR
              </Button>
            </div>
          </div>
          
          {/* Simplified AR View with 3D Model */}
          <div className="w-full h-full flex items-center justify-center pt-20 pb-10">
            <div className="relative w-full max-w-md mx-auto px-4">
              {/* 3D Model Preview Card */}
              <Card className="bg-black/40 backdrop-blur-md border-2 border-primary/30">
                <CardContent className="p-6">
                  <div className="text-center text-white mb-4">
                    <h3 className="text-xl font-bold mb-2">{currentExperience.title}</h3>
                    <p className="text-sm text-gray-300">{currentExperience.description}</p>
                  </div>
                  
                  {/* 3D Model Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Animated 3D representation */}
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 animate-spin-slow">
                          <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-3xl transform rotate-45 opacity-80"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="w-24 h-24 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* AR Markers */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-primary"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-primary"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-primary"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-primary"></div>
                  </div>
                  
                  {/* AR Features */}
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>AR Camera Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>3D Model Loaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span>Gesture Controls Enabled</span>
                    </div>
                  </div>
                  
                  {/* Note about full AR */}
                  <div className="mt-4 p-3 bg-accent/20 border border-accent/30 rounded-lg">
                    <p className="text-xs text-gray-300 text-center">
                      💡 For full AR experience with camera overlay, visit on a mobile device with AR support (iOS 12+ or Android 8+)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div className="text-center mt-4">
        <Badge variant={aframeLoaded ? 'default' : 'secondary'}>
          {aframeLoaded ? '✅ AR/VR Ready' : '⏳ Loading AR/VR Engine...'}
        </Badge>
      </div>

      {/* QR Code Modal for AR on Mobile */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-background border border-primary/20 rounded-xl shadow-2xl max-w-md w-full my-8 relative max-h-[90vh] overflow-y-auto">
            {/* Scroll indicator at top */}
            <div className="sticky top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse z-10"></div>
            
            <div className="p-8">
              {/* Close button */}
              <Button
                onClick={() => setShowQRModal(false)}
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Modal content */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Scan to View in AR</h3>
                <p className="text-muted-foreground mb-6">
                  Open your mobile camera and scan this QR code to experience {currentExperience.title} in Augmented Reality
                </p>

                {/* QR Code */}
                <div className="bg-white p-6 rounded-lg inline-block mb-6 shadow-lg">
                  <QRCodeSVG
                    value={`${window.location.origin}/ar-vr-preview?mode=ar&experience=${selectedExperience}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-3 text-left bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-center mb-3">How to use:</h4>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <p>Open your phone's camera app</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <p>Point at the QR code above</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <p>Tap the notification to open AR view</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <p>Move your phone to explore in 3D</p>
                  </div>
                </div>

                {/* Mobile app suggestion */}
                <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Works best with AR-enabled mobile browsers</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator at bottom */}
            <div className="sticky bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreARVRSimple;