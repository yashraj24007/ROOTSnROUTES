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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chatbot">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                  {t('cta.startPlanningButton')}
                </Button>
              </Link>
              <Link to="/destinations">
                <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
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