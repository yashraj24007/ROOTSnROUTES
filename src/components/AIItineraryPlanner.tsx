import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Camera, 
  Mountain, 
  TreePine, 
  Building, 
  Utensils,
  Car,
  Bed,
  Star,
  Sparkles,
  Brain,
  Send,
  Download,
  Share,
  Heart,
  Loader2
} from 'lucide-react';

interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
  travelTime: string;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  category: 'attraction' | 'food' | 'accommodation' | 'transport' | 'cultural' | 'nature';
  cost: number;
  duration: string;
  rating: number;
  tips?: string[];
}

const AIItineraryPlanner: React.FC = () => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: '',
    budget: '',
    travelers: '1',
    interests: [] as string[],
    travelStyle: '',
    accommodation: '',
    dietary: '',
    mobility: '',
    specialRequests: ''
  });

  const interests = [
    { id: 'nature', label: 'Nature & Wildlife', icon: TreePine },
    { id: 'cultural', label: 'Cultural Heritage', icon: Building },
    { id: 'adventure', label: 'Adventure Sports', icon: Mountain },
    { id: 'food', label: 'Local Cuisine', icon: Utensils },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'spiritual', label: 'Spiritual Sites', icon: Heart },
  ];

  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate sample itinerary based on preferences
    const sampleItinerary: ItineraryDay[] = [
      {
        day: 1,
        date: new Date().toLocaleDateString(),
        activities: [
          {
            id: '1',
            time: '09:00 AM',
            title: 'Hundru Falls Visit',
            description: 'Experience the breathtaking 98-meter waterfall, perfect for photography and nature lovers.',
            location: 'Hundru Falls, Ranchi',
            category: 'nature',
            cost: 50,
            duration: '3 hours',
            rating: 4.5,
            tips: ['Best visited in morning for good lighting', 'Wear comfortable shoes', 'Carry water bottle']
          },
          {
            id: '2',
            time: '01:00 PM',
            title: 'Traditional Jharkhand Lunch',
            description: 'Authentic local cuisine featuring dishes like Litti Chokha and tribal specialties.',
            location: 'Local Restaurant, Ranchi',
            category: 'food',
            cost: 300,
            duration: '1 hour',
            rating: 4.3,
            tips: ['Try the local rice beer', 'Ask for mild spice level if needed']
          },
          {
            id: '3',
            time: '03:00 PM',
            title: 'Tribal Cultural Center',
            description: 'Learn about indigenous Jharkhand tribes and their rich cultural heritage.',
            location: 'Tribal Research Institute, Ranchi',
            category: 'cultural',
            cost: 100,
            duration: '2 hours',
            rating: 4.7,
            tips: ['Photography allowed with permission', 'Guide service recommended']
          }
        ],
        totalCost: 450,
        travelTime: '45 mins'
      },
      {
        day: 2,
        date: new Date(Date.now() + 86400000).toLocaleDateString(),
        activities: [
          {
            id: '4',
            time: '08:00 AM',
            title: 'Betla National Park Safari',
            description: 'Wildlife safari in Jharkhand\'s premier national park, home to elephants, tigers, and diverse flora.',
            location: 'Betla National Park, Latehar',
            category: 'nature',
            cost: 800,
            duration: '4 hours',
            rating: 4.8,
            tips: ['Book safari in advance', 'Carry binoculars', 'Early morning best for wildlife spotting']
          },
          {
            id: '5',
            time: '02:00 PM',
            title: 'Eco-Lodge Stay',
            description: 'Experience sustainable tourism with a stay at an eco-friendly lodge near the park.',
            location: 'Betla Eco Lodge',
            category: 'accommodation',
            cost: 2500,
            duration: 'Overnight',
            rating: 4.4,
            tips: ['Solar-powered facilities', 'Organic meals available', 'Nature walks included']
          }
        ],
        totalCost: 3300,
        travelTime: '2 hours'
      }
    ];

    setItinerary(sampleItinerary);
    setIsGenerating(false);
  };

  const getCategoryIcon = (category: Activity['category']) => {
    const icons = {
      nature: TreePine,
      cultural: Building,
      food: Utensils,
      accommodation: Bed,
      transport: Car,
      attraction: MapPin
    };
    const Icon = icons[category];
    return <Icon className="w-4 h-4" />;
  };

  const getCategoryColor = (category: Activity['category']) => {
    const colors = {
      nature: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      cultural: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      food: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      accommodation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      transport: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
      attraction: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    };
    return colors[category];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="w-8 h-8 text-primary" />
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          AI-Powered Itinerary Planner
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us your preferences and let our AI create a personalized travel experience 
          tailored specifically for your Jharkhand adventure.
        </p>
      </div>

      <div className="space-y-8">
        {/* Preferences Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Travel Preferences
            </CardTitle>
            <CardDescription>
              Fill in your travel details to get a customized itinerary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Preferred Destination</Label>
                <Select value={preferences.destination} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, destination: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ranchi">Ranchi</SelectItem>
                    <SelectItem value="jamshedpur">Jamshedpur</SelectItem>
                    <SelectItem value="dhanbad">Dhanbad</SelectItem>
                    <SelectItem value="bokaro">Bokaro</SelectItem>
                    <SelectItem value="deoghar">Deoghar</SelectItem>
                    <SelectItem value="hazaribagh">Hazaribagh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Trip Duration</Label>
                <Select value={preferences.duration} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="2">2 Days</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="7">1 Week</SelectItem>
                    <SelectItem value="14">2 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (₹)</Label>
                <Select value={preferences.budget} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget (₹2,000-5,000/day)</SelectItem>
                    <SelectItem value="mid">Mid-range (₹5,000-10,000/day)</SelectItem>
                    <SelectItem value="luxury">Luxury (₹10,000+/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Select value={preferences.travelers} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, travelers: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo</SelectItem>
                    <SelectItem value="2">Couple</SelectItem>
                    <SelectItem value="3-5">Small Group (3-5)</SelectItem>
                    <SelectItem value="6+">Large Group (6+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label>Interests & Activities</Label>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => {
                  const Icon = interest.icon;
                  const isSelected = preferences.interests.includes(interest.id);
                  return (
                    <Button
                      key={interest.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`justify-start gap-2 ${
                        isSelected ? 'bg-primary text-primary-foreground' : ''
                      }`}
                      onClick={() => handleInterestToggle(interest.id)}
                    >
                      <Icon className="w-4 h-4" />
                      {interest.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <Label>Travel Style</Label>
              <Select value={preferences.travelStyle} onValueChange={(value) => 
                setPreferences(prev => ({ ...prev, travelStyle: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relaxed">Relaxed & Leisurely</SelectItem>
                  <SelectItem value="balanced">Balanced Mix</SelectItem>
                  <SelectItem value="packed">Action-Packed</SelectItem>
                  <SelectItem value="flexible">Flexible Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="special">Special Requests</Label>
              <Textarea
                id="special"
                placeholder="Any specific requirements, dietary restrictions, accessibility needs, or special occasions..."
                value={preferences.specialRequests}
                onChange={(e) => setPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generateItinerary}
              disabled={isGenerating || !preferences.destination || !preferences.duration}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Your Perfect Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Itinerary
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Itinerary Section */}
        {itinerary.length > 0 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Your Personalized Itinerary
                    </CardTitle>
                    <CardDescription>
                      AI-generated plan for your Jharkhand adventure
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

          {/* Itinerary Days */}
          {itinerary.map((day) => (
            <Card key={day.day} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Day {day.day}</CardTitle>
                    <CardDescription>{day.date}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{day.totalCost.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{day.travelTime} travel</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {day.activities.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            {getCategoryIcon(activity.category)}
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {activity.time}
                            </Badge>
                            <Badge className={`text-xs ${getCategoryColor(activity.category)}`}>
                              {activity.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">{activity.rating}</span>
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-lg">{activity.title}</h4>
                          <p className="text-muted-foreground">{activity.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {activity.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ₹{activity.cost}
                            </span>
                          </div>

                          {activity.tips && (
                            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
                              <p className="font-medium text-sm text-amber-800 dark:text-amber-200 mb-1">
                                💡 Local Tips:
                              </p>
                              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                                {activity.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < day.activities.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Loading State */}
          {isGenerating && (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <p className="font-medium">Creating Your Perfect Itinerary</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI is analyzing your preferences and crafting a personalized experience...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {itinerary.length === 0 && !isGenerating && (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Brain className="w-16 h-16 text-muted-foreground mx-auto" />
                  <div className="space-y-2">
                    <p className="font-medium text-muted-foreground">Ready to Plan Your Adventure?</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Fill in your preferences above and let our AI create an amazing 
                      itinerary tailored just for you!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIItineraryPlanner;
