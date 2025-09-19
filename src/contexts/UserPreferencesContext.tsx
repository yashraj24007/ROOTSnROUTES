import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

// Types
export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  display_name?: string;
  bio?: string;
  phone?: string;
  date_of_birth?: string;
  location?: string;
  travel_style?: string;
  interests?: string[];
  profile_image_url?: string;
  total_trips: number;
  total_reviews: number;
  member_level: 'explorer' | 'adventurer' | 'ambassador';
  privacy_settings: {
    profile_visible: boolean;
    show_stats: boolean;
    show_reviews: boolean;
  };
  email_notifications: boolean;
  push_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  destination_id: string;
  destination_name: string;
  destination_type?: string;
  destination_district?: string;
  destination_image_url?: string;
  notes?: string;
  visit_status: 'wishlist' | 'visited' | 'planning';
  visited_date?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface UserReview {
  id: string;
  user_id: string;
  destination_id: string;
  destination_name: string;
  rating: number;
  title?: string;
  review: string;
  photos?: string[];
  visit_date?: string;
  helpful_votes: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface TripHistory {
  id: string;
  user_id: string;
  trip_name?: string;
  destinations: string[];
  start_date?: string;
  end_date?: string;
  trip_type?: string;
  total_cost?: number;
  rating?: number;
  review?: string;
  photos?: string[];
  itinerary?: any;
  created_at: string;
  updated_at: string;
}

interface UserPreferencesContextType {
  // Profile
  userProfile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  // Favorites
  favorites: UserFavorite[];
  addToFavorites: (destination: Omit<UserFavorite, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  removeFromFavorites: (destinationId: string) => Promise<void>;
  updateFavorite: (favoriteId: string, updates: Partial<UserFavorite>) => Promise<void>;
  isFavorite: (destinationId: string) => boolean;
  
  // Reviews
  reviews: UserReview[];
  addReview: (review: Omit<UserReview, 'id' | 'user_id' | 'helpful_votes' | 'is_verified' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateReview: (reviewId: string, updates: Partial<UserReview>) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  
  // Trip History
  tripHistory: TripHistory[];
  addTrip: (trip: Omit<TripHistory, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTrip: (tripId: string, updates: Partial<TripHistory>) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  
  // Loading states
  loading: boolean;
  profileLoading: boolean;
  favoritesLoading: boolean;
  
  // Error handling
  error: string | null;
  
  // Refresh data
  refreshUserData: () => Promise<void>;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

interface UserPreferencesProviderProps {
  children: ReactNode;
}

export const UserPreferencesProvider: React.FC<UserPreferencesProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [tripHistory, setTripHistory] = useState<TripHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user) return;
    
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }
      
      setUserProfile(data || null);
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch user favorites
  const fetchFavorites = async () => {
    if (!user) return;
    
    setFavoritesLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setFavorites(data || []);
    } catch (err: any) {
      console.error('Error fetching favorites:', err);
      setError(err.message);
    } finally {
      setFavoritesLoading(false);
    }
  };

  // Fetch user reviews
  const fetchReviews = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_reviews')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReviews(data || []);
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    }
  };

  // Fetch trip history
  const fetchTripHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_trip_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTripHistory(data || []);
    } catch (err: any) {
      console.error('Error fetching trip history:', err);
      setError(err.message);
    }
  };

  // Refresh all user data
  const refreshUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchProfile(),
        fetchFavorites(),
        fetchReviews(),
        fetchTripHistory()
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      setUserProfile(data);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete account
  const deleteAccount = async () => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      // Delete from auth.users will cascade and delete all related data
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;
      
      // Clear local state
      setUserProfile(null);
      setFavorites([]);
      setReviews([]);
      setTripHistory([]);
    } catch (err: any) {
      console.error('Error deleting account:', err);
      setError(err.message);
      throw err;
    }
  };

  // Add to favorites
  const addToFavorites = async (destination: Omit<UserFavorite, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .insert({ ...destination, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      setFavorites(prev => [data, ...prev]);
    } catch (err: any) {
      console.error('Error adding to favorites:', err);
      setError(err.message);
      throw err;
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (destinationId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('destination_id', destinationId);
      
      if (error) throw error;
      setFavorites(prev => prev.filter(fav => fav.destination_id !== destinationId));
    } catch (err: any) {
      console.error('Error removing from favorites:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update favorite
  const updateFavorite = async (favoriteId: string, updates: Partial<UserFavorite>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .update(updates)
        .eq('id', favoriteId)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      setFavorites(prev => prev.map(fav => fav.id === favoriteId ? data : fav));
    } catch (err: any) {
      console.error('Error updating favorite:', err);
      setError(err.message);
      throw err;
    }
  };

  // Check if destination is favorited
  const isFavorite = (destinationId: string): boolean => {
    return favorites.some(fav => fav.destination_id === destinationId);
  };

  // Add review
  const addReview = async (review: Omit<UserReview, 'id' | 'user_id' | 'helpful_votes' | 'is_verified' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_reviews')
        .insert({ ...review, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      setReviews(prev => [data, ...prev]);
    } catch (err: any) {
      console.error('Error adding review:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update review
  const updateReview = async (reviewId: string, updates: Partial<UserReview>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_reviews')
        .update(updates)
        .eq('id', reviewId)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      setReviews(prev => prev.map(rev => rev.id === reviewId ? data : rev));
    } catch (err: any) {
      console.error('Error updating review:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete review
  const deleteReview = async (reviewId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('user_reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      setReviews(prev => prev.filter(rev => rev.id !== reviewId));
    } catch (err: any) {
      console.error('Error deleting review:', err);
      setError(err.message);
      throw err;
    }
  };

  // Add trip
  const addTrip = async (trip: Omit<TripHistory, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_trip_history')
        .insert({ ...trip, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      setTripHistory(prev => [data, ...prev]);
    } catch (err: any) {
      console.error('Error adding trip:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update trip
  const updateTrip = async (tripId: string, updates: Partial<TripHistory>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('user_trip_history')
        .update(updates)
        .eq('id', tripId)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      setTripHistory(prev => prev.map(trip => trip.id === tripId ? data : trip));
    } catch (err: any) {
      console.error('Error updating trip:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete trip
  const deleteTrip = async (tripId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('user_trip_history')
        .delete()
        .eq('id', tripId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      setTripHistory(prev => prev.filter(trip => trip.id !== tripId));
    } catch (err: any) {
      console.error('Error deleting trip:', err);
      setError(err.message);
      throw err;
    }
  };

  // Load data when user changes
  useEffect(() => {
    if (user) {
      refreshUserData();
    } else {
      // Clear data when user signs out
      setUserProfile(null);
      setFavorites([]);
      setReviews([]);
      setTripHistory([]);
    }
  }, [user]);

  const value: UserPreferencesContextType = {
    // Profile
    userProfile,
    updateProfile,
    deleteAccount,
    
    // Favorites
    favorites,
    addToFavorites,
    removeFromFavorites,
    updateFavorite,
    isFavorite,
    
    // Reviews
    reviews,
    addReview,
    updateReview,
    deleteReview,
    
    // Trip History
    tripHistory,
    addTrip,
    updateTrip,
    deleteTrip,
    
    // Loading states
    loading,
    profileLoading,
    favoritesLoading,
    
    // Error handling
    error,
    
    // Refresh data
    refreshUserData
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};