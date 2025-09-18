// Analytics Dashboard Service for tourism officials and administrators
export interface VisitorStats {
  totalVisitors: number;
  dailyVisitors: number;
  monthlyVisitors: number;
  yearlyVisitors: number;
  growthRate: {
    daily: number;
    monthly: number;
    yearly: number;
  };
}

export interface PopularDestination {
  id: string;
  name: string;
  district: string;
  category: string;
  visitors: number;
  rating: number;
  revenue: number;
  growthRate: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface EconomicImpact {
  totalRevenue: number;
  directEmployment: number;
  indirectEmployment: number;
  localBusinessRevenue: number;
  taxRevenue: number;
  foreignExchange: number;
  averageSpendPerTourist: number;
  economicMultiplier: number;
}

export interface TourismTrend {
  date: string;
  visitors: number;
  revenue: number;
  averageStay: number;
  satisfaction: number;
}

export interface DemographicData {
  ageGroups: {
    '18-25': number;
    '26-35': number;
    '36-45': number;
    '46-55': number;
    '56-65': number;
    '65+': number;
  };
  origins: {
    domestic: number;
    international: number;
    states: Record<string, number>;
    countries: Record<string, number>;
  };
  purposes: {
    leisure: number;
    business: number;
    cultural: number;
    adventure: number;
    religious: number;
    ecotourism: number;
  };
  groupTypes: {
    solo: number;
    couple: number;
    family: number;
    group: number;
  };
}

export interface SeasonalPattern {
  month: string;
  visitors: number;
  revenue: number;
  occupancyRate: number;
  averageTemperature: number;
  rainfall: number;
  festivals: string[];
}

export interface TransportUsage {
  mode: string;
  usage: number;
  satisfaction: number;
  avgCost: number;
}

export interface AccommodationStats {
  type: string;
  capacity: number;
  occupancy: number;
  revenue: number;
  averageRate: number;
  satisfaction: number;
}

export interface AnalyticsFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  district?: string;
  category?: string;
  source?: 'all' | 'domestic' | 'international';
}

export interface AlertsAndInsights {
  alerts: Array<{
    id: string;
    type: 'warning' | 'info' | 'success' | 'error';
    title: string;
    message: string;
    timestamp: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
  }>;
  insights: Array<{
    id: string;
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    confidence: number;
    actionable: boolean;
    category: string;
  }>;
}

class AnalyticsService {
  private generateMockTrends(): TourismTrend[] {
    const trends: TourismTrend[] = [];
    const startDate = new Date(2024, 0, 1);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const baseVisitors = 1200 + Math.sin(i / 7) * 400; // Weekly pattern
      const seasonalMultiplier = 1 + Math.sin((i / 30) * Math.PI) * 0.3; // Seasonal variation
      
      trends.push({
        date: date.toISOString().split('T')[0],
        visitors: Math.round(baseVisitors * seasonalMultiplier + Math.random() * 200),
        revenue: Math.round((baseVisitors * seasonalMultiplier) * 2500 + Math.random() * 50000),
        averageStay: 2.5 + Math.random() * 1.5,
        satisfaction: 4.0 + Math.random() * 1.0
      });
    }
    
    return trends;
  }

  async getVisitorStats(): Promise<VisitorStats> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      totalVisitors: 1547890,
      dailyVisitors: 4250,
      monthlyVisitors: 125680,
      yearlyVisitors: 1547890,
      growthRate: {
        daily: 12.5,
        monthly: 18.3,
        yearly: 22.8
      }
    };
  }

  async getPopularDestinations(): Promise<PopularDestination[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    return [
      {
        id: 'dest_001',
        name: 'Hundru Falls',
        district: 'Ranchi',
        category: 'Natural Wonder',
        visitors: 245680,
        rating: 4.7,
        revenue: 12284000,
        growthRate: 15.2,
        coordinates: { lat: 23.4208, lng: 85.5908 }
      },
      {
        id: 'dest_002',
        name: 'Betla National Park',
        district: 'Latehar',
        category: 'Wildlife',
        visitors: 189420,
        rating: 4.5,
        revenue: 9471000,
        growthRate: 8.7,
        coordinates: { lat: 23.9128, lng: 84.1936 }
      },
      {
        id: 'dest_003',
        name: 'Baidyanath Temple',
        district: 'Deoghar',
        category: 'Religious',
        visitors: 567890,
        rating: 4.8,
        revenue: 11357800,
        growthRate: 25.4,
        coordinates: { lat: 24.4833, lng: 86.7025 }
      },
      {
        id: 'dest_004',
        name: 'Tagore Hill',
        district: 'Ranchi',
        category: 'Cultural',
        visitors: 156780,
        rating: 4.3,
        revenue: 6271200,
        growthRate: 11.8,
        coordinates: { lat: 23.3441, lng: 85.3096 }
      },
      {
        id: 'dest_005',
        name: 'Dalma Wildlife Sanctuary',
        district: 'East Singhbhum',
        category: 'Wildlife',
        visitors: 134560,
        rating: 4.4,
        revenue: 5382400,
        growthRate: 19.6,
        coordinates: { lat: 22.8462, lng: 86.1086 }
      }
    ];
  }

  async getEconomicImpact(): Promise<EconomicImpact> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      totalRevenue: 4572000000, // ₹4.57 billion
      directEmployment: 125680,
      indirectEmployment: 378540,
      localBusinessRevenue: 1829000000,
      taxRevenue: 457200000,
      foreignExchange: 285000000,
      averageSpendPerTourist: 2950,
      economicMultiplier: 2.8
    };
  }

  async getTourismTrends(): Promise<TourismTrend[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.generateMockTrends();
  }

  async getDemographicData(): Promise<DemographicData> {
    await new Promise(resolve => setTimeout(resolve, 350));

    return {
      ageGroups: {
        '18-25': 28.5,
        '26-35': 32.1,
        '36-45': 22.8,
        '46-55': 12.3,
        '56-65': 3.8,
        '65+': 0.5
      },
      origins: {
        domestic: 78.5,
        international: 21.5,
        states: {
          'West Bengal': 18.2,
          'Odisha': 15.7,
          'Bihar': 12.3,
          'Uttar Pradesh': 8.9,
          'Delhi': 7.4,
          'Maharashtra': 6.8,
          'Karnataka': 4.2,
          'Others': 26.5
        },
        countries: {
          'Bangladesh': 8.7,
          'Nepal': 4.2,
          'USA': 2.8,
          'Germany': 1.9,
          'UK': 1.7,
          'Japan': 1.2,
          'Others': 1.0
        }
      },
      purposes: {
        leisure: 45.2,
        cultural: 23.8,
        religious: 18.6,
        adventure: 8.4,
        ecotourism: 2.8,
        business: 1.2
      },
      groupTypes: {
        family: 48.5,
        couple: 28.7,
        group: 15.2,
        solo: 7.6
      }
    };
  }

  async getSeasonalPatterns(): Promise<SeasonalPattern[]> {
    await new Promise(resolve => setTimeout(resolve, 450));

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const festivals = [
      ['Makar Sankranti'], ['Saraswati Puja'], ['Holi'], ['Poila Boishakh'],
      ['Buddha Purnima'], ['Rath Yatra'], ['Monsoon Festival'], ['Janmashtami'],
      ['Durga Puja'], ['Diwali', 'Chhath Puja'], ['Karma Festival'], ['Christmas']
    ];

    return months.map((month, index) => ({
      month,
      visitors: Math.round(80000 + Math.sin((index / 12) * 2 * Math.PI) * 30000 + Math.random() * 10000),
      revenue: Math.round(200000000 + Math.sin((index / 12) * 2 * Math.PI) * 80000000 + Math.random() * 20000000),
      occupancyRate: Math.round(60 + Math.sin((index / 12) * 2 * Math.PI) * 25 + Math.random() * 5),
      averageTemperature: Math.round(15 + Math.sin(((index + 3) / 12) * 2 * Math.PI) * 12),
      rainfall: Math.round(Math.max(0, 50 + Math.sin(((index + 6) / 12) * 2 * Math.PI) * 150)),
      festivals: festivals[index] || []
    }));
  }

  async getTransportUsage(): Promise<TransportUsage[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
      { mode: 'Private Car', usage: 42.5, satisfaction: 4.2, avgCost: 1250 },
      { mode: 'Bus', usage: 28.3, satisfaction: 3.8, avgCost: 350 },
      { mode: 'Train', usage: 18.7, satisfaction: 3.9, avgCost: 450 },
      { mode: 'Taxi/Cab', usage: 7.2, satisfaction: 4.0, avgCost: 850 },
      { mode: 'Auto-rickshaw', usage: 2.8, satisfaction: 3.6, avgCost: 180 },
      { mode: 'Others', usage: 0.5, satisfaction: 3.5, avgCost: 200 }
    ];
  }

  async getAccommodationStats(): Promise<AccommodationStats[]> {
    await new Promise(resolve => setTimeout(resolve, 320));

    return [
      {
        type: 'Hotels (3-5 Star)',
        capacity: 12500,
        occupancy: 68.5,
        revenue: 1875000000,
        averageRate: 3500,
        satisfaction: 4.2
      },
      {
        type: 'Budget Hotels',
        capacity: 8900,
        occupancy: 72.3,
        revenue: 789000000,
        averageRate: 1200,
        satisfaction: 3.8
      },
      {
        type: 'Homestays',
        capacity: 3400,
        occupancy: 58.7,
        revenue: 204000000,
        averageRate: 1800,
        satisfaction: 4.5
      },
      {
        type: 'Resorts',
        capacity: 2100,
        occupancy: 61.2,
        revenue: 441000000,
        averageRate: 4200,
        satisfaction: 4.3
      },
      {
        type: 'Guest Houses',
        capacity: 5600,
        occupancy: 55.8,
        revenue: 196000000,
        averageRate: 800,
        satisfaction: 3.9
      }
    ];
  }

  async getAlertsAndInsights(): Promise<AlertsAndInsights> {
    await new Promise(resolve => setTimeout(resolve, 250));

    return {
      alerts: [
        {
          id: 'alert_001',
          type: 'warning',
          title: 'Infrastructure Strain at Hundru Falls',
          message: 'Visitor capacity exceeding recommended limits during weekends. Consider implementing time-slot booking.',
          timestamp: '2024-01-22T10:30:00Z',
          priority: 'high',
          category: 'infrastructure'
        },
        {
          id: 'alert_002',
          type: 'info',
          title: 'Positive Tourism Growth Trend',
          message: 'International visitor numbers up 25% compared to last year. Marketing campaigns showing good results.',
          timestamp: '2024-01-21T14:15:00Z',
          priority: 'medium',
          category: 'growth'
        },
        {
          id: 'alert_003',
          type: 'error',
          title: 'Transport Connectivity Issues',
          message: 'Multiple complaints about bus services to tribal villages. Urgent coordination with transport department needed.',
          timestamp: '2024-01-20T09:45:00Z',
          priority: 'high',
          category: 'transport'
        }
      ],
      insights: [
        {
          id: 'insight_001',
          title: 'Seasonal Tourism Optimization',
          description: 'Peak season concentration in Oct-Feb suggests opportunity for monsoon tourism promotion',
          impact: 'positive',
          confidence: 0.85,
          actionable: true,
          category: 'seasonal'
        },
        {
          id: 'insight_002',
          title: 'Digital Platform Impact',
          description: 'Online bookings increased 40% after platform launch, especially among 25-35 age group',
          impact: 'positive',
          confidence: 0.92,
          actionable: false,
          category: 'digital'
        },
        {
          id: 'insight_003',
          title: 'Cultural Heritage Underutilization',
          description: 'Cultural destinations show lower growth compared to natural attractions',
          impact: 'neutral',
          confidence: 0.78,
          actionable: true,
          category: 'cultural'
        }
      ]
    };
  }

  async exportReport(format: 'pdf' | 'excel', filters?: AnalyticsFilters): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, generate actual report file
    const reportId = `report_${Date.now()}.${format}`;
    console.log('Generating report:', reportId, filters);
    
    return `/downloads/${reportId}`;
  }

  getDistrictsList(): string[] {
    return [
      'All Districts', 'Ranchi', 'Dhanbad', 'Jamshedpur', 'Bokaro', 'Deoghar', 
      'Hazaribagh', 'Khunti', 'Gumla', 'Simdega', 'West Singhbhum', 
      'East Singhbhum', 'Seraikela-Kharsawan', 'Ramgarh', 'Dumka', 'Jamtara', 
      'Sahibganj', 'Pakur', 'Godda', 'Koderma', 'Chatra', 'Palamu', 
      'Latehar', 'Garhwa', 'Lohardaga'
    ];
  }
}

export const analyticsService = new AnalyticsService();