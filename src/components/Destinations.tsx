import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import baidyanathTemple from "@/assets/baidyanath-temple.jpg";

const Destinations = () => {
  const { t } = useLanguage();
  const destinations = [
    {
      nameKey: "destinations.betlaPark.name",
      locationKey: "destinations.betlaPark.location",
      descriptionKey: "destinations.betlaPark.description",
      image: betlaPark,
      rating: 4.8,
    },
    {
      nameKey: "destinations.hundruFalls.name",
      locationKey: "destinations.hundruFalls.location",
      descriptionKey: "destinations.hundruFalls.description",
      image: hundruFalls,
      rating: 4.8,
    },
    {
      nameKey: "destinations.baidyanathDham.name",
      locationKey: "destinations.baidyanathDham.location",
      descriptionKey: "destinations.baidyanathDham.description",
      image: baidyanathTemple,
      rating: 4.8,
    },
  ];

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('destinations.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('destinations.subtitle')}
          </p>
          <div className="flex justify-end mt-8">
            <Button variant="outline" className="gap-2">
              {t('destinations.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={t(destination.nameKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t(destination.nameKey)}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{t(destination.locationKey)}</span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(destination.descriptionKey)}
                </p>
                <Button variant="default" className="w-full">
                  {t('destinations.explore')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;