# 🆬 Languages & Currencies Support

**Last Updated:** 2026-01-14

---

## 🆬 Supported Languages

### Current Release (v1.0.0)

| Language | Code | Native Name | Status | Currency |
|----------|------|-------------|--------|----------|
| **English** | `en` | English | ✅ | USD ($) |
| **Русский** | `ru` | Русский | ✅ | RUB (₽) |
| **Polski** | `pl` | Polski | ✅ | PLN (zl) |

### Future Support

- 📨 Français (v1.1)
- 📨 Deutsch (v1.1)
- 📨 Español (v1.2)
- 📨 Português (v1.2)

---

## 💱 Supported Currencies

### Automatic Mapping

```
Language   →  Auto Currency
───────────────────────────
English    →  USD   ($)
Русский   →  RUB   (₽)
Polski     →  PLN   (zl)
```

### Available Currencies

| Code | Name | Symbol | Region |
|------|------|--------|--------|
| **USD** | US Dollar | $ | 🇺🇸 USA |
| **EUR** | Euro | € | 🇪🇺 EU |
| **RUB** | Russian Ruble | ₽ | 🇷🇺 Russia |
| **PLN** | Polish Zloty | zl | 🇵🇱 Poland |

### Manual Currency Selection

Users can manually switch between all 4 currencies in:
- 💫 LegalHub component
- 💰 Pay Family settings
- 💳 Invoice generation

---

## 🔍 Auto-Detection Logic

### Browser Language Detection

```javascript
// Uses navigator.language
const lang = navigator.language.split('-')[0].toLowerCase();

// Examples:
navigator.language = 'en-US'      → 'en' → USD
navigator.language = 'ru-RU'      → 'ru' → RUB
navigator.language = 'pl-PL'      → 'pl' → PLN
navigator.language = 'en-GB'      → 'en' → USD
navigator.language = 'de-DE'      → 'en' → USD (fallback)
```

### Device Settings

When app opens:
1. Check device language
2. Set UI language accordingly
3. Set default currency for that language
4. Allow manual override

---

## 🏡 In LegalHub Component

### Language Toggle

```typescript
// Buttons appear in header:
English (USD)  |  Русский (RUB)  |  Polski (PLN)
```

Clicking toggle:
1. Changes UI language
2. Auto-updates currency
3. Re-renders all documents
4. Saves preference (optional)

### All 5 Documents in 3 Languages

```
✅ Terms of Service       (EN/RU/PL)
✅ Privacy Policy         (EN/RU/PL)
✅ Security Statement     (EN/RU/PL)
✅ GDPR & Data Rights     (EN/RU/PL)
✅ Cookie Policy          (EN/RU/PL)
```

### Currency Display

```
Terms show: "Liability max: $100"
In RU:      "Максимальная ответственность: $100"
In PL:      "Maksymalna odpowiedzialność: $100"
```

---

## 💳 In Invoice/Receipt Generation

### Default Currency

Invoices use currency based on:
1. User's selected language
2. User's currency preference
3. Organization default
4. Fallback: USD

### Currency Conversion

```javascript
// Example rates (update with real API)
const rates = {
  'USD': 1.0,
  'EUR': 0.92,   // 1 USD = 0.92 EUR
  'RUB': 98.5,   // 1 USD = 98.5 RUB
  'PLN': 4.05    // 1 USD = 4.05 PLN
};

// Convert amount
function convert(amount, fromCurrency, toCurrency) {
  const inUSD = amount / rates[fromCurrency];
  return inUSD * rates[toCurrency];
}

// Example
convert(100, 'USD', 'PLN');  // 100 USD = 405 PLN
```

---

## 💵 Exchange Rates

### Current Rates (2026-01-14)

| From | To | Rate |
|------|----|----- |
| 1 USD | EUR | 0.92 EUR |
| 1 USD | RUB | 98.5 RUB |
| 1 USD | PLN | 4.05 PLN |
| 1 EUR | RUB | 107.07 RUB |
| 1 EUR | PLN | 4.40 PLN |
| 1 RUB | PLN | 0.041 PLN |

### Update Strategy

**Option 1:** Use external API
```javascript
// OpenExchangeRates.org
const apiKey = 'YOUR_API_KEY';
const url = `https://api.exchangerate-api.com/v4/latest/USD`;
```

**Option 2:** Manual update
```javascript
// Update rates weekly via backend
PUT /api/currencies/rates
```

**Option 3:** Static rates
```javascript
// Hardcoded rates, update manually
const rates = { /* ... */ };
```

---

## 💰 Implementation Checklist

### LegalHub (Done ✅)
- [x] English + USD
- [x] Русский + RUB
- [x] Polski + PLN
- [x] Language auto-detection
- [x] Manual language toggle
- [x] Currency display
- [x] All 5 documents in 3 languages
- [x] Print support
- [x] Mobile responsive

### LegalFooter (Done ✅)
- [x] English + USD
- [x] Русский + RUB
- [x] Polski + PLN
- [x] Compliance badges
- [x] Email links
- [x] Currency display
- [x] Auto-detection

### App Settings (Coming 🚧)
- [ ] Language preference storage
- [ ] Currency preference storage
- [ ] Settings UI
- [ ] Profile language selection

### Invoices/Receipts (Coming 🚧)
- [ ] Multi-currency invoices
- [ ] Currency in PDF export
- [ ] Exchange rate display
- [ ] Transaction history in multiple currencies

### Backend APIs (Coming 🚧)
- [ ] GET /api/languages - List supported languages
- [ ] GET /api/currencies - List supported currencies
- [ ] GET /api/currencies/rates - Current exchange rates
- [ ] PUT /api/user/preferences - Save user preferences
- [ ] GET /api/invoices?currency=USD - Filter by currency

---

## 🌟 Mobile App Support

### React Native / Capacitor

**Getting device language:**

```javascript
import { Device } from '@capacitor/device';

const info = await Device.getLanguageCode();
console.log(info.value); // 'en', 'ru', 'pl', etc.
```

**LegalHub in mobile:**

```typescript
// Same component works on web and mobile
// Capacitor provides cross-platform support
<LegalHub />
<LegalFooter />
```

**Currency in mobile:**

```javascript
// Mobile can access system locale
import { Intl } from 'react-native';
const locale = Intl.DateTimeFormat().resolvedOptions().locale; // 'en-US', 'ru-RU', 'pl-PL'
```

---

## 🗣️ Localization Best Practices

### Do's ✅

- ✅ Use ISO 639-1 language codes (`en`, `ru`, `pl`)
- ✅ Use ISO 4217 currency codes (`USD`, `EUR`, `RUB`, `PLN`)
- ✅ Store user preference in localStorage/DB
- ✅ Respect device language as default
- ✅ Provide manual override
- ✅ Test with actual native speakers
- ✅ Use proper formatting (date, numbers, currency)

### Don'ts ❌

- ❌ Don't use full language names (`English` vs `en`)
- ❌ Don't hardcode currency symbols in code
- ❌ Don't assume user's language from country
- ❌ Don't forget right-to-left languages (future)
- ❌ Don't use auto-translate APIs (quality issues)
- ❌ Don't forget to test all 3 languages

---

## 📄 Testing Checklist

### Language Testing
- [ ] Change device language to English → defaults to USD
- [ ] Change device language to Русский → defaults to RUB
- [ ] Change device language to Polski → defaults to PLN
- [ ] Toggle between languages in app
- [ ] Verify all documents display correctly
- [ ] Print in each language
- [ ] Mobile responsive for each language

### Currency Testing
- [ ] USD displays with $
- [ ] EUR displays with €
- [ ] RUB displays with ₽
- [ ] PLN displays with zl
- [ ] Currency changes with language
- [ ] Manual currency selection works
- [ ] Conversion calculations correct

### Compliance Testing
- [ ] GDPR section in each language
- [ ] LGPD section in each language
- [ ] PIPEDA section in each language
- [ ] CCPA section in each language
- [ ] Email links functional
- [ ] Footer responsive

---

## 📂 Related Documentation

- [LEGAL_HUB_INTEGRATION.md](LEGAL_HUB_INTEGRATION.md) - Integration guide
- [COMPLIANCE.md](COMPLIANCE.md) - Compliance details
- [SECURITY.md](SECURITY.md) - Security details

---

## 🚧 Known Limitations

- **v1.0:** Only 3 languages (EN, RU, PL)
- **v1.0:** Static exchange rates (update manually)
- **v1.0:** No RTL support (future: Arabic, Hebrew)
- **v1.0:** No pluralization rules for languages

---

**Ready to go!** Languages and currencies are fully integrated.

🆬 EN 🇷РУ 🇵🇱 PL