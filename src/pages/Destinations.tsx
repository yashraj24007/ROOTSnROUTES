import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, IndianRupee, Camera } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import hundruFalls from "@/assets/hundru-falls.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";
import baidyanathTemple from "@/assets/baidyanath-temple.jpg";

const Destinations = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { nameKey: "destinationsPage.categories.all", name: "all", count: 50 },
    { nameKey: "destinationsPage.categories.waterfalls", name: "waterfalls", count: 12 },
    { nameKey: "destinationsPage.categories.wildlife", name: "wildlife", count: 8 },
    { nameKey: "destinationsPage.categories.temples", name: "temples", count: 15 },
    { nameKey: "destinationsPage.categories.hills", name: "hills", count: 10 },
    { nameKey: "destinationsPage.categories.heritage", name: "heritage", count: 5 }
  ];

  const destinations = [
    {
      nameKey: "destinationsPage.destinations.hundruFalls.name",
      locationKey: "destinationsPage.destinations.hundruFalls.location",
      category: "waterfalls",
      rating: 4.8,
      image: hundruFalls,
      descriptionKey: "destinationsPage.destinations.hundruFalls.description",
      entryFeeKey: "destinationsPage.destinations.hundruFalls.entryFee",
      timingKey: "destinationsPage.destinations.hundruFalls.timing",
      bestTimeKey: "destinationsPage.destinations.hundruFalls.bestTime"
    },
    {
      nameKey: "destinationsPage.destinations.betlaPark.name",
      locationKey: "destinationsPage.destinations.betlaPark.location",
      category: "wildlife",
      rating: 4.7,
      image: betlaPark,
      descriptionKey: "destinationsPage.destinations.betlaPark.description",
      entryFeeKey: "destinationsPage.destinations.betlaPark.entryFee",
      timingKey: "destinationsPage.destinations.betlaPark.timing",
      bestTimeKey: "destinationsPage.destinations.betlaPark.bestTime"
    },
    {
      nameKey: "destinationsPage.destinations.baidyanathDham.name",
      locationKey: "destinationsPage.destinations.baidyanathDham.location",
      category: "temples",
      rating: 4.9,
      image: baidyanathTemple,
      descriptionKey: "destinationsPage.destinations.baidyanathDham.description",
      entryFeeKey: "destinationsPage.destinations.baidyanathDham.entryFee",
      timingKey: "destinationsPage.destinations.baidyanathDham.timing",
      bestTimeKey: "destinationsPage.destinations.baidyanathDham.bestTime"
    },
    {
      nameKey: "destinationsPage.destinations.netarhat.name",
      locationKey: "destinationsPage.destinations.netarhat.location",
      category: "hills",
      rating: 4.6,
      image: betlaPark, // Reusing for now
      descriptionKey: "destinationsPage.destinations.netarhat.description",
      entryFeeKey: "destinationsPage.destinations.netarhat.entryFee",
      timingKey: "destinationsPage.destinations.netarhat.timing",
      bestTimeKey: "destinationsPage.destinations.netarhat.bestTime"
    },
    {
      nameKey: "destinationsPage.destinations.jonhaFalls.name",
      locationKey: "destinationsPage.destinations.jonhaFalls.location",
      category: "waterfalls", 
      rating: 4.5,
      image: hundruFalls, // Reusing for now
      descriptionKey: "destinationsPage.destinations.jonhaFalls.description",
      entryFeeKey: "destinationsPage.destinations.jonhaFalls.entryFee",
      timingKey: "destinationsPage.destinations.jonhaFalls.timing",
      bestTimeKey: "destinationsPage.destinations.jonhaFalls.bestTime"
    },
    {
      nameKey: "destinationsPage.destinations.palamuFort.name",
      locationKey: "destinationsPage.destinations.palamuFort.location",
      category: "heritage",
      rating: 4.3,
      image: baidyanathTemple, // Reusing for now
      descriptionKey: "destinationsPage.destinations.palamuFort.description",
      entryFeeKey: "destinationsPage.destinations.palamuFort.entryFee",
      timingKey: "destinationsPage.destinations.palamuFort.timing",
      bestTimeKey: "destinationsPage.destinations.palamuFort.bestTime"
    }
  ];

  const filteredDestinations = activeCategory === "all" 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('destinationsPage.title')}</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              {t('destinationsPage.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input 
                type="text"
                placeholder={t('destinationsPage.searchPlaceholder')}
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
                {t(category.nameKey)}
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
                {t(`destinationsPage.categories.${activeCategory}`)} {t('destinationsPage.destinationsLabel')}
              </h2>
              <p className="text-muted-foreground mt-2">
                {filteredDestinations.length} {t('destinationsPage.placesToExplore')}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">{t('destinationsPage.sortByRating')}</Button>
              <Button variant="outline" size="sm">{t('destinationsPage.filter')}</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={t(destination.nameKey)}
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
                      {t(`destinationsPage.categories.${destination.category}`)}
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
                    {t(destination.nameKey)}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{t(destination.locationKey)}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {t(destination.descriptionKey)}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <IndianRupee className="w-3 h-3" />
                        <span>{t('destinationsPage.entry')}</span>
                      </div>
                      <div className="font-medium text-foreground">{t(destination.entryFeeKey)}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{t('destinationsPage.timing')}</span>
                      </div>
                      <div className="font-medium text-foreground text-xs">{t(destination.timingKey)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground mb-1">{t('destinationsPage.bestTime')}</div>
                      <div className="font-medium text-primary text-xs">{t(destination.bestTimeKey)}</div>
                    </div>
                  </div>

                  <Button variant="default" className="w-full">
                    {t('destinationsPage.exploreDetails')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              {t('destinationsPage.loadMore')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Destinations;