# ROOTSnROUTES Setup Guide

## Environment Variables Setup

This project requires environment variables for API integrations. Follow these steps to set up your local environment securely.

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Get Required API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the generated key

#### Weather API Key (Weatherbit.io)

1. Visit [Weatherbit.io Dashboard](https://www.weatherbit.io/account/dashboard)
2. Sign up for a free account (500 API calls/day included)
3. Find your API key in the dashboard
4. Copy the API key from your dashboard
5. Replace 'your_weatherbit_api_key_here' with your actual key in .env file

**Weatherbit Benefits:**
- 500 free API calls per day
- Comprehensive weather data including UV index, precipitation chance
- Accurate forecasting up to 16 days
- High-quality weather analysis for travel safety

#### Alternative Weather APIs (Optional)

- **OpenWeatherMap**: Visit [OpenWeatherMap API](https://openweathermap.org/api) for 1,000 calls/day free
- **WeatherAPI.com**: Visit [WeatherAPI.com](https://www.weatherapi.com/) for 1 million calls/month free

### 3. Update Environment Variables

Open your `.env` file and replace the placeholder values:

```bash
# Groq API Configuration
VITE_GROQ_API_KEY=your_actual_groq_api_key_here

# Weather API Configuration (Weatherbit.io)
VITE_WEATHER_API_KEY=your_actual_weatherbit_api_key_here
VITE_WEATHER_API_PROVIDER=weatherbit

# Optional: If switching to different weather provider
# VITE_WEATHER_API_PROVIDER=openweather
# VITE_WEATHER_API_KEY=your_openweather_key_here
```

**Important Security Notes:**

- Never share your API keys publicly
- Never commit your `.env` file to version control
- Use different API keys for development and production
- Monitor your API usage to detect unauthorized access

### 4. Verify Setup

Run the development server to ensure everything works:

```bash
npm run dev
```

## ⚠️ Security Best Practices

- **Never commit `.env` files** to version control
- **Never share API keys** publicly or in code
- **Revoke and regenerate keys** if accidentally exposed
- **Use different keys** for development and production
- **Monitor API usage** regularly for unauthorized access

## Database Setup

### 1. Supabase Configuration

1. Create a new project on [Supabase](https://supabase.com)
2. Get your project URL and anon key
3. Add them to your `.env` file:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Create Database Tables

1. Open your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Copy the entire contents of `database_setup.sql`
4. Paste and run the script to create all required tables

**Required Tables:**

- `user_favorites` - For bookmarked destinations
- `user_messages` - For feedback and support
- `chat_messages` - For community discussions
- `newsletter_subscriptions` - For email subscriptions

### 3. Verify Setup

- Go to "Table Editor" to confirm all tables are created
- Test the favorites functionality by signing in and bookmarking a destination

> **Having issues with favorites?** See `FAVORITES_TROUBLESHOOTING.md` for detailed solutions.

---

## Environment Files Structure

- `.env` - Your local environment variables (DO NOT COMMIT)
- `.env.example` - Template showing required variables (SAFE TO COMMIT)
- `.env.production` - Production environment variables (DO NOT COMMIT)

## Troubleshooting

If you see "Please set your VITE_GROQ_API_KEY" error:

1. Check if `.env` file exists in project root
2. Verify the API key is correctly set in `.env`
3. Restart the development server
4. Ensure the API key is valid and not revoked

If you see "Could not find table 'public.user_favorites'" error:

1. Run the `database_setup.sql` script in your Supabase SQL Editor
2. Verify all tables are created in the Table Editor
3. Check your Supabase URL and keys in `.env`
4. See `FAVORITES_TROUBLESHOOTING.md` for detailed solutions