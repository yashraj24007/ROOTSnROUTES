import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Heart, ShoppingBag, Home, Users } from "lucide-react";
import { useState } from "react";
import dokraElephant from "@/assets/dokra-elephant.jpg";
import santhaliHome from "@/assets/santhali-home.jpg";
import ecoLodge from "@/assets/eco-lodge.jpg";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("homestays");

  const homestays = [
    {
      name: "Birsa Munda Eco Retreat",
      location: "Netarhat, Latehar",
      price: "₹2500",
      period: "night",
      rating: 4.8,
      image: ecoLodge,
      host: "Ramesh Kumar",
      amenities: ["Wi-Fi", "Meals", "Trekking", "Bonfire"],
      description: "Experience sustainable living in the heart of nature with local organic meals and guided forest walks."
    },
    {
      name: "Santhal Heritage Home",
      location: "Dumka, Santhal Pargana", 
      price: "₹1800",
      period: "night",
      rating: 4.9,
      image: santhaliHome,
      host: "Sita Devi",
      amenities: ["Cultural Show", "Traditional Meals", "Handicraft Workshop", "Village Tour"],
      description: "Immerse yourself in authentic Santhal culture with traditional architecture and cultural performances."
    },
    {
      name: "Tribal Jungle Stay",
      location: "Betla, Palamu",
      price: "₹3200",
      period: "night", 
      rating: 4.7,
      image: ecoLodge,
      host: "Prakash Singh",
      amenities: ["Safari Arrangements", "Organic Farm", "Nature Walks", "Bird Watching"],
      description: "Gateway to Betla National Park with comfortable accommodation and wildlife experience packages."
    }
  ];

  const handicrafts = [
    {
      name: "Dokra Art Elephant",
      artist: "Sunil Mahto",
      price: "₹2850",
      category: "Metal Art",
      rating: 4.9,
      image: dokraElephant,
      description: "Handcrafted brass elephant using traditional Dokra lost-wax casting technique, passed down through generations.",
      artisan: "Verified Artisan",
      delivery: "7-10 days"
    },
    {
      name: "Paitkar Painting Scroll",
      artist: "Rani Devi",
      price: "₹1800", 
      category: "Folk Art",
      rating: 4.8,
      image: dokraElephant, // Reusing for demo
      description: "Traditional narrative scroll painting depicting tribal folklore and mythological stories of Jharkhand.",
      artisan: "Master Craftsperson",
      delivery: "5-7 days"
    },
    {
      name: "Tribal Bamboo Basket Set",
      artist: "Mangal Oraon",
      price: "₹1200",
      category: "Basketry",
      rating: 4.6,
      image: dokraElephant, // Reusing for demo  
      description: "Eco-friendly bamboo baskets woven using traditional techniques, perfect for home organization.",
      artisan: "Certified Weaver", 
      delivery: "3-5 days"
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Local Marketplace</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Connect with local artisans and experience authentic homestays
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input 
                type="text"
                placeholder="Search homestays, handicrafts, or local services..."
                className="h-12 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-4">
            <Button
              variant={activeTab === "homestays" ? "default" : "outline"}
              onClick={() => setActiveTab("homestays")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Homestays
              <Badge variant="secondary" className="text-xs">
                {homestays.length}
              </Badge>
            </Button>
            <Button
              variant={activeTab === "handicrafts" ? "default" : "outline"}
              onClick={() => setActiveTab("handicrafts")}
              className="gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Handicrafts
              <Badge variant="secondary" className="text-xs">
                {handicrafts.length}
              </Badge>
            </Button>
            <Button
              variant={activeTab === "experiences" ? "default" : "outline"}
              onClick={() => setActiveTab("experiences")}
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              Experiences
              <Badge variant="secondary" className="text-xs">
                12
              </Badge>
            </Button>
          </div>
        </div>
      </section>

      {/* Homestays Section */}
      {activeTab === "homestays" && (
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Cozy Homestays</h2>
                <p className="text-muted-foreground mt-2">
                  {homestays.length} authentic homes available
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Sort by Price</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homestays.map((homestay, index) => (
                <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={homestay.image}
                      alt={homestay.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{homestay.rating}</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Heart className="w-6 h-6 text-white hover:text-red-400 cursor-pointer transition-colors" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {homestay.name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{homestay.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Hosted by {homestay.host}
                    </p>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {homestay.description}
                    </p>

                    {/* Amenities */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {homestay.amenities.map((amenity, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          {homestay.price}
                        </span>
                        <span className="text-muted-foreground">/{homestay.period}</span>
                      </div>
                      <Button variant="default">Book Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Handicrafts Section */}
      {activeTab === "handicrafts" && (
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Authentic Handicrafts</h2>
                <p className="text-muted-foreground mt-2">
                  {handicrafts.length} handcrafted pieces available
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Sort by Price</Button>
                <Button variant="outline" size="sm">Filter by Category</Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {handicrafts.map((item, index) => (
                <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-nature transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{item.rating}</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-forest text-white">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      by {item.artist}
                    </p>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <span>{item.artisan}</span>
                      <span>Delivery: {item.delivery}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {item.price}
                      </span>
                      <Button variant="default">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experiences Section */}
      {activeTab === "experiences" && (
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Cultural Experiences</h2>
              <p className="text-muted-foreground mb-8">Coming Soon - Immersive cultural activities and workshops</p>
              <Button variant="outline" size="lg">Notify Me When Available</Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default Marketplace;