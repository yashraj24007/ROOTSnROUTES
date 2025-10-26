import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Users, Headphones, MapPin, Camera, Compass, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { memo } from "react";

const Features = memo(() => {
  const { t } = useLanguage();

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
      titleKey: 'features.interactiveMap.title',
      descriptionKey: 'features.interactiveMap.description',
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
      titleKey: 'features.photoSharing.title',
      descriptionKey: 'features.photoSharing.description',
    },
    {
      icon: Compass,
      titleKey: 'features.smartNavigation.title',
      descriptionKey: 'features.smartNavigation.description',
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
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                  {feature.link ? (
                    <Link to={feature.link}>
                      <Button className="btn-brand-primary">
                        {t('common.exploreMap')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/chatbot">
                      <Button className="btn-brand-primary">
                        {t('common.tryAIAssistant')}
                      </Button>
                    </Link>
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
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;