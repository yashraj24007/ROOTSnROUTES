import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  destinationId: string;
  destinationName: string;
  destinationType?: string;
  destinationDistrict?: string;
  destinationImageUrl?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline' | 'floating';
  className?: string;
  showLabel?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  destinationId,
  destinationName,
  destinationType,
  destinationDistrict,
  destinationImageUrl,
  size = 'default',
  variant = 'ghost',
  className,
  showLabel = false
}) => {
  const { user } = useAuth();
  const { 
    favorites, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  } = useUserPreferences();

  const [isLoading, setIsLoading] = useState(false);
  const favorited = isFavorite(destinationId);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save favorites",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      if (favorited) {
        await removeFromFavorites(destinationId);
        toast({
          title: "Removed from Favorites",
          description: `${destinationName} has been removed from your favorites`
        });
      } else {
        await addToFavorites({
          destination_id: destinationId,
          destination_name: destinationName,
          destination_type: destinationType,
          destination_district: destinationDistrict,
          destination_image_url: destinationImageUrl,
          visit_status: 'wishlist'
        });
        toast({
          title: "Added to Favorites",
          description: `${destinationName} has been added to your favorites`
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update favorites",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'floating':
        return cn(
          "absolute top-3 right-3 z-10 bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 backdrop-blur-sm border shadow-lg",
          favorited 
            ? "text-red-500 hover:text-red-600 border-red-200 dark:border-red-800" 
            : "text-gray-600 hover:text-red-500 border-gray-200 dark:border-gray-700"
        );
      case 'outline':
        return cn(
          "border-2",
          favorited
            ? "bg-red-50 text-red-600 border-red-300 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/30"
            : "bg-background text-muted-foreground border-muted-foreground hover:text-red-500 hover:border-red-300"
        );
      default:
        return cn(
          favorited
            ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
            : "text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        );
    }
  };

  return (
    <Button
      variant={variant === 'floating' || variant === 'outline' ? 'outline' : 'ghost'}
      size={size}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={cn(
        "transition-all duration-300 group",
        getVariantStyles(),
        className
      )}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        className={cn(
          "w-4 h-4 transition-all duration-300",
          size === 'sm' && "w-3 h-3",
          size === 'lg' && "w-5 h-5",
          favorited && "fill-current",
          isLoading && "animate-pulse"
        )} 
      />
      {showLabel && (
        <span className="ml-2 text-xs">
          {favorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </Button>
  );
};

export default FavoriteButton;