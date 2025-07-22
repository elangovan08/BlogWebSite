#!/bin/bash

echo "🌍 Setting up EcoVoice React Blog Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent

echo "🚀 Starting development server..."
echo "📱 The application will open at http://localhost:3000"
echo "🌱 Features included:"
echo "   - Complete React blog platform"
echo "   - CRUD operations for posts"
echo "   - Comments, likes, and sharing"
echo "   - Image upload support"
echo "   - Responsive design"
echo "   - Dark/Light theme"
echo "   - SEO optimized"
echo "   - Eco-conscious content"
echo ""

# Start the development server
npm start
