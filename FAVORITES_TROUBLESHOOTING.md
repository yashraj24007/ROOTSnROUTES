# 🔧 Troubleshooting Guide: Favorites Functionality

## Problem: "Could not find the table 'public.user_favorites' in the schema cache"

This error occurs when the required database tables haven't been created in your Supabase database.

### ✅ **Quick Fix Solution:**

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Navigate to your project dashboard

2. **Run Database Setup Script**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"
   - Copy the entire contents of `database_setup.sql`
   - Paste it into the SQL editor
   - Click "Run" button

3. **Verify Tables Created**
   - Go to "Table Editor" in the left sidebar
   - You should see these tables:
     - `user_favorites`
     - `user_messages`  
     - `chat_messages`
     - `newsletter_subscriptions`

### 🔍 **Alternative: Step-by-Step Table Creation**

If the full script doesn't work, create tables individually:

#### 1. Create user_favorites table:
```sql
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id VARCHAR(100) NOT NULL,
    destination_name VARCHAR(255) NOT NULL,
    destination_type VARCHAR(50),
    destination_district VARCHAR(100),
    destination_image_url TEXT,
    notes TEXT,
    visit_status VARCHAR(20) DEFAULT 'wishlist',
    visited_date DATE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_destination UNIQUE(user_id, destination_id)
);
```

#### 2. Enable Row Level Security:
```sql
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);
```

#### 3. Grant Permissions:
```sql
GRANT ALL ON public.user_favorites TO anon, authenticated;
```

### 🧪 **Test the Favorites Functionality:**

1. **Sign In/Up** to your account
2. **Navigate** to any destination page
3. **Click the heart icon** (❤️) to add to favorites
4. **Check the Favorites page** (`/favorites`) to see saved destinations

### 🔧 **Common Issues & Solutions:**

#### Issue: "User not authenticated"
- **Solution**: Make sure you're logged in before trying to add favorites

#### Issue: "Row Level Security violation" 
- **Solution**: Ensure RLS policies are correctly set up (included in `database_setup.sql`)

#### Issue: Favorites not showing up
- **Solution**: Check browser console for errors and verify user_id matches in database

### 📋 **Environment Check:**

Verify your `.env` file has correct Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 🆘 **Still Having Issues?**

1. Check browser developer console for detailed error messages
2. Verify Supabase project is active and not paused
3. Ensure you have the latest code from the repository
4. Try clearing browser cache and local storage

### 🎯 **Expected Behavior:**

✅ Heart icon should toggle between outlined (not favorited) and filled (favorited)  
✅ Success toast should appear when adding/removing favorites  
✅ Favorites should persist after page refresh  
✅ Favorites page should show all saved destinations  
✅ Each user should only see their own favorites  

---

**Need more help?** Check the `supabase_schema.sql` file for the complete database schema or create an issue in the repository.