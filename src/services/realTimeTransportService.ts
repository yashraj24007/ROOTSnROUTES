// Real-time Transport Service for Jharkhand Tourism Platform
import axios from 'axios';

export interface TransportSchedule {
  id: string;
  type: 'bus' | 'train' | 'taxi' | 'auto';
  route: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availability: 'available' | 'limited' | 'full';
  operator: string;
  nextDeparture?: string;
}

export interface LocationInfo {
  lat: number;
  lng: number;
  address?: string;
  district?: string;
}

export interface TransportProvider {
  id: string;
  name: string;
  type: 'bus' | 'train' | 'taxi' | 'auto';
  phone: string;
  rating: number;
  location: LocationInfo;
  distance: number;
  estimatedArrival: string;
  fare: number;
}

interface RouteCalculation {
  distance: number;
  duration: number;
  estimatedCost: number;
  transportOptions: TransportSchedule[];
}

class RealTimeTransportService {
  private mockSchedules: TransportSchedule[] = [
    {
      id: 'bus_001',
      type: 'bus',
      route: 'Ranchi - Jamshedpur',
      departure: '06:00 AM',
      arrival: '09:30 AM',
      duration: '3h 30m',
      price: 180,
      availability: 'available',
      operator: 'Jharkhand State Transport',
      nextDeparture: '08:00 AM'
    },
    {
      id: 'train_001',
      type: 'train',
      route: 'Ranchi - Dhanbad',
      departure: '07:15 AM',
      arrival: '11:45 AM',
      duration: '4h 30m',
      price: 95,
      availability: 'limited',
      operator: 'Indian Railways',
      nextDeparture: '02:30 PM'
    },
    {
      id: 'taxi_001',
      type: 'taxi',
      route: 'Ranchi - Deoghar',
      departure: 'On Demand',
      arrival: '4h 15m',
      duration: '4h 15m',
      price: 2800,
      availability: 'available',
      operator: 'Ola/Uber',
      nextDeparture: 'Immediate'
    }
  ];

  private mockProviders: TransportProvider[] = [
    {
      id: 'provider_001',
      name: 'City Bus Service',
      type: 'bus',
      phone: '+91-9876543210',
      rating: 4.2,
      location: { lat: 23.3441, lng: 85.3096, address: 'Ranchi Bus Stand' },
      distance: 2.5,
      estimatedArrival: '5 min',
      fare: 15
    },
    {
      id: 'provider_002',
      name: 'Auto Rickshaw Stand',
      type: 'auto',
      phone: '+91-9876543211',
      rating: 4.0,
      location: { lat: 23.3500, lng: 85.3150, address: 'Main Chowk' },
      distance: 0.8,
      estimatedArrival: '2 min',
      fare: 50
    },
    {
      id: 'provider_003',
      name: 'Taxi Service',
      type: 'taxi',
      phone: '+91-9876543212',
      rating: 4.5,
      location: { lat: 23.3400, lng: 85.3000, address: 'Railway Station' },
      distance: 3.2,
      estimatedArrival: '8 min',
      fare: 120
    }
  ];

  async getLiveSchedules(from: string, to: string, transportType?: string): Promise<TransportSchedule[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // In production, integrate with real APIs like:
      // - IRCTC API for trains
      // - State Transport APIs for buses  
      // - Ola/Uber APIs for taxis
      
      let schedules = this.mockSchedules.filter(schedule => {
        const routeMatch = schedule.route.toLowerCase().includes(from.toLowerCase()) ||
                          schedule.route.toLowerCase().includes(to.toLowerCase());
        const typeMatch = !transportType || schedule.type === transportType;
        return routeMatch && typeMatch;
      });

      // Add some randomness to simulate real-time updates
      schedules = schedules.map(schedule => ({
        ...schedule,
        availability: Math.random() > 0.3 ? schedule.availability : 'limited',
        price: schedule.price + Math.floor(Math.random() * 20) - 10
      }));

      return schedules;
    } catch (error) {
      console.error('Error fetching transport schedules:', error);
      throw new Error('Failed to fetch transport schedules');
    }
  }

  async getNearbyTransport(userLocation: LocationInfo, radius: number = 5): Promise<TransportProvider[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Calculate distance from user location to each provider
      const providersWithDistance = this.mockProviders.map(provider => {
        const distance = this.calculateDistance(
          userLocation.lat,
          userLocation.lng,
          provider.location.lat,
          provider.location.lng
        );
        
        return {
          ...provider,
          distance: Math.round(distance * 100) / 100,
          estimatedArrival: this.calculateETA(distance),
          fare: this.calculateFare(provider.type, distance)
        };
      });

      // Filter by radius and sort by distance
      return providersWithDistance
        .filter(provider => provider.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Error finding nearby transport:', error);
      throw new Error('Failed to find nearby transport options');
    }
  }

  async calculateRoute(from: LocationInfo, to: LocationInfo): Promise<RouteCalculation> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      const distance = this.calculateDistance(from.lat, from.lng, to.lat, to.lng);
      const duration = Math.round(distance * 1.5 * 60); // Rough estimate: 1.5 hours per 100km
      
      // Get relevant transport options
      const transportOptions = await this.getLiveSchedules(
        from.address || 'Current Location',
        to.address || 'Destination'
      );

      const estimatedCost = this.calculateTripCost(distance, transportOptions);

      return {
        distance: Math.round(distance),
        duration,
        estimatedCost,
        transportOptions
      };
    } catch (error) {
      console.error('Error calculating route:', error);
      throw new Error('Failed to calculate route');
    }
  }

  async trackTransport(transportId: string): Promise<{ status: string; location: LocationInfo; eta: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate real-time tracking
    const statuses = ['On Time', 'Delayed by 5 min', 'Delayed by 10 min', 'Arrived'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status: randomStatus,
      location: {
        lat: 23.3441 + (Math.random() - 0.5) * 0.1,
        lng: 85.3096 + (Math.random() - 0.5) * 0.1
      },
      eta: Math.floor(Math.random() * 30) + 5 + ' min'
    };
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private calculateETA(distance: number): string {
    // Rough estimation: 30 km/h average speed for local transport
    const timeInMinutes = Math.round((distance / 30) * 60);
    return timeInMinutes < 60 ? `${timeInMinutes} min` : `${Math.floor(timeInMinutes / 60)}h ${timeInMinutes % 60}m`;
  }

  private calculateFare(transportType: string, distance: number): number {
    const baseFares = {
      bus: 10,
      auto: 25,
      taxi: 80,
      train: 5
    };
    
    const perKmRates = {
      bus: 2,
      auto: 12,
      taxi: 15,
      train: 1
    };

    const baseFare = baseFares[transportType as keyof typeof baseFares] || 10;
    const perKmRate = perKmRates[transportType as keyof typeof perKmRates] || 2;
    
    return Math.round(baseFare + (distance * perKmRate));
  }

  private calculateTripCost(distance: number, options: TransportSchedule[]): number {
    if (options.length === 0) return 0;
    
    const costs = options.map(option => option.price);
    return Math.round(costs.reduce((sum, cost) => sum + cost, 0) / costs.length);
  }

  // Emergency transport contacts
  getEmergencyTransport(): { type: string; number: string; description: string }[] {
    return [
      { type: 'Ambulance', number: '108', description: '24/7 Emergency Medical Services' },
      { type: 'Police', number: '100', description: 'Emergency Police Services' },
      { type: 'Fire Service', number: '101', description: 'Fire Brigade Emergency' },
      { type: 'Tourist Helpline', number: '1363', description: '24/7 Tourist Assistance' },
      { type: 'Railway Enquiry', number: '139', description: 'Indian Railways Information' }
    ];
  }
}

export const realTimeTransportService = new RealTimeTransportService();