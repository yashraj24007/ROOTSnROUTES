import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
import FloatingAIAssistant from "./components/FloatingAIAssistant";

const queryClient = new QueryClient();

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
                <Route path="/glowing-line-demo" element={<GlowingLineDemo />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            
            {/* Global Floating AI Assistant */}
            <FloatingAIAssistant />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
