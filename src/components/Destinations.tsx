import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { allDestinations } from "@/data/completeDestinations";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const Destinations = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= allDestinations.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Manual navigation functions
  const goToPrevious = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => prev === 0 ? allDestinations.length - 1 : prev - 1);
  }, []);

  const goToNext = useCallback(() => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => prev >= allDestinations.length - 1 ? 0 : prev + 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setIsAutoScrolling(false);
    setCurrentIndex(index);
  }, []);

  // Resume auto-scroll after manual interaction
  const resumeAutoScroll = useCallback(() => {
    setTimeout(() => setIsAutoScrolling(true), 5000);
  }, []);

  // Get visible destinations (show 3 at a time)
  const getVisibleDestinations = () => {
    const destinations = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % allDestinations.length;
      destinations.push({ ...allDestinations[index], displayIndex: index });
    }
    return destinations;
  };

  const visibleDestinations = getVisibleDestinations();

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Iconic Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the hidden gems and famous attractions across Jharkhand's beautiful districts
          </p>
          <div className="flex justify-end mt-8">
            <Link to="/destinations">
              <Button variant="outline" className="gap-2">
                View All {allDestinations.length} Destinations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

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
            aria-label="Previous destinations"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {/* Progress indicators */}
          <div className="flex gap-2">
            {Array.from({ length: Math.min(allDestinations.length, 10) }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  const targetIndex = i * Math.floor(allDestinations.length / 10);
                  goToSlide(targetIndex);
                  resumeAutoScroll();
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / Math.ceil(allDestinations.length / 10)) === i
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30'
                }`}
                title={`Go to destination group ${i + 1}`}
                aria-label={`Navigate to destination group ${i + 1}`}
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
            aria-label="Next destinations"
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

        {/* Destinations Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleDestinations.map((destination, index) => (
            <Card key={`${destination.id}-${currentIndex}-${index}`} className="overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 group h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`https://picsum.photos/800/600?random=${destination.id}`}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fallback to a different image service if picsum fails
                    e.currentTarget.src = `https://source.unsplash.com/800x600/?nature,travel,${destination.category}&sig=${destination.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{destination.rating}</span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    destination.type === 'hidden' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {destination.type === 'hidden' ? 'Hidden Gem' : 'Famous'}
                  </div>
                </div>

                {/* District Badge */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-xs">{destination.district}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground line-clamp-1">
                    {destination.name}
                  </h3>
                  <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {destination.category}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.district} District</span>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                  {destination.description}
                </p>

                {/* Why Famous */}
                <div className="mb-4 p-2 bg-orange-50 rounded-lg border-l-2 border-orange-500">
                  <p className="text-xs text-orange-800 font-semibold">Why Visit:</p>
                  <p className="text-xs text-orange-700 line-clamp-2">
                    {destination.whyFamous}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">Entry Fee</div>
                    <div className="text-primary">{destination.entryFee}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">Best Time</div>
                    <div className="text-primary">{destination.bestTime}</div>
                  </div>
                </div>

                <Link to={`/destination/${destination.id}`} className="block w-full">
                  <Button variant="default" className="w-full" size="sm">
                    Explore Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Destination Counter */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Showing destinations {currentIndex + 1}-{Math.min(currentIndex + 3, allDestinations.length)} of {allDestinations.length}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">{allDestinations.length}</div>
              <div className="text-sm text-muted-foreground">Total Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{allDestinations.filter(d => d.type === 'famous').length}</div>
              <div className="text-sm text-muted-foreground">Famous Places</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{allDestinations.filter(d => d.type === 'hidden').length}</div>
              <div className="text-sm text-muted-foreground">Hidden Gems</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Districts Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;