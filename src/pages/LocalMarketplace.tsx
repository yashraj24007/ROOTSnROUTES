import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalMarketplace from '../components/LocalMarketplace';

const LocalMarketplacePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <LocalMarketplace />
      </main>
      <Footer />
    </>
  );
};

export default LocalMarketplacePage;