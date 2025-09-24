import React from 'react';
import InteractiveMap from '@/components/InteractiveMap';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MapPin, Navigation, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DevelopmentNotice from '@/components/DevelopmentNotice';

const ExploreDistricts = () => {
  const { t } = useLanguage();

  return (
    <>
      <DevelopmentNotice />
      <Header />
      <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/destinations">
              <Button variant="outline" size="sm" className="hover-lift">
                <ArrowLeft size={16} className="mr-2" />
                Back to Destinations
              </Button>
            </Link>
            <div className="h-6 w-px bg-border"></div>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-foreground">Explore Districts</span>
            </nav>
          </div>
          
          <div className="text-center max-w-4xl mx-auto stagger-item">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
              Explore Jharkhand Districts
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the rich cultural heritage, natural wonders, and unique attractions 
              spread across the beautiful districts of Jharkhand. Click on any district 
              to explore its hidden gems and plan your perfect journey.
            </p>
          </div>
        </div>

        {/* Interactive Map Component */}
        <div className="stagger-item">
          <InteractiveMap />
        </div>

        {/* Additional Information Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="card-brand p-6 text-center stagger-item">
            <div className="mb-4">
              <MapPin className="w-12 h-12 mx-auto text-brand-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">24 Districts</h3>
              <p className="text-muted-foreground text-sm">
                Each with unique cultural heritage and natural attractions waiting to be explored.
              </p>
            </div>
          </Card>

          <Card className="card-brand p-6 text-center stagger-item">
            <div className="mb-4">
              <Navigation className="w-12 h-12 mx-auto text-brand-secondary mb-3" />
              <h3 className="text-xl font-semibold mb-2">Interactive Navigation</h3>
              <p className="text-muted-foreground text-sm">
                Zoom, pan, and click through the map to discover detailed information about each region.
              </p>
            </div>
          </Card>

          <Card className="card-brand p-6 text-center stagger-item">
            <div className="mb-4">
              <Globe className="w-12 h-12 mx-auto text-brand-accent mb-3" />
              <h3 className="text-xl font-semibold mb-2">Local Insights</h3>
              <p className="text-muted-foreground text-sm">
                Get authentic local recommendations and hidden gems from community members.
              </p>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center stagger-item">
          <div className="card-brand-featured p-8 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/90 mb-6">
              Plan your perfect Jharkhand adventure with our AI-powered travel assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chatbot">
                <Button className="btn-brand-primary">
                  Start Planning with AI
                </Button>
              </Link>
              <Link to="/transport">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Check Transport Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreDistricts;