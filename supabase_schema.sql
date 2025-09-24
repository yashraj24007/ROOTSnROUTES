-- Supabase Database Schema for ROOTSnROUTES Platform
-- Execute these commands in your Supabase SQL editor

-- =============================================================================
-- USER PROFILES TABLE (for Google OAuth and user management)
-- =============================================================================

-- Create profiles table for additional user data
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    user_type TEXT DEFAULT 'traveller' CHECK (user_type IN ('traveller', 'admin', 'guide', 'local')),
    location TEXT,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (id),
    CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user registration (Google OAuth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, username)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'user_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- MESSAGING SYSTEM TABLES
-- =============================================================================

-- Create user_messages table for feedback and support
CREATE TABLE IF NOT EXISTS user_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(255),
  message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('feedback', 'support', 'bug_report', 'suggestion')),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  destination_id VARCHAR(50),
  destination_name VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  response TEXT,
  response_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table for community discussions
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_avatar VARCHAR(10),
  destination_id VARCHAR(50),
  destination_name VARCHAR(255),
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location')),
  likes INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_replies table for message replies
CREATE TABLE IF NOT EXISTS chat_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id VARCHAR(100) NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  user_avatar VARCHAR(10),
  reply TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscriptions table for email subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'footer',
  is_active BOOLEAN DEFAULT true,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_messages_created_at ON user_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_messages_status ON user_messages(status);
CREATE INDEX IF NOT EXISTS idx_user_messages_type ON user_messages(message_type);
CREATE INDEX IF NOT EXISTS idx_user_messages_destination ON user_messages(destination_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_destination ON chat_messages(destination_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON chat_messages(user_id);

CREATE INDEX IF NOT EXISTS idx_chat_replies_message ON chat_replies(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_replies_created_at ON chat_replies(created_at);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_active ON newsletter_subscriptions(is_active);

-- Create functions for incrementing likes and replies
CREATE OR REPLACE FUNCTION increment_message_likes(message_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE chat_messages 
  SET likes = likes + 1, updated_at = NOW()
  WHERE id = message_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_message_replies(message_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE chat_messages 
  SET replies_count = replies_count + 1, updated_at = NOW()
  WHERE id = message_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_messages_updated_at
  BEFORE UPDATE ON user_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_messages_updated_at
  BEFORE UPDATE ON chat_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on tables
ALTER TABLE user_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_replies ENABLE ROW LEVEL SECURITY;

-- Policies for user_messages (allow all users to insert, only admins can view all)
CREATE POLICY "Anyone can submit feedback" ON user_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can view their own messages" ON user_messages
  FOR SELECT TO authenticated USING (true); -- Adjust as needed for your auth system

-- Policies for chat_messages (public read, authenticated write)
CREATE POLICY "Anyone can read chat messages" ON chat_messages
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can post messages" ON chat_messages
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Users can update their own messages" ON chat_messages
  FOR UPDATE TO authenticated USING (true); -- Add user_id check if needed

-- Policies for chat_replies (public read, authenticated write)
CREATE POLICY "Anyone can read replies" ON chat_replies
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can post replies" ON chat_replies
  FOR INSERT TO authenticated WITH CHECK (true);

-- Insert some sample data (optional)
INSERT INTO user_messages (user_name, user_email, message_type, subject, message, destination_name, rating) VALUES
('John Traveler', 'john@example.com', 'feedback', 'Great experience at Ranchi', 'Had an amazing time visiting the rock garden. The place is well maintained and perfect for family visits.', 'Rock Garden Ranchi', 5),
('Sarah Explorer', 'sarah@example.com', 'suggestion', 'More information needed', 'Would love to see more detailed information about local transportation options.', NULL, NULL);

INSERT INTO chat_messages (user_id, user_name, user_avatar, destination_name, message, message_type) VALUES
('user_12345', 'Adventure Seeker', 'A', 'Ranchi', 'Just visited the Rock Garden yesterday. The sunset view is absolutely breathtaking!', 'text'),
('user_67890', 'Nature Lover', 'N', 'Ranchi', 'Pro tip: Visit early morning to avoid crowds and get the best photos.', 'text'),
('user_54321', 'Family Traveler', 'F', NULL, 'Planning a trip to Jharkhand next month. Any recommendations for family-friendly destinations?', 'text');

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

-- Create user_favorites table for bookmarked destinations
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_id VARCHAR(100) NOT NULL,
  destination_name VARCHAR(255) NOT NULL,
  destination_type VARCHAR(50), -- waterfall, temple, national-park, etc.
  destination_district VARCHAR(100),
  destination_image_url TEXT,
  notes TEXT, -- personal notes about the destination
  visit_status VARCHAR(20) DEFAULT 'wishlist' CHECK (visit_status IN ('wishlist', 'visited', 'planning')),
  visited_date DATE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, destination_id)
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
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_destination ON user_favorites(destination_id);
CREATE INDEX IF NOT EXISTS idx_user_trip_history_user_id ON user_trip_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_user_id ON user_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_destination ON user_reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_rating ON user_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_user_reviews_created_at ON user_reviews(created_at DESC);

-- Create triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_favorites_updated_at
  BEFORE UPDATE ON user_favorites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_trip_history_updated_at
  BEFORE UPDATE ON user_trip_history
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reviews_updated_at
  BEFORE UPDATE ON user_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on new tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trip_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view public profiles" ON user_profiles
  FOR SELECT TO authenticated, anon 
  USING (
    CASE 
      WHEN privacy_settings->>'profile_visible' = 'true' THEN true
      ELSE auth.uid() = user_id
    END
  );

CREATE POLICY "Users can manage their own profile" ON user_profiles
  FOR ALL TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_favorites
CREATE POLICY "Users can manage their own favorites" ON user_favorites
  FOR ALL TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_trip_history
CREATE POLICY "Users can manage their own trip history" ON user_trip_history
  FOR ALL TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_reviews
CREATE POLICY "Anyone can read public reviews" ON user_reviews
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Users can manage their own reviews" ON user_reviews
  FOR INSERT, UPDATE, DELETE TO authenticated 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Functions for updating profile stats
CREATE OR REPLACE FUNCTION update_user_profile_stats(profile_user_id UUID)
RETURNS VOID AS $$
DECLARE
  trip_count INTEGER;
  review_count INTEGER;
BEGIN
  -- Count trips
  SELECT COUNT(*) INTO trip_count
  FROM user_trip_history
  WHERE user_id = profile_user_id;
  
  -- Count reviews
  SELECT COUNT(*) INTO review_count
  FROM user_reviews
  WHERE user_id = profile_user_id;
  
  -- Update profile stats
  UPDATE user_profiles 
  SET 
    total_trips = trip_count,
    total_reviews = review_count,
    updated_at = NOW()
  WHERE user_id = profile_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to create initial profile for new users
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (user_id, full_name, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'name', 'Traveler')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Sample data for user profiles and favorites
INSERT INTO user_profiles (user_id, full_name, display_name, bio, travel_style, interests, total_trips, total_reviews, member_level) VALUES
('00000000-0000-0000-0000-000000000001'::UUID, 'John Adventure', 'JohnAdv', 'Love exploring hidden gems and natural wonders of Jharkhand', 'adventure', ARRAY['trekking', 'waterfalls', 'photography'], 15, 12, 'adventurer'),
('00000000-0000-0000-0000-000000000002'::UUID, 'Sarah Cultural', 'SarahCult', 'Passionate about tribal culture and traditional arts', 'cultural', ARRAY['culture', 'arts', 'festivals', 'history'], 8, 6, 'explorer');

INSERT INTO user_favorites (user_id, destination_id, destination_name, destination_type, destination_district, visit_status) VALUES
('00000000-0000-0000-0000-000000000001'::UUID, 'hundru-falls', 'Hundru Falls', 'waterfall', 'Ranchi', 'visited'),
('00000000-0000-0000-0000-000000000001'::UUID, 'betla-national-park', 'Betla National Park', 'national-park', 'Latehar', 'wishlist'),
('00000000-0000-0000-0000-000000000002'::UUID, 'baidyanath-temple', 'Baidyanath Temple', 'temple', 'Deoghar', 'visited'),
('00000000-0000-0000-0000-000000000002'::UUID, 'tribal-museum', 'Tribal Research Institute Museum', 'museum', 'Ranchi', 'planning');

-- Grant necessary permissions (adjust based on your setup)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_message_likes(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_message_replies(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_user_profile_stats(UUID) TO anon, authenticated;