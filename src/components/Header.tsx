import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Languages, ChevronDown, User, LogOut, Menu, X, Cloud, Settings, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import LoginModal from "@/components/LoginModal";
import { useState, useRef, useCallback } from "react";
import logoSvg from "@/assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    <>
      {/* Skip Links for Accessibility */}
      <div className="skip-links">
        <a 
          href="#main-content" 
          className="skip-nav sr-only-focusable"
          onClick={(e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content') || document.querySelector('main');
            if (mainContent) {
              (mainContent as HTMLElement).focus();
              (mainContent as HTMLElement).scrollIntoView();
            }
          }}
        >
          Skip to main content
        </a>
        <a 
          href="#navigation" 
          className="skip-nav sr-only-focusable"
          onClick={(e) => {
            e.preventDefault();
            const navigation = document.getElementById('navigation') || document.querySelector('nav');
            if (navigation) {
              (navigation as HTMLElement).focus();
              (navigation as HTMLElement).scrollIntoView();
            }
          }}
        >
          Skip to navigation
        </a>
      </div>

      <header 
        className="fixed top-0 left-0 right-0 z-50 nav-brand border-b border-border/50 transition-all duration-300 min-h-[64px] md:min-h-[72px]"
        role="banner"
        aria-label="Main navigation"
      >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4 h-10 md:h-12 min-w-0">
          {/* Logo */}
          <Link 
            to="/" 
            className="logo-enhanced flex-shrink-0"
            aria-label="ROOTSnROUTES - Go to homepage"
          >
            <img 
              src={logoSvg} 
              alt="ROOTSnROUTES Tourism Platform Logo" 
              className="logo-icon w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-md"
            />
            <span className="logo-text text-lg md:text-2xl">ROOTSnROUTES</span>
          </Link>

          {/* Navigation */}
          <nav 
            id="navigation"
            className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6"
            role="navigation"
            aria-label="Primary navigation"
          >
            <Link 
              to="/" 
              className={`nav-brand-item text-sm ${
                isActive('/') ? 'active' : ''
              }`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              {t('header.home')}
            </Link>
            <Link 
              to="/destinations" 
              className={`nav-brand-item text-sm ${
                isActive('/destinations') ? 'active' : ''
              }`}
              onClick={() => handleNavClick('/destinations', 'Explore')}
              aria-current={isActive('/destinations') ? 'page' : undefined}
              aria-label="Explore destinations in Jharkhand"
            >
              {t('header.explore')}
            </Link>
            <Link 
              to="/transport" 
              className={`nav-brand-item text-sm ${
                isActive('/transport') ? 'active' : ''
              }`}
              onClick={() => handleNavClick('/transport', 'Transport')}
              aria-current={isActive('/transport') ? 'page' : undefined}
              aria-label="Transportation options and booking"
            >
              {t('header.transport')}
            </Link>
            <Link 
              to="/marketplace" 
              className={`transition-colors text-sm ${
                isActive('/marketplace') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/marketplace', 'Marketplace')}
              aria-current={isActive('/marketplace') ? 'page' : undefined}
              aria-label="Local marketplace for authentic Jharkhand products"
            >
              {t('header.marketplace')}
            </Link>
            <Link 
              to="/weather" 
              className={`transition-colors text-sm flex items-center space-x-1 ${
                isActive('/weather') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/weather', 'Weather')}
              aria-current={isActive('/weather') ? 'page' : undefined}
              aria-label="Current weather conditions in Jharkhand"
            >
              <Cloud className="h-4 w-4" aria-hidden="true" />
              <span>Weather</span>
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors text-sm ${
                isActive('/about') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              aria-current={isActive('/about') ? 'page' : undefined}
              aria-label="About ROOTSnROUTES platform and mission"
            >
              {t('header.about')}
            </Link>
            <Link 
              to="/support" 
              className={`transition-colors text-sm ${
                isActive('/support') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
              }`}
              onClick={() => handleNavClick('/support', 'Support')}
              aria-current={isActive('/support') ? 'page' : undefined}
              aria-label="Customer support and help center"
            >
              {t('header.support')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
            {/* Mobile Menu Button - Only on small screens */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden p-2 w-9 h-9 flex-shrink-0"
                  aria-label="Open mobile menu"
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
                  <nav 
                    className="flex flex-col space-y-0 p-4"
                    role="navigation"
                    aria-label="Mobile navigation"
                  >
                    <Link 
                      to="/" 
                      className={`p-3 rounded-lg transition-colors ${
                        isActive('/') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive('/') ? 'page' : undefined}
                      aria-label="Home - ROOTSnROUTES main page"
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
                      to="/weather" 
                      className={`p-3 rounded-lg transition-colors flex items-center space-x-2 ${
                        isActive('/weather') ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick('/weather', 'Weather');
                      }}
                    >
                      <Cloud className="h-4 w-4" />
                      <span>Weather</span>
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
                    {/* Mobile Login/Profile Section */}
                    {user ? (
                      <div className="space-y-3">
                        {/* User Profile Button */}
                        <Link
                          to="/profile"
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.user_metadata?.avatar_url || user.user_metadata?.picture} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                              {(user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{user.user_metadata?.name || 'User'}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </Link>
                        
                        {/* Sign Out Button */}
                        <Button
                          onClick={async () => {
                            await signOut();
                            setMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setShowLoginModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    )}
                    
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
            <div className="hidden md:block flex-shrink-0">
              <ThemeToggle />
            </div>
            
            {/* Language Dropdown - Compact on medium, full on large */}
            <div className="hidden sm:block flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="
                      flex items-center gap-1 lg:gap-2 
                      border-border
                      bg-forest-50 dark:bg-forest-900
                      hover:bg-autumn-100 dark:hover:bg-autumn-800
                      text-foreground
                      min-w-[50px] sm:min-w-[60px] md:min-w-[70px] lg:min-w-[120px] 
                      h-8 lg:h-9
                      transition-all duration-300 ease-smooth
                      backdrop-blur-sm
                      shadow-organic
                      px-1.5 sm:px-2 lg:px-3
                      flex-shrink-0
                      text-xs lg:text-sm
                    "
                  >
                    <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-medium flex items-center gap-1">
                      <span>{getLanguageDisplay(language).flag}</span>
                      <span className="hidden md:inline">{getLanguageDisplay(language).icon}</span>
                      <span className="hidden lg:inline">{getLanguageDisplay(language).name}</span>
                    </span>
                    <ChevronDown className="w-2 h-2 lg:w-3 lg:h-3" />
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
            
            {/* Login/Profile Section - Rightmost */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 lg:gap-2 hover:bg-accent p-1 lg:p-2 flex-shrink-0 h-8 lg:h-9">
                    <Avatar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || user.user_metadata?.picture} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs lg:text-sm">
                        {(user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs lg:text-sm font-medium hidden md:inline max-w-[80px] truncate">{user.user_metadata?.name || 'User'}</span>
                    <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  variant="default"
                  size="sm"
                  className="
                    flex items-center gap-1 lg:gap-2 
                    bg-gradient-to-r from-blue-500 to-purple-600
                    hover:from-blue-600 hover:to-purple-700
                    text-white font-medium
                    border-0
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 ease-smooth
                    hover:scale-105
                    px-2 lg:px-3 py-2
                    text-xs lg:text-sm
                    min-w-[45px] sm:min-w-[55px] lg:min-w-[75px]
                    h-8 lg:h-9
                    flex-shrink-0
                  "
                >
                  <User className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden lg:inline">Login</span>
                </Button>
              )}
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </header>
    </>
  );
};

export default Header;