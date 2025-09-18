import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Clock, Phone, Camera, Navigation, Users, Car, Home } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { allDestinations } from "@/data/completeDestinations";
import { useEffect, useState } from "react";

interface Destination {
  id: number;
  name: string;
  district: string;
  category: string;
  type: string;
  description: string;
  whyFamous: string;
  bestTime: string;
  entryFee: string;
  rating: number;
  reviews: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  nearbyAttractions: string[];
  facilities: string[];
  activities: string[];
  howToReach: string;
  stayOptions: string[];
  localCuisine: string[];
  tips: string[];
}

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const found = allDestinations.find(dest => dest.id === parseInt(id));
      setDestination(found || null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">Destination Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sorry, we couldn't find the destination you're looking for.
          </p>
          <Link to="/destinations">
            <Button size="lg">
              Browse All Destinations
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative h-96 mt-16 overflow-hidden">
        <img
          src={`https://picsum.photos/1200/400?random=${destination.id}`}
          alt={destination.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://source.unsplash.com/1200x400/?nature,travel,${destination.category}&sig=${destination.id}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {destination.district} District
              </Badge>
              <Badge variant="secondary" className={`${
                destination.type === 'hidden' ? 'bg-orange-500' : 'bg-primary'
              } text-white`}>
                {destination.type === 'hidden' ? 'Hidden Gem' : 'Famous'}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{destination.rating}</span>
                <span className="text-white/80">({destination.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>{destination.district} District, Jharkhand</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {destination.description}
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Why This Place is Special</h4>
                  <p className="text-orange-700">{destination.whyFamous}</p>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Key Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Things to Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary text-sm font-semibold">{index + 1}</span>
                      </div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to Reach */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  How to Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{destination.howToReach}</p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Traveler Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-blue-800 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Entry Fee</span>
                  <span className="font-semibold text-primary">{destination.entryFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Best Time</span>
                  <span className="font-semibold">{destination.bestTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary">{destination.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">District</span>
                  <span className="font-semibold">{destination.district}</span>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Attractions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Nearby Attractions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {destination.nearbyAttractions.map((attraction, index) => (
                    <div key={index} className="p-2 text-sm text-muted-foreground">
                      • {attraction}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stay Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Where to Stay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {destination.stayOptions.map((option, index) => (
                    <div key={index} className="p-2 text-sm text-muted-foreground">
                      • {option}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Local Cuisine */}
            <Card>
              <CardHeader>
                <CardTitle>Local Cuisine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {destination.localCuisine.map((dish, index) => (
                    <div key={index} className="p-2 text-sm text-muted-foreground">
                      • {dish}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/marketplace" className="block">
                <Button className="w-full" size="lg">
                  Book Tour Package
                </Button>
              </Link>
              <Link to="/transport" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Plan Transport
                </Button>
              </Link>
              <Link to="/chatbot" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Destinations */}
        <div className="mt-12 text-center">
          <Link to="/destinations">
            <Button variant="outline" size="lg">
              ← Back to All Destinations
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;