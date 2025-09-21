import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { useDeviceDimensions } from "@/hooks/useResponsive";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handicrafts data - moved before functions that use it
  const handicrafts = [
    {
      name: "Dokra Art Elephant",
      artist: "Sunil Mahto",
      price: "₹2,850",
      category: "Metal Art",
      image: dokraElephant,
    },
    {
      name: "Paitkar Painting Scroll",
      artist: "Rani Devi", 
      price: "₹1,800",
      category: "Folk Art",
      image: santhaliHome,
    },
    {
      name: "Tribal Bamboo Basket Set",
      artist: "Mangal Oraon",
      price: "₹1,200",
      category: "Basketry",
      image: ecoLodge,
    },
    {
      name: "Santhal Tribal Market Crafts",
      artist: "Santhal Artisans",
      price: "₹1,500",
      category: "Tribal Art",
      image: dokraElephant,
    },
    {
      name: "Steel City Craft Collection",
      artist: "Steel City Artisans",
      price: "₹1,600",
      category: "Industrial Art",
      image: santhaliHome,
    },
    {
      name: "Temple Market Crafts",
      artist: "Temple Artisans",
      price: "₹800",
      category: "Religious Art",
      image: ecoLodge,
    },
    {
      name: "Tribal Research Institute Store",
      artist: "Research Institute",
      price: "₹2,200",
      category: "Museum Quality",
      image: dokraElephant,
    },
    {
      name: "Forest Products Collection",
      artist: "Forest Community",
      price: "₹950",
      category: "Eco Products",
      image: santhaliHome,
    },
    {
      name: "Women's SHG Crafts",
      artist: "Women's SHG",
      price: "₹1,100",
      category: "Women's Crafts",
      image: ecoLodge,
    },
    {
      name: "Village Haat Products",
      artist: "Village Vendors",
      price: "₹650",
      category: "Village Crafts",
      image: dokraElephant,
    },
    {
      name: "Craft Cooperative Society",
      artist: "Cooperative Society",
      price: "₹1,300",
      category: "Cooperative",
      image: santhaliHome,
    },
    {
      name: "Tribal Heritage Centre",
      artist: "Heritage Centre",
      price: "₹1,800",
      category: "Heritage Art",
      image: ecoLodge,
    },
    {
      name: "Daltonganj Market Crafts",
      artist: "Daltonganj Artisans",
      price: "₹1,200",
      category: "Wood Crafts",
      image: dokraElephant,
    },
    {
      name: "Medininagar Textile Market",
      artist: "Textile Weavers",
      price: "₹1,800",
      category: "Textiles",
      image: santhaliHome,
    },
    {
      name: "Garhwa Tribal Market",
      artist: "Garhwa Tribal Artists",
      price: "₹1,300",
      category: "Tribal Market",
      image: ecoLodge,
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= handicrafts.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoScrolling, handicrafts.length]);

  // Manual navigation functions
  const goToPrevious = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => prev === 0 ? handicrafts.length - 1 : prev - 1);
  }, [handicrafts.length]);

  const goToNext = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => prev >= handicrafts.length - 1 ? 0 : prev + 1);
  }, [handicrafts.length]);

  const goToSlide = useCallback((index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
  }, []);

  // Resume auto-scroll after manual interaction
  const resumeAutoScroll = useCallback(() => {
    setTimeout(() => setIsAutoScrolling(true), 5000);
  }, []);

  // Get visible handicrafts (show 3 at a time)
  const getVisibleHandicrafts = () => {
    const crafts = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % handicrafts.length;
      crafts.push({ ...handicrafts[index], displayIndex: index });
    }
    return crafts;
  };

  const visibleHandicrafts = getVisibleHandicrafts();

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

        {/* Featured Handicrafts Section */}
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
              {t('marketplace.handicraftsTitle')}
            </h3>
            <Link to="/marketplace">
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
            </Link>
          </motion.div>

          {/* Auto-scroll Controls */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button
              variant="outline" 
              size="icon"
              onClick={() => {
                goToPrevious();
                resumeAutoScroll();
              }}
              className="rounded-full"
              aria-label="Previous handicrafts"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {/* Progress indicators */}
            <div className="flex gap-2">
              {Array.from({ length: Math.min(handicrafts.length, 10) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const targetIndex = i * Math.floor(handicrafts.length / 10);
                    goToSlide(targetIndex);
                    resumeAutoScroll();
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / Math.ceil(handicrafts.length / 10)) === i
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                  title={`Go to handicraft group ${i + 1}`}
                  aria-label={`Navigate to handicraft group ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline" 
              size="icon"
              onClick={() => {
                goToNext();
                resumeAutoScroll();
              }}
              className="rounded-full"
              aria-label="Next handicrafts"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-scroll Status */}
          <div className="text-center mb-8">
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Auto-scroll: {isAutoScrolling ? 'ON' : 'OFF'} • Click to {isAutoScrolling ? 'pause' : 'resume'}
            </button>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={shouldReduceMotion ? {} : responsiveContainerVariants}
          >
            {visibleHandicrafts.map((handicraft, index) => (
              <motion.div
                key={`${handicraft.name}-${currentIndex}-${index}`}
                variants={shouldReduceMotion ? {} : responsiveCardVariants}
                whileHover={shouldReduceMotion ? {} : "hover"}
                layout
                className="w-full"
              >
                <Card 
                  className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group h-full w-full"
                >
                  <div 
                    className="relative overflow-hidden"
                    style={{ height: '200px' }}
                  >
                    <img
                      src={handicraft.image}
                      alt={handicraft.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div style={{ padding: cardDimensions.padding }} className="flex flex-col">
                    <h4 
                      className="font-bold text-foreground mb-2 break-words"
                      style={{ fontSize: cardDimensions.titleSize, lineHeight: '1.3' }}
                    >
                      {handicraft.name}
                    </h4>
                    <div 
                      className="flex items-center text-muted-foreground mb-2"
                      style={{ gap: cardDimensions.gap }}
                    >
                      <span style={{ fontSize: cardDimensions.fontSize }} className="break-words">
                        by {handicraft.artist}
                      </span>
                    </div>
                    <div 
                      className="text-primary mb-4"
                      style={{ fontSize: cardDimensions.fontSize }}
                    >
                      {handicraft.category}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span 
                        className="font-bold text-primary"
                        style={{ fontSize: cardDimensions.titleSize }}
                      >
                        {handicraft.price}
                      </span>
                      <Button 
                        variant="default"
                        className="flex-shrink-0"
                        style={{ 
                          fontSize: cardDimensions.fontSize,
                          padding: `${parseFloat(cardDimensions.padding)/2}rem ${cardDimensions.padding}`
                        }}
                      >
                        {t('marketplace.buyNow')}
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