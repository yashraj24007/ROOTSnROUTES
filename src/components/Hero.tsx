import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import VideoBackground from "@/components/VideoBackground";
import jharkhandHero from "@/assets/jharkhand-hero.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground
        videoSrc="https://videos.pexels.com/video-files/6985066/6985066-uhd_2732_1440_25fps.mp4" // Waterfall video
        fallbackImage={jharkhandHero}
        className="absolute inset-0"
        showControls={true}
        autoPlay={true}
        muted={true}
        overlay={true}
        overlayOpacity={0.3}
      >
        {/* Hero Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-6">
          <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Animated Badge */}
            <div className="mb-8 stagger-item">
              <span className="
                inline-flex items-center px-8 py-4 rounded-full text-lg font-bold
                bg-white/95 dark:bg-gray-800/95
                text-black dark:text-white
                border-3 border-black/50 dark:border-white/50
                backdrop-blur-md shadow-2xl
                animate-gentle-float
                hover:scale-105 transition-all duration-300
                hover:border-black/70 dark:hover:border-white/70
              ">
                🌿 Discover Jharkhand's Hidden Gems
              </span>
            </div>

            {/* Main Title */}
            <div className="mb-8">
              <h1 className="
                text-4xl sm:text-6xl md:text-7xl lg:text-8xl 
                font-bold mb-6 leading-tight
                text-white
                animate-scale-in
                drop-shadow-2xl
                [text-shadow:3px_3px_0px_black,_-1px_-1px_0px_black,_1px_-1px_0px_black,_-1px_1px_0px_black]
              ">
                {t('hero.title')}
              </h1>
              <h2 className="
                text-3xl sm:text-5xl md:text-6xl lg:text-7xl 
                font-bold mb-6 leading-tight
                text-white
                animate-scale-in
                drop-shadow-2xl
                [text-shadow:3px_3px_0px_black,_-1px_-1px_0px_black,_1px_-1px_0px_black,_-1px_1px_0px_black]
              " style={{ animationDelay: '0.2s' }}>
                {t('hero.subtitle')}
              </h2>
              
              {/* Decorative Line */}
              <div className="relative mx-auto mb-8 w-48 h-2">
                <div className="
                  absolute inset-0 rounded-full
                  bg-white
                  animate-shimmer
                  bg-size-200
                  shadow-lg
                  border-2 border-black
                " style={{ backgroundSize: '200% 100%' }} />
              </div>
              
              <p className="
                text-lg sm:text-xl md:text-2xl 
                max-w-4xl mx-auto leading-relaxed mb-12
                text-white
                font-semibold
                bg-black/70
                backdrop-blur-md
                px-8 py-6 rounded-2xl
                border-2 border-white/40
                shadow-2xl
                animate-fade-in-up
              " style={{ animationDelay: '0.4s' }}>
                {t('hero.description')}
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="
              flex flex-col sm:flex-row gap-6 justify-center items-center
              animate-fade-in-up
            " style={{ animationDelay: '0.6s' }}>
              <Link to="/destinations">
                <Button 
                  size="lg" 
                  className="
                    group relative overflow-hidden
                    bg-gradient-to-r from-forest-500 to-autumn-500
                    hover:from-autumn-500 hover:to-golden-500
                    text-white font-semibold
                    px-8 py-4 rounded-full
                    shadow-organic hover:shadow-organic-lg
                    transition-all duration-500 ease-smooth
                    hover:scale-105 active:scale-95
                    border-0
                  "
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('hero.exploreButton')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-r from-white/20 to-transparent
                    transition-opacity duration-300
                  " />
                </Button>
              </Link>
              
              <Link to="/chatbot">
                <Button 
                  size="lg"
                  variant="outline"
                  className="
                    group relative overflow-hidden
                    bg-card/90 border-2 border-autumn-300 dark:border-autumn-600
                    hover:bg-autumn-50 dark:hover:bg-autumn-900/20
                    text-foreground font-semibold px-8 py-4 rounded-full
                    backdrop-blur-sm shadow-autumn hover:shadow-organic
                    transition-all duration-500 ease-smooth
                    hover:scale-105 active:scale-95
                  "
                >
                  <span className="relative z-10 flex items-center gap-3">
                    🤖 AI Planning
                  </span>
                  <div className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-r from-forest-500 to-autumn-500
                    transition-opacity duration-300
                  " />
                </Button>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="
              relative z-30 
              mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto
              animate-fade-in-up
            "  >
              <Link to="/natural-wonders" className="
                text-center p-6 rounded-2xl
                bg-forest-100/40 dark:bg-forest-900/40
                border border-forest-200 dark:border-forest-800
                backdrop-blur-sm hover:backdrop-blur-md
                transition-all duration-300 ease-smooth
                hover:bg-forest-200/40 dark:hover:bg-forest-800/40
                hover:border-forest-300 dark:hover:border-forest-700
                hover:-translate-y-2 hover:shadow-forest
                block no-underline
              ">
                <div className="text-3xl mb-3">🏞️</div>
                <h3 className="font-semibold text-foreground mb-2">
                  Natural Wonders
                </h3>
                <p className="text-sm text-muted-foreground">
                  Waterfalls, forests & wildlife
                </p>
              </Link>
              
              <Link to="/cultural-heritage" className="
                text-center p-6 rounded-2xl
                bg-autumn-100/40 dark:bg-autumn-900/40
                border border-autumn-200 dark:border-autumn-800
                backdrop-blur-sm hover:backdrop-blur-md
                transition-all duration-300 ease-smooth
                hover:bg-autumn-200/40 dark:hover:bg-autumn-800/40
                hover:border-autumn-300 dark:hover:border-autumn-700
                hover:-translate-y-2 hover:shadow-autumn
                block no-underline
              ">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-foreground mb-2">
                  Cultural Heritage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Art, crafts & traditions
                </p>
              </Link>
              
              <Link to="/authentic-stays" className="
                text-center p-6 rounded-2xl
                bg-golden-100/40 dark:bg-golden-900/40
                border border-golden-200 dark:border-golden-800
                backdrop-blur-sm hover:backdrop-blur-md
                transition-all duration-300 ease-smooth
                hover:bg-golden-200/40 dark:hover:bg-golden-800/40
                hover:border-golden-300 dark:hover:border-golden-700
                hover:-translate-y-2 hover:shadow-golden
                block no-underline
              ">
                <div className="text-3xl mb-3">🏡</div>
                <h3 className="font-semibold text-foreground mb-2">
                  Authentic Stays
                </h3>
                <p className="text-sm text-muted-foreground">
                  Eco-lodges & homestays
                </p>
              </Link>
            </div>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
};

export default Hero;