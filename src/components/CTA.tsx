import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const CTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <Card className="bg-gradient-hero p-12 text-center border-0 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/chatbot">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full sm:w-auto cta-primary-button font-semibold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t('cta.startPlanningButton')}
                </Button>
              </Link>
              <Link to="/destinations">
                <Button 
                  variant="hero-outline" 
                  size="lg" 
                  className="w-full sm:w-auto cta-secondary-button font-medium text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('cta.browseDestinationsButton')}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;