import React from 'react';
import GlowingLine from '@/components/GlowingLine';
import SectionDivider from '@/components/SectionDivider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DevelopmentNotice from '@/components/DevelopmentNotice';

const GlowingLineDemo = () => {
  return (
    <>
      <DevelopmentNotice />
      <Header />
      <div className="min-h-screen bg-background pt-16">
      {/* Full screen responsive demo */}
      <div className="mb-4">
        <GlowingLine responsive={true} />
      </div>
      
      {/* Embedded responsive examples */}
      <div className="bg-card p-4 sm:p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
            Responsive Glowing Lines Demo
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Lines adapt automatically to different screen sizes
          </p>
        </div>
        
        {/* Auto-responsive section dividers */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl text-primary font-semibold">
            Auto-Responsive Lines
          </h2>
          <SectionDivider responsive={true} delay={1000} />
          <SectionDivider responsive={true} delay={1500} duration={3000} />
          <SectionDivider responsive={true} delay={2000} duration={2500} />
        </div>
        
        {/* Custom sized examples */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl text-cyan-300 font-semibold">
            Custom Sizes (Fixed)
          </h2>
          <SectionDivider 
            width="90%" 
            height={2} 
            delay={2500} 
            responsive={false}
          />
          <SectionDivider 
            width="70%" 
            height={4} 
            delay={3000} 
            responsive={false}
          />
          <SectionDivider 
            width="50%" 
            height={6} 
            delay={3500} 
            responsive={false}
          />
        </div>
        
        {/* Mixed content with dividers */}
        <div className="space-y-8">
          <h2 className="text-xl sm:text-2xl text-cyan-300 font-semibold">
            Content with Dividers
          </h2>
          
          <div className="bg-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl text-white font-medium mb-2">
              Section 1
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              This content adapts to screen size with responsive typography and spacing.
            </p>
          </div>
          
          <SectionDivider responsive={true} delay={4000} />
          
          <div className="bg-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl text-white font-medium mb-2">
              Section 2
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              The glowing lines between sections create visual separation while maintaining responsive design.
            </p>
          </div>
          
          <SectionDivider responsive={true} delay={4500} />
          
          <div className="bg-gray-700 p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl text-white font-medium mb-2">
              Section 3
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Perfect for modern web applications that need to work on all devices.
            </p>
          </div>
        </div>
        
        {/* Device info for testing */}
        <div className="mt-12 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg text-cyan-300 font-medium mb-2">
            Testing Info
          </h3>
          <div className="text-muted-foreground text-sm space-y-1">
            <p>• Mobile: Lines are smaller with reduced glow</p>
            <p>• Tablet: Medium-sized lines with balanced effects</p>
            <p>• Desktop: Full-sized lines with maximum glow</p>
            <p>• Large screens: Enhanced effects for premium experience</p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default GlowingLineDemo;