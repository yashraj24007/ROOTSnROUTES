import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, MapPin, Calendar, Download, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { analyticsService, VisitorStats, PopularDestination, EconomicImpact, TourismTrend, DemographicData, SeasonalPattern, AlertsAndInsights } from '../services/analyticsService';
import { toast } from '../hooks/use-toast';

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className = '' }) => {
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [popularDestinations, setPopularDestinations] = useState<PopularDestination[]>([]);
  const [economicImpact, setEconomicImpact] = useState<EconomicImpact | null>(null);
  const [tourismTrends, setTourismTrends] = useState<TourismTrend[]>([]);
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
  const [seasonalPatterns, setSeasonalPatterns] = useState<SeasonalPattern[]>([]);
  const [alertsAndInsights, setAlertsAndInsights] = useState<AlertsAndInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');

  const districts = analyticsService.getDistrictsList();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  useEffect(() => {
    loadAllData();
  }, [selectedDistrict, selectedTimeRange]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        stats,
        destinations,
        impact,
        trends,
        demographics,
        seasonal,
        alerts
      ] = await Promise.all([
        analyticsService.getVisitorStats(),
        analyticsService.getPopularDestinations(),
        analyticsService.getEconomicImpact(),
        analyticsService.getTourismTrends(),
        analyticsService.getDemographicData(),
        analyticsService.getSeasonalPatterns(),
        analyticsService.getAlertsAndInsights()
      ]);

      setVisitorStats(stats);
      setPopularDestinations(destinations);
      setEconomicImpact(impact);
      setTourismTrends(trends);
      setDemographicData(demographics);
      setSeasonalPatterns(seasonal);
      setAlertsAndInsights(alerts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async (format: 'pdf' | 'excel') => {
    try {
      const reportUrl = await analyticsService.exportReport(format, {
        district: selectedDistrict !== 'All Districts' ? selectedDistrict : undefined
      });
      
      toast({
        title: "Report Generated",
        description: `Your ${format.toUpperCase()} report is ready for download`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `₹${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)}K`;
    }
    return `₹${value}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getAlertVariant = (type: string): "default" | "destructive" => {
    return type === 'error' || type === 'warning' ? 'destructive' : 'default';
  };

  if (loading) {
    return (
      <div className={`container mx-auto p-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Tourism insights and performance metrics for Jharkhand
          </p>
        </div>

        <div className="flex space-x-2">
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {districts.map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => handleExportReport('pdf')} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => handleExportReport('excel')} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      {visitorStats && economicImpact && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(visitorStats.totalVisitors)}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                +{visitorStats.growthRate.yearly}% from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(economicImpact.totalRevenue)}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Economic multiplier: {economicImpact.economicMultiplier}x
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employment Created</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(economicImpact.directEmployment + economicImpact.indirectEmployment)}
              </div>
              <p className="text-xs text-muted-foreground">
                Direct: {formatNumber(economicImpact.directEmployment)} | 
                Indirect: {formatNumber(economicImpact.indirectEmployment)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Visitors</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(visitorStats.dailyVisitors)}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                +{visitorStats.growthRate.daily}% from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Alerts & Insights */}
      {alertsAndInsights && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Active Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertsAndInsights.alerts.map(alert => (
                <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
                  <div className="flex items-start space-x-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertTitle className="text-sm">{alert.title}</AlertTitle>
                      <AlertDescription className="text-xs mt-1">
                        {alert.message}
                      </AlertDescription>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertsAndInsights.insights.map(insight => (
                <div key={insight.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">{insight.title}</h4>
                    <Badge variant={insight.impact === 'positive' ? 'default' : 'secondary'}>
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">
                      Confidence: {Math.round(insight.confidence * 100)}%
                    </span>
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts and Data */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Tourism Trends</TabsTrigger>
          <TabsTrigger value="destinations">Popular Destinations</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={tourismTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={tourismTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Destinations by Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={popularDestinations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularDestinations.slice(0, 5).map((dest, index) => (
                    <div key={dest.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold text-sm">{dest.name}</h4>
                        <p className="text-xs text-muted-foreground">{dest.district} • {dest.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{formatNumber(dest.visitors)}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400">+{dest.growthRate}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          {demographicData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Group Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(demographicData.ageGroups).map(([age, percentage]) => ({
                          name: age,
                          value: percentage
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(demographicData.ageGroups).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tourism Purpose</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={Object.entries(demographicData.purposes).map(([purpose, percentage]) => ({
                      purpose: purpose.charAt(0).toUpperCase() + purpose.slice(1),
                      value: percentage
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="purpose" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Visitor Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={seasonalPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={seasonalPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="averageTemperature" stroke="#ff7300" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#387908" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;