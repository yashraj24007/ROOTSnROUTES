import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { useDeviceDimensions } from "@/hooks/useResponsive";
import dokraElephant from "@/assets/dokra-elephant.jpg";
import santhaliHome from "@/assets/santhali-home.jpg";
import ecoLodge from "@/assets/eco-lodge.jpg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
} as const;

const Marketplace = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { cardDimensions, containerDimensions, gridConfig, typography, animation } = useDeviceDimensions();

  // Update animation variants with responsive values
  const responsiveContainerVariants = {
    hidden: { opacity: 0, y: animation.y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animation.duration,
        staggerChildren: animation.stagger,
        ease: "easeOut"
      }
    }
  } as const;

  const responsiveItemVariants = {
    hidden: { opacity: 0, y: animation.y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animation.duration,
        ease: "easeOut"
      }
    }
  } as const;

  const responsiveCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: animation.duration,
        ease: "easeOut"
      }
    },
    hover: {
      scale: animation.scale,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  } as const;
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
    <motion.section 
      id="marketplace" 
      className="bg-background"
      style={{ 
        padding: `${containerDimensions.padding} 0`
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={shouldReduceMotion ? {} : responsiveContainerVariants}
    >
      <div 
        className="container mx-auto"
        style={{ 
          maxWidth: containerDimensions.maxWidth,
          padding: `0 ${containerDimensions.padding}`
        }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={shouldReduceMotion ? {} : responsiveItemVariants}
        >
          <motion.h2 
            className="font-bold text-foreground mb-6"
            style={{ fontSize: typography.h1 }}
            variants={shouldReduceMotion ? {} : responsiveItemVariants}
          >
            {t('marketplace.title')}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-3xl mx-auto"
            style={{ fontSize: typography.body }}
            variants={shouldReduceMotion ? {} : responsiveItemVariants}
          >
            {t('marketplace.subtitle')}
          </motion.p>
        </motion.div>

        {/* Homestays Section */}
        <motion.div 
          className="mb-16"
          variants={shouldReduceMotion ? {} : responsiveContainerVariants}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={shouldReduceMotion ? {} : responsiveItemVariants}
          >
            <h3 
              className="font-bold text-foreground"
              style={{ fontSize: typography.h2 }}
            >
              {t('marketplace.homestaysTitle')}
            </h3>
            <Button 
              variant="outline" 
              className="gap-2"
              style={{ 
                fontSize: typography.small,
                padding: cardDimensions.padding
              }}
            >
              {t('marketplace.viewAll')}
              <ArrowRight style={{ width: typography.small, height: typography.small }} />
            </Button>
          </motion.div>
          <motion.div 
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${gridConfig.columns}, minmax(${gridConfig.itemMinWidth}, 1fr))`,
              gap: gridConfig.gap
            }}
            variants={shouldReduceMotion ? {} : responsiveContainerVariants}
          >
            {homestays.map((homestay, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? {} : responsiveCardVariants}
                whileHover={shouldReduceMotion ? {} : "hover"}
                layout
              >
                <Card 
                  className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group h-full"
                  style={{ width: cardDimensions.width }}
                >
                  <div 
                    className="relative overflow-hidden"
                    style={{ height: '200px' }}
                  >
                    <img
                      src={homestay.image}
                      alt={t(homestay.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div style={{ padding: cardDimensions.padding }}>
                    <h4 
                      className="font-bold text-foreground mb-2"
                      style={{ fontSize: cardDimensions.titleSize }}
                    >
                      {t(homestay.nameKey)}
                    </h4>
                    <div 
                      className="flex items-center text-muted-foreground mb-4"
                      style={{ gap: cardDimensions.gap }}
                    >
                      <MapPin style={{ width: cardDimensions.iconSize, height: cardDimensions.iconSize }} />
                      <span style={{ fontSize: cardDimensions.fontSize }}>
                        {t(homestay.locationKey)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span 
                        className="font-bold text-primary"
                        style={{ fontSize: cardDimensions.titleSize }}
                      >
                        {t(homestay.priceKey)}
                      </span>
                      <Button 
                        variant="default"
                        style={{ 
                          fontSize: cardDimensions.fontSize,
                          padding: `${parseFloat(cardDimensions.padding)/2}rem ${cardDimensions.padding}`
                        }}
                      >
                        {t('marketplace.bookNow')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Handicrafts Section */}
        <motion.div
          variants={shouldReduceMotion ? {} : responsiveContainerVariants}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={shouldReduceMotion ? {} : responsiveItemVariants}
          >
            <h3 
              className="font-bold text-foreground"
              style={{ fontSize: typography.h2 }}
            >
              {t('marketplace.handicraftsTitle')}
            </h3>
            <Button 
              variant="outline" 
              className="gap-2"
              style={{ 
                fontSize: typography.small,
                padding: cardDimensions.padding
              }}
            >
              {t('marketplace.viewAll')}
              <ArrowRight style={{ width: typography.small, height: typography.small }} />
            </Button>
          </motion.div>
          <motion.div 
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${gridConfig.columns}, minmax(${gridConfig.itemMinWidth}, 1fr))`,
              gap: gridConfig.gap
            }}
            variants={shouldReduceMotion ? {} : responsiveContainerVariants}
          >
            {handicrafts.map((item, index) => (
              <motion.div
                key={index}
                variants={shouldReduceMotion ? {} : responsiveCardVariants}
                whileHover={shouldReduceMotion ? {} : "hover"}
                layout
              >
                <Card 
                  className="overflow-hidden bg-gradient-pink/10 border-pink/20 hover:shadow-pink transition-all duration-300 group h-full"
                  style={{ width: cardDimensions.width }}
                >
                  <div 
                    className="relative overflow-hidden"
                    style={{ height: '200px' }}
                  >
                    <img
                      src={item.image}
                      alt={t(item.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div style={{ padding: cardDimensions.padding }}>
                    <h4 
                      className="font-bold text-foreground mb-2"
                      style={{ fontSize: cardDimensions.titleSize }}
                    >
                      {t(item.nameKey)}
                    </h4>
                    <p 
                      className="text-muted-foreground mb-4"
                      style={{ fontSize: cardDimensions.fontSize }}
                    >
                      {t(item.artistKey)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="font-bold text-primary"
                        style={{ fontSize: cardDimensions.titleSize }}
                      >
                        {t(item.priceKey)}
                      </span>
                      <Button 
                        variant="default"
                        style={{ 
                          fontSize: cardDimensions.fontSize,
                          padding: `${parseFloat(cardDimensions.padding)/2}rem ${cardDimensions.padding}`
                        }}
                      >
                        {t('marketplace.viewDetails')}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Marketplace;