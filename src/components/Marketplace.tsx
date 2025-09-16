import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import dokraElephant from "@/assets/dokra-elephant.jpg";
import santhaliHome from "@/assets/santhali-home.jpg";
import ecoLodge from "@/assets/eco-lodge.jpg";

const Marketplace = () => {
  const homestays = [
    {
      name: "Birsa Munda Eco Retreat",
      location: "Netarhat, Latehar",
      price: "₹2500/night",
      image: ecoLodge,
    },
    {
      name: "Santhal Heritage Home",
      location: "Dumka, Santhal Pargana",
      price: "₹1800/night",
      image: santhaliHome,
    },
  ];

  const handicrafts = [
    {
      name: "Dokra Art Elephant",
      artist: "by Sunil Mahto",
      price: "₹2850",
      image: dokraElephant,
    },
  ];

  return (
    <section id="marketplace" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Local Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with local artisans and experience authentic homestays
          </p>
        </div>

        {/* Homestays Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">Cozy Homestays</h3>
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {homestays.map((homestay, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={homestay.image}
                    alt={homestay.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {homestay.name}
                  </h4>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{homestay.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {homestay.price}
                    </span>
                    <Button variant="default">Book Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Handicrafts Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">Authentic Handicrafts</h3>
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {handicrafts.map((item, index) => (
              <Card key={index} className="overflow-hidden bg-gradient-pink/10 border-pink/20 hover:shadow-pink transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {item.name}
                  </h4>
                  <p className="text-muted-foreground mb-4">{item.artist}</p>
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
      </div>
    </section>
  );
};

export default Marketplace;