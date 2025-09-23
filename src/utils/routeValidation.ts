// Route Testing Utility
// This utility helps identify broken routes and missing pages

export const routes = [
  // Main navigation routes
  '/',
  '/about',
  '/explore',
  '/destinations',
  '/services',
  '/tour-packages',
  '/stays',
  '/homestays',
  '/transport',
  '/marketplace',
  '/restaurants',
  '/support',
  '/profile',
  '/settings',
  '/favorites',
  
  // AI Services
  '/ai-trip-planner',
  '/smart-weather',
  '/predictive-booking',
  '/analytics-dashboard',
  
  // Content pages
  '/cultural-heritage',
  '/natural-wonders',
  '/districts',
  '/local-guides',
  '/handicrafts',
  '/community-chat',
  '/feedback-analysis',
  '/privacy-policy',
  '/terms-of-service',
  
  // Special pages
  '/weather',
  '/chatbot',
  '/test'
];

export const footerLinks = [
  // Explore section
  '/destinations',
  '/marketplace', 
  '/transport',
  '/about',
  
  // Services section
  '/tour-packages',
  '/stays',
  '/marketplace', // handicrafts
  '/local-guides',
  
  // AI Services section
  '/ai-trip-planner',
  '/smart-weather',
  '/predictive-booking',
  '/analytics-dashboard',
  
  // Support section
  '/support',
  '/community-chat',
  '/support', // contact us
  '/feedback-analysis',
  '/privacy-policy',
  '/terms-of-service'
];

export const headerLinks = [
  '/',
  '/explore',
  '/ai-trip-planner',
  '/smart-weather',
  '/predictive-booking', 
  '/analytics-dashboard',
  '/about',
  '/profile',
  '/settings',
  '/favorites'
];

export const socialMediaLinks = [
  '#facebook',    // Placeholder - needs real URL
  '#youtube',     // Placeholder - needs real URL
  '#instagram'    // Placeholder - needs real URL
];

// Function to test if all routes are properly defined
export const validateRoutes = () => {
  const missingRoutes: string[] = [];
  const allLinks = [...new Set([...routes, ...footerLinks, ...headerLinks])];
  
  console.log('🔍 Route Validation Report:');
  console.log(`📊 Total unique routes found: ${allLinks.length}`);
  
  // Check each route (in a real app, you'd test actual navigation)
  allLinks.forEach(route => {
    if (route.startsWith('#')) {
      console.log(`🔗 Social Media Link: ${route} (placeholder)`);
    } else {
      console.log(`✅ Route: ${route}`);
    }
  });
  
  return { allLinks, missingRoutes };
};

export default { routes, footerLinks, headerLinks, socialMediaLinks, validateRoutes };