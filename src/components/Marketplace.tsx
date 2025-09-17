import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import dokraElephant from "@/assets/dokra-elephant.jpg";
import santhaliHome from "@/assets/santhali-home.jpg";
import ecoLodge from "@/assets/eco-lodge.jpg";

const Marketplace = () => {
  const { t } = useLanguage();
  const homestays = [
    {
      nameKey: "marketplace.homestays.birsaMunda.name",
      locationKey: "marketplace.homestays.birsaMunda.location",
      priceKey: "marketplace.homestays.birsaMunda.price",
      image: ecoLodge,
    },
    {
      nameKey: "marketplace.homestays.santhalHeritage.name",
      locationKey: "marketplace.homestays.santhalHeritage.location",
      priceKey: "marketplace.homestays.santhalHeritage.price",
      image: santhaliHome,
    },
  ];

  const handicrafts = [
    {
      nameKey: "marketplace.handicrafts.dokraElephant.name",
      artistKey: "marketplace.handicrafts.dokraElephant.artist",
      priceKey: "marketplace.handicrafts.dokraElephant.price",
      image: dokraElephant,
    },
  ];

  return (
    <section id="marketplace" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('marketplace.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('marketplace.subtitle')}
          </p>
        </div>

        {/* Homestays Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">{t('marketplace.homestaysTitle')}</h3>
            <Button variant="outline" className="gap-2">
              {t('marketplace.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {homestays.map((homestay, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={homestay.image}
                    alt={t(homestay.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {t(homestay.nameKey)}
                  </h4>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{t(homestay.locationKey)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {t(homestay.priceKey)}
                    </span>
                    <Button variant="default">{t('marketplace.bookNow')}</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Handicrafts Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">{t('marketplace.handicraftsTitle')}</h3>
            <Button variant="outline" className="gap-2">
              {t('marketplace.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {handicrafts.map((item, index) => (
              <Card key={index} className="overflow-hidden bg-gradient-pink/10 border-pink/20 hover:shadow-pink transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {t(item.nameKey)}
                  </h4>
                  <p className="text-muted-foreground mb-4">{t(item.artistKey)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {t(item.priceKey)}
                    </span>
                    <Button variant="default">{t('marketplace.viewDetails')}</Button>
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