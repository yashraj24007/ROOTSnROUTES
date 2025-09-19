import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, ArrowRight, Camera, TreePine, Waves, Mountain, Bird, Trees, Compass, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import FavoriteButton from "@/components/FavoriteButton";

const NaturalWonders = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const naturalWonders = [
    {
      id: 1,
      name: "Hundru Falls",
      location: "Ranchi",
      description: "A magnificent 98-meter waterfall cascading from the Subarnarekha River, surrounded by dense forests and rocky terrain.",
      image: hundruFalls,
      difficulty: "Easy",
      duration: "2-3 hours",
      bestTime: "October to March",
      activities: ["Photography", "Trekking", "Swimming", "Bird Watching"],
      category: "Waterfall"
    },
    {
      id: 2,
      name: "Betla National Park",
      location: "Palamu",
      description: "Home to tigers, elephants, and diverse wildlife, this protected sanctuary offers incredible biodiversity and eco-tourism experiences.",
      image: betlaPark,
      difficulty: "Moderate",
      duration: "Full Day",
      bestTime: "November to April",
      activities: ["Wildlife Safari", "Bird Watching", "Photography", "Nature Walks"],
      category: "Wildlife"
    },
    {
      id: 3,
      name: "Dassam Falls",
      location: "Ranchi",
      description: "A stunning waterfall formed by the Kanchi River, known for its scenic beauty and peaceful surroundings.",
      image: hundruFalls,
      difficulty: "Easy",
      duration: "2-3 hours",
      bestTime: "September to February",
      activities: ["Photography", "Picnicking", "Nature Walks"],
      category: "Waterfall"
    },
    {
      id: 4,
      name: "Palamau Tiger Reserve",
      location: "Palamu",
      description: "One of India's oldest tiger reserves, featuring diverse ecosystems and endangered species conservation programs.",
      image: betlaPark,
      difficulty: "Moderate",
      duration: "Full Day",
      bestTime: "November to March",
      activities: ["Tiger Safari", "Conservation Tour", "Bird Watching", "Photography"],
      category: "Wildlife"
    },
    {
      id: 5,
      name: "Netarhat Hills",
      location: "Latehar",
      description: "Known as the 'Queen of Chotanagpur', offering breathtaking sunrise and sunset views from its scenic hilltops.",
      image: hundruFalls,
      difficulty: "Moderate",
      duration: "4-5 hours",
      bestTime: "October to March",
      activities: ["Trekking", "Photography", "Sunrise Viewing", "Nature Walks"],
      category: "Hills"
    },
    {
      id: 6,
      name: "Dimna Lake",
      location: "Jamshedpur",
      description: "A pristine artificial lake surrounded by hills and forests, perfect for boating and water sports activities.",
      image: betlaPark,
      difficulty: "Easy",
      duration: "3-4 hours",
      bestTime: "October to April",
      activities: ["Boating", "Water Sports", "Photography", "Picnicking"],
      category: "Lakes"
    },
    {
      id: 7,
      name: "Getalsud Dam",
      location: "Ranchi",
      description: "A beautiful dam reservoir offering panoramic views and peaceful environment for relaxation and photography.",
      image: hundruFalls,
      difficulty: "Easy",
      duration: "2-3 hours",
      bestTime: "November to March",
      activities: ["Photography", "Boating", "Picnicking", "Bird Watching"],
      category: "Dams"
    },
    {
      id: 8,
      name: "Hazaribagh National Park",
      location: "Hazaribagh",
      description: "A wildlife sanctuary known for its diverse flora and fauna, including tigers, leopards, and various bird species.",
      image: betlaPark,
      difficulty: "Moderate",
      duration: "Full Day",
      bestTime: "November to April",
      activities: ["Wildlife Safari", "Bird Watching", "Photography", "Nature Study"],
      category: "Parks"
    },
    {
      id: 9,
      name: "Jonha Falls",
      location: "Ranchi",
      description: "Also known as Gautamdhara, this waterfall is associated with Lord Buddha and offers spiritual significance along with natural beauty.",
      image: hundruFalls,
      difficulty: "Easy",
      duration: "2-3 hours",
      bestTime: "September to March",
      activities: ["Photography", "Meditation", "Trekking", "Spiritual Tourism"],
      category: "Waterfall"
    },
    {
      id: 10,
      name: "Parasnath Hills",
      location: "Giridih",
      description: "The highest peak in Jharkhand, sacred to Jains, offering challenging treks and panoramic views of the surrounding landscape.",
      image: betlaPark,
      difficulty: "Difficult",
      duration: "Full Day",
      bestTime: "October to March",
      activities: ["Trekking", "Pilgrimage", "Photography", "Adventure Sports"],
      category: "Hills"
    },
    {
      id: 11,
      name: "Kanke Dam",
      location: "Ranchi",
      description: "A scenic reservoir surrounded by hills, popular for its gardens and peaceful environment perfect for family outings.",
      image: hundruFalls,
      difficulty: "Easy",
      duration: "2-4 hours",
      bestTime: "October to April",
      activities: ["Boating", "Garden Visit", "Photography", "Picnicking"],
      category: "Dams"
    },
    {
      id: 12,
      name: "Dalma Wildlife Sanctuary",
      location: "Jamshedpur",
      description: "Home to elephants and diverse wildlife, offering excellent opportunities for wildlife photography and nature walks.",
      image: betlaPark,
      difficulty: "Moderate",
      duration: "Half Day",
      bestTime: "November to March",
      activities: ["Wildlife Safari", "Elephant Spotting", "Photography", "Nature Walks"],
      category: "Wildlife"
    }
  ];

  const categories = [
    { name: "All", icon: TreePine, count: naturalWonders.length },
    { name: "Waterfalls", icon: Waves, count: naturalWonders.filter(w => w.category === "Waterfall").length },
    { name: "Wildlife", icon: Bird, count: naturalWonders.filter(w => w.category === "Wildlife").length },
    { name: "Hills", icon: Mountain, count: naturalWonders.filter(w => w.category === "Hills").length },
    { name: "Lakes", icon: Compass, count: naturalWonders.filter(w => w.category === "Lakes").length },
    { name: "Dams", icon: Zap, count: naturalWonders.filter(w => w.category === "Dams").length },
    { name: "Parks", icon: Trees, count: naturalWonders.filter(w => w.category === "Parks").length }
  ];

  // Filter destinations based on selected category
  const filteredWonders = selectedCategory === "All" 
    ? naturalWonders 
    : naturalWonders.filter(wonder => {
        if (selectedCategory === "Waterfalls") return wonder.category === "Waterfall";
        return wonder.category === selectedCategory;
      });

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Natural Wonders
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Discover Jharkhand's breathtaking waterfalls, pristine forests, and diverse wildlife sanctuaries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/destinations">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Explore All Destinations
                </Button>
              </Link>
              <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
                Plan Your Trip
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.name;
              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600" 
                      : "bg-black/80 hover:bg-black text-white border-gray-700 hover:border-emerald-500"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${
                      isSelected 
                        ? "bg-white/20 text-white" 
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Natural Wonders Grid */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWonders.map((wonder) => (
              <Card key={wonder.id} className="group overflow-hidden hover:shadow-organic-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={wonder.image}
                    alt={`${wonder.name} - ${wonder.description.slice(0, 100)}...`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-forest-500 text-white">
                      {wonder.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-forest-900">
                      {wonder.difficulty}
                    </Badge>
                  </div>
                  
                  {/* Favorite Button */}
                  <FavoriteButton
                    destinationId={wonder.id.toString()}
                    destinationName={wonder.name}
                    destinationType={wonder.category.toLowerCase()}
                    destinationDistrict={wonder.location}
                    destinationImageUrl={wonder.image}
                    variant="floating"
                    size="sm"
                    className="top-4 left-1/2 transform -translate-x-1/2"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {wonder.name}
                      </h3>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {wonder.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {wonder.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-forest-500" />
                      <span className="text-muted-foreground">Duration: {wonder.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-4 h-4 mr-2 text-autumn-500" />
                      <span className="text-muted-foreground">Best: {wonder.bestTime}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {wonder.activities.map((activity, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 group">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline">
                      Book Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-hero p-12 text-center border-0 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready for Adventure?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Let our expert guides help you explore Jharkhand's natural wonders safely and sustainably
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/transport">
                  <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                    Plan Your Journey
                  </Button>
                </Link>
                <Link to="/support">
                  <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Get Expert Help
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NaturalWonders;