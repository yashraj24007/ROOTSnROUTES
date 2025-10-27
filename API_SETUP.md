# API Setup Guide

## Setting up your API Keys

To use all features of the ROOTSnROUTES application, you need to configure several API keys in your `.env` file.

### Required Steps:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your API keys and update the `.env` file:

### 🤖 Groq API (for AI Chatbot)
1. Go to [console.groq.com](https://console.groq.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Update `.env`:
   ```
   VITE_GROQ_API_KEY=your_actual_groq_api_key_here
   ```

### 🌤️ Weather API (for Weather Features)
Current configuration uses OpenWeatherMap. You can also use Weatherbit.

**Option 1: OpenWeatherMap (Currently Active)**
1. Go to [openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Update `.env`:
   ```
   VITE_WEATHER_API_KEY=your_openweather_api_key
   VITE_WEATHER_API_PROVIDER=openweather
   ```

**Option 2: Weatherbit**
1. Go to [weatherbit.io](https://www.weatherbit.io/account/dashboard)
2. Sign up for a free account (500 calls/day)
3. Update `.env`:
   ```
   VITE_WEATHER_API_KEY=your_weatherbit_api_key
   VITE_WEATHER_API_PROVIDER=weatherbit
   ```

### 🗺️ Google Maps API (for Maps)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Create credentials (API Key)
5. Update `.env`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

### 🗄️ Supabase (for Database)
The current configuration includes demo credentials. For production:
1. Go to [supabase.com](https://supabase.com/dashboard)
2. Create a new project
3. Go to Settings > API
4. Update `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### After updating your `.env` file:
1. Restart your development server:
   ```bash
   npm run dev
   ```

2. The application will now have access to all configured APIs.

### ⚠️ Important Notes:
- Never commit your actual `.env` file to version control
- Keep your API keys secure and don't share them publicly
- Some features will show configuration prompts if API keys are missing
- Free tier limits apply to most APIs - monitor your usage

### 🆓 Free Tier Limits:
- **Groq**: Generous free tier for AI chat
- **OpenWeatherMap**: 1000 calls/day free
- **Weatherbit**: 500 calls/day free  
- **Google Maps**: $200/month credit (usually covers small apps)
- **Supabase**: Generous free tier for small projects