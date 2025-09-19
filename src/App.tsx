import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Services = lazy(() => import('./pages/Services'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
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
const AIItineraryPlanner = lazy(() => import('./pages/AIItineraryPlanner'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const FeedbackAnalysis = lazy(() => import('./pages/FeedbackAnalysis'));
const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Handicrafts = lazy(() => import('./pages/Handicrafts'));
const LocalGuides = lazy(() => import('./pages/LocalGuides'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <Header />
                <main className="flex-1">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/destinations" element={<Destinations />} />
                      <Route path="/destinations/:id" element={<DestinationDetail />} />
                      <Route path="/districts" element={<ExploreDistricts />} />
                      <Route path="/districts/:districtName" element={<DistrictDestinations />} />
                      <Route path="/destinations-list" element={<DestinationsList />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/stays" element={<AuthenticStays />} />
                      <Route path="/cultural-heritage" element={<CulturalHeritage />} />
                      <Route path="/natural-wonders" element={<NaturalWonders />} />
                      <Route path="/transport" element={<Transport />} />
                      <Route path="/weather" element={<Weather />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/ai-itinerary" element={<AIItineraryPlanner />} />
                      <Route path="/ai-planner" element={<AIItineraryPlanner />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/feedback-analysis" element={<FeedbackAnalysis />} />
                      <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route path="/handicrafts" element={<Handicrafts />} />
                      <Route path="/local-guides" element={<LocalGuides />} />
                      <Route path="/community" element={<CommunityChat />} />
                      <Route path="/community-chat" element={<CommunityChat />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </Router>
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
