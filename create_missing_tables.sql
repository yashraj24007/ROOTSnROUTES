-- Create missing tables for ROOTSnROUTES User Management
-- Run this in your Supabase SQL Editor

-- Create user_profiles table for extended user information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  display_name VARCHAR(100),
  bio TEXT,
  phone VARCHAR(20),
  date_of_birth DATE,
  location VARCHAR(255),
  travel_style VARCHAR(50), -- adventure, leisure, cultural, eco-tourism, etc.
  interests TEXT[], -- array of interests
  profile_image_url TEXT,
  total_trips INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  member_level VARCHAR(20) DEFAULT 'explorer' CHECK (member_level IN ('explorer', 'adventurer', 'ambassador')),
  privacy_settings JSONB DEFAULT '{"profile_visible": true, "show_stats": true, "show_reviews": true}',
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_trip_history table for tracking user travels
CREATE TABLE IF NOT EXISTS user_trip_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_name VARCHAR(255),
  destinations TEXT[], -- array of destination IDs
  start_date DATE,
  end_date DATE,
  trip_type VARCHAR(50), -- solo, family, group, business
  total_cost DECIMAL(10,2),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  photos TEXT[], -- array of photo URLs
  itinerary JSONB, -- detailed itinerary data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_reviews table for destination reviews
CREATE TABLE IF NOT EXISTS user_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id VARCHAR(100) NOT NULL,
  destination_name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review TEXT NOT NULL,
  photos TEXT[], -- array of photo URLs
  visit_date DATE,
  helpful_votes INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_trip_history_user_id ON user_trip_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_user_id ON user_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_destination ON user_reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_rating ON user_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_user_reviews_created_at ON user_reviews(created_at DESC);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_trip_history_updated_at
  BEFORE UPDATE ON user_trip_history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reviews_updated_at
  BEFORE UPDATE ON user_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trip_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view and edit their own profile" ON user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view and edit their own trip history" ON user_trip_history
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view and edit their own reviews" ON user_reviews
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public reviews" ON user_reviews
  FOR SELECT USING (true);