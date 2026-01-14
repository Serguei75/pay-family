# 📁 Complete Installation & Setup Guide

**Time Required**: 15-30 minutes
**Difficulty**: Beginner to Intermediate
**Requirements**: Node.js 18+, npm/yarn, Git

---

## 🚀 Part 1: Initial Setup

### Step 1: Prerequisites

#### Check Node.js Installation

```bash
node --version    # Should be v18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
```

If not installed:
- **macOS**: `brew install node`
- **Windows**: Download from [nodejs.org](https://nodejs.org)
- **Linux**: `sudo apt install nodejs npm` (Ubuntu/Debian)

#### Check Git Installation

```bash
git --version     # Should be 2.30.0 or higher
```

If not installed:
- Visit [git-scm.com](https://git-scm.com)
- Download and install

### Step 2: Clone Repository

```bash
# Clone from GitHub
git clone https://github.com/Serguei75/pay-family.git
cd pay-family

# Or if you forked it:
git clone https://github.com/YOUR_USERNAME/pay-family.git
cd pay-family
```

### Step 3: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn (if you prefer)
yarn install

# Or using pnpm (faster alternative)
pnpm install
```

**This will take 2-5 minutes depending on connection speed.**

After installation, you should see:
```
added XXX packages
audited XXX packages in Xs
found 0 vulnerabilities
```

---

## 🔐 Part 2: Environment Configuration

### Step 1: Create .env.local

```bash
# Copy the example file
cp .env.puter.example .env.local

# Edit .env.local with your favorite editor
# macOS/Linux:
nano .env.local
# Windows:
type .env.puter.example > .env.local
```

### Step 2: Get Puter App ID

1. **Visit** [https://puter.com/developers](https://puter.com/developers)
2. **Sign up** for free account
3. **Create new application**
4. **Copy App ID** (looks like: `app_xxxxx...`)
5. **Update** `.env.local`:

```bash
VITE_PUTER_APP_ID="your_app_id_here"
```

### Step 3: Optional - Add AI Services

For receipt OCR and categorization (optional):

#### Google Gemini API

1. Visit [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Create new project
4. Copy API key
5. Add to `.env.local`:

```bash
VITE_GEMINI_API_KEY="your_gemini_key_here"
```

#### Gmail Integration (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Copy Client ID and Secret
6. Add to `.env.local`:

```bash
VITE_GMAIL_CLIENT_ID="your_client_id.apps.googleusercontent.com"
VITE_GMAIL_CLIENT_SECRET="your_secret"
```

### Step 4: Verify Configuration

```bash
# Check that .env.local exists
ls -la .env.local

# Verify PUTER_APP_ID is set
grep PUTER_APP_ID .env.local
```

---

## 👛 Part 3: Web Development

### Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.7  ready in XXX ms

  ✓ Local:   http://localhost:5173/
  ✓ press h + enter to show help
```

### Open in Browser

1. Open [http://localhost:5173](http://localhost:5173)
2. You should see the Pay Family login screen
3. Click "Login with Puter" (will open OAuth window)
4. Or click "Guest Login" to test without authentication

### Test Features

```
1. Add receipt
   - Click "Add Receipt"
   - Enter amount, vendor, category
   - Click "Save"

2. View receipts
   - See list of all receipts
   - Check totals and summaries

3. Export data
   - Click "Export"
   - Choose CSV, PDF, or Excel
   - Download file

4. Filter receipts
   - Use filter panel
   - Search by vendor, date, category
```

### Development Commands

```bash
# Start dev server (default)
npm run dev

# Type checking (find TypeScript errors)
npm run type-check

# Linting (find code issues)
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 Part 4: Mobile Setup (iOS/Android)

### Prerequisites

#### For Android:
- Android Studio 4.2+
- JDK 17 (very important!)
- Android SDK 31+
- 2-3 GB disk space

#### For iOS (macOS only):
- Xcode 14+
- macOS 12+
- Apple Developer account (free)
- 5+ GB disk space

### Step 1: Install Capacitor

```bash
# Install Capacitor globally
npm install -g @ionic/cli

# Install Capacitor packages
npm run mobile:install
```

### Step 2: Add Platforms

#### Android

```bash
npm run mobile:add:android

# First time setup
cd android
./gradlew assembleDebug
cd ..
```

#### iOS (macOS only)

```bash
npm run mobile:add:ios

# First time setup
cd ios/App
pod install
cd ../..
```

### Step 3: Build and Sync

```bash
# Build web version
npm run build

# Sync to native platforms
npm run mobile:sync
```

### Step 4: Open in IDE

#### Android Studio

```bash
npm run mobile:dev:android

# This opens Android Studio
# - Select your device or emulator
# - Click Run (green play button)
```

#### Xcode

```bash
npm run mobile:dev:ios

# This opens Xcode
# - Select target device
# - Press Cmd+R to run
```

### Testing on Device

#### Android

```bash
# Connect device via USB
# Enable USB Debugging on device

# Build debug APK
cd android
./gradlew assembleDebug
cd ..

# Install on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

#### iOS

```bash
# Connect iPhone via USB
# Trust computer on device

# In Xcode:
# 1. Select device in top menu
# 2. Press Cmd+R
# 3. App appears on home screen
```

---

## 📆 Part 5: Production Deployment

### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Confirm project name
# - Choose directory: ./
# - Framework: Vite
# - Build command: npm run build
```

### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Or build and deploy directly
npm run build
netlify deploy --prod --dir=dist
```

### Option C: Docker

```bash
# Build image
docker build -t payfamily .

# Run locally
docker run -p 3000:3000 payfamily

# Open http://localhost:3000

# Push to registry
docker tag payfamily:latest your-registry/payfamily:latest
docker push your-registry/payfamily:latest
```

### Option D: GitHub Pages

```bash
# Build
npm run build

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json:
# "homepage": "https://your-username.github.io/pay-family"
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Option E: Self-Hosted Server

```bash
# Build
npm run build

# Copy dist/ to server
scp -r dist/* user@your-server:/var/www/payfamily/

# Configure web server (nginx example)
# Copy nginx.conf to /etc/nginx/sites-available/
# Enable site: sudo a2ensite payfamily
# Reload: sudo systemctl reload nginx
```

---

## 📈 Part 6: Environment Variables

### Complete .env.local Reference

```bash
# ====================================
# REQUIRED
# ====================================
# Get from https://puter.com/developers
VITE_PUTER_APP_ID="your_puter_app_id"
VITE_PUTER_API_URL="https://puter.com"

# ====================================
# OPTIONAL: AI & Integrations
# ====================================
# Get from https://ai.google.dev/
VITE_GEMINI_API_KEY="your_gemini_key"

# Get from https://console.cloud.google.com
VITE_GMAIL_CLIENT_ID="your_client_id.apps.googleusercontent.com"
VITE_GMAIL_CLIENT_SECRET="your_secret"
VITE_GMAIL_REDIRECT_URI="http://localhost:5173/auth/gmail"

# ====================================
# APPLICATION CONFIG
# ====================================
VITE_APP_ENV="development"       # development | production
VITE_APP_DEBUG="true"            # true | false
VITE_ENCRYPTION_ITERATIONS="100000"
VITE_ENCRYPTION_ALGORITHM="AES-256-GCM"
```

---

## 🐧 Part 7: Troubleshooting

### Issue: "Cannot find module"

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use

```bash
# Solution: Use different port
npm run dev -- --port 3000

# Or find and kill process using port 5173
lsof -i :5173
kill -9 <PID>
```

### Issue: Puter login not working

```
1. Check .env.local has correct VITE_PUTER_APP_ID
2. Check Puter account is active
3. Check app is authorized in Puter dashboard
4. Clear browser cache and cookies
5. Try in incognito/private mode
```

### Issue: Build fails with TypeScript errors

```bash
# Solution: Fix type errors
npm run type-check

# Review errors and fix imports/types
npm run build
```

### Issue: IndexedDB not working

```
1. Check browser supports IndexedDB (all modern browsers)
2. Check browser storage settings
3. Check privacy mode (disable it)
4. Try different browser
5. Check developer console for errors
```

### Issue: Mobile build fails

#### Android

```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
cd ..

# Check JDK version
java -version  # Should be 17+

# Update Android SDK
android list sdk --all
```

#### iOS

```bash
# Clean and rebuild
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Update CocoaPods
sudo gem install cocoapods
```

### Issue: Encryption password forgotten

```
⚠️ CRITICAL: There is NO recovery mechanism

Prevention:
1. Store password in password manager
2. Keep backup of data (export CSV/PDF)
3. Enable Puter Drive backup

If forgotten:
- Data is encrypted with password
- You cannot decrypt without password
- You must clear IndexedDB and start fresh
```

---

## 👤 Part 8: User Setup

### First Time Login

1. **Open app** at [http://localhost:5173](http://localhost:5173)
2. **Choose login method**:
   - "Login with Puter" - OAuth authentication
   - "Guest Login" - Test mode (no data persistence)
3. **Set encryption password** (if Puter login):
   - Create strong password (12+ characters)
   - Contains uppercase, lowercase, numbers, symbols
   - Store in password manager
4. **Accept privacy terms**
5. **Start adding receipts**

### Adding First Receipt

1. Click "Add Receipt"
2. Fill in details:
   - **Vendor**: Where you bought (e.g., "Amazon")
   - **Amount**: Total cost (e.g., "50.00")
   - **Currency**: USD, EUR, etc.
   - **Date**: Transaction date
   - **Category**: Type of expense
   - **Description**: Optional notes
3. Click "Save"
4. Receipt appears in list

### Viewing Data

1. **Receipts Tab**:
   - See all receipts in list
   - View totals and summaries
   - Apply filters

2. **Export Tab**:
   - Download as CSV
   - Download as Excel
   - Generate PDF report

3. **Analytics Tab**:
   - View spending by category
   - Total expenses
   - Average transaction

---

## 📂 Part 9: Backup & Security

### Enable Puter Drive Backup

```
1. Login with Puter (required)
2. Go to Settings
3. Click "Enable Cloud Backup"
4. Confirm authorization
5. Encrypted backup starts automatically
```

### Export Local Backup

```
1. Click "Export" button
2. Choose format: CSV, PDF, or Excel
3. Save file to secure location
4. Store in encrypted cloud (Google Drive, OneDrive, etc.)
```

### Password Management

```
1. Use password manager (Bitwarden, 1Password, LastPass)
2. Generate random 20+ character password
3. Enable 2FA on Puter account
4. Never share password
5. Change password yearly
```

### Device Security

```
1. Keep browser updated
2. Enable device encryption (FileVault, BitLocker)
3. Use antivirus software
4. Keep OS updated
5. Use HTTPS everywhere
```

---

## 👤 Part 10: Next Steps

### After Installation

- [ ] Add your first receipt
- [ ] Export data as backup
- [ ] Enable optional Puter Drive backup
- [ ] Test filtering and searches
- [ ] Try exporting to different formats
- [ ] Add another family member (if applicable)
- [ ] Set up mobile app (iOS/Android)
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Share with family (when ready)
- [ ] Read [SECURITY.md](./SECURITY.md) for best practices

### Resources

- **GitHub Issues**: [Report issues](https://github.com/Serguei75/pay-family/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/Serguei75/pay-family/discussions)
- **Puter Docs**: [Puter.js Documentation](https://docs.puter.com)
- **React Docs**: [React 18 Documentation](https://react.dev)
- **Vite Docs**: [Vite Documentation](https://vitejs.dev)

---

## 🎆 Congratulations!

You've successfully set up Pay Family! 🎉

Your family's financial data is now:
- ✅ Encrypted locally with AES-256-GCM
- ✅ Stored only on your device
- ✅ Protected by your password
- ✅ Ready for use

**Next**: Add your receipts and start tracking family expenses together!

---

*Last Updated: 2026-01-14*
*Installation Time: 15-30 minutes*
*Difficulty Level: Beginner to Intermediate*
