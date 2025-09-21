import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign,
  Eye,
  Star,
  Globe,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Filter,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock
} from 'lucide-react';

// Real-time data interfaces
interface LiveMetrics {
  totalVisitors: number;
  totalRevenue: number;
  avgRating: number;
  activeDistricts: number;
  currentOnlineUsers: number;
  todayBookings: number;
  realtimeGrowth: number;
}

interface VisitorData {
  timestamp: Date;
  visitors: number;
  revenue: number;
  onlineUsers: number;
}

interface DistrictMetrics {
  district: string;
  visitors: number;
  percentage: number;
  growth: number;
  status: 'trending_up' | 'trending_down' | 'stable';
}

interface LiveAttraction {
  name: string;
  views: number;
  bookings: number;
  rating: number;
  currentViewers: number;
  trend: 'hot' | 'trending' | 'normal';
}

// Real-time data generation functions
const generateRealtimeVisitorData = (): VisitorData => {
  const now = new Date();
  const hour = now.getHours();
  
  // Simulate realistic tourism patterns (peak hours: 10-12, 14-17)
  let baseVisitors = 50;
  if (hour >= 10 && hour <= 12) baseVisitors = 120;
  else if (hour >= 14 && hour <= 17) baseVisitors = 150;
  else if (hour >= 18 && hour <= 21) baseVisitors = 90;
  else if (hour >= 22 || hour <= 6) baseVisitors = 20;
  
  const randomVariation = Math.random() * 40 - 20; // ±20 variation
  const visitors = Math.max(0, Math.floor(baseVisitors + randomVariation));
  
  return {
    timestamp: now,
    visitors,
    revenue: visitors * (2500 + Math.random() * 1000), // ₹2500-3500 per visitor
    onlineUsers: Math.floor(visitors * 0.3 + Math.random() * 20) // 30% online + variation
  };
};

const generateLiveDistrictData = (): DistrictMetrics[] => {
  const districts = [
    { name: 'Ranchi', baseVisitors: 120, weight: 0.285 },
    { name: 'Jamshedpur', baseVisitors: 85, weight: 0.201 },
    { name: 'Dhanbad', baseVisitors: 75, weight: 0.180 },
    { name: 'Deoghar', baseVisitors: 65, weight: 0.140 },
    { name: 'Hazaribagh', baseVisitors: 50, weight: 0.114 },
    { name: 'Others', baseVisitors: 35, weight: 0.080 }
  ];

  return districts.map(district => {
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const visitors = Math.floor(district.baseVisitors * (1 + variation));
    const growth = (Math.random() - 0.5) * 30; // ±15% growth
    
    let status: 'trending_up' | 'trending_down' | 'stable' = 'stable';
    if (growth > 5) status = 'trending_up';
    else if (growth < -5) status = 'trending_down';
    
    return {
      district: district.name,
      visitors,
      percentage: district.weight * 100,
      growth: Number(growth.toFixed(1)),
      status
    };
  });
};

const generateLiveAttractions = (): LiveAttraction[] => {
  const attractions = [
    { name: 'Hundru Falls', baseViews: 180, baseBookings: 25 },
    { name: 'Betla National Park', baseViews: 150, baseBookings: 20 },
    { name: 'Baidyanath Temple', baseViews: 170, baseBookings: 30 },
    { name: 'Jagannath Temple', baseViews: 120, baseBookings: 18 },
    { name: 'Netarhat Hills', baseViews: 100, baseBookings: 15 },
    { name: 'Tribal Museum', baseViews: 90, baseBookings: 12 }
  ];

  return attractions.map(attr => {
    const viewVariation = Math.random() * 60 - 30; // ±30 variation
    const bookingVariation = Math.random() * 10 - 5; // ±5 variation
    const views = Math.max(0, attr.baseViews + viewVariation);
    const bookings = Math.max(0, attr.baseBookings + bookingVariation);
    const currentViewers = Math.floor(Math.random() * 25 + 5); // 5-30 current viewers
    const rating = 4.3 + Math.random() * 0.7; // 4.3-5.0 rating
    
    let trend: 'hot' | 'trending' | 'normal' = 'normal';
    if (currentViewers > 20) trend = 'hot';
    else if (currentViewers > 15) trend = 'trending';
    
    return {
      name: attr.name,
      views: Math.floor(views),
      bookings: Math.floor(bookings),
      rating: Number(rating.toFixed(1)),
      currentViewers,
      trend
    };
  });
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('live');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Real-time data state
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    totalVisitors: 0,
    totalRevenue: 0,
    avgRating: 4.7,
    activeDistricts: 24,
    currentOnlineUsers: 0,
    todayBookings: 0,
    realtimeGrowth: 0
  });
  
  const [visitorHistory, setVisitorHistory] = useState<VisitorData[]>([]);
  const [districtMetrics, setDistrictMetrics] = useState<DistrictMetrics[]>([]);
  const [liveAttractions, setLiveAttractions] = useState<LiveAttraction[]>([]);

  // Real-time data update function
  const updateRealtimeData = useCallback(() => {
    try {
      const newVisitorData = generateRealtimeVisitorData();
      const newDistrictData = generateLiveDistrictData();
      const newAttractionData = generateLiveAttractions();
      
      // Update visitor history (keep last 20 data points for chart)
      setVisitorHistory(prev => {
        const updated = [...prev, newVisitorData].slice(-20);
        return updated;
      });
      
      setDistrictMetrics(newDistrictData);
      setLiveAttractions(newAttractionData);
      
      // Calculate live metrics
      const totalVisitors = visitorHistory.reduce((sum, data) => sum + data.visitors, 0) + newVisitorData.visitors;
      const totalRevenue = visitorHistory.reduce((sum, data) => sum + data.revenue, 0) + newVisitorData.revenue;
      const avgRating = newAttractionData.reduce((sum, attr) => sum + attr.rating, 0) / newAttractionData.length;
      const todayBookings = newAttractionData.reduce((sum, attr) => sum + attr.bookings, 0);
      const previousHourVisitors = visitorHistory[visitorHistory.length - 2]?.visitors || newVisitorData.visitors;
      const realtimeGrowth = previousHourVisitors > 0 ? 
        ((newVisitorData.visitors - previousHourVisitors) / previousHourVisitors * 100) : 0;
      
      setLiveMetrics({
        totalVisitors,
        totalRevenue,
        avgRating: Number(avgRating.toFixed(1)),
        activeDistricts: 24,
        currentOnlineUsers: newVisitorData.onlineUsers,
        todayBookings,
        realtimeGrowth: Number(realtimeGrowth.toFixed(1))
      });
      
      setLastUpdated(new Date());
      setIsConnected(true);
    } catch (error) {
      console.error('Real-time update failed:', error);
      setIsConnected(false);
    }
  }, [visitorHistory]);

  // Initialize and setup real-time updates
  useEffect(() => {
    // Initial data load
    updateRealtimeData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(updateRealtimeData, 30000);
    
    // Simulate network connectivity check
    const connectivityCheck = setInterval(() => {
      setIsConnected(Math.random() > 0.05); // 95% uptime simulation
    }, 60000);
    
    return () => {
      clearInterval(interval);
      clearInterval(connectivityCheck);
    };
  }, [updateRealtimeData]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateRealtimeData();
    } catch (error) {
      console.error('Manual refresh failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section with Real-time Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Live Tourism Analytics</h1>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  <Wifi className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 border-red-300">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Offline
                </Badge>
              )}
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                Updated {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">Real-time insights into Jharkhand's tourism ecosystem</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live Data</SelectItem>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Updating...' : 'Refresh'}
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Live Data
          </Button>
        </div>
      </div>

      {/* Real-time Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Visitors</CardTitle>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveMetrics.currentOnlineUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {liveMetrics.realtimeGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={liveMetrics.realtimeGrowth >= 0 ? 'text-green-500' : 'text-red-500'}>
                {liveMetrics.realtimeGrowth >= 0 ? '+' : ''}{liveMetrics.realtimeGrowth}%
              </span>
              <span className="ml-1">vs last update</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(liveMetrics.totalRevenue / 100000).toFixed(1)}L</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span className="ml-1">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveMetrics.avgRating}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+0.1</span>
              <span className="ml-1">vs last hour</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveMetrics.todayBookings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="h-3 w-3 mr-1 text-blue-500" />
              <span className="text-blue-500">Real-time</span>
              <span className="ml-1">bookings today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+{growthRate.toFixed(1)}%</span>
              <span className="ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 10000000).toFixed(1)}Cr</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+12.3%</span>
              <span className="ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+0.2</span>
              <span className="ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Districts</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="h-3 w-3 mr-1 text-blue-500" />
              <span className="text-blue-500">100%</span>
              <span className="ml-1">coverage</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="visitors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visitors" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Visitors
          </TabsTrigger>
          <TabsTrigger value="districts" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Districts
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="attractions" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Attractions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visitors" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Visitors Trend</CardTitle>
                <CardDescription>Visitor count over the last 9 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Visitors']} />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue generated (₹ Crores)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`₹${(value / 10000000).toFixed(1)}Cr`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#82ca9d" 
                      strokeWidth={3}
                      dot={{ fill: '#82ca9d', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="districts">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>District-wise Visitor Distribution</CardTitle>
                <CardDescription>Percentage share of total visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={districtPopularity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ district, percentage }) => `${district} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visitors"
                    >
                      {districtPopularity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Visitors']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Districts</CardTitle>
                <CardDescription>Ranked by total visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {districtPopularity.map((district, index) => (
                    <div key={district.district} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{district.district}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{district.visitors.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{district.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Demographics</CardTitle>
              <CardDescription>Breakdown of visitor types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={visitorDemographics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {visitorDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  {visitorDemographics.map((demo, index) => (
                    <div key={demo.category} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="font-medium">{demo.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{demo.count.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{demo.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attractions">
          <Card>
            <CardHeader>
              <CardTitle>Top Attractions Performance</CardTitle>
              <CardDescription>Most viewed and booked destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAttractions.map((attraction, index) => (
                  <div key={attraction.name} className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{attraction.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>{attraction.views.toLocaleString()} views</span>
                          <span>•</span>
                          <span>{attraction.bookings.toLocaleString()} bookings</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{attraction.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
