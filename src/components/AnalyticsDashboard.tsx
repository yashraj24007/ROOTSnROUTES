import React, { useState, useEffect } from 'react';
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
  RefreshCw
} from 'lucide-react';

// Sample data for the dashboard
const monthlyVisitors = [
  { month: 'Jan', visitors: 12400, revenue: 2840000 },
  { month: 'Feb', visitors: 13900, revenue: 3200000 },
  { month: 'Mar', visitors: 15600, revenue: 3890000 },
  { month: 'Apr', visitors: 18200, revenue: 4320000 },
  { month: 'May', visitors: 22100, revenue: 5100000 },
  { month: 'Jun', visitors: 19800, revenue: 4650000 },
  { month: 'Jul', visitors: 25300, revenue: 5980000 },
  { month: 'Aug', visitors: 28700, revenue: 6840000 },
  { month: 'Sep', visitors: 21900, revenue: 5120000 }
];

const districtPopularity = [
  { district: 'Ranchi', visitors: 45620, percentage: 28.5 },
  { district: 'Jamshedpur', visitors: 32100, percentage: 20.1 },
  { district: 'Dhanbad', visitors: 28900, percentage: 18.0 },
  { district: 'Deoghar', visitors: 22400, percentage: 14.0 },
  { district: 'Hazaribagh', visitors: 18300, percentage: 11.4 },
  { district: 'Others', visitors: 12680, percentage: 8.0 }
];

const visitorDemographics = [
  { category: 'Domestic', value: 75, count: 120500 },
  { category: 'International', value: 15, count: 24100 },
  { category: 'Business', value: 10, count: 16000 }
];

const topAttractions = [
  { name: 'Hundru Falls', views: 15600, bookings: 2340, rating: 4.8 },
  { name: 'Betla National Park', views: 12800, bookings: 1890, rating: 4.7 },
  { name: 'Baidyanath Temple', views: 14200, bookings: 2100, rating: 4.9 },
  { name: 'Jagannath Temple', views: 9800, bookings: 1450, rating: 4.6 },
  { name: 'Tribal Museum', views: 8900, bookings: 1230, rating: 4.5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('3m');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Calculate key metrics
  const totalVisitors = monthlyVisitors.reduce((sum, month) => sum + month.visitors, 0);
  const totalRevenue = monthlyVisitors.reduce((sum, month) => sum + month.revenue, 0);
  const avgRating = topAttractions.reduce((sum, attr) => sum + attr.rating, 0) / topAttractions.length;
  const growthRate = ((monthlyVisitors[8].visitors - monthlyVisitors[0].visitors) / monthlyVisitors[0].visitors * 100);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tourism Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into Jharkhand's tourism ecosystem</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
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
