import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Navigation, 
  Eye, 
  Camera, 
  Smartphone, 
  Compass, 
  Route, 
  Clock, 
  Star,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Filter,
  Mountain,
  Phone,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { allDestinations, Destination } from '@/data/completeDestinations';
import { useToast } from '@/hooks/use-toast';

interface District {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  attractions: string[];
  speciality: string;
  description: string;
  icon: string;
  destinations: Destination[];
}

interface ARPreview {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  previewType: '360' | 'ar' | 'vr';
  duration?: number;
}

interface RouteInfo {
  distance: number;
  duration: number;
  steps: string[];
}

const EnhancedInteractiveMap = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [arPreviews, setArPreviews] = useState<ARPreview[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<ARPreview | null>(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Group destinations by district
  const getDistrictDestinations = (districtName: string) => {
    return allDestinations.filter(dest => 
      dest.district.toLowerCase() === districtName.toLowerCase()
    );
  };

  const districts: District[] = [
    {
      id: 'ranchi',
      name: 'Ranchi',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      attractions: ['Rock Garden', 'Tagore Hill', 'Kanke Dam'],
      speciality: 'Capital City & Hills',
      description: 'The capital city known for its scenic hills and urban attractions.',
      icon: '🏛️',
      destinations: getDistrictDestinations('Ranchi')
    },
    {
      id: 'dhanbad',
      name: 'Dhanbad',
      coordinates: { lat: 23.7957, lng: 86.4304 },
      attractions: ['Maithon Dam', 'Topchanchi Lake'],
      speciality: 'Coal Capital',
      description: 'Industrial hub famous for coal mining and beautiful lakes.',
      icon: '⚡',
      destinations: getDistrictDestinations('Dhanbad')
    },
    {
      id: 'jamshedpur',
      name: 'Jamshedpur',
      coordinates: { lat: 22.8046, lng: 86.2029 },
      attractions: ['Jubilee Park', 'Tata Steel Zoological Park'],
      speciality: 'Steel City',
      description: 'Planned industrial city with modern amenities and parks.',
      icon: '🏭',
      destinations: getDistrictDestinations('Jamshedpur')
    },
    {
      id: 'bokaro',
      name: 'Bokaro',
      coordinates: { lat: 23.6693, lng: 86.1511 },
      attractions: ['Bokaro Steel Plant', 'Garga Dam'],
      speciality: 'Steel & Nature',
      description: 'Steel city surrounded by natural beauty and water bodies.',
      icon: '🌊',
      destinations: getDistrictDestinations('Bokaro')
    },
    {
      id: 'deoghar',
      name: 'Deoghar',
      coordinates: { lat: 24.4823, lng: 86.6961 },
      attractions: ['Baidyanath Temple', 'Nandan Pahar'],
      speciality: 'Spiritual Center',
      description: 'Sacred city famous for the Baidyanath Jyotirlinga temple.',
      icon: '🕉️',
      destinations: getDistrictDestinations('Deoghar')
    },
    {
      id: 'hazaribag',
      name: 'Hazaribag',
      coordinates: { lat: 23.9929, lng: 85.3594 },
      attractions: ['Hazaribag National Park', 'Canary Hill'],
      speciality: 'Wildlife & Hills',
      description: 'Hill station known for wildlife sanctuary and scenic beauty.',
      icon: '🦌',
      destinations: getDistrictDestinations('Hazaribag')
    },
    {
      id: 'giridih',
      name: 'Giridih',
      coordinates: { lat: 24.1874, lng: 86.3 },
      attractions: ['Parasnath Hill', 'Usri Falls'],
      speciality: 'Jain Pilgrimage',
      description: 'Sacred destination with highest peak of Jharkhand.',
      icon: '⛰️',
      destinations: getDistrictDestinations('Giridih')
    },
    {
      id: 'palamu',
      name: 'Palamu',
      coordinates: { lat: 24.0367, lng: 84.0747 },
      attractions: ['Betla National Park', 'Palamu Fort'],
      speciality: 'Tiger Reserve',
      description: 'Famous for Betla National Park and wildlife conservation.',
      icon: '🐅',
      destinations: getDistrictDestinations('Palamu')
    },
    {
      id: 'khunti',
      name: 'Khunti',
      coordinates: { lat: 23.0315, lng: 85.2784 },
      attractions: ['Panchghagh Falls', 'Tribal Culture'],
      speciality: 'Waterfalls & Heritage',
      description: 'Rich in tribal culture and natural waterfalls.',
      icon: '💧',
      destinations: getDistrictDestinations('Khunti')
    },
    {
      id: 'gumla',
      name: 'Gumla',
      coordinates: { lat: 23.0439, lng: 84.5431 },
      attractions: ['Ghaghra Falls', 'Tribal Villages'],
      speciality: 'Natural Beauty',
      description: 'Known for beautiful waterfalls and tribal heritage.',
      icon: '🏔️',
      destinations: getDistrictDestinations('Gumla')
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', icon: '🌍' },
    { id: 'waterfalls', name: 'Waterfalls', icon: '💧' },
    { id: 'temples', name: 'Temples', icon: '🏛️' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'wildlife', name: 'Wildlife', icon: '🦌' }
  ];

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district);
  };

  const resetView = () => {
    setSelectedDistrict(null);
  };

  const handleEmergencyCall = () => {
    if (typeof navigator !== 'undefined' && 'userAgent' in navigator) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = 'tel:100'; // Emergency services in India
      } else {
        alert('Emergency Number: 100\\nTourist Helpline: 1363\\nPlease call from your mobile device');
      }
    }
  };

  const filteredDestinations = selectedCategory === 'all' 
    ? allDestinations 
    : allDestinations.filter(dest => dest.category.includes(selectedCategory));

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Explore Jharkhand with Interactive Maps
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Discover all {allDestinations.length} destinations across Jharkhand with integrated Google Maps and district selection.
        </p>
        
        {/* Emergency Call Button */}
        <div className="mb-6">
          <Button
            onClick={handleEmergencyCall}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Phone className="w-4 h-4 mr-2" />
            Emergency Call (100)
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enhanced Map Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Google Maps Embed */}
          <Card className="card-enhanced p-6 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="text-primary" />
                Jharkhand Tourist Map
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={resetView}
                className="hover-lift"
              >
                <Navigation size={16} />
                Reset View
              </Button>
            </div>

            {/* Embedded Google Map */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-xl overflow-hidden">
              <iframe
                title="Jharkhand Tourism Interactive Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1858459.2285021635!2d83.82965537343751!3d23.610201700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0dc9ff4e3e2a4a1b!2sJharkhand%2C%20India!5e0!3m2!1sen!2sin!4v1698845678123!5m2!1sen!2sin"
                width="100%"
                height="400"
                className="border-0 rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>

          {/* Interactive District Map */}
          <Card className="card-enhanced p-6 relative overflow-hidden">
            <div className="mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                <MapPin className="text-primary" />
                Interactive District Selection
              </h3>
              <p className="text-sm text-muted-foreground">
                Click on any district to explore its destinations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {districts.map((district) => (
                <Button
                  key={district.id}
                  variant={selectedDistrict?.id === district.id ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col items-center gap-2 transition-all hover:scale-105 ${
                    selectedDistrict?.id === district.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleDistrictClick(district)}
                  onMouseEnter={() => setHoveredDistrict(district.id)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  <span className="text-2xl">{district.icon}</span>
                  <span className="font-semibold text-sm">{district.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {district.destinations.length} places
                  </span>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* District Information Panel */}
        <div className="space-y-6">
          {selectedDistrict ? (
            <Card className="card-enhanced p-6 stagger-item">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{selectedDistrict.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient">{selectedDistrict.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDistrict.speciality}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{selectedDistrict.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Mountain size={16} className="text-primary" />
                    Destinations ({selectedDistrict.destinations.length})
                  </h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {selectedDistrict.destinations.map((destination, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{destination.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ⭐ {destination.rating}/5 • {destination.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full btn-premium">
                  <MapPin size={16} className="mr-2" />
                  View All in {selectedDistrict.name}
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="card-enhanced p-6 text-center">
              <div className="mb-4">
                <MapPin size={48} className="mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-semibold">Select a District</h3>
                <p className="text-sm text-muted-foreground">
                  Choose any district to explore its destinations and specialities.
                </p>
              </div>
            </Card>
          )}

          {/* Enhanced Quick Stats */}
          <Card className="card-enhanced p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="text-primary" />
              Tourism Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Destinations</span>
                <span className="font-semibold">{filteredDestinations.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Districts Covered</span>
                <span className="font-semibold">{districts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <span className="font-semibold">
                  ⭐ {(filteredDestinations.reduce((sum, dest) => sum + dest.rating, 0) / filteredDestinations.length).toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Categories</span>
                <span className="font-semibold">{categories.length - 1}</span>
              </div>
            </div>
          </Card>

          {/* Quick Access */}
          <Card className="card-enhanced p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Phone size={16} className="mr-2" />
                Tourist Helpline: 1363
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Phone size={16} className="mr-2" />
                Emergency: 100
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedInteractiveMap;