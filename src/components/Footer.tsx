import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
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
              Discover the authentic beauty of Jharkhand through sustainable eco-tourism. 
              Connect with local communities and experience the rich cultural heritage of our land.
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
            <h4 className="text-xl font-bold text-foreground mb-6">Explore</h4>
            <div className="space-y-3">
              <a href="#destinations" className="block text-muted-foreground hover:text-primary transition-colors">
                Destinations
              </a>
              <a href="#marketplace" className="block text-muted-foreground hover:text-primary transition-colors">
                Marketplace
              </a>
              <a href="#transport" className="block text-muted-foreground hover:text-primary transition-colors">
                Transport
              </a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Jharkhand
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6">Services</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Homestays
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Handicrafts
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Tour Packages
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Local Guides
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xl font-bold text-foreground mb-6">Support</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-2">Stay Connected</h4>
              <p className="text-muted-foreground">
                Get the latest updates on new destinations and exclusive offers.
              </p>
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="lg:w-80 bg-card border-border focus:border-primary"
              />
              <Button variant="default" className="px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 ROOTSnROUTES. All rights reserved. Built with ❤️ for sustainable tourism in Jharkhand.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;