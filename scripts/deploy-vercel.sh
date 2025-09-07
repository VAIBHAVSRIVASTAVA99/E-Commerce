#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Vercel deployment process..."

# Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building the application..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed successfully!"
