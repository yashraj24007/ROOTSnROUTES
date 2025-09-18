import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocalChat from '@/components/LocalChat';
import FeedbackForm from '@/components/FeedbackForm';

const CommunityChat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 mt-16 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Community Chat
          </h1>
          <p className="text-xl text-forest-300 max-w-3xl mx-auto">
            Connect with fellow travelers, share experiences, and get local insights about Jharkhand's destinations
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chat Area */}
            <div className="lg:col-span-2">
              <LocalChat />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card p-6 rounded-xl border">
                <h3 className="font-semibold mb-4">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Travelers</span>
                    <span className="font-semibold">124+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Messages Today</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destinations Discussed</span>
                    <span className="font-semibold">32</span>
                  </div>
                </div>
              </div>

              {/* Popular Topics */}
              <div className="bg-card p-6 rounded-xl border">
                <h3 className="font-semibold mb-4">Popular Topics</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Ranchi Hill Stations', count: 15 },
                    { name: 'Waterfalls Guide', count: 12 },
                    { name: 'Local Food Spots', count: 8 },
                    { name: 'Budget Travel Tips', count: 6 },
                    { name: 'Photography Spots', count: 5 }
                  ].map((topic) => (
                    <div key={topic.name} className="flex justify-between items-center">
                      <span className="text-sm">{topic.name}</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">{topic.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-card p-6 rounded-xl border">
                <h3 className="font-semibold mb-4">Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Be respectful and kind to all community members</li>
                  <li>• Share authentic travel experiences and tips</li>
                  <li>• Keep discussions travel-related</li>
                  <li>• No spam or promotional content</li>
                  <li>• Protect your personal information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Share Your Feedback</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us improve the platform by sharing your thoughts and suggestions
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <FeedbackForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityChat;