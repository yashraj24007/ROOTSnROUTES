import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, IndianRupee, Camera } from "lucide-react";
import { useState } from "react";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import baidyanathTemple from "@/assets/baidyanath-temple.jpg";

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", count: 50 },
    { name: "Waterfalls", count: 12 },
    { name: "Wildlife", count: 8 },
    { name: "Temples", count: 15 },
    { name: "Hills & Valleys", count: 10 },
    { name: "Heritage", count: 5 }
  ];

  const destinations = [
    {
      name: "Hundru Falls",
      location: "Ranchi District",
      category: "Waterfalls",
      rating: 4.8,
      image: hundruFalls,
      description: "A majestic 98-meter waterfall cascading down rocky cliffs, one of Jharkhand's most spectacular natural attractions.",
      entryFee: "₹20",
      timing: "6 AM - 6 PM",
      bestTime: "Jul - Oct"
    },
    {
      name: "Betla National Park",
      location: "Palamu District", 
      category: "Wildlife",
      rating: 4.7,
      image: betlaPark,
      description: "Home to tigers, elephants, and diverse wildlife in lush deciduous forests. Perfect for jungle safaris and nature photography.",
      entryFee: "₹150",
      timing: "6 AM - 5 PM",
      bestTime: "Nov - Apr"
    },
    {
      name: "Baidyanath Dham",
      location: "Deoghar",
      category: "Temples",
      rating: 4.9,
      image: baidyanathTemple,
      description: "One of the twelve Jyotirlingas, this sacred temple attracts millions of devotees during the holy month of Shravan.",
      entryFee: "Free",
      timing: "4 AM - 10 PM", 
      bestTime: "Oct - Mar"
    },
    {
      name: "Netarhat Hill Station",
      location: "Latehar District",
      category: "Hills & Valleys",
      rating: 4.6,
      image: betlaPark, // Reusing for now
      description: "Known as the 'Queen of Chotanagpur', offering breathtaking sunrise views and pleasant climate year-round.",
      entryFee: "Free",
      timing: "24 Hours",
      bestTime: "Oct - Feb"
    },
    {
      name: "Jonha Falls",
      location: "Ranchi District",
      category: "Waterfalls", 
      rating: 4.5,
      image: hundruFalls, // Reusing for now
      description: "Also known as Gautamdhara, this 43-meter waterfall is surrounded by dense forests and rocky terrain.",
      entryFee: "₹15",
      timing: "6 AM - 6 PM",
      bestTime: "Jul - Oct"
    },
    {
      name: "Palamu Fort",
      location: "Palamu District",
      category: "Heritage",
      rating: 4.3,
      image: baidyanathTemple, // Reusing for now
      description: "Historic fort complex showcasing medieval architecture and the rich history of the Chero dynasty.",
      entryFee: "₹25",
      timing: "9 AM - 5 PM",
      bestTime: "Nov - Mar"
    }
  ];

  const filteredDestinations = activeCategory === "All" 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Destinations</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Discover the breathtaking beauty of Jharkhand's natural wonders, ancient temples, and cultural heritage sites
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input 
                type="text"
                placeholder="Search destinations, places, or activities..."
                className="h-12 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategory === category.name ? "default" : "outline"}
                onClick={() => setActiveCategory(category.name)}
                className="gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {activeCategory} Destinations
              </h2>
              <p className="text-muted-foreground mt-2">
                {filteredDestinations.length} places to explore
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Sort by Rating</Button>
              <Button variant="outline" size="sm">Filter</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{destination.rating}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-white">
                      {destination.category}
                    </Badge>
                  </div>

                  {/* Photo Count */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Camera className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">24+</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {destination.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <IndianRupee className="w-3 h-3" />
                        <span>Entry</span>
                      </div>
                      <div className="font-medium text-foreground">{destination.entryFee}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" />
                        <span>Timing</span>
                      </div>
                      <div className="font-medium text-foreground text-xs">{destination.timing}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground mb-1">Best Time</div>
                      <div className="font-medium text-primary text-xs">{destination.bestTime}</div>
                    </div>
                  </div>

                  <Button variant="default" className="w-full">
                    Explore Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Destinations
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Destinations;