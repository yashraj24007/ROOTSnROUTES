import React from 'react';
import { Loader2, Compass, MapPin, Heart } from 'lucide-react';

interface LoadingProps {
  type?: 'spinner' | 'dots' | 'travel' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  type = 'spinner', 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerSizeClasses = {
    sm: 'gap-2 text-sm',
    md: 'gap-3 text-base',
    lg: 'gap-4 text-lg'
  };

  if (type === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]} ${className}`}>
        <div className="loading-spinner" style={{ width: sizeClasses[size].split(' ')[0], height: sizeClasses[size].split(' ')[1] }} />
        {text && <span className="text-muted-foreground font-medium">{text}</span>}
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]} ${className}`}>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {text && <span className="text-muted-foreground font-medium mt-2">{text}</span>}
      </div>
    );
  }

  if (type === 'travel') {
    return (
      <div className={`flex flex-col items-center justify-center ${containerSizeClasses[size]} ${className}`}>
        <div className="relative">
          <Compass className={`${sizeClasses[size]} text-primary icon-rotate`} />
          <MapPin className={`${sizeClasses[size]} text-accent absolute top-0 left-0 icon-pulse`} style={{ opacity: 0.6 }} />
        </div>
        {text && <span className="text-muted-foreground font-medium">{text}</span>}
      </div>
    );
  }

  if (type === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${containerSizeClasses[size]} ${className}`}>
        <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
        {text && <span className="text-muted-foreground font-medium ml-2">{text}</span>}
      </div>
    );
  }

  return null;
};

// Full page loading overlay
export const LoadingOverlay: React.FC<{ 
  isVisible: boolean; 
  text?: string; 
  type?: LoadingProps['type'] 
}> = ({ 
  isVisible, 
  text = 'Loading your adventure...', 
  type = 'travel' 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center card-glassmorphism">
      <div className="text-center p-8 rounded-2xl card-enhanced max-w-sm mx-4">
        <Loading type={type} size="lg" text={text} />
        <div className="mt-4 flex justify-center space-x-1">
          <Heart className="w-4 h-4 text-red-500 icon-pulse" />
          <span className="text-xs text-muted-foreground">ROOTSnROUTES</span>
        </div>
      </div>
    </div>
  );
};

// Button loading state
export const ButtonLoading: React.FC<{ 
  children: React.ReactNode; 
  isLoading: boolean; 
  loadingText?: string;
  className?: string;
}> = ({ 
  children, 
  isLoading, 
  loadingText = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
        {children}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading type="minimal" size="sm" text={loadingText} />
        </div>
      )}
    </div>
  );
};

// Section loading skeleton
export const LoadingSkeleton: React.FC<{ 
  lines?: number; 
  height?: string; 
  className?: string 
}> = ({ 
  lines = 3, 
  height = '20px', 
  className = '' 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="gradient-animated rounded"
          style={{ 
            height, 
            width: `${100 - (index * 10)}%`,
            opacity: 0.1
          }}
        />
      ))}
    </div>
  );
};

// Card loading placeholder
export const LoadingCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`card-enhanced p-6 ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 gradient-animated rounded-full" style={{ opacity: 0.1 }} />
        <div className="flex-1">
          <LoadingSkeleton lines={2} height="16px" />
        </div>
      </div>
      <LoadingSkeleton lines={3} height="14px" />
    </div>
  );
};

export default Loading;