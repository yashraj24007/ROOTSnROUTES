import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Car, Users, Camera, Mountain, Shield, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: MapPin,
      titleKey: 'services.tourPlanning.title',
      descriptionKey: 'services.tourPlanning.description',
      featuresKey: 'services.tourPlanning.features'
    },
    {
      icon: Calendar,
      titleKey: 'services.booking.title',
      descriptionKey: 'services.booking.description',
      featuresKey: 'services.booking.features'
    },
    {
      icon: Car,
      titleKey: 'services.transport.title',
      descriptionKey: 'services.transport.description',
      featuresKey: 'services.transport.features'
    },
    {
      icon: Users,
      titleKey: 'services.groupTours.title',
      descriptionKey: 'services.groupTours.description',
      featuresKey: 'services.groupTours.features'
    },
    {
      icon: Camera,
      titleKey: 'services.photography.title',
      descriptionKey: 'services.photography.description',
      featuresKey: 'services.photography.features'
    },
    {
      icon: Mountain,
      titleKey: 'services.adventure.title',
      descriptionKey: 'services.adventure.description',
      featuresKey: 'services.adventure.features'
    },
    {
      icon: Shield,
      titleKey: 'services.insurance.title',
      descriptionKey: 'services.insurance.description',
      featuresKey: 'services.insurance.features'
    },
    {
      icon: Phone,
      titleKey: 'services.support.title',
      descriptionKey: 'services.support.description',
      featuresKey: 'services.support.features'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 mt-16 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-forest-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const features = t(service.featuresKey);
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300 bg-card/50 border-border">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-forest-100 dark:bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-forest-600 dark:text-forest-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{t(service.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{t(service.descriptionKey)}</p>
                    <div className="space-y-2">
                      {Array.isArray(features) && features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="text-sm text-left">
                          <span className="text-forest-600 dark:text-forest-400">✓</span> <span className="text-card-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            {t('services.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-forest-500 hover:bg-forest-600 text-white">
              {t('services.cta.getQuote')}
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground">
              {t('services.cta.contactUs')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;