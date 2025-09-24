import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAuthTest from '@/components/GoogleAuthTest';

const GoogleAuthTestPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Google Authentication Test
              </h1>
              <p className="text-muted-foreground">
                Test and verify Google OAuth integration for ROOTSnROUTES
              </p>
            </div>
            <GoogleAuthTest />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GoogleAuthTestPage;