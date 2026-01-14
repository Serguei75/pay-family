# 🚀 Installation & Setup Guide

## Web Application

### Requirements
- Node.js 16+
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone repository
git clone https://github.com/Serguei75/pay-family.git
cd pay-family

# Install dependencies
npm install

# Set up environment
cp .env.puter.example .env.local

# Add your Puter App ID to .env.local
# Get it from: https://puter.com/developers

# Start development server
npm run dev

# Open http://localhost:5173
```

## Mobile Application (iOS/Android)

### Prerequisites

**For Android:**
- Android Studio 4.2+
- JDK 17+
- Android SDK 31+

**For iOS:**
- macOS 12+
- Xcode 14+
- CocoaPods

### Setup

```bash
# Install Capacitor tools
npm run mobile:install

# Add Android platform
npm run mobile:add:android

# Add iOS platform (macOS only)
npm run mobile:add:ios

# Build web first
npm run build

# Sync to native platforms
npm run mobile:build
```

### Development

**Android:**
```bash
npm run mobile:dev:android
# Opens Android Studio
# Connect device or use emulator
# Click "Run" to deploy
```

**iOS:**
```bash
npm run mobile:dev:ios
# Opens Xcode
# Select device/simulator
# Press Play to run
```

### Production Build

**Android APK:**
```bash
cd android
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

**iOS IPA:**
```bash
cd ios
xcodebuild -workspace App.xcworkspace -scheme App -configuration Release
# Output: App.ipa
```

## Configuration

### Environment Variables

Create `.env.local` from template:

```bash
cp .env.puter.example .env.local
```

Edit `.env.local`:

```env
# Puter Configuration
VITE_PUTER_APP_ID=your_puter_app_id_here
VITE_PUTER_APP_NAME=Pay Family

# Features
VITE_ENABLE_PUTER_BACKUP=true

# Privacy Settings (DO NOT CHANGE)
VITE_DATA_STORAGE_LOCATION=CLIENT_ONLY
VITE_GDPR_COMPLIANT=true
VITE_SERVER_STORES_DATA=false
```

### Getting Puter App ID

1. Go to [Puter Developer Console](https://puter.com/developers)
2. Create new application
3. Copy App ID
4. Paste in `.env.local`

## Security Setup

### Encryption Key

The first time you log in, an encryption key is generated automatically:

- Generated using cryptographically secure random (256-bit)
- Derived from your password using PBKDF2 (100,000 iterations)
- Stored locally only (never transmitted)
- All data encrypted with AES-256-GCM

### Best Practices

1. **Use strong password** (12+ characters, mixed case, numbers, symbols)
2. **Enable device lock** (PIN/Biometric)
3. **Keep OS updated** (latest iOS/Android/browser)
4. **Don't share device** with untrusted users
5. **Regular backups** to Puter Drive (optional)

## Troubleshooting

### Port Already in Use

```bash
# Change port
npm run dev -- --port 3000
```

### Android Build Issues

```bash
# Clean build
cd android
./gradlew clean
cd ..
npm run mobile:build
```

### iOS Build Issues

```bash
# Clear Xcode cache
rm -rf ~/Library/Developer/Xcode/DerivedData/*
npm run mobile:build
npm run mobile:dev:ios
```

### Encryption Errors

If you get "wrong password" error:
1. Clear browser cache and localStorage
2. Log out completely
3. Log back in
4. Data will be recreated locally

## Deployment

### Web (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Web (Netlify)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Web (Docker)

```bash
# Build image
docker build -t payfamily .

# Run container
docker run -p 3000:3000 payfamily
```

### Android (Google Play)

1. Generate signed APK (see Production Build above)
2. Upload to Google Play Console
3. Configure app details
4. Submit for review

### iOS (App Store)

1. Generate signed IPA (see Production Build above)
2. Upload via Xcode or Transporter
3. Configure app details in App Store Connect
4. Submit for review

## Development

### Project Structure

```
pay-family/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # React hooks (useAuth, useDocuments)
│   ├── services/      # Auth, encryption, storage
│   ├── styles/        # Global CSS
│   ├── types.ts       # TypeScript types
│   ├── App.tsx        # Main component
│   └── main.tsx       # Entry point
├── android/           # Capacitor Android
├── ios/               # Capacitor iOS
├── capacitor.config.ts# Mobile config
├── vite.config.ts     # Build config
├── tsconfig.json      # TypeScript config
└── SECURITY.md        # Security docs
```

### Running Tests

```bash
# (Add testing setup)
npm test
```

### Code Style

```bash
# Lint
npm run lint

# Format
npm run format
```

## Support

- 📖 [Documentation](./README.md)
- 🚨 [Security](./SECURITY.md)
- 🐛 [Issues](https://github.com/Serguei75/pay-family/issues)
- 💬 [Discussions](https://github.com/Serguei75/pay-family/discussions)

---

**Need help?** Check the [Troubleshooting](#troubleshooting) section or open an issue.

*Last Updated: 2026-01-14*
