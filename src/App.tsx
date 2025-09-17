import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAccessibilityValidator, useAccessibilityAnnouncements } from "@/hooks/useAccessibilityValidator";
import { useEffect } from "react";
import FloatingChatbot from "@/components/FloatingChatbot";
import Index from "./pages/Index";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import Marketplace from "./pages/Marketplace";
import Transport from "./pages/Transport";
import Services from "./pages/Services";
import Support from "./pages/Support";
import Chatbot from "./pages/Chatbot";
import WeatherDashboard from "./pages/WeatherDashboard";
import AuthDiagnostic from "./pages/AuthDiagnostic";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import GlowingLineDemo from "./pages/GlowingLineDemo";
import NaturalWonders from "./pages/NaturalWonders";
import CulturalHeritage from "./pages/CulturalHeritage";
import AuthenticStays from "./pages/AuthenticStays";
import ExploreDistricts from "./pages/ExploreDistricts";

const queryClient = new QueryClient();

// Accessibility wrapper component
const AccessibilityWrapper = ({ children }: { children: React.ReactNode }) => {
  const { enhanceAccessibility, runFullValidation } = useAccessibilityValidator();
  const { announceRouteChange } = useAccessibilityAnnouncements();
  const location = useLocation();

  useEffect(() => {
    // Enhance accessibility on route changes
    enhanceAccessibility();
    
    // Announce route changes to screen readers
    const routeNames: { [key: string]: string } = {
      '/': 'Home',
      '/about': 'About',
      '/destinations': 'Destinations',
      '/marketplace': 'Marketplace',
      '/transport': 'Transport',
      '/services': 'Services',
      '/support': 'Support',
      '/chatbot': 'Chatbot',
      '/weather': 'Weather',
      '/natural-wonders': 'Natural Wonders',
      '/cultural-heritage': 'Cultural Heritage',
      '/authentic-stays': 'Authentic Stays',
      '/explore-districts': 'Explore Districts'
    };
    
    const currentRouteName = routeNames[location.pathname] || 'Page';
    announceRouteChange(currentRouteName);
    
    // Run accessibility validation in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => runFullValidation(), 1000);
    }
  }, [location, enhanceAccessibility, announceRouteChange, runFullValidation]);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <BrowserRouter>
                <AccessibilityWrapper>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/transport" element={<Transport />} />
                    <Route path="/weather" element={<WeatherDashboard />} />
                    <Route path="/auth-diagnostic" element={<AuthDiagnostic />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/natural-wonders" element={<NaturalWonders />} />
                    <Route path="/cultural-heritage" element={<CulturalHeritage />} />
                    <Route path="/authentic-stays" element={<AuthenticStays />} />
                    <Route path="/explore-districts" element={<ExploreDistricts />} />
                    <Route path="/glowing-line-demo" element={<GlowingLineDemo />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AccessibilityWrapper>
                
                {/* Floating Chatbot - Available on all pages */}
                <FloatingChatbot />
            </BrowserRouter>
            </div>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
