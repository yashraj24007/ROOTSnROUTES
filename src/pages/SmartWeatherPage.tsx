import React from 'react';
import SmartWeatherRecommendations from '../components/SmartWeatherRecommendations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DevelopmentNotice from '../components/DevelopmentNotice';

const SmartWeatherPage = () => {
  return (
    <>
      <DevelopmentNotice />
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <SmartWeatherRecommendations />
      </div>
      <Footer />
    </>
  );
};

export default SmartWeatherPage;