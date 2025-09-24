// Tourism Officials Dashboard Enhancement
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, MapPin, Calendar, Award, Target, AlertTriangle } from 'lucide-react';

interface TourismOfficialMetrics {
  totalTourists: number;
  revenueGenerated: number;
  employmentCreated: number;
  culturalEventsConducted: number;
  ecoImpactScore: number;
  communityBenefit: number;
}

const TourismOfficialDashboard: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('month');

  // Mock data for tourism officials
  const officialMetrics: TourismOfficialMetrics = {
    totalTourists: 45678,
    revenueGenerated: 2456789,
    employmentCreated: 1234,
    culturalEventsConducted: 89,
    ecoImpactScore: 87,
    communityBenefit: 92
  };

  const districtPerformance = [
    { name: 'Ranchi', tourists: 12345, revenue: 678900, growth: 15.2 },
    { name: 'Jamshedpur', tourists: 9876, revenue: 543210, growth: 12.8 },
    { name: 'Dhanbad', tourists: 7654, revenue: 432100, growth: 8.5 },
    { name: 'Bokaro', tourists: 6543, revenue: 321000, growth: 10.3 },
    { name: 'Deoghar', tourists: 8765, revenue: 456700, growth: 18.7 }
  ];

  const sustainabilityMetrics = [
    { category: 'Environmental Impact', score: 85, status: 'Good' },
    { category: 'Cultural Preservation', score: 92, status: 'Excellent' },
    { category: 'Community Engagement', score: 78, status: 'Good' },
    { category: 'Economic Distribution', score: 88, status: 'Very Good' }
  ];

  const actionItems = [
    { 
      priority: 'High', 
      task: 'Increase marketing for Netarhat Hill Station',
      deadline: '2025-10-15',
      department: 'Tourism Marketing'
    },
    {
      priority: 'Medium',
      task: 'Improve infrastructure at Hundru Falls',
      deadline: '2025-11-30',
      department: 'Infrastructure'
    },
    {
      priority: 'High',
      task: 'Launch tribal craft promotion campaign',
      deadline: '2025-10-01',
      department: 'Cultural Affairs'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tourism Officials Dashboard</h1>
          <p className="text-muted-foreground">Monitor tourism impact and strategic initiatives for Jharkhand</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm">
            <Target className="w-4 h-4 mr-2" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tourists (YTD)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{officialMetrics.totalTourists.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23.5% from last year
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(officialMetrics.revenueGenerated / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.2% from target
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employment Created</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{officialMetrics.employmentCreated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Direct & indirect jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* District Performance */}
      <Card>
        <CardHeader>
          <CardTitle>District-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districtPerformance.map((district) => (
              <div key={district.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">{district.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {district.tourists.toLocaleString()} tourists
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{(district.revenue / 100000).toFixed(1)}L</p>
                  <Badge variant={district.growth > 15 ? 'default' : 'secondary'}>
                    {district.growth > 0 ? '+' : ''}{district.growth}% growth
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Sustainable Tourism Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sustainabilityMetrics.map((metric) => (
              <div key={metric.category} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{metric.category}</h4>
                  <Badge 
                    variant={
                      metric.score >= 90 ? 'default' : 
                      metric.score >= 80 ? 'secondary' : 'outline'
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary">{metric.score}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Priority Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge 
                    variant={item.priority === 'High' ? 'destructive' : 'secondary'}
                  >
                    {item.priority}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{item.task}</h4>
                    <p className="text-sm text-muted-foreground">{item.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Due: {item.deadline}</p>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourismOfficialDashboard;