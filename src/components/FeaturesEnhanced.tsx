import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Users, Headphones, MapPin, Camera, Compass, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const Features = () => {
  const { t } = useLanguage();

  const handleAISupport = () => {
    window.dispatchEvent(new CustomEvent('openAIAssistant'));
  };

  const primaryFeatures = [
    {
      icon: Zap,
      titleKey: 'features.aiPowered.title',
      descriptionKey: 'features.aiPowered.description',
      gradient: 'text-brand-primary',
      bgGradient: 'pattern-tribal'
    },
    {
      icon: MapPin,
      title: 'Interactive Districts Map',
      description: 'Explore all 24 districts of Jharkhand with our interactive map featuring detailed information about each region.',
      gradient: 'text-brand-secondary',
      bgGradient: 'pattern-forest',
      link: '/explore-districts'
    },
  ];

  const secondaryFeatures = [
    {
      icon: Shield,
      titleKey: 'features.blockchain.title',
      descriptionKey: 'features.blockchain.description',
    },
    {
      icon: Users,
      titleKey: 'features.community.title',
      descriptionKey: 'features.community.description',
    },
    {
      icon: Camera,
      title: 'Photo Sharing',
      description: 'Share your travel memories and discover hidden gems through community photos.',
    },
    {
      icon: Compass,
      title: 'Smart Navigation',
      description: 'Get intelligent route suggestions and local transportation options.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 stagger-item">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Primary Features - Large Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {primaryFeatures.map((feature, index) => (
            <Card key={index} className={`card-brand hover-lift p-8 ${feature.bgGradient} stagger-item`}>
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl card-glassmorphism ${feature.gradient}`}>
                  <feature.icon size={32} className="icon-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-brand-glow">
                    {feature.titleKey ? t(feature.titleKey) : feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {feature.descriptionKey ? t(feature.descriptionKey) : feature.description}
                  </p>
                  {feature.link ? (
                    <Link to={feature.link}>
                      <Button className="btn-brand-primary">
                        Explore Map
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      onClick={handleAISupport}
                      className="btn-brand-primary"
                    >
                      Try AI Assistant
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Secondary Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryFeatures.map((feature, index) => (
            <Card key={index} className="card-brand p-6 text-center hover-lift stagger-item">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full card-glassmorphism flex items-center justify-center mb-4">
                  <feature.icon size={24} className="icon-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.titleKey ? t(feature.titleKey) : feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.descriptionKey ? t(feature.descriptionKey) : feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center stagger-item">
          <Card className="card-brand-featured p-8 max-w-2xl mx-auto">
            <Heart className="w-12 h-12 mx-auto text-white mb-4 icon-pulse" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Explore Jharkhand?
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands of travelers discovering the hidden gems of Jharkhand with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/destinations">
                <Button className="btn-brand-secondary">
                  Start Exploring
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleAISupport}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Get AI Recommendations
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;