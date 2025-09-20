import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UtensilsCrossed, 
  MapPin, 
  Star, 
  Clock, 
  Phone,
  Heart,
  ChefHat
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Restaurants = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const restaurants = [
    {
      id: 1,
      name: "Santhal Tribal Kitchen",
      location: "Dumka",
      cuisine: "Tribal Cuisine",
      rating: 4.8,
      price: "₹₹",
      specialty: "Authentic Santhal dishes with organic ingredients",
      image: "https://picsum.photos/400/300?random=1",
      timings: "11:00 AM - 10:00 PM",
      phone: "+91 9876543210",
      dishes: ["Handia Rice", "Pitha", "Mahua Flowers", "Wild Honey"]
    },
    {
      id: 2,
      name: "Jharkhand Thali House",
      location: "Ranchi",
      cuisine: "Traditional",
      rating: 4.6,
      price: "₹₹",
      specialty: "Complete Jharkhand thali with 15+ items",
      image: "https://picsum.photos/400/300?random=2",
      timings: "12:00 PM - 11:00 PM",
      phone: "+91 9876543211",
      dishes: ["Dhuska", "Aloo Chokha", "Rugra", "Bamboo Shoot Curry"]
    },
    {
      id: 3,
      name: "Munda Heritage Restaurant",
      location: "Khunti",
      cuisine: "Munda Cuisine",
      rating: 4.7,
      price: "₹₹₹",
      specialty: "Traditional Munda recipes passed down generations",
      image: "https://picsum.photos/400/300?random=3",
      timings: "10:00 AM - 9:00 PM",
      phone: "+91 9876543212",
      dishes: ["Chilka Roti", "Kurthi Dal", "Wild Mushrooms", "Forest Greens"]
    },
    {
      id: 4,
      name: "Forest Flavors",
      location: "Netarhat",
      cuisine: "Eco-Friendly",
      rating: 4.9,
      price: "₹₹₹",
      specialty: "Farm-to-table dining with mountain views",
      image: "https://picsum.photos/400/300?random=4",
      timings: "7:00 AM - 9:00 PM",
      phone: "+91 9876543213",
      dishes: ["Organic Rice", "Hill Vegetables", "Fresh Fish", "Local Fruits"]
    }
  ];

  const categories = [
    { id: "all", name: "All Cuisines" },
    { id: "tribal", name: "Tribal Cuisine" },
    { id: "traditional", name: "Traditional" },
    { id: "eco", name: "Eco-Friendly" }
  ];

  const filteredRestaurants = activeCategory === "all" 
    ? restaurants 
    : restaurants.filter(restaurant => 
        restaurant.cuisine.toLowerCase().includes(activeCategory)
      );

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative food emojis */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🍽️</div>
        <div className="absolute top-20 right-16 text-3xl animate-pulse">🥘</div>
        <div className="absolute bottom-16 left-20 text-3xl animate-bounce delay-500">🌶️</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-pulse delay-700">🍛</div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg border border-orange-200">
              <UtensilsCrossed className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-semibold">Taste the Tradition</span>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Authentic Restaurants 🍴
            </h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto text-gray-700 font-medium">
              Savor the authentic flavors of Jharkhand with traditional tribal cuisines! 🌶️ 
              Discover organic ingredients and recipes passed down through generations! ✨
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="gap-2"
              >
                <ChefHat className="w-4 h-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Heart className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-black">
                      {restaurant.cuisine}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{restaurant.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm font-semibold text-primary">{restaurant.price}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {restaurant.specialty}
                  </p>

                  {/* Popular Dishes */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Popular Dishes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.dishes.slice(0, 3).map((dish, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {dish}
                        </Badge>
                      ))}
                      {restaurant.dishes.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{restaurant.dishes.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{restaurant.timings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{restaurant.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Call Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your category filter</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveCategory("all")}
              >
                View All Restaurants
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Jharkhand Cuisine?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the rich culinary heritage of Jharkhand's tribal communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Traditional Recipes</h3>
              <p className="text-sm text-muted-foreground">
                Authentic dishes passed down through generations of tribal communities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Organic Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                Fresh, locally-sourced ingredients from forests and farms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Cultural Experience</h3>
              <p className="text-sm text-muted-foreground">
                Every meal tells a story of Jharkhand's rich cultural heritage
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Restaurants;