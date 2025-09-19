import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsDashboardPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Tourism Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-8">
                Tourism insights and analytics dashboard coming soon...
              </p>
              <p className="text-lg text-muted-foreground">
                This dashboard will provide comprehensive tourism data, visitor patterns, and strategic insights for Jharkhand tourism development.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnalyticsDashboardPage;