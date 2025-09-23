import { Sparkles } from "lucide-react";
import { useEffect } from "react";

const DevelopmentNotice = () => {
  // Update body margin and CSS custom property to push entire website down
  useEffect(() => {
    document.body.style.marginTop = '40px';
    document.body.style.transition = 'margin-top 0.3s ease-in-out';
    // Set CSS custom property for other components to use
    document.documentElement.style.setProperty('--dev-notice-height', '40px');
    
    return () => {
      // Cleanup on unmount
      document.body.style.marginTop = '0px';
      document.documentElement.style.setProperty('--dev-notice-height', '0px');
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 fixed top-0 left-0 right-0 z-[60] h-[40px]">
      <div className="max-w-7xl mx-auto flex items-center justify-center h-full">
        <div className="flex items-center gap-2 justify-center">
          <Sparkles className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <p className="text-xs md:text-sm font-medium text-center">
            <span className="font-semibold">🚀 We're building something amazing!</span> Some features are still in development - Your Jharkhand adventure starts here ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentNotice;