# Security & Privacy Policy

## 🔒 Zero-Knowledge Architecture

Pay Family is built on a **zero-knowledge, client-side only** architecture:

### Data Storage
- ✅ **All user data stored locally** on user's device (IndexedDB)
- ✅ **All data encrypted** with AES-256-GCM
- ✅ **No data sent to our servers** (except optional Puter Drive backup)
- ✅ **User has complete control** over encryption password

### Authentication
- ✅ **Puter.js handles authentication** (OAuth-like, secure)
- ✅ **We never see passwords** or sensitive credentials
- ✅ **Session stored locally only**
- ✅ **No server-side session storage**

### Encryption Details
- **Algorithm**: AES-256-GCM (Advanced Encryption Standard)
- **Key Derivation**: PBKDF2 with SHA-256 (100,000 iterations)
- **IV Length**: 12 bytes (96 bits)
- **Auth Tag**: 128 bits (16 bytes)
- **Salt**: 16 bytes (128 bits)

## 🌍 GDPR Compliance

### No Personal Data Collection
- ❌ No IP address logging
- ❌ No analytics tracking
- ❌ No cookies (except session token)
- ❌ No third-party trackers
- ❌ No data shared with advertisers

### User Rights
- ✅ **Right to Access**: All data is on user's device
- ✅ **Right to Delete**: Clear browser storage = permanent deletion
- ✅ **Right to Portability**: Export as encrypted JSON
- ✅ **Right to Be Forgotten**: No server records to delete

## 📱 Mobile Security (Capacitor)

### Android
- ✅ App signed with SHA-256 certificate
- ✅ Data stored in app's private sandbox
- ✅ No dangerous permissions requested
- ✅ SecurityConfiguration enforces HTTPS

### iOS
- ✅ App signed with Apple Developer certificate
- ✅ Data stored in Keychain (encrypted by OS)
- ✅ No location/camera/contact permissions
- ✅ App Transport Security enforced

## 🔐 Secrets Management

### Public (Safe to Expose)
- ✅ `VITE_PUTER_APP_ID` - Puter application ID
- ✅ `VITE_PUTER_APP_NAME` - App display name

### Private (NEVER Expose)
- ❌ User passwords (never transmitted)
- ❌ Encryption keys (generated locally only)
- ❌ Access tokens (stored in secure storage only)

## 🚨 Security Best Practices

### For Users
1. **Use strong passwords** (minimum 12 characters)
2. **Enable device lock** (PIN/Biometric)
3. **Keep OS updated** (latest iOS/Android)
4. **Don't share device** with untrusted users
5. **Regularly backup** to Puter Drive

### For Developers
1. **Never log** sensitive data
2. **Always encrypt** before storage
3. **Use HTTPS** only (configured in Capacitor)
4. **Validate user input** on frontend
5. **Keep dependencies** updated (`npm audit`)

## 🛡️ Known Limitations

- **Unencrypted backups**: If user exports data, it's readable
- **Device compromise**: If device is compromised, all data accessible
- **Puter account breach**: Optional cloud backup could be exposed (but encrypted)
- **Browser storage**: Web version vulnerable to XSS attacks (use HTTPS + CSP)

## 📋 Liability Disclaimer

**WE ARE NOT RESPONSIBLE FOR:**
- Lost or corrupted data (user is responsible for backups)
- Device theft or compromise
- User's weak password choices
- Puter platform security issues
- Third-party device compromises

**YOU ARE RESPONSIBLE FOR:**
- Securing your device
- Creating strong passwords
- Regular backups
- Keeping your OS/browser updated

## 🔄 Audit Trail

No audit trails needed - all changes are:
- ✅ Stored locally
- ✅ User-controlled
- ✅ Encrypted
- ✅ Non-reversible

## 📞 Security Issues

Found a vulnerability? **DO NOT disclose publicly.**
Email: security@payfamily.app (if applicable)

---

**Last Updated**: 2026-01-14
**Architecture**: Zero-Knowledge Client-Side Only
**Compliance**: GDPR, CCPA, HIPAA-adjacent
