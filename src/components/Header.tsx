import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe, Languages, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import logoSvg from "@/assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = (path: string, label: string) => {
    console.log(`Navigation clicked: ${label} -> ${path}`);
    console.log(`Current location: ${location.pathname}`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'hi' | 'snt');
  };

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case 'en':
        return { name: 'English', flag: '🇺🇸' };
      case 'hi':
        return { name: 'हिंदी', flag: '🇮🇳' };
      case 'snt':
        return { name: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🏞️' };
      default:
        return { name: 'English', flag: '🇺🇸' };
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoSvg} 
              alt="ROOTSnROUTES Logo" 
              className="w-12 h-12 rounded-lg shadow-md"
            />
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
              {t('header.home')}
            </Link>
            <Link 
              to="/destinations" 
              className={`transition-colors ${
                isActive('/destinations') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/destinations', 'Explore')}
            >
              {t('header.explore')}
            </Link>
            <Link 
              to="/services" 
              className={`transition-colors ${
                isActive('/services') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/services', 'Services')}
            >
              {t('header.services')}
            </Link>
            <Link 
              to="/marketplace" 
              className={`transition-colors ${
                isActive('/marketplace') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/marketplace', 'Marketplace')}
            >
              {t('header.marketplace')}
            </Link>
            <Link 
              to="/transport" 
              className={`transition-colors ${
                isActive('/transport') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/transport', 'Transport')}
            >
              {t('header.transport')}
            </Link>
            <Link 
              to="/support" 
              className={`transition-colors ${
                isActive('/support') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/support', 'Support')}
            >
              {t('header.support')}
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                isActive('/about') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
            >
              {t('header.about')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-border hover:bg-accent min-w-[120px]"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {getLanguageDisplay(language).flag} {getLanguageDisplay(language).name}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('en')}
                  className={`flex items-center space-x-2 cursor-pointer ${language === 'en' ? 'bg-accent' : ''}`}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('hi')}
                  className={`flex items-center space-x-2 cursor-pointer ${language === 'hi' ? 'bg-accent' : ''}`}
                >
                  <span>🇮🇳</span>
                  <span>हिंदी</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('snt')}
                  className={`flex items-center space-x-2 cursor-pointer ${language === 'snt' ? 'bg-accent' : ''}`}
                >
                  <span>🏞️</span>
                  <span>ᱥᱟᱱᱛᱟᱲᱤ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;