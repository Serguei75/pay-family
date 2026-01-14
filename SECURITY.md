# 🔐 Security & Key Management

**CRITICAL**: This document covers zero-knowledge architecture, encryption, key management, and compliance.

## 🎯 Architecture: Zero-Knowledge Design

### What We DON'T Store

```
❌ Passwords - Not stored anywhere
❌ Email addresses - Not stored anywhere
❌ Names - Not stored on our servers
❌ Receipt data - Not stored on our servers
❌ Financial information - Not stored on our servers
❌ User preferences - Not stored on our servers
❌ IP addresses - Not logged
❌ Cookies/Tracking - Not used
```

### What IS Encrypted Locally

```
✅ Receipt data (vendor, amount, category, items)
✅ Transaction dates
✅ User notes/descriptions
✅ Expense summaries
✅ All images/documents
```

**Encrypted with**: AES-256-GCM
**Stored in**: IndexedDB (user's device only)
**Backed up to**: Puter Drive (if user chooses, encrypted end-to-end)

## 🔏 Encryption Standards

### Algorithm: AES-256-GCM

```typescript
// Web Crypto API Standard
{
  name: 'AES-GCM',
  iv: crypto.getRandomValues(new Uint8Array(12)),     // 96-bit IV
  additionalData: encoder.encode('Pay Family App'),   // AEAD
}

// Key size: 256 bits
// Tag size: 128 bits (authentication)
// IV size: 96 bits (random, unique per encryption)
```

### Key Derivation: PBKDF2

```typescript
{
  name: 'PBKDF2',
  hash: 'SHA-256',
  salt: crypto.getRandomValues(new Uint8Array(32)),   // 256-bit salt
  iterations: 100000,                                  // Slow brute-force
}

// Resulting key: 256 bits
// Iterations: NIST recommendation (minimum 100,000)
// Salt: Unique per user
```

### Encryption Flow

```
1. User Password (e.g., "MySecurePass123")
   ↓
2. PBKDF2 Key Derivation (100,000 iterations)
   - Input: password + random salt
   - Output: 256-bit encryption key
   ↓
3. AES-256-GCM Encryption
   - Key: from PBKDF2
   - IV: random 96-bit nonce
   - Data: JSON document
   - Output: encrypted data + IV + salt + auth tag
   ↓
4. Store in IndexedDB
   - Encrypted blob
   - Cannot decrypt without password
   ↓
5. (Optional) Backup to Puter Drive
   - Already encrypted
   - Puter servers never see plaintext
```

## 🧐 Key Management

### Master Key (Encryption Key)

**Generation:**
```typescript
const password = userPassword; // User enters this
const salt = crypto.getRandomValues(new Uint8Array(32));
const masterKey = await crypto.subtle.deriveKey(
  {
    name: 'PBKDF2',
    salt: salt,
    iterations: 100000,
    hash: 'SHA-256'
  },
  await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']),
  { name: 'AES-GCM', length: 256 },
  false, // Cannot export
  ['encrypt', 'decrypt']
);
```

**Storage:**
- NOT stored anywhere
- Derived from password on every login
- Exists only in RAM during session
- Garbage collected on logout

### Salt & IV (Initialization Vector)

**Salt (256-bit):**
- Stored in IndexedDB (can be public)
- Unique per encryption key
- Prevents rainbow table attacks

**IV (96-bit):**
- Stored with encrypted data
- Unique per encrypted document
- Random, never reused
- Can be public

### Session Security

```typescript
// Session expires after:
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// On logout:
// 1. Clear master key from memory
// 2. Clear user data from state
// 3. Lock IndexedDB operations
// 4. Clear browser cache
// 5. Remove Puter session
```

## 🔒 Authentication (Puter.js)

### OAuth-Like Flow

```
1. User clicks "Login with Puter"
   ↓
2. Puter.js opens OAuth window
   - User authenticates with Puter (their system)
   - NO password sent to us
   ↓
3. Puter returns auth token
   - Token stored in secure httpOnly cookie
   - Token used for optional Drive backup only
   ↓
4. User sets encryption password (for local encryption)
   - Independent of Puter password
   - Only used locally
   ↓
5. App initializes with encrypted local storage
```

### Puter Integration Security

```typescript
// Authenticate
await puter.auth.authenticate();

// Puter cannot see:
// - User's encryption password
// - Encrypted data
// - Sensitive metadata
// - Receipt details

// Puter CAN do (only with user consent):
// - Backup encrypted data to Puter Drive
// - Store authentication token
// - Track file access (if backup enabled)
```

## 📄 Data Handling

### Data at Rest (IndexedDB)

```
IndexedDB Document Structure:
{
  id: "uuid",
  type: "receipt",
  encryptedData: "base64_encrypted_json",  // AES-256-GCM
  salt: "base64_salt",
  iv: "base64_iv",
  authTag: "base64_auth_tag",
  createdAt: "2026-01-14T12:00:00Z",
  lastModified: "2026-01-14T12:00:00Z",
  version: 1
}
```

### Data in Transit

**If using Puter Drive backup:**
```
User Device
   (data already encrypted)
   ↓
HTTPS (TLS 1.3)
   ↓
Puter Servers
   (receive only encrypted blob)
   ↓
Puter Drive Storage
   (encrypted at rest)
   ↓
No decryption key on server
   (only user has it)
```

**If NOT using backup:**
```
User Device
   (encrypted in IndexedDB)
   ↓
No network transmission
   (completely offline capable)
```

### Data in Memory

```typescript
// DO NOT log sensitive data
// DO NOT store in globals
// DO NOT send to external APIs

// Decrypted data exists only:
// - During active session
// - In component state (React)
// - In IndexedDB query results
// - Immediately garbage collected

// After logout:
// - Clear all state
// - Master key removed from memory
// - IndexedDB locked (optional)
```

## 🔍 Security Best Practices

### For Users

1. **Password Security**
   - Use 12+ characters
   - Mix uppercase, lowercase, numbers, special characters
   - Don't reuse passwords from other services
   - Store in password manager

2. **Device Security**
   - Keep browser updated
   - Use HTTPS everywhere
   - Enable device encryption (macOS FileVault, Windows BitLocker)
   - Use antivirus software

3. **Session Security**
   - Don't leave app logged in on shared devices
   - Log out after 15 minutes of inactivity
   - Use incognito/private browsing if on public WiFi
   - Clear browser cache regularly

4. **Backups**
   - Enable Puter Drive backup (optional)
   - Backup to personal cloud (Google Drive, iCloud)
   - Keep local backups (USB drive, external HDD)
   - Test backup restoration

### For Developers

1. **Code Security**
   ```bash
   # No secrets in code
   # No API keys in repository
   # No passwords in logs
   # No sensitive data in comments
   # No eval() or innerHTML with user data
   ```

2. **Dependency Security**
   ```bash
   # Regular audits
   npm audit
   
   # Update dependencies
   npm update
   
   # Check for vulnerabilities
   npm ls
   
   # Lock versions
   use package-lock.json
   ```

3. **Build Security**
   ```bash
   # No source maps in production
   vite.config.ts: sourcemap: false
   
   # Minify and obfuscate
   npm run build
   
   # Code splitting (per route)
   React.lazy() + Suspense
   
   # Content Security Policy
   Headers: default-src 'self'
   ```

4. **Deployment Security**
   ```bash
   # HTTPS only (automatic on Vercel/Netlify)
   # TLS 1.3+
   # Security headers (HSTS, CSP, X-Frame-Options)
   # Regular security updates
   # Monitor for vulnerabilities
   ```

## 🔓 Environment Variables

### `.env.local` (Git Ignored)

```bash
# Puter Configuration
VITE_PUTER_APP_ID="your_puter_app_id_here"
VITE_PUTER_API_URL="https://puter.com"

# Optional: Gemini AI (for OCR/categorization)
VITE_GEMINI_API_KEY="your_gemini_api_key"

# Optional: Gmail Integration
VITE_GMAIL_CLIENT_ID="your_gmail_client_id"
VITE_GMAIL_CLIENT_SECRET="your_gmail_client_secret"

# App Configuration
VITE_APP_ENV="development|production"
VITE_APP_DEBUG="true|false"
VITE_ENCRYPTION_ITERATIONS="100000"
```

### Setup

```bash
# 1. Copy template
cp .env.puter.example .env.local

# 2. Get Puter App ID
#    Visit: https://puter.com/developers
#    Create application
#    Copy App ID

# 3. (Optional) Get Gemini API Key
#    Visit: https://ai.google.dev/
#    Create API key
#    Copy key

# 4. (Optional) Get Gmail OAuth
#    Visit: https://developers.google.com/gmail/api
#    Create project
#    Create OAuth 2.0 credentials

# 5. Update .env.local with values

# 6. NEVER commit .env.local to git
#    Check .gitignore includes it
```

## 🦫 Vulnerability Scanning

### Regular Audits

```bash
# NPM audit
npm audit
npm audit fix

# OWASP Dependency Check
owasp-dependency-check

# Snyk
snyk test

# GitHub Security
# Settings > Security > Code security and analysis
#   - Enable Dependabot alerts
#   - Enable Dependabot security updates
#   - Enable secret scanning
```

### Security Headers

```
# Add to your hosting provider:

Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
Referrer-Policy: strict-origin-when-cross-origin
```

## 📟 Compliance

### GDPR (EU)

**Compliance**: ✅ 100%

- No personal data collected
- All data encrypted on device
- User controls backups
- Right to delete (delete IndexedDB)
- Data portability (export CSV/PDF)
- Privacy policy: Data never leaves device

### CCPA (California)

**Compliance**: ✅ 100%

- No sale of data
- No third-party sharing
- User controls all data
- Right to delete (clear local storage)
- Transparent practices

### HIPAA (US Healthcare)

**Compliance**: ✅ Business Associate Agreement Not Needed

- No transmission of protected health information
- Client-side encryption
- No server-side storage
- No audit logs of sensitive data

### Industry Standards

- **ISO 27001**: Information Security Management
- **SOC 2**: Security, Availability, Confidentiality
- **NIST Cybersecurity Framework**: Risk management
- **OWASP**: Secure coding practices

## 📁 Incident Response

### If Security Issue Discovered

1. **DO NOT** post on GitHub issues
2. **DO** email security contact
3. **DO** describe:
   - Vulnerability type
   - Affected version
   - Impact assessment
   - Proof of concept (if safe)
4. **WAIT** for response (usually within 48 hours)
5. **PATCH** will be released within 7 days
6. **CREDIT** given to reporter

### Responsible Disclosure

We follow:
- 90-day disclosure deadline
- Coordinated vulnerability disclosure
- No public discussion until patched
- Credit for researcher

## 🛠️ Hardening Checklist

- [ ] All passwords use 12+ characters
- [ ] Encryption key derivation using PBKDF2 (100k+ iterations)
- [ ] AES-256-GCM for all encryption
- [ ] No cleartext passwords in code
- [ ] No API keys in version control
- [ ] Session timeout after 15 minutes
- [ ] HTTPS enforced everywhere
- [ ] Security headers configured
- [ ] Dependencies up to date
- [ ] No console.log of sensitive data
- [ ] Rate limiting implemented (if API)
- [ ] CSRF protection (if forms)
- [ ] CSP headers configured
- [ ] Subresource integrity (CDN)
- [ ] Regular security audits scheduled

## 📚 Resources

- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Guidelines](https://csrc.nist.gov/)
- [Puter Security](https://docs.puter.com/security)
- [MDN Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## ⚔️ Contact

**Security Issues**: Do NOT use public GitHub issues

Create a confidential vulnerability report through GitHub:
1. Settings > Security > Reporting a vulnerability
2. Click "Report a vulnerability"
3. Describe the issue privately

---

**Remember**: Security is everyone's responsibility. If you find an issue, report it responsibly. We appreciate your help keeping Pay Family secure!

*Last Updated: 2026-01-14*
*Zero-Knowledge Architecture Enabled* ✅
