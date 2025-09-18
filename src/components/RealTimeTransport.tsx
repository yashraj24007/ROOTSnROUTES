import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Bus, 
  Train, 
  Car, 
  Navigation, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Timer
} from 'lucide-react';
import { realTimeTransportService, TransportSchedule, TransportProvider, LocationInfo } from '@/services/realTimeTransportService';
import { useToast } from '@/hooks/use-toast';

interface RealTimeTransportProps {
  userLocation?: LocationInfo;
  destination?: LocationInfo;
}

interface TrackingInfo {
  status: string;
  location: LocationInfo;
  eta: string;
}

const RealTimeTransport: React.FC<RealTimeTransportProps> = ({ userLocation, destination }) => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<TransportSchedule[]>([]);
  const [nearbyProviders, setNearbyProviders] = useState<TransportProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedTransportType, setSelectedTransportType] = useState<string>('all');
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [trackingInfo, setTrackingInfo] = useState<{ [key: string]: TrackingInfo }>({});

  const loadNearbyTransport = React.useCallback(async () => {
    if (!userLocation) return;
    
    try {
      setLoading(true);
      const providers = await realTimeTransportService.getNearbyTransport(userLocation);
      setNearbyProviders(providers);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load nearby transport options',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [userLocation, toast]);

  const searchSchedules = React.useCallback(async () => {
    if (!fromLocation || !toLocation) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both departure and destination locations',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      const transportType = selectedTransportType === 'all' ? undefined : selectedTransportType;
      const results = await realTimeTransportService.getLiveSchedules(
        fromLocation,
        toLocation,
        transportType
      );
      setSchedules(results);
      setLastUpdated(new Date());
      
      if (results.length === 0) {
        toast({
          title: 'No Routes Found',
          description: 'No transport options found for the selected route',
        });
      }
    } catch (error) {
      toast({
        title: 'Search Failed',
        description: 'Failed to fetch transport schedules',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [fromLocation, toLocation, selectedTransportType, toast]);

  const refreshData = React.useCallback(async () => {
    if (fromLocation && toLocation) {
      await searchSchedules();
    }
    if (userLocation) {
      await loadNearbyTransport();
    }
  }, [fromLocation, toLocation, userLocation, loadNearbyTransport, searchSchedules]);

  useEffect(() => {
    if (userLocation) {
      loadNearbyTransport();
    }
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    setRefreshInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [userLocation, loadNearbyTransport, refreshData]);

  const trackTransport = async (transportId: string) => {
    try {
      const tracking = await realTimeTransportService.trackTransport(transportId);
      setTrackingInfo(prev => ({
        ...prev,
        [transportId]: tracking
      }));
      
      toast({
        title: 'Tracking Updated',
        description: `Status: ${tracking.status}`,
      });
    } catch (error) {
      toast({
        title: 'Tracking Failed',
        description: 'Could not fetch real-time tracking information',
        variant: 'destructive'
      });
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'taxi': return <Car className="h-5 w-5" />;
      case 'auto': return <Car className="h-4 w-4" />;
      default: return <Navigation className="h-5 w-5" />;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    const variants = {
      available: 'default',
      limited: 'secondary',
      full: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[availability as keyof typeof variants] || 'outline'}>
        {availability}
      </Badge>
    );
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const emergencyContacts = realTimeTransportService.getEmergencyTransport();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" />
                Real-time Transport Info
              </CardTitle>
              <CardDescription>
                Live schedules, nearby transport, and route planning
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedules" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="schedules">Live Schedules</TabsTrigger>
              <TabsTrigger value="nearby">Nearby Transport</TabsTrigger>
              <TabsTrigger value="route">Route Planner</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="schedules" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="From location"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
                <Input
                  placeholder="To location"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
                <Select value={selectedTransportType} onValueChange={setSelectedTransportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Transport type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                    <SelectItem value="taxi">Taxi</SelectItem>
                    <SelectItem value="auto">Auto Rickshaw</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={searchSchedules} disabled={loading} className="w-full md:w-auto">
                {loading ? 'Searching...' : 'Search Transport'}
              </Button>

              {schedules.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Available Options</h3>
                    <span className="text-sm text-muted-foreground">
                      Last updated: {formatTime(lastUpdated)}
                    </span>
                  </div>
                  
                  {schedules.map((schedule) => (
                    <Card key={schedule.id} className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getTransportIcon(schedule.type)}
                            <div>
                              <p className="font-semibold">{schedule.route}</p>
                              <p className="text-sm text-muted-foreground">{schedule.operator}</p>
                            </div>
                          </div>
                          {getAvailabilityBadge(schedule.availability)}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Departure</p>
                            <p className="font-medium">{schedule.departure}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Arrival</p>
                            <p className="font-medium">{schedule.arrival}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{schedule.duration}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">₹{schedule.price}</p>
                          </div>
                        </div>

                        {schedule.nextDeparture && (
                          <Alert className="mt-3">
                            <Clock className="h-4 w-4" />
                            <AlertDescription>
                              Next departure: {schedule.nextDeparture}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" onClick={() => trackTransport(schedule.id)}>
                            <Timer className="h-4 w-4 mr-1" />
                            Track Live
                          </Button>
                          <Button size="sm" variant="outline">
                            Book Now
                          </Button>
                        </div>

                        {trackingInfo[schedule.id] && (
                          <Alert className="mt-3">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Live Status:</strong> {trackingInfo[schedule.id].status} • 
                              ETA: {trackingInfo[schedule.id].eta}
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="nearby" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Nearby Transport Options</h3>
                
                {nearbyProviders.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nearbyProviders.map((provider) => (
                      <Card key={provider.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {getTransportIcon(provider.type)}
                              <div>
                                <p className="font-semibold">{provider.name}</p>
                                <p className="text-sm text-muted-foreground">{provider.location.address}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{provider.distance}km</Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-muted-foreground">Rating</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-current text-yellow-500" />
                                <span className="font-medium">{provider.rating}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground">ETA</p>
                              <p className="font-medium">{provider.estimatedArrival}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Base Fare</p>
                              <p className="font-medium">₹{provider.fare}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Distance</p>
                              <p className="font-medium">{provider.distance}km</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <MapPin className="h-4 w-4 mr-1" />
                              Direction
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Navigation className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No nearby transport options found</p>
                    <Button className="mt-4" onClick={loadNearbyTransport}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="route" className="space-y-4">
              <Alert>
                <MapPin className="h-4 w-4" />
                <AlertDescription>
                  Route planning integrates with Google Maps for detailed navigation. 
                  Enable location access for better route suggestions.
                </AlertDescription>
              </Alert>
              
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Route planning feature coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Emergency Transport Contacts</h3>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>For immediate emergencies, call 112 (National Emergency Number)</strong>
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <Card key={index} className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{contact.type}</h4>
                          <Badge variant="outline">{contact.number}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {contact.description}
                        </p>
                        <Button size="sm" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Call {contact.number}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeTransport;