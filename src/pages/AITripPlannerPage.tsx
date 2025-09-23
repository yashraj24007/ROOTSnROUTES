import React from 'react';
import AITripPlanner from '../components/AITripPlanner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DevelopmentNotice from '../components/DevelopmentNotice';

const AITripPlannerPage = () => {
  return (
    <>
      <DevelopmentNotice />
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <AITripPlanner />
      </div>
      <Footer />
    </>
  );
};

export default AITripPlannerPage;