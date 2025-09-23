import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DevelopmentNotice from '@/components/DevelopmentNotice';
import AIItineraryPlanner from '@/components/AIItineraryPlanner';
import { useLanguage } from '@/hooks/useLanguage';

const AIItineraryPlannerPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <DevelopmentNotice />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <AIItineraryPlanner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIItineraryPlannerPage;