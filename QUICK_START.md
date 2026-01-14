# ⚡ Quick Start (5 minutes)

## 🚀 Fastest Way to Get Running

### macOS/Linux

```bash
# 1. Clone
git clone https://github.com/Serguei75/pay-family.git
cd pay-family

# 2. Run setup script
bash quick-start.sh

# 3. Update .env.local
# Get Puter App ID from https://puter.com/developers
nano .env.local  # or your favorite editor

# 4. Start dev server
npm run dev

# 5. Open http://localhost:5173
```

### Windows

```bash
# 1. Clone
git clone https://github.com/Serguei75/pay-family.git
cd pay-family

# 2. Run setup script
quick-start.bat

# 3. Update .env.local
# Get Puter App ID from https://puter.com/developers
# Edit with Notepad: .env.local

# 4. Start dev server
npm run dev

# 5. Open http://localhost:5173
```

## 📆 Manual Setup (if scripts fail)

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
cp .env.puter.example .env.local

# 3. Edit .env.local and add your Puter App ID
# VITE_PUTER_APP_ID="your_app_id"

# 4. Start development
npm run dev
```

## 🏗️ Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run type-check       # Check TypeScript
npm run mobile:build     # Build for mobile
```

## 📈 Need Help?

- **Full install guide**: See [INSTALL.md](./INSTALL.md)
- **Security questions**: See [SECURITY.md](./SECURITY.md)
- **Mobile setup**: See [MOBILE_SETUP.md](./MOBILE_SETUP.md)
- **Issues**: [GitHub Issues](https://github.com/Serguei75/pay-family/issues)

---

That's it! You're now running Pay Family locally. 🎆
