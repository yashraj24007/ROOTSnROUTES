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
        {/* Lighter overlay for brighter appearance */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/15 to-slate-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-transparent to-teal-900/10 z-10" />
        <div className="absolute inset-0 bg-black/15 z-10" />
        
        <div className="relative z-20 min-h-[calc(100vh-140px)] flex flex-col justify-center px-4 py-12 md:py-20 pb-24">
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
              <h1 className="mb-8 leading-tight animate-fade-in-up text-white whitespace-nowrap" style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
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
            <div className={`animate-fade-in-up mt-12 pb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '1.0s' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                {/* Natural Wonders Card */}
                <Link to="/natural-wonders" className="group block">
                  <div className="text-center p-6 rounded-2xl bg-white/20 border border-white/35 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 hover:border-white/55 hover:bg-white/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-xl">🏞️</div>
                      <h3 className="font-bold text-white text-xl mb-2 group-hover:text-emerald-100 transition-colors duration-300 tracking-wide drop-shadow-lg">
                        Natural Wonders
                      </h3>
                      <p className="text-white/95 group-hover:text-white transition-colors duration-300 text-base font-medium drop-shadow-md">
                        Waterfalls & Forests
                      </p>
                    </div>
                  </div>
                </Link>
                
                {/* Cultural Heritage Card */}
                <Link to="/cultural-heritage" className="group block">
                  <div className="text-center p-6 rounded-2xl bg-white/20 border border-white/35 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 hover:border-white/55 hover:bg-white/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-xl">🎨</div>
                      <h3 className="font-bold text-white text-xl mb-2 group-hover:text-orange-100 transition-colors duration-300 tracking-wide drop-shadow-lg">
                        Cultural Heritage
                      </h3>
                      <p className="text-white/95 group-hover:text-white transition-colors duration-300 text-base font-medium drop-shadow-md">
                        Art & Traditions
                      </p>
                    </div>
                  </div>
                </Link>
                
                {/* Authentic Stays Card */}
                <Link to="/stays" className="group block">
                  <div className="text-center p-6 rounded-2xl bg-white/20 border border-white/35 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 hover:border-white/55 hover:bg-white/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-xl">🏡</div>
                      <h3 className="font-bold text-white text-xl mb-2 group-hover:text-blue-100 transition-colors duration-300 tracking-wide drop-shadow-lg">
                        Authentic Stays
                      </h3>
                      <p className="text-white/95 group-hover:text-white transition-colors duration-300 text-base font-medium drop-shadow-md">
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