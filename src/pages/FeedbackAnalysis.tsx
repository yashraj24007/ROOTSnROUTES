import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedbackAnalysis from '../components/FeedbackAnalysis';

const FeedbackAnalysisPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <FeedbackAnalysis />
      </main>
      <Footer />
    </>
  );
};

export default FeedbackAnalysisPage;