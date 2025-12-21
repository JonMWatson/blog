#!/bin/bash

# Personal Blog Setup Script
echo "🚀 Setting up your personal blog..."

# Check if we have the necessary tools
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Please install it first."
    exit 1
fi

echo "✅ Node.js found"

# Build the blog
echo "📝 Building blog from Markdown posts..."
node build.js

# Check if Python is available for local server
if command -v python3 &> /dev/null; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "Press Ctrl+C to stop"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "Press Ctrl+C to stop"
    python -m http.server 8000
else
    echo "⚠️  Python not found. Blog built successfully but cannot start local server."
    echo "You can upload the files to any web server to view your blog."
fi