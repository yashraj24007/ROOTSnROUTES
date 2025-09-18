-- Supabase Database Schema for ROOTSnROUTES Messaging System
-- Execute these commands in your Supabase SQL editor

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

-- Grant necessary permissions (adjust based on your setup)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_message_likes(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_message_replies(UUID) TO anon, authenticated;