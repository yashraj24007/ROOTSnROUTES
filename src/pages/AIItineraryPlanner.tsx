import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIItineraryPlanner from '@/components/AIItineraryPlanner';
import { useLanguage } from '@/hooks/useLanguage';

const AIItineraryPlannerPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI-Powered Itinerary Planner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let our advanced AI create the perfect personalized travel plan for your Jharkhand adventure. 
              Just tell us your preferences and we'll handle the rest!
            </p>
          </div>
          
          <AIItineraryPlanner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIItineraryPlannerPage;