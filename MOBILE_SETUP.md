# 📱 Mobile Setup with Capacitor

## Quick Start

```bash
# Install Capacitor
npm run mobile:install

# Add platforms
npm run mobile:add:android
npm run mobile:add:ios  # macOS only

# Build and sync
npm run build
npm run mobile:build

# Open in IDE
npm run mobile:dev:android  # Android Studio
npm run mobile:dev:ios      # Xcode
```

## 📄 Configuration

### Android Configuration

File: `android/app/src/main/AndroidManifest.xml`

Required permissions (auto-added by Capacitor):
- `INTERNET` - API calls
- `READ_EXTERNAL_STORAGE` - Photo uploads
- `WRITE_EXTERNAL_STORAGE` - Receipt backups

### iOS Configuration

File: `ios/App/Info.plist`

Required entries:
- `NSPhotoLibraryUsageDescription` - "Access photos for receipts"
- `NSCameraUsageDescription` - "Capture receipt photos"
- `NSLocalizedDescription` - "Pay Family - Family Expense Tracker"

## 🐨 Android Setup

### Prerequisites
- Android Studio 4.2+
- JDK 17 (required for Capacitor 6)
- SDK 31+ installed

### Build

```bash
# Navigate to Android folder
cd android

# Build for testing (debug)
./gradlew assembleDebug
# Output: app/build/outputs/apk/debug/app-debug.apk

# Build for release
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk

# Build App Bundle for Play Store
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

### Install on Device

```bash
# Via ADB
adb install app/build/outputs/apk/debug/app-debug.apk

# Or use Android Studio
# Connect device, open Android Studio, click Run
```

### Signing

For production, create signed APK:

```bash
# Generate keystore (one time)
keytool -genkey -v -keystore my-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias

# Configure in gradle.properties
VERSION_NAME=1.0.0
VERSION_CODE=1
VERSION_BUILD=release

# Build signed APK
./gradlew assembleRelease
```

## 👨 iOS Setup

### Prerequisites
- macOS 12+
- Xcode 14+
- Apple Developer account
- CocoaPods

### Build

```bash
cd ios

# For testing (Debug)
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -configuration Debug

# For release (Release)
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -configuration Release

# Or use Xcode GUI
open App.xcworkspace
# Select device/simulator, click Play
```

### Signing

1. Open `ios/App/App.xcworkspace` in Xcode
2. Select "App" target
3. Go to "Signing & Capabilities"
4. Select your Apple Developer account
5. Set bundle identifier (e.g., `com.payfamily.app`)
6. Let Xcode manage signing automatically

### Generate IPA

```bash
cd ios

# Create archive
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -configuration Release \
  -archivePath App.xcarchive

# Export IPA
xcodebuild -exportArchive \
  -archivePath App.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath .
```

## 📈 App Store Submission

### Android (Google Play)

1. Create Google Play Developer account ($25)
2. Create new app in Play Console
3. Upload AAB or APK
4. Fill app details:
   - Title: "Pay Family"
   - Description: See README.md
   - Screenshots (2-5)
   - Privacy policy link: https://your-domain.com/privacy
   - Category: Finance
5. Submit for review (1-3 days)

### iOS (App Store)

1. Create Apple Developer account ($99/year)
2. Create App ID in App Store Connect
3. Generate provisioning profile
4. Create signing certificate
5. Build and upload via Transporter
6. Fill app details:
   - Name: "Pay Family"
   - Description: See README.md
   - Screenshots (2-5)
   - Privacy policy
   - Pricing tier
7. Submit for review (1-3 days)

## 🔒 Security Considerations

### Local Storage

**Android:**
- Data stored in app's private directory: `/data/data/com.payfamily.app/`
- Protected by Android sandbox
- Use SharedPreferences for sensitive data (auto-encrypted on Android 5.1+)

**iOS:**
- Data stored in app's sandbox: `/var/mobile/Containers/Data/Application/`
- Protected by iOS sandbox
- Use Keychain for sensitive keys (encrypted by OS)

### Permissions

Minimize requested permissions:
- ??? Camera (receipt photos)
- ??? Photo Library (upload from gallery)
- ??? File access (export/import)
- NO location
- NO contacts
- NO calendar

## 🛠️ Troubleshooting

### Android

**Issue: Gradle sync fails**
```bash
cd android
./gradlew clean
cd ..
npm run mobile:build
```

**Issue: App crashes on startup**
- Check logcat: `adb logcat | grep -i error`
- Ensure `capacitor.config.ts` is correct
- Check `.env` variables are set

**Issue: Camera doesn't work**
- Add permissions to `AndroidManifest.xml`
- Request runtime permissions in Capacitor

### iOS

**Issue: Xcode build fails**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run mobile:build
```

**Issue: Pod dependencies outdated**
```bash
cd ios
pod update
cd ..
```

**Issue: Code signing errors**
1. Open Xcode
2. Select "App" target
3. Go to "Signing & Capabilities"
4. Check team and bundle ID
5. Re-download provisioning profile

## 📁 File Structure

```
pay-family/
├── android/
│   ├── app/                    # App module
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── res/                # Icons, strings, etc
│   │   ├── build.gradle        # Build config
│   │   └── proguard-rules.pro  # Obfuscation
│   ├── build.gradle         # Root build config
│   └── settings.gradle       # Project structure
├── ios/
│   ├── App/
│   │   ├── App.xcworkspace/
│   │   ├── App/
│   │   │   ├─┠ Info.plist
│   │   │   ├─┠ AppDelegate.swift
│   │   │   └─┠ Assets/             # Icons, images
│   │   ├── Pods/               # Dependencies
│   │   └── Podfile
├── capacitor.config.ts  # Capacitor configuration
└── src/                  # React source (shared)
```

## 🔄 Continuous Integration

See `.github/workflows/build-mobile.yml` for automated builds.

### GitHub Actions

Automatically builds on:
- Push to `main` branch
- Pull requests
- Manual workflow dispatch

Outputs:
- `web-build/` - Web distribution
- `android-build/` - Android APK
- `ios-build/` - iOS archive

## 📚 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs/)
- [Android Documentation](https://developer.android.com/)
- [iOS Documentation](https://developer.apple.com/documentation/)
- [Google Play Console](https://play.google.com/console/)
- [App Store Connect](https://appstoreconnect.apple.com/)

---

*Last Updated: 2026-01-14*
