﻿import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingChatbot from './components/FloatingChatbot';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Services = lazy(() => import('./pages/Services'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const MarketplaceDetail = lazy(() => import('./pages/MarketplaceDetail'));
const RestaurantDetail = lazy(() => import('./pages/RestaurantDetail'));
const HotelDetail = lazy(() => import('./pages/HotelDetail'));
const AuthenticStays = lazy(() => import('./pages/AuthenticStays'));
const CulturalHeritage = lazy(() => import('./pages/CulturalHeritage'));
const NaturalWonders = lazy(() => import('./pages/NaturalWonders'));
const Transport = lazy(() => import('./pages/Transport'));
const Weather = lazy(() => import('./pages/Weather'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const DistrictDestinations = lazy(() => import('./pages/DistrictDestinations'));
const DestinationsList = lazy(() => import('./pages/DestinationsList'));
const CommunityChat = lazy(() => import('./pages/CommunityChat'));
const ExploreDistricts = lazy(() => import('./pages/ExploreDistricts'));
const Support = lazy(() => import('./pages/Support'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Favorites = lazy(() => import('./pages/Favorites'));
const AIItineraryPlanner = lazy(() => import('./pages/AIItineraryPlanner'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const FeedbackAnalysis = lazy(() => import('./pages/FeedbackAnalysis'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Handicrafts = lazy(() => import('./pages/Handicrafts'));
const LocalGuides = lazy(() => import('./pages/LocalGuides'));
const Explore = lazy(() => import('./pages/Explore'));
const Restaurants = lazy(() => import('./pages/Restaurants'));
const AITripPlannerPage = lazy(() => import('./pages/AITripPlannerPage'));
const SmartWeatherPage = lazy(() => import('./pages/SmartWeatherPage'));
const PredictiveBookingPage = lazy(() => import('./pages/PredictiveBookingPage'));
const Settings = lazy(() => import('./pages/Settings'));
const TestPage = lazy(() => import('./pages/TestPage'));
const GoogleAuthTestPage = lazy(() => import('./pages/GoogleAuthTestPage'));
const TestSupabasePage = lazy(() => import('./pages/TestSupabasePage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

// Component to handle redirects after refresh
const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <UserPreferencesProvider>
              <Router 
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true
                }}
              >
                <ScrollToTop />
                <RedirectHandler />
                <div className="flex flex-col bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/about-jharkhand" element={<About />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/destinations" element={<Destinations />} />
                      <Route path="/destinations/:id" element={<DestinationDetail />} />
                      <Route path="/districts" element={<ExploreDistricts />} />
                      <Route path="/districts/:districtName" element={<DistrictDestinations />} />
                      <Route path="/destinations-list" element={<DestinationsList />} />
                      <Route path="/restaurants" element={<Restaurants />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/tour-packages" element={<Services />} />
                      <Route path="/stays" element={<AuthenticStays />} />
                      <Route path="/homestays" element={<AuthenticStays />} />
                      <Route path="/cultural-heritage" element={<CulturalHeritage />} />
                      <Route path="/natural-wonders" element={<NaturalWonders />} />
                      <Route path="/transport" element={<Transport />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/ai-itinerary" element={<AIItineraryPlanner />} />
                      <Route path="/ai-planner" element={<AIItineraryPlanner />} />
                      <Route path="/ai-trip-planner" element={<AITripPlannerPage />} />
                      <Route path="/smart-weather" element={<SmartWeatherPage />} />
                      <Route path="/predictive-booking" element={<PredictiveBookingPage />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/marketplace/:id" element={<MarketplaceDetail />} />
                      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                      <Route path="/stays/:id" element={<HotelDetail />} />
                      <Route path="/feedback-analysis" element={<FeedbackAnalysis />} />
                      <Route path="/share-feedback" element={<FeedbackAnalysis />} />
                      <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
                      <Route path="/tourism-insights" element={<AnalyticsDashboard />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/handicrafts" element={<Handicrafts />} />
                      <Route path="/local-guides" element={<LocalGuides />} />
                      <Route path="/community" element={<CommunityChat />} />
                      <Route path="/community-chat" element={<CommunityChat />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/help-center" element={<Support />} />
                      <Route path="/contact-us" element={<Support />} />
                      <Route path="/report-issues" element={<Support />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/test" element={<TestPage />} />
                      <Route path="/google-auth-test" element={<GoogleAuthTestPage />} />
                      <Route path="/supabase-test" element={<TestSupabasePage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
            </Router>
            <FloatingChatbot />
            <Toaster />
          </UserPreferencesProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;
