import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight, Users, Wifi, UtensilsCrossed, TreePine, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import santhaliHome from "@/assets/santhali-home.jpg";
import ecoLodge from "@/assets/eco-lodge.jpg";

const AuthenticStays = () => {
  const { t } = useLanguage();

  const authenticStays = [
    {
      id: 1,
      name: "Santhal Heritage Homestay",
      location: "Dumka, Santhal Pargana",
      description: "Experience traditional Santhal tribal lifestyle in an authentic mud house with organic farming and cultural activities.",
      image: santhaliHome,
      type: "Tribal Homestay",
      price: "₹1,800",
      rating: 4.9,
      reviews: 127,
      amenities: ["Traditional Meals", "Cultural Shows", "Handicraft Workshop", "Village Tour", "Organic Garden"],
      features: ["Eco-Friendly", "Cultural Immersion", "Family Run", "Farm-to-Table"],
      capacity: "2-6 guests",
      host: "Sita Devi & Family"
    },
    {
      id: 2,
      name: "Forest Canopy Eco Lodge",
      location: "Betla National Park, Palamu",
      description: "Sustainable tree-house style accommodation within the national park, offering wildlife viewing and nature experiences.",
      image: ecoLodge,
      type: "Eco Lodge",
      price: "₹3,500",
      rating: 4.8,
      reviews: 89,
      amenities: ["Wildlife Safari", "Bird Watching", "Guided Nature Walks", "Organic Meals", "Solar Power"],
      features: ["Carbon Neutral", "Wildlife Viewing", "Sustainable", "Adventure"],
      capacity: "2-4 guests",
      host: "Green Valley Resort"
    },
    {
      id: 3,
      name: "Munda Village Stay",
      location: "Khunti",
      description: "Stay with a traditional Munda family and learn about their sustainable farming practices and rich cultural traditions.",
      image: santhaliHome,
      type: "Village Homestay",
      price: "₹1,500",
      rating: 4.7,
      reviews: 94,
      amenities: ["Home Cooked Meals", "Farm Activities", "Traditional Crafts", "Local Festivals", "Nature Walks"],
      features: ["Community Based", "Agricultural", "Authentic", "Educational"],
      capacity: "2-8 guests",
      host: "Raman Munda Family"
    },
    {
      id: 4,
      name: "Tribal Heritage Resort",
      location: "Ranchi Hills",
      description: "Modern comfort meets traditional architecture in this sustainably built resort showcasing local materials and craftsmanship.",
      image: ecoLodge,
      type: "Heritage Resort",
      price: "₹4,200",
      rating: 4.6,
      reviews: 156,
      amenities: ["Spa & Wellness", "Yoga Sessions", "Cultural Performances", "Library", "Organic Restaurant"],
      features: ["Luxury Comfort", "Cultural Design", "Wellness Focus", "Premium Service"],
      capacity: "2-4 guests",
      host: "Heritage Hospitality"
    },
    {
      id: 5,
      name: "Dokra Artisan Home",
      location: "Khunti District",
      description: "Learn the ancient art of Dokra metal casting while staying with master artisan families in their traditional workshops.",
      image: santhaliHome,
      type: "Artisan Homestay",
      price: "₹2,000",
      rating: 4.8,
      reviews: 73,
      amenities: ["Craft Workshops", "Master Classes", "Traditional Meals", "Artisan Tools", "Product Shopping"],
      features: ["Skill Learning", "Artisan Family", "Workshop Access", "Cultural"],
      capacity: "2-6 guests",
      host: "Dokra Craft Collective"
    },
    {
      id: 6,
      name: "Waterfall Valley Camp",
      location: "Near Hundru Falls, Ranchi",
      description: "Glamping experience near Jharkhand's famous waterfalls with sustainable amenities and adventure activities.",
      image: ecoLodge,
      type: "Glamping",
      price: "₹2,800",
      rating: 4.5,
      reviews: 112,
      amenities: ["Luxury Tents", "Adventure Sports", "Waterfall Access", "Campfire", "Guided Treks"],
      features: ["Adventure", "Scenic Location", "Comfort Camping", "Nature Access"],
      capacity: "2-4 guests",
      host: "Adventure Camps Jharkhand"
    }
  ];

  const stayTypes = [
    { name: "All Stays", icon: TreePine, count: authenticStays.length },
    { name: "Tribal Homestays", icon: Users, count: authenticStays.filter(s => s.type.includes("Homestay")).length },
    { name: "Eco Lodges", icon: TreePine, count: authenticStays.filter(s => s.type.includes("Eco") || s.type.includes("Glamping")).length },
    { name: "Heritage Resorts", icon: Mountain, count: authenticStays.filter(s => s.type.includes("Resort")).length }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Authentic Stays
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Experience genuine hospitality in eco-friendly homestays, tribal villages, and sustainable lodges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                Find Your Perfect Stay
              </Button>
              <Link to="/marketplace">
                <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Browse Experiences
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Types Filter */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {stayTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-3"
                >
                  <IconComponent className="w-4 h-4" />
                  {type.name}
                  <Badge variant="secondary" className="ml-2">
                    {type.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authentic Stays Grid */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authenticStays.map((stay) => (
              <Card key={stay.id} className="group overflow-hidden hover:shadow-organic-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-golden-500 text-white">
                      {stay.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-forest-900">
                      {stay.capacity}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center text-white bg-black/60 px-2 py-1 rounded">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{stay.rating}</span>
                      <span className="text-xs ml-1">({stay.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {stay.name}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {stay.location}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Host: {stay.host}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-forest-600">{stay.price}</div>
                      <div className="text-xs text-muted-foreground">per night</div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {stay.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground text-sm mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {stay.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground text-sm mb-2">Amenities:</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                      {stay.amenities.slice(0, 4).map((amenity, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-1 h-1 bg-forest-500 rounded-full mr-2" />
                          {amenity}
                        </div>
                      ))}
                    </div>
                    {stay.amenities.length > 4 && (
                      <div className="text-xs text-primary mt-1">
                        +{stay.amenities.length - 4} more amenities
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 group text-sm">
                      Book Now
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Authentic Stays */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Authentic Stays?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More than accommodation - these are gateways to genuine cultural experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-organic-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-forest-600" />
                </div>
                <CardTitle>Cultural Immersion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Live with local families and experience authentic traditions, meals, and daily life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-organic-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-autumn-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-autumn-600" />
                </div>
                <CardTitle>Sustainable Tourism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support eco-friendly practices and directly benefit local communities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-organic-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-golden-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-8 h-8 text-golden-600" />
                </div>
                <CardTitle>Unique Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access exclusive activities, crafts workshops, and local knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Guidelines */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Booking Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wifi className="w-5 h-5 mr-2 text-forest-500" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-forest-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Basic amenities with focus on authentic experience
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-forest-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Traditional meals made with local ingredients
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-forest-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Cultural activities and local interactions
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UtensilsCrossed className="w-5 h-5 mr-2 text-autumn-500" />
                    Booking Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-autumn-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Book in advance, especially during festival seasons
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-autumn-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Communicate dietary preferences beforehand
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-autumn-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Respect local customs and traditions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-hero p-12 text-center border-0 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready for an Authentic Adventure?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Choose your perfect stay and immerse yourself in Jharkhand's rich cultural tapestry
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Booking
                </Button>
                <Link to="/support">
                  <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Get Booking Help
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

export default AuthenticStays;