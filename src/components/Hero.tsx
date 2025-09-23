import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import VideoBackground from "@/components/VideoBackground";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen Animated Background with Waterfall/Forest */}
      <VideoBackground
        videoSrc="/videos/hero_section.mp4.mp4"
        className="absolute inset-0 w-full h-full"
        autoPlay={true}
        muted={true}
        overlay={true}
        overlayOpacity={0.4}
      >
        {/* Hero Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-12">
          <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ease-out mt-8 md:mt-12 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Hero Headline */}
            <div className="mb-8">
              <h1 className="mb-6 leading-tight animate-fade-in-up text-white dark:text-white" style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                textShadow: '0px 2px 8px rgba(0, 0, 0, 0.8), 0px 4px 16px rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
                filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))'
              }}>
                Discover Hidden Gems of Jharkhand
              </h1>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-white/95 dark:text-white/95 font-medium drop-shadow-lg bg-black/40 dark:bg-black/30 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20 shadow-xl" style={{ animationDelay: '0.3s' }}>
                Experience authentic village life, eco-tourism, and rich cultural heritage
              </p>
            </div>

            {/* Styled Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12" style={{ animationDelay: '0.6s' }}>
              {/* Explore Destinations - Gradient Button */}
              <Link to="/destinations">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white font-semibold px-10 py-4 rounded-full shadow-2xl transition-all duration-500 ease-out hover:scale-110 hover:shadow-emerald-500/50 active:scale-95 border-0 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Destinations
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/20 to-transparent transition-opacity duration-500" />
                </Button>
              </Link>
              
              {/* AI Planning - Outlined Button */}
              <Link to="/ai-trip-planner">
                <Button 
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden bg-transparent border-2 border-white/70 hover:border-white text-white hover:text-black font-semibold px-10 py-4 rounded-full backdrop-blur-sm shadow-lg hover:shadow-white/30 hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:bg-white active:scale-95 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    AI Planning
                  </span>
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </Button>
              </Link>
            </div>

            {/* Interactive Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" style={{ animationDelay: '0.9s' }}>
              {/* Natural Wonders Card */}
              <Link to="/natural-wonders" className="group block">
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-100/20 to-teal-100/20 border border-emerald-200/30 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-300/50 hover:bg-gradient-to-br hover:from-emerald-200/30 hover:to-teal-200/30">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏞️</div>
                  <h3 className="font-bold text-white dark:text-white text-xl mb-3 group-hover:text-emerald-200 transition-colors duration-300">
                    Natural Wonders
                  </h3>
                  <p className="text-white/80 dark:text-white/80 group-hover:text-white transition-colors duration-300 text-base">
                    Waterfalls & Forests
                  </p>
                </div>
              </Link>
              
              {/* Cultural Heritage Card */}
              <Link to="/cultural-heritage" className="group block">
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-orange-100/20 to-amber-100/20 border border-orange-200/30 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-300/50 hover:bg-gradient-to-br hover:from-orange-200/30 hover:to-amber-200/30">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎨</div>
                  <h3 className="font-bold text-white text-xl mb-3 group-hover:text-orange-200 transition-colors duration-300">
                    Cultural Heritage
                  </h3>
                  <p className="text-white/80 group-hover:text-white transition-colors duration-300 text-base">
                    Art & Traditions
                  </p>
                </div>
              </Link>
              
              {/* Authentic Stays Card */}
              <Link to="/stays" className="group block">
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-100/20 to-purple-100/20 border border-blue-200/30 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-300/50 hover:bg-gradient-to-br hover:from-blue-200/30 hover:to-purple-200/30">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏡</div>
                  <h3 className="font-bold text-white dark:text-white text-xl mb-3 group-hover:text-blue-200 transition-colors duration-300">
                    Authentic Stays
                  </h3>
                  <p className="text-white/80 dark:text-white/80 group-hover:text-white transition-colors duration-300 text-base">
                    Eco-lodges
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
};

export default Hero;