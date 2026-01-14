# 🚀 ЗАПУСК PAY FAMILY: Готовые команды

**Твой репо:** `https://github.com/Serguei75/pay-family`

---

## 📍 ЛОКАЛЬНЫЙ ЗАПУСК

### 1. Клонирование
```bash
git clone https://github.com/Serguei75/pay-family.git
cd pay-family
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Env файл
```bash
cp .env.example .env
# Отредактируй:
# - DATABASE_URL (если нужна postgres)
# - JWTSECRET (любая строка мин 32 символа)
# - CORSORIGIN=http://localhost:5173
```

### 4. БД миграции (если есть)
```bash
npm run dbmigrate
npm run dbseed  # опционально
```

### 5. Backend (терминал 1)
```bash
npm run devbackend
# Или напрямую:
# cd backend && npm run dev
```

**Должно вывести:**
```
MATRYOSHKA FINANCIAL PLATFORM
Server running on http://localhost:3000
```

### 6. Frontend (терминал 2)
```bash
npm run devfrontend
# Или напрямую:
# cd frontend && npm run dev
```

**Должно вывести:**
```
VITE v... ready in ... ms

➜ Local:   http://localhost:5173/
```

### 7. Открыть
```
http://localhost:5173
```

✅ **Legal Hub работает!** Нажми кнопку "Legal" в header → видишь все документы на твоём языке (EN/RU/PL)

---

## ✨ ЧТО УЖЕ ИНТЕГРИРОВАНО

✅ **Legal Hub компонент** — 3 языка, 5 документов  
✅ **LegalFooter** — compliance badges  
✅ **App.tsx обновлён** — 'legal' view добавлен  
✅ **Многоязычность** — EN (USD) | RU (RUB) | PL (PLN)  
✅ **Вся документация** в репо

---

## 📱 APK ДЛЯ ANDROID

### 1. Установить Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 2. Конфиг (`capacitor.config.ts` в корне pay-family)
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.payfamily.app',
  appName: 'Pay Family',
  webDir: 'frontend/dist',
  bundledWebRuntime: false,
};

export default config;
```

### 3. Собрать frontend
```bash
cd frontend
npm run build
cd ..
```

### 4. Инициализировать Android
```bash
npx cap init
npx cap add android
npx cap copy
```

### 5. Открыть Android Studio
```bash
npx cap open android
```

### 6. В Android Studio
- **Build → Build Bundle(s)/APK(s) → Build APK(s)**
- Выбрать **release** или **debug**
- Дождаться компиляции

### 7. На телефон
```bash
# Если USB отладка включена:
adb install app-debug.apk

# Или перетащить APK прямо на эмулятор/телефон
```

---

## ✅ БЫСТРАЯ ПРОВЕРКА

### Backend жив?
```bash
curl http://localhost:3000/health
# Должно вернуть: {"status":"ok"}
```

### Frontend видит backend?
```bash
# В браузере http://localhost:5173
# Открыть DevTools (F12) → Network
# Должны быть запросы к http://localhost:3000/api/*
```

### Legal Hub работает?
```
http://localhost:5173 → нажать кнопку "Legal" в header
```

---

## 🐛 ПРОБЛЕМЫ

### Port 3000 занят
```bash
lsof -i :3000
kill -9 <PID>
```

### Port 5173 занят
```bash
lsof -i :5173
kill -9 <PID>
```

### CORS ошибка
```bash
# В backend env
CORSOUNGIN=http://localhost:5173
# Перезагрузить backend
```

### node_modules сломаны
```bash
rm -rf node_modules package-lock.json
npm install
```

### Vite не видит файлы
```bash
cd frontend
npm run build
cd ..
```

---

## 📊 DEPLOY

### Production build
```bash
npm run buildbackend
npm run buildfrontend
```

### Docker (если надо)
```bash
docker build -t pay-family .
docker run -p 3000:3000 -p 5173:5173 pay-family
```

### Deploy на Vercel/Netlify
```bash
# Frontend
cd frontend
npm run build
# Залить dist/ на Vercel

# Backend
# На Heroku / Railway / Hetzner
```

---

## 🎯 ИТОГО КОМАНД

**Запуск:**
```bash
git clone https://github.com/Serguei75/pay-family.git
cd pay-family
npm install
npm run devbackend &
npm run devfrontend
```

**Тест:**
```bash
http://localhost:5173
```

**APK:**
```bash
npm run buildfrontend
npx cap add android
npx cap copy
npx cap open android
# Build APK в Android Studio
```

**Всё. Дальше сам знаешь.**

---

**Ссылки:**
- [LEGAL_HUB_INTEGRATION.md](./LEGAL_HUB_INTEGRATION.md) — Полная документация Legal Hub
- [LANGUAGES_AND_CURRENCIES.md](./LANGUAGES_AND_CURRENCIES.md) — Языки и валюты
- [App.tsx](./frontend/src/App.tsx) — Интегрированный файл

*Готово? Пиши, если что не работает.*
