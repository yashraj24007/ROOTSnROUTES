@echo off
REM ROOTSnROUTES Quick Deploy Script for Windows
REM This script helps you deploy your website quickly

echo 🚀 ROOTSnROUTES Quick Deploy Script
echo ==================================

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found!
    echo 📝 Please copy .env.example to .env and add your API keys:
    echo    copy .env.example .env
    echo    Then edit .env with your actual API keys
    pause
    exit /b 1
)

echo ✅ Environment file found

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🔨 Building project...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo.
    echo 🎉 Your website is ready to deploy!
    echo.
    echo Choose a deployment option:
    echo 1. 🔥 Vercel ^(Recommended^)
    echo    - Run: npx vercel
    echo    - Follow the prompts
    echo.
    echo 2. 🌐 Netlify
    echo    - Run: npx netlify-cli deploy --prod --dir=dist
    echo    - Or drag ^& drop 'dist' folder to netlify.com/drop
    echo.
    echo 3. 📱 Firebase
    echo    - Run: npx firebase-tools
    echo    - Then: firebase init hosting ^&^& firebase deploy
    echo.
    echo 4. 📂 Static File Server ^(Local Testing^)
    echo    - Run: npx serve dist
    echo    - Visit: http://localhost:3000
    echo.
) else (
    echo ❌ Build failed!
    echo Please check the errors above and fix them before deploying.
    pause
    exit /b 1
)

pause