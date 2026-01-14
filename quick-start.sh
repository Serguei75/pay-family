#!/bin/bash

# Pay Family - Quick Start Script
# This script automates the initial setup

set -e

echo ""
echo "========================================"
echo "  Pay Family - Quick Start Setup"
echo "========================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed"
    echo "  Download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create .env.local
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local..."
    cp .env.puter.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Update .env.local with your Puter App ID"
    echo "  1. Visit: https://puter.com/developers"
    echo "  2. Create application and copy App ID"
    echo "  3. Edit .env.local and set VITE_PUTER_APP_ID"
    echo ""
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Update .env.local with your Puter App ID"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:5173"
echo ""
echo "For more information:"
echo "  - Installation: see INSTALL.md"
echo "  - Security: see SECURITY.md"
echo "  - Mobile setup: see MOBILE_SETUP.md"
echo ""
