import React from 'react';
import PredictiveBookingSystem from '../components/PredictiveBookingSystem';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PredictiveBookingPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <PredictiveBookingSystem />
      </div>
      <Footer />
    </>
  );
};

export default PredictiveBookingPage;