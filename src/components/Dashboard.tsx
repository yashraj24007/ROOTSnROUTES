import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  Star,
  Leaf,
  Mountain,
  Camera,
  Heart,
  Activity
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Active Destinations",
      value: "128",
      change: "+12%",
      icon: MapPin,
      trend: "up",
      color: "forest"
    },
    {
      title: "Happy Travelers",
      value: "15.2K",
      change: "+8%",
      icon: Users,
      trend: "up",
      color: "autumn"
    },
    {
      title: "Bookings Today",
      value: "42",
      change: "+24%",
      icon: Calendar,
      trend: "up",
      color: "golden"
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      trend: "up",
      color: "earth"
    }
  ];

  const recentActivities = [
    {
      user: "Priya Sharma",
      action: "booked a trip to Hundru Falls",
      time: "2 hours ago",
      avatar: "🌸"
    },
    {
      user: "Raj Kumar",
      action: "reviewed Betla National Park",
      time: "4 hours ago",
      avatar: "🏔️"
    },
    {
      user: "Anjali Devi",
      action: "shared photos from Baidyanath Temple",
      time: "6 hours ago",
      avatar: "📸"
    },
    {
      user: "Dev Singh",
      action: "added Dokra Elephant to wishlist",
      time: "8 hours ago",
      avatar: "❤️"
    }
  ];

  const popularDestinations = [
    {
      name: "Hundru Falls",
      visitors: "2.4K",
      rating: 4.9,
      image: "🏞️",
      category: "Waterfall"
    },
    {
      name: "Betla National Park",
      visitors: "1.8K",
      rating: 4.7,
      image: "🐅",
      category: "Wildlife"
    },
    {
      name: "Baidyanath Temple",
      visitors: "3.1K",
      rating: 4.8,
      image: "🛕",
      category: "Heritage"
    },
    {
      name: "Santhali Village",
      visitors: "856",
      rating: 4.6,
      image: "🏘️",
      category: "Culture"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-dashboard p-8 md:p-12 transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6 stagger-item">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Tourism Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to your organic forest & autumn themed dashboard. Monitor your Jharkhand tourism platform with natural elegance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`
                card-enhanced hover-lift stagger-item
                relative overflow-hidden transition-all duration-500
                ${stat.color === 'forest' ? 'bg-gradient-forest border-forest-200 dark:bg-gradient-forest-dark dark:border-forest-700' : ''}
                ${stat.color === 'autumn' ? 'bg-gradient-autumn border-autumn-200 dark:bg-gradient-autumn-dark dark:border-autumn-700' : ''}
                ${stat.color === 'golden' ? 'bg-gradient-golden border-golden-200 dark:bg-gradient-golden dark:border-golden-700' : ''}
                ${stat.color === 'earth' ? 'bg-gradient-earth border-earth-200 dark:bg-gradient-earth-dark dark:border-earth-700' : ''}
                shadow-dashboard
              `}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-forest-900 dark:text-forest-100">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`
                  h-5 w-5 transition-all duration-300 drop-shadow-sm icon-pulse
                  ${stat.color === 'forest' ? 'text-forest-700 dark:text-forest-300' : ''}
                  ${stat.color === 'autumn' ? 'text-autumn-500 dark:text-autumn-300' : ''}
                  ${stat.color === 'golden' ? 'text-golden-500 dark:text-golden-300' : ''}
                  ${stat.color === 'earth' ? 'text-earth-700 dark:text-earth-300' : ''}
                `} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-forest-900 dark:text-forest-100 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-forest-500 dark:text-forest-300" />
                  <span className="text-xs text-forest-700 dark:text-forest-300 font-medium">
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
              
              {/* Organic decoration */}
              <div className={`
                absolute -bottom-6 -right-6 w-16 h-16 rounded-full opacity-20 pointer-events-none
                ${stat.color === 'forest' ? 'bg-gradient-to-br from-forest-500 to-forest-300' : ''}
                ${stat.color === 'autumn' ? 'bg-gradient-to-br from-autumn-500 to-autumn-300' : ''}
                ${stat.color === 'golden' ? 'bg-gradient-to-br from-golden-500 to-golden-300' : ''}
                ${stat.color === 'earth' ? 'bg-gradient-to-br from-earth-500 to-earth-300' : ''}
                shadow-glow
              `} />
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Popular Destinations */}
          <Card className="lg:col-span-2 bg-gradient-card border-border shadow-dashboard backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-forest-900 dark:text-forest-100">
                <Mountain className="h-5 w-5 text-forest-500 dark:text-forest-300" />
                <span>Popular Destinations</span>
              </CardTitle>
              <CardDescription>
                Top visited places in Jharkhand this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularDestinations.map((destination, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-organic/20 border border-forest-100 dark:border-forest-800 hover:bg-gradient-organic/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{destination.image}</div>
                      <div>
                        <h4 className="font-semibold text-forest-900 dark:text-forest-100">{destination.name}</h4>
                        <div className="flex items-center space-x-3 text-sm text-earth-700 dark:text-earth-200">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-forest-500 dark:text-forest-300" />
                            <span>{destination.visitors} visitors</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-golden-500 dark:text-golden-300" />
                            <span>{destination.rating}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-autumn-100 text-autumn-700 border-autumn-200 dark:bg-autumn-800 dark:text-autumn-100"
                    >
                      {destination.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-gradient-card border-border shadow-dashboard backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-autumn-700 dark:text-autumn-100">
                <Activity className="h-5 w-5 text-autumn-500 dark:text-autumn-300" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>
                Latest user interactions on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-forest-50 dark:hover:bg-forest-900/20 transition-colors duration-300">
                    <div className="text-2xl">{activity.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-forest-900 dark:text-forest-100">
                        <span className="font-medium text-forest-700 dark:text-forest-300">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-xs text-earth-700 dark:text-earth-200">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
  <div className="flex flex-wrap gap-6 justify-center mt-10">
          <Link to="/destinations">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-forest-500 to-autumn-500 hover:from-forest-600 hover:to-golden-500 text-white shadow-organic transition-all duration-500 hover:scale-105 px-8 py-4 rounded-full"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Explore Destinations
            </Button>
          </Link>
          <Link to="/destinations">
            <Button 
              size="lg"
              variant="outline"
              className="border-autumn-300 text-autumn-600 hover:bg-autumn-50 dark:border-autumn-600 dark:text-autumn-400 dark:hover:bg-autumn-900/20 shadow-organic transition-all duration-500 hover:scale-105 px-8 py-4 rounded-full"
            >
              <Camera className="h-4 w-4 mr-2" />
              View Gallery
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button 
              size="lg"
              variant="outline"
              className="border-golden-300 text-golden-600 hover:bg-golden-50 dark:border-golden-600 dark:text-golden-400 dark:hover:bg-golden-900/20 shadow-organic transition-all duration-500 hover:scale-105 px-8 py-4 rounded-full"
            >
              <Heart className="h-4 w-4 mr-2" />
              Saved Places
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;