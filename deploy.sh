#!/bin/bash

# ROOTSnROUTES Quick Deploy Script
# This script helps you deploy your website quickly

echo "🚀 ROOTSnROUTES Quick Deploy Script"
echo "=================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Please copy .env.example to .env and add your API keys:"
    echo "   cp .env.example .env"
    echo "   Then edit .env with your actual API keys"
    exit 1
fi

echo "✅ Environment file found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your website is ready to deploy!"
    echo ""
    echo "Choose a deployment option:"
    echo "1. 🔥 Vercel (Recommended)"
    echo "   - Run: npx vercel"
    echo "   - Follow the prompts"
    echo ""
    echo "2. 🌐 Netlify"
    echo "   - Run: npx netlify-cli deploy --prod --dir=dist"
    echo "   - Or drag & drop 'dist' folder to netlify.com/drop"
    echo ""
    echo "3. 📱 Firebase"
    echo "   - Run: npx firebase-tools"
    echo "   - Then: firebase init hosting && firebase deploy"
    echo ""
    echo "4. 📂 Static File Server (Local Testing)"
    echo "   - Run: npx serve dist"
    echo "   - Visit: http://localhost:3000"
    echo ""
else
    echo "❌ Build failed!"
    echo "Please check the errors above and fix them before deploying."
    exit 1
fi