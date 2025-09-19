import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import NewsletterService from "@/services/newsletterService";

const Footer = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      // Check if Supabase is available
      if (!supabase) {
        throw new Error('Database connection unavailable');
      }

      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email.trim(),
            subscribed_at: new Date().toISOString(),
            source: 'footer',
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed!",
            description: "This email is already subscribed to our newsletter.",
            variant: "default",
          });
          setEmail("");
          return;
        } else if (error.code === '42P01') { // Table doesn't exist
          // Fall back to local storage
          throw new Error('Database table not found');
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
          variant: "default",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Subscription error:', error);
      
      // Fallback to local storage
      try {
        // Check if already subscribed locally
        if (NewsletterService.isSubscribedLocally(email.trim())) {
          toast({
            title: "Already subscribed!",
            description: "This email is already subscribed to our newsletter.",
            variant: "default",
          });
          setEmail("");
          return;
        }

        // Save to local storage
        const saved = NewsletterService.saveToLocalStorage(email.trim(), 'footer');
        if (saved) {
          toast({
            title: "Subscription saved!",
            description: "Your subscription has been saved locally and will be processed when our service is available.",
            variant: "default",
          });
          setEmail("");
        } else {
          throw new Error('Failed to save locally');
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        
        // Final error handling
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('connection')) {
          toast({
            title: "Connection Error",
            description: "Please check your internet connection and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Subscription failed",
            description: "Please try again later or contact support if the issue persists.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-6 py-16">
        {/* Single Row Layout */}
        <div className="flex flex-wrap items-start justify-between gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-card rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-pink">
                R&R
              </div>
              <span className="text-xl font-bold text-foreground">ROOTSnROUTES</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-xs">
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
            </div>
          </div>

          {/* Explore Links */}
          <div className="flex-shrink-0">
            <h4 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                {t('footer.explore')}
              </span>
            </h4>
            <div className="space-y-3">
              <Link to="/destinations" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                {t('footer.destinations')}
              </Link>
              <Link to="/marketplace" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.marketplace')}
              </Link>
              <Link to="/transport" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.transport')}
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.aboutJharkhand')}
              </Link>
            </div>
          </div>

          {/* Services Links */}
          <div className="flex-shrink-0">
            <h4 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {t('footer.services')}
              </span>
            </h4>
            <div className="space-y-3">
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                {t('footer.tourPackages')}
              </Link>
              <Link to="/stays" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.homestays')}
              </Link>
              <Link to="/handicrafts" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.handicrafts')}
              </Link>
              <Link to="/local-guides" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.localGuides')}
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="flex-shrink-0">
            <h4 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                {t('footer.support')}
              </span>
            </h4>
            <div className="space-y-3">
              <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                {t('footer.helpCenter')}
              </Link>
              <Link to="/community-chat" className="block text-muted-foreground hover:text-primary transition-colors">
                Community Chat
              </Link>
              <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.contactUs')}
              </Link>
              <Link to="/privacy-policy" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms-of-service" className="block text-muted-foreground hover:text-primary transition-colors">
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>

          {/* Feedback & Analytics */}
          <div className="flex-shrink-0">
            <h4 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                Feedback
              </span>
            </h4>
            <div className="space-y-3">
              <Link to="/feedback-analysis" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                Share Feedback
              </Link>
              <Link to="/analytics-dashboard" className="block text-muted-foreground hover:text-primary transition-colors">
                Tourism Insights
              </Link>
              <Link to="/ai-itinerary" className="block text-muted-foreground hover:text-primary transition-colors">
                AI Trip Planner
              </Link>
              <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors">
                Report Issues
              </Link>
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
              <form onSubmit={handleSubscribe} className="flex gap-4 w-full lg:w-auto">
                <Input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lg:w-80 bg-card border-border focus:border-primary"
                  required
                />
                <Button 
                  type="submit" 
                  variant="default" 
                  className="px-8 bg-gradient-to-r from-forest-500 to-autumn-500 hover:from-forest-600 hover:to-autumn-600"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : t('footer.subscribe')}
                </Button>
              </form>
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