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
  Play,
  AlertCircle
} from 'lucide-react';

interface ExploreARVRSimpleProps {
  category?: 'destinations' | 'marketplace' | 'restaurants' | 'hotels' | 'all';
}

const ExploreARVRSimple: React.FC<ExploreARVRSimpleProps> = ({ category = 'all' }) => {
  const [isVRActive, setIsVRActive] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [aframeLoaded, setAframeLoaded] = useState(false);
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
          await import('aframe');
          // Load AR.js for AR functionality
          await import('ar.js/aframe/build/aframe-ar');
          setAframeLoaded(true);
          console.log('✅ A-Frame and AR.js loaded successfully');
        } else if (window.AFRAME) {
          setAframeLoaded(true);
        }
      } catch (error) {
        console.error('❌ Failed to load A-Frame:', error);
        // Still set as loaded to allow basic VR
        setAframeLoaded(true);
      }
    };

    loadAFrame();
  }, []);

  const enterVR = () => {
    if (!aframeLoaded) {
      alert('VR is still loading, please wait...');
      return;
    }
    setIsVRActive(true);
  };

  const enterAR = () => {
    if (!aframeLoaded) {
      alert('AR is still loading, please wait...');
      return;
    }
    
    // Check if device supports AR
    if (!navigator.userAgent.match(/Mobile|Android|iPhone|iPad/)) {
      alert('AR mode works best on mobile devices. You can still try the VR mode!');
      return;
    }
    
    setIsARActive(true);
  };

  const exitImmersive = () => {
    setIsVRActive(false);
    setIsARActive(false);
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
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-4 right-4 z-10">
            <Button onClick={exitImmersive} variant="secondary" size="sm">
              <X className="w-4 h-4 mr-2" />
              Exit AR
            </Button>
          </div>
          
          <div ref={sceneRef} className="w-full h-full">
            <a-scene 
              arjs="sourceType: webcam; debugUIEnabled: false;" 
              embedded
              style={{ width: '100%', height: '100%' }}
            >
              {/* Assets */}
              <a-assets>
                <a-asset-item 
                  id="ar-model" 
                  src={currentExperience.modelUrl}
                />
              </a-assets>

              {/* AR Marker */}
              <a-marker preset="hiro">
                <a-entity
                  gltf-model="#ar-model"
                  scale="0.1 0.1 0.1"
                  position="0 0 0"
                  rotation="0 0 0"
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 8000"
                />
                
                <a-text 
                  value={currentExperience.title}
                  position="0 2 0" 
                  align="center"
                  color="#ffffff"
                  scale="2 2 2"
                />
              </a-marker>

              {/* Camera */}
              <a-entity camera />
            </a-scene>
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div className="text-center mt-4">
        <Badge variant={aframeLoaded ? 'default' : 'secondary'}>
          {aframeLoaded ? '✅ AR/VR Ready' : '⏳ Loading AR/VR Engine...'}
        </Badge>
      </div>
    </div>
  );
};

export default ExploreARVRSimple;