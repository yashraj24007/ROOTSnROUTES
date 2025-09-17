import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-card rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-pink">
                R&R
              </div>
              <span className="text-xl font-bold text-foreground">ROOTSnROUTES</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">info@rootsnroutes.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Ranchi, Jharkhand, India</span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6">{t('footer.explore')}</h4>
            <div className="space-y-3">
              <a href="#destinations" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.destinations')}
              </a>
              <a href="#marketplace" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.marketplace')}
              </a>
              <a href="#transport" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.transport')}
              </a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.aboutJharkhand')}
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6">{t('footer.services')}</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.homestays')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.handicrafts')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.tourPackages')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.localGuides')}
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6">{t('footer.support')}</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.helpCenter')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.contactUs')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.termsOfService')}
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-2">{t('footer.newsletter')}</h4>
              <p className="text-muted-foreground">
                {t('footer.newsletterDesc')}
              </p>
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="lg:w-80 bg-card border-border focus:border-primary"
              />
              <Button variant="default" className="px-8">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;