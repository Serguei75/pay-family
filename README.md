# 💰 Pay Family - Family Expense Tracker MVP

## 🎯 Overview

**Pay Family** is a zero-knowledge, client-side only family expense tracker.

- ✅ **All data stays on your device** (encrypted, secure)
- ✅ **Works offline** - no server dependency
- ✅ **GDPR compliant** - we store zero personal data
- ✅ **Cross-platform** - Web + iOS + Android (Capacitor)
- ✅ **Open-source** ready architecture

## 🚀 Quick Start

### Web

```bash
# Install dependencies
npm install

# Copy environment
cp .env.puter.example .env.local

# Start dev server
npm run dev

# Build for production
npm run build
```

### Mobile Setup

```bash
# Install Capacitor CLI
npm run mobile:install

# Add platforms
npm run mobile:add:android
npm run mobile:add:ios

# Build web first
npm run build

# Sync to native
npm run mobile:build

# Open in IDE
npm run mobile:dev:android  # Android Studio
npm run mobile:dev:ios      # Xcode
```

## 📋 Features

### Receipt Management
- 📸 Capture receipt photos (auto-categorization with Gemini AI)
- ✏️ Manual entry with validation
- 🏷️ Auto-categorization (Food, Transport, etc.)
- 🔍 Advanced filters (date, vendor, category, member)

### Family Mode
- 👨‍👩‍👧‍👦 Multiple family members
- 👔 Role-based views (Husband/Wife)
- 📊 Shared expense tracking
- 💬 Add notes/descriptions

### Data Management
- 📥 Import from CSV/Excel
- 📤 Export to CSV/PDF/Excel
- ☁️ Optional cloud backup to Puter Drive
- 🔐 End-to-end encrypted (AES-256)

### Analytics
- 📈 Expense trends & categories
- 💹 Monthly summaries
- 👥 Per-person breakdown
- 🎯 Budget tracking (coming soon)

## 🔒 Security

**Zero-Knowledge Architecture:**
- All data encrypted with **AES-256-GCM**
- Encryption key derived from user password (PBKDF2)
- **No server-side data storage**
- Optional Puter Drive backup (user-controlled)

See [SECURITY.md](./SECURITY.md) for detailed security information.

## 🏗️ Architecture

### Frontend Stack
- **React 18.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (fast bundling)
- **IndexedDB** - Local database
- **Puter.js** - Authentication

### Mobile (Capacitor)
- **Android** - Target API 31+
- **iOS** - Target 14.0+
- **Native Plugins** - Camera, Storage, File access

### Services
- `puterAuthService.ts` - Auth with Puter.js
- `encryptionService.ts` - AES-256 encryption
- `geminiService.ts` - AI receipt analysis
- `storageService.ts` - IndexedDB wrapper

## 📱 Platform Support

| Platform | Status | Build |
|----------|--------|-------|
| Web (Desktop) | ✅ | `npm run dev` |
| Web (Mobile) | ✅ | `npm run build` |
| iOS | ✅ | `npm run mobile:dev:ios` |
| Android | ✅ | `npm run mobile:dev:android` |

## 🔧 Configuration

### Environment Variables

Copy `.env.puter.example` to `.env.local`:

```env
VITE_PUTER_APP_ID=your_puter_app_id
VITE_PUTER_APP_NAME=Pay Family
VITE_ENABLE_PUTER_BACKUP=true
VITE_DATA_STORAGE_LOCATION=CLIENT_ONLY
```

**All values are public** - no secrets in frontend.

## 📦 Project Structure

```
pay-family/
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Auth, encryption, APIs
│   ├── styles/          # Global CSS
│   ├── types.ts         # TypeScript definitions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── android/             # Android native code (Capacitor)
├── ios/                 # iOS native code (Capacitor)
├── capacitor.config.ts  # Capacitor configuration
├── vite.config.ts       # Vite bundler config
├── tsconfig.json        # TypeScript config
└── SECURITY.md          # Security documentation
```

## 🚀 Deployment

### Web (Vercel/Netlify)

```bash
# Vercel
vercel

# Netlify
npm run build
netlify deploy --prod --dir=dist
```

### Mobile (App Stores)

**Android (Google Play):**
```bash
npm run build
npm run mobile:build
cd android && ./gradlew bundleRelease
```

**iOS (App Store):**
```bash
npm run build
npm run mobile:build
cd ios && xcodebuild -workspace App.xcworkspace -scheme App -configuration Release
```

## 🤝 Contributing

This is an open-source project. Contributions welcome!

1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file

## ⚖️ Legal

**Important:**
- We store NO personal data on our servers
- You are responsible for your device security
- See [SECURITY.md](./SECURITY.md) for full liability disclaimer
- GDPR compliant by design (client-side only)

## 📞 Support

- 📖 [Documentation](./SECURITY.md)
- 🐛 [Issue Tracker](https://github.com/Serguei75/pay-family/issues)
- 💬 [Discussions](https://github.com/Serguei75/pay-family/discussions)

---

**Made with ❤️ for families managing finances together**

*Last Updated: 2026-01-14*
