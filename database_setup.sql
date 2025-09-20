-- Database Setup Script for ROOTSnROUTES
-- Run this entire script in your Supabase SQL Editor to create all required tables

-- Enable Row Level Security for better security
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create user_favorites table for bookmarked destinations
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id VARCHAR(100) NOT NULL,
    destination_name VARCHAR(255) NOT NULL,
    destination_type VARCHAR(50),
    destination_district VARCHAR(100),
    destination_image_url TEXT,
    notes TEXT,
    visit_status VARCHAR(20) DEFAULT 'wishlist' CHECK (visit_status IN ('wishlist', 'visited', 'planning')),
    visited_date DATE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_destination UNIQUE(user_id, destination_id)
);

-- Create user_messages table for feedback and support
CREATE TABLE IF NOT EXISTS public.user_messages (
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
CREATE TABLE IF NOT EXISTS public.chat_messages (
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

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    interests TEXT[], -- Array of interest categories
    source VARCHAR(50), -- Where they subscribed from
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'unsubscribed')),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_email_sent_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_destination ON public.user_favorites(destination_id);
CREATE INDEX IF NOT EXISTS idx_user_messages_user_email ON public.user_messages(user_email);
CREATE INDEX IF NOT EXISTS idx_user_messages_created_at ON public.user_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_user_favorites_updated_at ON public.user_favorites;
CREATE TRIGGER update_user_favorites_updated_at
    BEFORE UPDATE ON public.user_favorites
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_messages_updated_at ON public.user_messages;
CREATE TRIGGER update_user_messages_updated_at
    BEFORE UPDATE ON public.user_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_chat_messages_updated_at ON public.chat_messages;
CREATE TRIGGER update_chat_messages_updated_at
    BEFORE UPDATE ON public.chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Policies for user_favorites
DROP POLICY IF EXISTS "Users can manage their own favorites" ON public.user_favorites;
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can read favorites for public features" ON public.user_favorites;
CREATE POLICY "Anyone can read favorites for public features" ON public.user_favorites
    FOR SELECT USING (true);

-- Policies for user_messages
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.user_messages;
CREATE POLICY "Anyone can insert messages" ON public.user_messages
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own messages" ON public.user_messages;
CREATE POLICY "Users can view their own messages" ON public.user_messages
    FOR SELECT USING (auth.jwt() ->> 'email' = user_email);

-- Policies for chat_messages
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
CREATE POLICY "Anyone can read chat messages" ON public.chat_messages
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert chat messages" ON public.chat_messages;
CREATE POLICY "Authenticated users can insert chat messages" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policies for newsletter_subscriptions
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_favorites TO anon, authenticated;
GRANT ALL ON public.user_messages TO anon, authenticated;
GRANT ALL ON public.chat_messages TO anon, authenticated;
GRANT ALL ON public.newsletter_subscriptions TO anon, authenticated;