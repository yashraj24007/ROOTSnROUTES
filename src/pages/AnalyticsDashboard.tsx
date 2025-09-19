import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const AnalyticsDashboardPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-6">
          <AnalyticsDashboard />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnalyticsDashboardPage;