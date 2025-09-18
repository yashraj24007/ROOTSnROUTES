import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Sparkles,
  Download,
  Save,
  Share,
  Star,
  Info,
  CheckCircle,
  AlertCircle,
  Loader2,
  Camera,
  Utensils,
  Car,
  Bus,
  Plane
} from 'lucide-react';
import { aiItineraryService, UserPreferences, GeneratedItinerary } from '@/services/aiItineraryService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface AIItineraryPlannerProps {
  onClose?: () => void;
}

const AIItineraryPlanner: React.FC<AIItineraryPlannerProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [step, setStep] = useState<'preferences' | 'generating' | 'result'>('preferences');
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    duration: 3,
    budget: 'medium',
    travelStyle: 'family',
    groupSize: 2,
    accessibility: false,
    transportation: 'mixed'
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<GeneratedItinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableInterests = [
    { id: 'nature', label: 'Nature & Wildlife', icon: '🌿' },
    { id: 'heritage', label: 'Cultural Heritage', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure Sports', icon: '🧗' },
    { id: 'spiritual', label: 'Spiritual Places', icon: '🙏' },
    { id: 'wildlife', label: 'Wildlife Parks', icon: '🐅' },
    { id: 'waterfalls', label: 'Waterfalls', icon: '💦' },
    { id: 'tribal', label: 'Tribal Culture', icon: '🎭' },
    { id: 'photography', label: 'Photography', icon: '📸' }
  ];

  const loadSavedItineraries = React.useCallback(() => {
    const saved = aiItineraryService.getSavedItineraries(user?.id);
    setSavedItineraries(saved);
  }, [user?.id]);

  useEffect(() => {
    loadSavedItineraries();
  }, [loadSavedItineraries]);

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    if (preferences.interests.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select at least one interest to continue.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setStep('generating');

    try {
      const itinerary = await aiItineraryService.generateItinerary(preferences);
      setGeneratedItinerary(itinerary);
      setStep('result');
      
      toast({
        title: 'Itinerary Generated!',
        description: 'Your personalized travel plan is ready.',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
      setStep('preferences');
      toast({
        title: 'Generation Failed',
        description: 'Could not generate itinerary. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveItinerary = async () => {
    if (!generatedItinerary) return;

    try {
      await aiItineraryService.saveItinerary(generatedItinerary, user?.id);
      loadSavedItineraries();
      toast({
        title: 'Itinerary Saved!',
        description: 'Your itinerary has been saved successfully.',
      });
    } catch (err) {
      toast({
        title: 'Save Failed',
        description: 'Could not save itinerary. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const shareItinerary = async () => {
    if (!generatedItinerary) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: generatedItinerary.title,
          text: `Check out my ${generatedItinerary.totalDays}-day Jharkhand travel plan!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(
          `${generatedItinerary.title}\n\nTotal Days: ${generatedItinerary.totalDays}\nEstimated Cost: ₹${generatedItinerary.totalEstimatedCost}\n\nGenerated on ROOTSnROUTES - Jharkhand Tourism Platform`
        );
        toast({
          title: 'Copied to Clipboard!',
          description: 'Itinerary details copied successfully.',
        });
      }
    } catch (err) {
      toast({
        title: 'Share Failed',
        description: 'Could not share itinerary.',
        variant: 'destructive'
      });
    }
  };

  const exportItinerary = () => {
    if (!generatedItinerary) return;

    const itineraryText = `${generatedItinerary.title}\n\n` +
      `Duration: ${generatedItinerary.totalDays} days\n` +
      `Estimated Cost: ₹${generatedItinerary.totalEstimatedCost}\n\n` +
      generatedItinerary.itinerary.map(item => 
        `Day ${item.day}: ${item.destination.name}\n` +
        `Location: ${item.destination.district}\n` +
        `Morning: ${item.timeSlots.morning}\n` +
        `Afternoon: ${item.timeSlots.afternoon}\n` +
        `Evening: ${item.timeSlots.evening}\n` +
        `Cost: ₹${item.estimatedCost}\n` +
        `Tips: ${item.tips.join(', ')}\n\n`
      ).join('') +
      `\nGeneral Tips:\n${generatedItinerary.generalTips.join('\n')}\n\n` +
      `Weather Considerations: ${generatedItinerary.weatherConsiderations}`;

    const blob = new Blob([itineraryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedItinerary.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPreferencesForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Itinerary Planner
          </CardTitle>
          <CardDescription>
            Tell us about your preferences and we'll create a personalized travel plan for your Jharkhand adventure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">What interests you most?</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableInterests.map(interest => (
                <div
                  key={interest.id}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    preferences.interests.includes(interest.id)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card hover:bg-muted'
                  }`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <span className="text-2xl">{interest.icon}</span>
                  <span className="text-sm font-medium">{interest.label}</span>
                </div>
              ))}
            </div>
            {preferences.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {preferences.interests.map(interest => {
                  const interestInfo = availableInterests.find(i => i.id === interest);
                  return (
                    <Badge key={interest} variant="secondary">
                      {interestInfo?.icon} {interestInfo?.label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Trip Duration (days)
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                value={preferences.duration}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  duration: parseInt(e.target.value) || 1
                }))}
              />
            </div>

            {/* Group Size */}
            <div className="space-y-2">
              <Label htmlFor="groupSize" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Group Size
              </Label>
              <Input
                id="groupSize"
                type="number"
                min="1"
                max="20"
                value={preferences.groupSize}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  groupSize: parseInt(e.target.value) || 1
                }))}
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget Range
              </Label>
              <Select
                value={preferences.budget}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setPreferences(prev => ({ ...prev, budget: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Budget-Friendly (₹1,000-2,000/day)</SelectItem>
                  <SelectItem value="medium">Comfortable (₹2,500-4,000/day)</SelectItem>
                  <SelectItem value="high">Luxury (₹4,500+/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Style */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Travel Style
              </Label>
              <Select
                value={preferences.travelStyle}
                onValueChange={(value: UserPreferences['travelStyle']) => 
                  setPreferences(prev => ({ ...prev, travelStyle: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adventure">Adventure Seeker</SelectItem>
                  <SelectItem value="cultural">Cultural Explorer</SelectItem>
                  <SelectItem value="relaxation">Relaxation Focused</SelectItem>
                  <SelectItem value="family">Family Friendly</SelectItem>
                  <SelectItem value="solo">Solo Traveler</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Additional Preferences */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Additional Preferences</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessibility"
                  checked={preferences.accessibility}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, accessibility: !!checked }))
                  }
                />
                <Label htmlFor="accessibility">Accessibility requirements needed</Label>
              </div>

              <div className="space-y-2">
                <Label>Preferred Transportation</Label>
                <Select
                  value={preferences.transportation}
                  onValueChange={(value: UserPreferences['transportation']) => 
                    setPreferences(prev => ({ ...prev, transportation: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Private Car/Taxi</SelectItem>
                    <SelectItem value="public">Public Transport</SelectItem>
                    <SelectItem value="mixed">Mixed Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={generateItinerary} 
              className="flex-1"
              disabled={preferences.interests.length === 0}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Itinerary
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Saved Itineraries */}
      {savedItineraries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Saved Itineraries</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-40">
              <div className="space-y-2">
                {savedItineraries.map(itinerary => (
                  <div
                    key={itinerary.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setGeneratedItinerary(itinerary);
                      setStep('result');
                    }}
                  >
                    <div>
                      <p className="font-medium">{itinerary.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {itinerary.totalDays} days • ₹{itinerary.totalEstimatedCost}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderGenerating = () => (
    <Card className="text-center">
      <CardContent className="py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div>
            <h3 className="text-xl font-semibold">Creating Your Perfect Itinerary</h3>
            <p className="text-muted-foreground mt-2">
              Our AI is analyzing your preferences and crafting a personalized travel plan...
            </p>
          </div>
          <div className="w-full max-w-xs">
            <div className="bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full animate-pulse rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderItinerary = () => {
    if (!generatedItinerary) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{generatedItinerary.title}</CardTitle>
                <CardDescription className="mt-2">
                  {generatedItinerary.totalDays} days • ₹{generatedItinerary.totalEstimatedCost} estimated cost
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep('preferences')}>
                  <Info className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={saveItinerary}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={shareItinerary}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={exportItinerary}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="itinerary">Day-by-Day Plan</TabsTrigger>
            <TabsTrigger value="overview">Overview & Tips</TabsTrigger>
            <TabsTrigger value="map">Route Map</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-4">
            {generatedItinerary.itinerary.map((day, index) => (
              <Card key={day.day}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </span>
                      {day.destination.name}
                    </CardTitle>
                    <Badge variant="secondary">₹{day.estimatedCost}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {day.destination.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {day.travelTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-amber-500 dark:text-amber-400" />
                      {day.destination.rating}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">🌅 Morning</h4>
                      <p className="text-sm">{day.timeSlots.morning}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-orange-600">☀️ Afternoon</h4>
                      <p className="text-sm">{day.timeSlots.afternoon}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-purple-600 dark:text-purple-400">🌆 Evening</h4>
                      <p className="text-sm">{day.timeSlots.evening}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">💡 Tips for this day</h4>
                    <div className="flex flex-wrap gap-1">
                      {day.tips.map((tip, tipIndex) => (
                        <Badge key={tipIndex} variant="outline" className="text-xs">
                          {tip}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">General Travel Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedItinerary.generalTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weather & Climate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{generatedItinerary.weatherConsiderations}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generatedItinerary.itinerary.map((day) => (
                    <div key={day.day} className="flex justify-between items-center">
                      <span className="text-sm">Day {day.day}: {day.destination.name}</span>
                      <span className="font-medium">₹{day.estimatedCost}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Estimated Cost</span>
                    <span>₹{generatedItinerary.totalEstimatedCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Route Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {generatedItinerary.bestRouteMap}
                </p>
                
                <div className="space-y-3">
                  {generatedItinerary.itinerary.map((day, index) => (
                    <div key={day.day} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{day.destination.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {day.destination.district} • {day.travelTime}
                        </p>
                      </div>
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    For detailed navigation and real-time traffic updates, we recommend using Google Maps or similar navigation apps during your trip.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {step === 'preferences' && renderPreferencesForm()}
      {step === 'generating' && renderGenerating()}
      {step === 'result' && renderItinerary()}
    </div>
  );
};

export default AIItineraryPlanner;