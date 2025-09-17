import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Globe, Languages, ChevronDown, User, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ThemeToggle from "@/components/ThemeToggle";
import LoginPage from "@/pages/Login";
import { useState } from "react";
import logoSvg from "@/assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        return { name: 'English', flag: '🇺🇸', icon: '🌍' };
      case 'hi':
        return { name: 'हिंदी', flag: '🇮🇳', icon: '🕉️' };
      case 'snt':
        return { name: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🏞️', icon: '🌿' };
      case 'ho':
        return { name: 'हो', flag: '🏔️', icon: '🪶' };
      case 'mun':
        return { name: 'मुंडारी', flag: '🌾', icon: '🎋' };
      case 'kur':
        return { name: 'कुरुख', flag: '⛰️', icon: '🌸' };
      case 'kha':
        return { name: 'खड़िया', flag: '🌳', icon: '🍃' };
      default:
        return { name: 'English', flag: '🇺🇸', icon: '🌍' };
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
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors text-sm ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              {t('header.home')}
            </Link>
            <Link 
              to="/destinations" 
              className={`transition-colors text-sm ${
                isActive('/destinations') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/destinations', 'Explore')}
            >
              {t('header.explore')}
            </Link>
            <Link 
              to="/transport" 
              className={`transition-colors text-sm ${
                isActive('/transport') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/transport', 'Transport')}
            >
              {t('header.transport')}
            </Link>
            <Link 
              to="/services" 
              className={`transition-colors text-sm ${
                isActive('/services') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/services', 'Services')}
            >
              {t('header.services')}
            </Link>
            <Link 
              to="/marketplace" 
              className={`transition-colors text-sm ${
                isActive('/marketplace') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/marketplace', 'Marketplace')}
            >
              {t('header.marketplace')}
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors text-sm ${
                isActive('/about') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
            >
              {t('header.about')}
            </Link>
            <Link 
              to="/support" 
              className={`transition-colors text-sm ${
                isActive('/support') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/support', 'Support')}
            >
              {t('header.support')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
            {/* Mobile Menu Button - Only on small screens */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden p-2"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={logoSvg} 
                        alt="ROOTSnROUTES" 
                        className="w-8 h-8 rounded-md"
                      />
                      <span className="font-bold text-lg">ROOTSnROUTES</span>
                    </div>
                  </div>
                  
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-0 p-4">
                    <Link 
                      to="/" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('header.home')}
                    </Link>
                    <Link 
                      to="/destinations" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/destinations') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick('/destinations', 'Explore');
                      }}
                    >
                      {t('header.explore')}
                    </Link>
                    <Link 
                      to="/services" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/services') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick('/services', 'Services');
                      }}
                    >
                      {t('header.services')}
                    </Link>
                    <Link 
                      to="/marketplace" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/marketplace') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick('/marketplace', 'Marketplace');
                      }}
                    >
                      {t('header.marketplace')}
                    </Link>
                    <Link 
                      to="/transport" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/transport') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick('/transport', 'Transport');
                      }}
                    >
                      {t('header.transport')}
                    </Link>
                    <Link 
                      to="/support" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/support') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick('/support', 'Support');
                      }}
                    >
                      {t('header.support')}
                    </Link>
                    <Link 
                      to="/about" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/about') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('header.about')}
                    </Link>
                  </nav>
                  
                  {/* Mobile Actions */}
                  <div className="mt-auto p-4 border-t space-y-3">
                    {/* Mobile Login Button */}
                    <Button
                      onClick={() => {
                        setShowLogin(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-forest-500 to-autumn-500 hover:from-forest-600 hover:to-autumn-600"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    
                    {/* Mobile Language Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Globe className="w-4 h-4 mr-2" />
                          <span className="flex items-center space-x-2">
                            <span>{getLanguageDisplay(language).flag}</span>
                            <span>{getLanguageDisplay(language).icon}</span>
                            <span>{getLanguageDisplay(language).name}</span>
                          </span>
                          <ChevronDown className="w-3 h-3 ml-auto" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>🇺🇸</span>
                            <span>🌍</span>
                            <span>English</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('hi')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>🇮🇳</span>
                            <span>🕉️</span>
                            <span>हिंदी</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('snt')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>🏞️</span>
                            <span>🌿</span>
                            <span>ᱥᱟᱱᱛᱟᱲᱤ</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('ho')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>🏔️</span>
                            <span>🪶</span>
                            <span>हो</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('mun')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>🌾</span>
                            <span>🎋</span>
                            <span>मुंडारी</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('kur')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>⛰️</span>
                            <span>🌸</span>
                            <span>कुरुख</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLanguageChange('kha')}>
                          <div className="flex items-center space-x-2 w-full">
                            <span>🌳</span>
                            <span>🍃</span>
                            <span>खड़िया</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Theme Toggle - Hidden on mobile */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            
            {/* Language Dropdown - Hidden on mobile */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="
                      flex items-center space-x-1 xl:space-x-2 
                      border-border
                      bg-forest-50 dark:bg-forest-900
                      hover:bg-autumn-100 dark:hover:bg-autumn-800
                      text-foreground
                      min-w-[100px] xl:min-w-[120px] h-8 xl:h-9
                      transition-all duration-300 ease-smooth
                      backdrop-blur-sm
                      shadow-organic
                      px-2 xl:px-3
                    "
                  >
                    <Globe className="w-3 h-3 xl:w-4 xl:h-4" />
                    <span className="text-xs xl:text-sm font-medium flex items-center space-x-1">
                      <span>{getLanguageDisplay(language).flag}</span>
                      <span className="hidden xl:inline">{getLanguageDisplay(language).icon}</span>
                      <span className="hidden xl:inline">{getLanguageDisplay(language).name}</span>
                    </span>
                    <ChevronDown className="w-2 h-2 xl:w-3 xl:h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="
                    w-40 
                    bg-card/95
                    border-border
                    backdrop-blur-md
                    shadow-organic
                  "
                >
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('en')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'en' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>🇺🇸</span>
                    <span>🌍</span>
                    <span>English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('hi')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'hi' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>🇮🇳</span>
                    <span>🕉️</span>
                    <span>हिंदी</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('snt')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'snt' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>🏞️</span>
                    <span>🌿</span>
                    <span>ᱥᱟᱱᱛᱟᱲᱤ</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('ho')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'ho' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>🏔️</span>
                    <span>🪶</span>
                    <span>हो</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('mun')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'mun' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>🌾</span>
                    <span>🎋</span>
                    <span>मुंडारी</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('kur')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'kur' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>⛰️</span>
                    <span>🌸</span>
                    <span>कुरुख</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('kha')}
                    className={`
                      flex items-center space-x-2 cursor-pointer 
                      hover:bg-forest-100 dark:hover:bg-forest-800
                      ${language === 'kha' ? 'bg-autumn-100 dark:bg-autumn-800' : ''}
                    `}
                  >
                    <span>🌳</span>
                    <span>🍃</span>
                    <span>खड़िया</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Login Button - Rightmost - Hidden on mobile */}
            <Button
              onClick={() => setShowLogin(true)}
              variant="default"
              size="sm"
              className="
                hidden lg:flex items-center space-x-1 xl:space-x-2 
                bg-gradient-to-r from-forest-500 to-autumn-500
                hover:from-forest-600 hover:to-autumn-600
                text-white font-medium
                border-0
                shadow-lg hover:shadow-xl
                transition-all duration-300 ease-smooth
                hover:scale-105
                px-2 xl:px-3 py-2
                text-xs xl:text-sm
                min-w-[60px] xl:min-w-[80px]
              "
            >
              <User className="w-3 h-3 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">Login</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
    </header>
  );
};

export default Header;