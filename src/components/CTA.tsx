import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <Card className="bg-gradient-hero p-12 text-center border-0 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Explore Jharkhand?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Let our AI assistant help you plan the perfect eco-tourism adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Planning with AI
              </Button>
              <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
                Browse Destinations
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;