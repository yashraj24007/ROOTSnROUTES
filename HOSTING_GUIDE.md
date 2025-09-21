# ROOTSnROUTES Hosting Guide

This guide will help you deploy your ROOTSnROUTES website to various hosting platforms.

## Prerequisites

1. **Node.js & npm**: Ensure you have Node.js installed
2. **Environment Variables**: Set up your API keys (see Environment Setup section)
3. **Git Repository**: Your code should be in a Git repository (GitHub recommended)

## Environment Setup

### 1. Create Environment File

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Required API Keys

Update your `.env` file with actual values:

```bash
# Groq AI API (for chatbot functionality)
VITE_GROQ_API_KEY=your_groq_api_key_here

# Weather API (OpenWeatherMap recommended)
VITE_WEATHER_API_KEY=your_openweather_api_key_here
VITE_WEATHER_API_PROVIDER=openweather

# Supabase (for database and authentication)
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Razorpay (for payments) - Add this
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### 3. How to Get API Keys

#### Groq API Key:
1. Visit https://console.groq.com/
2. Sign up/login
3. Go to API Keys section
4. Create new key

#### OpenWeatherMap API Key:
1. Visit https://openweathermap.org/api
2. Sign up for free account
3. Go to API keys section
4. Copy your key

#### Supabase:
1. Visit https://supabase.com/dashboard
2. Create new project
3. Go to Settings > API
4. Copy Project URL and anon key

#### Razorpay (for payments):
1. Visit https://dashboard.razorpay.com/
2. Sign up and get verified
3. Go to Settings > API Keys
4. Generate Test/Live keys

## Hosting Options

### Option 1: Vercel (Recommended - Free)

Vercel is ideal for React applications and already configured with `vercel.json`.

#### Deploy with Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Deploy with GitHub Integration:
1. Push your code to GitHub
2. Go to https://vercel.com/
3. Sign up with GitHub
4. Import your repository
5. Add environment variables in Vercel dashboard
6. Deploy!

#### Environment Variables on Vercel:
1. Go to your project dashboard
2. Settings > Environment Variables
3. Add all variables from your `.env` file
4. Redeploy if needed

### Option 2: Netlify (Free)

#### Deploy with Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Deploy with GitHub:
1. Push code to GitHub
2. Go to https://app.netlify.com/
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings
6. Deploy!

### Option 3: Firebase Hosting (Free)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Build your project
npm run build

# Deploy
firebase deploy
```

### Option 4: GitHub Pages (Free, Static Only)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## Build Configuration

Your project is already configured with optimal settings:
- **Vite**: Fast build tool with hot reload
- **Code Splitting**: Vendor chunks for better caching
- **Asset Optimization**: Images and CSS are optimized
- **SPA Routing**: Configured with rewrites for React Router

## Performance Optimization

### Already Implemented:
- ✅ Manual chunk splitting for vendor libraries
- ✅ Asset compression and optimization
- ✅ Tree shaking for unused code
- ✅ CSS purging with Tailwind

### Recommended Additions:
```bash
# Add these to improve performance
npm install --save-dev vite-plugin-pwa workbox-precaching
```

## SSL and Custom Domain

### Free SSL:
All recommended platforms (Vercel, Netlify, Firebase) provide free SSL certificates automatically.

### Custom Domain:
1. Purchase domain from any registrar
2. Add domain in hosting platform dashboard
3. Update DNS records as instructed
4. SSL will be auto-generated

## Monitoring and Analytics

### Add Google Analytics (Optional):
```bash
npm install gtag
```

Then add to your `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Troubleshooting

### Build Errors:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

### Environment Variables Not Working:
- Ensure variables start with `VITE_`
- Restart development server after adding variables
- Check hosting platform environment variable settings

### Routing Issues (404 on refresh):
- Ensure your hosting platform has SPA rewrites configured
- Vercel: `vercel.json` already configured
- Netlify: Add `_redirects` file with `/* /index.html 200`

## Security Checklist

- [ ] API keys are in environment variables (not hardcoded)
- [ ] Sensitive keys are not in `.env.example`
- [ ] `.env` file is in `.gitignore`
- [ ] Production builds don't expose debug information
- [ ] HTTPS is enabled (automatic on recommended platforms)

## Cost Estimates

### Free Tiers:
- **Vercel**: 100GB bandwidth, unlimited personal projects
- **Netlify**: 100GB bandwidth, 300 build minutes
- **Firebase**: 10GB storage, 1GB/day transfer
- **GitHub Pages**: Unlimited for public repos

### Paid Plans (if needed):
- **Vercel Pro**: $20/month per user
- **Netlify Pro**: $19/month per site
- **Firebase**: Pay-as-you-go

## Next Steps After Deployment

1. **Set up monitoring**: Use platform analytics or Google Analytics
2. **Configure backups**: Most platforms auto-backup, but verify
3. **Set up staging**: Create separate branch/environment for testing
4. **Performance monitoring**: Use Lighthouse CI for continuous monitoring
5. **SEO optimization**: Add meta tags, sitemap, robots.txt

## Support

If you encounter issues:
1. Check the hosting platform's documentation
2. Verify all environment variables are set
3. Check browser console for errors
4. Ensure API services are working (test API keys)

Your project is production-ready! Choose your preferred hosting platform and follow the deployment steps above.