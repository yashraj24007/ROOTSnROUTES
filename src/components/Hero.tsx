import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import jharkhandHero from "@/assets/jharkhand-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${jharkhandHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      <div className="absolute inset-0 bg-background/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            ROOTSnROUTES
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Discover Jharkhand's Hidden Gems Through AI-Powered Eco-Tourism
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/destinations">
            <Button variant="hero" size="lg" className="gap-3">
              Explore Destinations
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="hero-outline" size="lg" onClick={() => alert('AI Planning Coming Soon!')}>
            Plan with AI
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;