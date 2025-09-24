// Enhanced Emergency Services Integration
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Car,
  Hospital,
  Users,
  Zap
} from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'police' | 'medical' | 'fire' | 'tourist' | 'rescue';
  district: string;
  available24x7: boolean;
}

interface EmergencyAlert {
  id: string;
  type: 'medical' | 'accident' | 'lost' | 'weather' | 'wildlife';
  location: string;
  timestamp: Date;
  status: 'active' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const EnhancedEmergencyServices: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<EmergencyAlert[]>([]);
  const [sosActive, setSosActive] = useState(false);

  // Mock emergency contacts data
  useEffect(() => {
    setEmergencyContacts([
      {
        id: '1',
        name: 'Ranchi Police Control Room',
        number: '100',
        type: 'police',
        district: 'Ranchi',
        available24x7: true
      },
      {
        id: '2',
        name: 'Ranchi Medical Emergency',
        number: '108',
        type: 'medical',
        district: 'Ranchi',
        available24x7: true
      },
      {
        id: '3',
        name: 'Fire Brigade Ranchi',
        number: '101',
        type: 'fire',
        district: 'Ranchi',
        available24x7: true
      },
      {
        id: '4',
        name: 'Jharkhand Tourism Helpline',
        number: '1363',
        type: 'tourist',
        district: 'State',
        available24x7: true
      },
      {
        id: '5',
        name: 'Netarhat Rescue Team',
        number: '+91-9876543210',
        type: 'rescue',
        district: 'Latehar',
        available24x7: false
      }
    ]);

    setActiveAlerts([
      {
        id: '1',
        type: 'weather',
        location: 'Netarhat Hill Station',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: 'active',
        severity: 'medium'
      },
      {
        id: '2',
        type: 'wildlife',
        location: 'Betla National Park',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        status: 'active',
        severity: 'high'
      }
    ]);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  const handleEmergencyCall = (number: string) => {
    // In a real app, this would initiate a call
    window.location.href = `tel:${number}`;
  };

  const handleSOS = () => {
    setSosActive(true);
    
    // Mock SOS functionality
    setTimeout(() => {
      setSosActive(false);
      alert('Emergency contacts have been notified with your location!');
    }, 3000);

    // In real implementation:
    // 1. Send location to emergency contacts
    // 2. Notify nearby travelers/guides
    // 3. Alert tourism authorities
    // 4. Start location tracking
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'police': return <Shield className="w-5 h-5" />;
      case 'medical': return <Heart className="w-5 h-5" />;
      case 'fire': return <Zap className="w-5 h-5" />;
      case 'tourist': return <Users className="w-5 h-5" />;
      case 'rescue': return <Car className="w-5 h-5" />;
      default: return <Phone className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* SOS Button */}
      <Card className="border-red-200 bg-red-50/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-red-600">Emergency SOS</h2>
            <Button
              size="lg"
              variant="destructive"
              className={`w-32 h-32 rounded-full text-xl font-bold ${
                sosActive ? 'animate-pulse bg-red-700' : ''
              }`}
              onClick={handleSOS}
              disabled={sosActive}
            >
              {sosActive ? 'SENDING...' : 'SOS'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Hold for 3 seconds to send emergency alert with location
            </p>
            {userLocation && (
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <MapPin className="w-4 h-4" />
                Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Active Alerts in Your Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50/50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <h4 className="font-semibold capitalize">{alert.type} Alert</h4>
                      <p className="text-sm text-muted-foreground">{alert.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <div className="text-right text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {Math.round((Date.now() - alert.timestamp.getTime()) / (1000 * 60))}m ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  {getTypeIcon(contact.type)}
                  <div>
                    <h4 className="font-semibold">{contact.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{contact.district}</span>
                      {contact.available24x7 && (
                        <Badge variant="secondary" className="text-xs">24x7</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleEmergencyCall(contact.number)}
                  className="flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {contact.number}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col">
          <Hospital className="w-6 h-6 mb-2" />
          <span className="text-sm">Find Hospital</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Car className="w-6 h-6 mb-2" />
          <span className="text-sm">Emergency Transport</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Users className="w-6 h-6 mb-2" />
          <span className="text-sm">Find Nearby Travelers</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <MapPin className="w-6 h-6 mb-2" />
          <span className="text-sm">Share Location</span>
        </Button>
      </div>

      {/* Safety Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Tips for Jharkhand Tourism</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Wildlife Areas (Betla, Palamau)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Stay in groups, especially during early morning/evening</li>
                <li>• Keep vehicles windows closed in safari zones</li>
                <li>• Do not feed or approach wild animals</li>
                <li>• Carry whistle and first-aid kit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hill Stations (Netarhat, Parasnath)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Check weather conditions before trekking</li>
                <li>• Inform someone about your travel plans</li>
                <li>• Carry warm clothing and rain gear</li>
                <li>• Stay on marked trails</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Waterfalls (Hundru, Dassam)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Be cautious during monsoon season</li>
                <li>• Don't venture into restricted areas</li>
                <li>• Wear non-slip footwear</li>
                <li>• Swim only in designated safe zones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cultural Sites (Temples, Tribal Villages)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Respect local customs and dress codes</li>
                <li>• Seek permission before photography</li>
                <li>• Hire registered local guides</li>
                <li>• Keep valuables secure</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedEmergencyServices;