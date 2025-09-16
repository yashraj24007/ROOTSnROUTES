import { Button } from "@/components/ui/button";
import { Globe, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-card rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-nature">
              R&R
            </div>
            <span className="text-2xl font-bold text-foreground">ROOTSnROUTES</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`transition-colors ${
                isActive('/destinations') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/marketplace" 
              className={`transition-colors ${
                isActive('/marketplace') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
            >
              Marketplace
            </Link>
            <Link 
              to="/transport" 
              className={`transition-colors ${
                isActive('/transport') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
            >
              Transport
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                isActive('/about') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center space-x-2 text-foreground">
              <Globe className="w-5 h-5" />
              <span className="text-sm">English</span>
            </div>

            {/* AI Assistant Button */}
            <Button variant="ai" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;