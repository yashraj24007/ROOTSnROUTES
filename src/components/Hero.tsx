import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        paddingTop: 'calc(var(--dev-notice-height, 0px) + 72px)',
        minHeight: 'calc(100vh - var(--dev-notice-height, 0px))'
      }}
    >
      {/* Fullscreen Animated Background with Waterfall/Forest */}
      <VideoBackground
        videoSrc="/videos/hero_section.mp4.mp4"
        className="absolute inset-0 w-full h-full"
        autoPlay={true}
        muted={true}
        overlay={true}
        overlayOpacity={0.2}
        showControls={false}
      >
        {/* Enhanced overlay for rich, natural background tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-800/25 to-slate-900/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-teal-900/20 z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        <div className="relative z-20 min-h-[calc(100vh-140px)] flex flex-col justify-center px-4 py-8 md:py-16">
          {/* Main Hero Content - Centered */}
          <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Tagline */}
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-emerald-300/80 text-base md:text-lg font-medium tracking-wide uppercase">
                {t('hero.tagline')}
              </p>
            </div>
            
            {/* Hero Headline */}
            <div className="mb-12">
              <h1 className="mb-8 leading-tight animate-fade-in-up text-white" style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                textShadow: '0px 2px 8px rgba(0, 0, 0, 0.8), 0px 4px 16px rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))',
                animationDelay: '0.2s'
              }}>
                {t('hero.title')}
              </h1>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white/90 font-medium drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
                {t('hero.description')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-20" style={{ animationDelay: '0.6s' }}>
              {/* Primary CTA */}
              <Link to="/destinations">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold px-10 py-4 rounded-full shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-emerald-500/40 active:scale-95 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('hero.exploreButton')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              
              {/* Secondary CTA */}
              <Link to="/ai-trip-planner">
                <Button 
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden bg-white/10 border-2 border-white/40 hover:border-white/60 text-white hover:text-white font-medium px-8 py-4 rounded-full backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-white/15 active:scale-95 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {t('hero.aiPlanningButton')}
                    <Sparkles className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
            </div>
            
            {/* Feature Cards Section */}
            <div className={`animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '1.0s' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Natural Wonders Card */}
                <Link to="/natural-wonders" className="group block">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-900/25 to-teal-900/20 border border-emerald-200/30 dark:border-emerald-200/25 backdrop-blur-md shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-300/50 dark:hover:border-emerald-300/40 hover:bg-gradient-to-br hover:from-emerald-800/30 hover:to-teal-800/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/8 to-teal-400/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-2xl">🏞️</div>
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-100 transition-colors duration-300 tracking-wide drop-shadow-2xl">
                        Natural Wonders
                      </h3>
                      <p className="text-white/95 group-hover:text-white transition-colors duration-300 text-sm font-medium drop-shadow-xl">
                        Waterfalls & Forests
                      </p>
                    </div>
                  </div>
                </Link>
                
                {/* Cultural Heritage Card */}
                <Link to="/cultural-heritage" className="group block">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-900/25 to-orange-900/20 border border-orange-200/30 dark:border-orange-200/25 backdrop-blur-md shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-300/50 dark:hover:border-orange-300/40 hover:bg-gradient-to-br hover:from-amber-800/30 hover:to-orange-800/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/8 to-amber-400/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-2xl">🎨</div>
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-orange-100 transition-colors duration-300 tracking-wide drop-shadow-2xl">
                        Cultural Heritage
                      </h3>
                      <p className="text-white/95 group-hover:text-white transition-colors duration-300 text-sm font-medium drop-shadow-xl">
                        Art & Traditions
                      </p>
                    </div>
                  </div>
                </Link>
                
                {/* Authentic Stays Card */}
                <Link to="/stays" className="group block">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-900/25 to-blue-900/20 border border-blue-200/30 dark:border-blue-200/25 backdrop-blur-md shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300/50 dark:hover:border-blue-300/40 hover:bg-gradient-to-br hover:from-slate-800/30 hover:to-blue-800/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 to-purple-400/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-2xl">🏡</div>
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-100 transition-colors duration-300 tracking-wide drop-shadow-2xl">
                        Authentic Stays
                      </h3>
                      <p className="text-white/95 group-hover:text-white transition-colors duration-300 text-sm font-medium drop-shadow-xl">
                        Eco-lodges
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
};

export default Hero;