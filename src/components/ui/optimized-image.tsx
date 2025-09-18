import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  loading = 'lazy',
  decoding = 'async',
  onError,
  ...props
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;