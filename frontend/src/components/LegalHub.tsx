import React, { useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'pl';
type Currency = 'USD' | 'RUB' | 'PLN' | 'EUR';

interface Document {
  id: 'terms' | 'privacy' | 'security' | 'gdpr' | 'cookies';
  title: { en: string; ru: string; pl: string };
  lastUpdated: string;
}

const documents: Document[] = [
  { id: 'terms', title: { en: 'Terms of Service', ru: 'Условия обслуживания', pl: 'Warunki usługi' }, lastUpdated: '2026-01-14' },
  { id: 'privacy', title: { en: 'Privacy Policy', ru: 'Политика конфиденциальности', pl: 'Polityka prywatności' }, lastUpdated: '2026-01-14' },
  { id: 'security', title: { en: 'Security Statement', ru: 'Заявление о безопасности', pl: 'Oświadczenie o bezpieczeństwie' }, lastUpdated: '2026-01-14' },
  { id: 'gdpr', title: { en: 'GDPR & Data Rights', ru: 'GDPR и права данных', pl: 'RODO i prawa do danych' }, lastUpdated: '2026-01-14' },
  { id: 'cookies', title: { en: 'Cookie Policy', ru: 'Политика использования cookies', pl: 'Polityka plików cookie' }, lastUpdated: '2026-01-14' },
];

const getDeviceLanguage = (): Language => {
  const lang = navigator.language.split('-')[0].toLowerCase();
  if (lang === 'pl') return 'pl';
  if (lang === 'ru') return 'ru';
  return 'en';
};

const getDeviceCurrency = (language: Language): Currency => {
  switch (language) {
    case 'pl':
      return 'PLN'; // Złoty polski
    case 'ru':
      return 'RUB'; // Рубль российский
    case 'en':
    default:
      return 'USD'; // Доллар США
  }
};

const content: Record<'terms' | 'privacy' | 'security' | 'gdpr' | 'cookies', Record<Language, string>> = {
  terms: {
    en: `# Terms of Service

## 1. Acceptance of Terms
By accessing and using Pay Family, you accept and agree to be bound by the terms and provision of this agreement.

## 2. Use License
Permission is granted to temporarily download one copy of the materials (information or software) on Pay Family for personal, non-commercial transitory viewing only.

## 3. Disclaimer
The materials on Pay Family are provided "as is". Pay Family makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

## 4. Limitations
In no event shall Pay Family or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Pay Family.

## 5. Accuracy of Materials
The materials appearing on Pay Family could include technical, typographical, or photographic errors. Pay Family does not warrant that any of the materials on its website are accurate, complete, or current.

## 6. Links
Pay Family has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.

## 7. Modifications
Pay Family may revise these terms of service for its website at any time without notice.

## 8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of European Union and Pay Family irrevocably submits to the exclusive jurisdiction of the courts in that location.

## 9. License
MIT License - Source code is open source and free to use.

## 10. Liability Limitation
Max liability: $100 USD`,
    ru: `# Условия обслуживания

## 1. Принятие условий
Получая доступ и используя Pay Family, вы принимаете и согласиетесь соблюдать условия данного соглашения.

## 2. Лицензия использования
Разрешается временно загружать одну копию материалов (информации или программного обеспечения) Pay Family только для личного, некоммерческого просмотра.

## 3. Отказ от ответственности
Материалы на Pay Family предоставляются в состоянии "как есть". Pay Family не дает никаких гарантий, явных или подразумеваемых.

## 4. Ограничение ответственности
Pay Family не несет ответственность за убытки, возникшие из использования материалов.

## 5. Точность материалов
Материалы на Pay Family могут содержать технические ошибки. Pay Family не гарантирует полноту или актуальность информации.

## 6. Ссылки
Pay Family не отвечает за содержание сайтов, на которые ведут ссылки.

## 7. Изменения
Pay Family может пересматривать эти условия без предварительного уведомления.

## 8. Применимое право
Условия регулируются законами Европейского Союза.

## 9. Лицензия
MIT License - Исходный код открыт и свободен в использовании.

## 10. Ограничение ответственности
Максимальная ответственность: $100 USD`,
    pl: `# Warunki usługi

## 1. Zaakceptowanie warunków
Przez dostęp i korzystanie z Pay Family akceptujesz i zgadzasz się na postanowienia niniejszej umowy.

## 2. Licencja użytkowania
Dozwolone jest tymczasowe pobranie jednej kopii materiałów (informacji lub oprogramowania) Pay Family wyłącznie do osobistego, niekomercyjnego przeglądania.

## 3. Zrzeczenie się odpowiedzialności
Materiały na Pay Family są dostarczane "w stanie, w jakim się znajdują". Pay Family nie udzieli żadnych gwarancji, wyrażonych lub dorozumianych.

## 4. Ograniczenie odpowiedzialności
Pay Family nie ponosi odpowiedzialności za straty wynikające z korzystania z materiałów.

## 5. Dokładność materiałów
Materiały na Pay Family mogą zawierać błędy techniczne. Pay Family nie gwarantuje kompletności ani aktualności informacji.

## 6. Linki
Pay Family nie odpowiada za zawartość stron, na które prowadzą linki.

## 7. Zmiany
Pay Family może zmieniać te warunki bez uprzedzenia.

## 8. Prawo właściwe
Warunki podlegają prawom Unii Europejskiej.

## 9. Licencja
MIT License - Kod źródłowy jest otwarty i wolny do użytku.

## 10. Ograniczenie odpowiedzialności
Maksymalna odpowiedzialność: 100 USD`,
  },
  privacy: {
    en: `# Privacy Policy

## Zero-Knowledge Architecture
We do NOT see your financial data. All encryption happens client-side using AES-256-GCM. Only you hold the decryption keys.

## What We Collect
- Email address
- Login timestamp
- Device information (for security)

## What We DON'T Collect
- Financial transactions (encrypted client-side)
- Banking information
- Payment details
- Personal identification documents

## Data Rights (GDPR)
1. Right to access - Request copy of your data
2. Right to rectification - Correct inaccurate data
3. Right to erasure - Delete your data
4. Right to restrict - Limit how we use data
5. Right to portability - Export your data

## LGPD (Brazil) Compliance
Your data is processed with your explicit consent and can be deleted on request.

## PIPEDA (Canada) Compliance
We collect personal information only for identified purposes and protect it with security measures.

## CCPA (California) Compliance
You have the right to know, delete, and opt-out of data sales.

## Data Processing
- Location: EU data centers (GDPR compliant)
- Retention: As long as account active, then 30 days, then deleted
- Third parties: Only essential services (Stripe for payments)

## Contact
privacy@payfamily.com`,
    ru: `# Политика конфиденциальности

## Архитектура нулевого знания
Мы НЕ видим ваши финансовые данные. Все шифрование происходит на клиенте с использованием AES-256-GCM. Только вы держите ключи расшифровки.

## Что мы собираем
- Email адрес
- Время входа
- Информация об устройстве (для безопасности)

## Что мы НЕ собираем
- Финансовые транзакции (зашифрованы на клиенте)
- Банковскую информацию
- Платежные реквизиты
- Документы удостоверения личности

## Права данных (GDPR)
1. Право на доступ - Запросите копию ваших данных
2. Право на исправление - Исправьте неверные данные
3. Право на удаление - Удалите ваши данные
4. Право на ограничение - Ограничьте использование данных
5. Право на портативность - Экспортируйте ваши данные

## Соответствие LGPD (Бразилия)
Ваши данные обрабатываются с вашего явного согласия и могут быть удалены по запросу.

## Соответствие PIPEDA (Канада)
Мы собираем личную информацию только для определенных целей и защищаем ее мерами безопасности.

## Соответствие CCPA (Калифорния)
Вы имеете право знать, удалить и отказаться от продажи данных.

## Обработка данных
- Местоположение: Центры данных ЕС (соответствие GDPR)
- Хранение: Пока активна учетная запись, затем 30 дней, затем удаление
- Третьи стороны: Только необходимые услуги (Stripe для платежей)

## Контакт
privacy@payfamily.com`,
    pl: `# Polityka prywatności

## Architektura zerowej wiedzy
Nie widzimy twoich danych finansowych. Całe szyfrowanie odbywa się po stronie klienta przy użyciu AES-256-GCM. Tylko ty posiadasz klucze deszyfrujące.

## Co zbieramy
- Adres email
- Czas zalogowania
- Informacje o urządzeniu (dla bezpieczeństwa)

## Czego nie zbieramy
- Transakcji finansowych (zaszyfrowane po stronie klienta)
- Informacji bankowych
- Szczegółów płatności
- Dokumentów tożsamości

## Prawa do danych (RODO)
1. Prawo dostępu - Poproś kopię swoich danych
2. Prawo do sprostowania - Skoryguj nieprawidłowe dane
3. Prawo do usunięcia - Usuń swoje dane
4. Prawo do ograniczenia - Ogranicz używanie danych
5. Prawo do przenoszalności - Eksportuj swoje dane

## Zgodność z LGPD (Brazylia)
Twoje dane są przetwarzane za twoją wyraźną zgodą i mogą być usunięte na żądanie.

## Zgodność z PIPEDA (Kanada)
Zbieramy dane osobowe tylko w określonych celach i chronimy je środkami bezpieczeństwa.

## Zgodność z CCPA (Kalifornia)
Masz prawo wiedzieć, usunąć i zrezygnować ze sprzedaży danych.

## Przetwarzanie danych
- Lokalizacja: Centra danych UE (zgodne z RODO)
- Przechowywanie: Dopóki konto jest aktywne, następnie 30 dni, następnie usunięcie
- Strony trzecie: Tylko niezbędne usługi (Stripe do płatności)

## Kontakt
privacy@payfamily.com`,
  },
  security: {
    en: `# Security Statement

## Encryption
- Client-side: AES-256-GCM
- Transport: TLS 1.3+
- Key derivation: PBKDF2-SHA256

## Authentication
- JWT tokens with expiration
- bcrypt password hashing (salt 10)
- Optional: Multi-factor authentication (MFA)

## Infrastructure
- Server: Vercel (SOC 2 Type II)
- Database: PostgreSQL (encrypted at rest)
- CDN: Cloudflare (DDoS protection)

## Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: strict
- X-XSS-Protection: 1; mode=block

## Vulnerability Reporting
If you find a security vulnerability, DO NOT post it publicly.
Email: security@payfamily.com

## Bug Bounty Program
- Critical: $1000
- High: $500
- Medium: $250
- Low: $100

## Compliance
- SOC 2 Type II compliant
- GDPR security requirements met
- OWASP Top 10 protections

## Contact
security@payfamily.com`,
    ru: `# Заявление о безопасности

## Шифрование
- На клиенте: AES-256-GCM
- При передаче: TLS 1.3+
- Производство ключа: PBKDF2-SHA256

## Аутентификация
- JWT токены с истечением
- Хеширование пароля bcrypt (salt 10)
- Опционально: Двухфакторная аутентификация (MFA)

## Инфраструктура
- Сервер: Vercel (SOC 2 Type II)
- База данных: PostgreSQL (шифрование в покое)
- CDN: Cloudflare (защита от DDoS)

## Заголовки безопасности
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: strict
- X-XSS-Protection: 1; mode=block

## Отчетность об уязвимостях
Если вы обнаружили уязвимость, НЕ публикуйте ее.
Email: security@payfamily.com

## Программа поиска ошибок
- Критическая: $1000
- Высокая: $500
- Средняя: $250
- Низкая: $100

## Соответствие
- SOC 2 Type II compliant
- Требования безопасности GDPR выполнены
- Защиты OWASP Top 10

## Контакт
security@payfamily.com`,
    pl: `# Oświadczenie o bezpieczeństwie

## Szyfrowanie
- Po stronie klienta: AES-256-GCM
- Podczas przesyłania: TLS 1.3+
- Derywacja klucza: PBKDF2-SHA256

## Uwierzytelnianie
- Tokeny JWT z wygaśnięciem
- Hashing hasła bcrypt (salt 10)
- Opcjonalnie: Uwierzytelnianie wieloskładnikowe (MFA)

## Infrastruktura
- Serwer: Vercel (SOC 2 Type II)
- Baza danych: PostgreSQL (szyfrowanie w spoczynku)
- CDN: Cloudflare (ochrona DDoS)

## Nagłówki bezpieczeństwa
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: strict
- X-XSS-Protection: 1; mode=block

## Zgłaszanie luk w bezpieczeństwie
Jeśli odkryjesz lukę w bezpieczeństwie, NIE publikuj jej publicznie.
Email: security@payfamily.com

## Program wyszukiwania błędów
- Krytyczne: $1000
- Wysokie: $500
- Średnie: $250
- Niskie: $100

## Zgodność
- SOC 2 Type II compliant
- Wymogi bezpieczeństwa RODO spełnione
- Ochrona OWASP Top 10

## Kontakt
security@payfamily.com`,
  },
  gdpr: {
    en: `# GDPR & Data Rights

## Your 5 Main Rights

### 1. Right to Access
Request a copy of all personal data we hold about you.

### 2. Right to Rectification
Correct any inaccurate or incomplete data.

### 3. Right to Erasure
Request deletion of your personal data (permanent).

### 4. Right to Restrict Processing
Limit how we use your data.

### 5. Right to Data Portability
Export your data in machine-readable format (JSON, CSV).

## GDPR Compliance
- Data Protection Officer (DPO): dpo@payfamily.com
- Response SLA: 30 days maximum
- Data retention: 30 days after account deletion

## How to Submit Requests
Email: dsr@payfamily.com
Subject: Specify which right (Access, Rectification, Erasure, etc.)
Include: Your account email + relevant details

## Contact
dsr@payfamily.com - For all GDPR requests`,
    ru: `# GDPR и права данных

## Ваши 5 основных прав

### 1. Право на доступ
Запросите копию всех ваших личных данных.

### 2. Право на исправление
Исправьте неверные или неполные данные.

### 3. Право на удаление
Запросите удаление ваших личных данных (постоянное).

### 4. Право на ограничение обработки
Ограничьте использование ваших данных.

### 5. Право на портативность данных
Экспортируйте ваши данные в машиночитаемом формате (JSON, CSV).

## Соответствие GDPR
- Специалист по защите данных (DPO): dpo@payfamily.com
- SLA ответа: максимум 30 дней
- Хранение данных: 30 дней после удаления учетной записи

## Как подать запрос
Email: dsr@payfamily.com
Тема: Укажите, какое право (Доступ, Исправление, Удаление и т.д.)
Включите: Email вашей учетной записи + релевантные детали

## Контакт
dsr@payfamily.com - Для всех запросов GDPR`,
    pl: `# RODO i prawa do danych

## Twoje 5 głównych praw

### 1. Prawo dostępu
Poproś kopię wszystkich swoich danych osobowych.

### 2. Prawo do sprostowania
Skoryguj nieprawidłowe lub niekompletne dane.

### 3. Prawo do usunięcia
Poproś o usunięcie swoich danych osobowych (permanentne).

### 4. Prawo do ograniczenia przetwarzania
Ogranicz sposób korzystania z Twoich danych.

### 5. Prawo do przenoszalności danych
Eksportuj swoje dane w formacie czytelnym dla maszyn (JSON, CSV).

## Zgodność z RODO
- Inspektor Ochrony Danych (IOD): dpo@payfamily.com
- SLA odpowiedzi: maksymalnie 30 dni
- Przechowywanie danych: 30 dni po usunięciu konta

## Jak złożyć wniosek
Email: dsr@payfamily.com
Temat: Określ, które prawo (Dostęp, Sprostowanie, Usunięcie itp.)
Załącz: Email Twojego konta + istotne szczegóły

## Kontakt
dsr@payfamily.com - Dla wszystkich wniosków RODO`,
  },
  cookies: {
    en: `# Cookie Policy

## What Are Cookies?
Cookies are small files stored on your device that help us remember you and improve your experience.

## Types of Cookies We Use

### Essential Cookies
- **Purpose:** Keep you logged in, process payments
- **Duration:** Session or 24 hours
- **Can disable:** No (site won't work)

### Analytics Cookies
- **Purpose:** Understand how you use Pay Family
- **Duration:** 1 year
- **Can disable:** Yes

### Preference Cookies
- **Purpose:** Remember your language, theme preference, currency
- **Duration:** 1 year
- **Can disable:** Yes

## How to Manage Cookies

### In Your Browser
1. Open Settings
2. Find Cookies/Privacy section
3. Block or allow cookies

### In Pay Family
- Settings → Privacy → Cookie Preferences
- Toggle analytics cookies on/off

## Questions?
Email: privacy@payfamily.com`,
    ru: `# Политика использования cookies

## Что такое Cookies?
Cookies - это небольшие файлы, хранящиеся на вашем устройстве, которые помогают нам вас запомнить и улучшить ваш опыт.

## Типы используемых Cookies

### Необходимые Cookies
- **Назначение:** Держать вас в сессии, обработка платежей
- **Длительность:** Сессия или 24 часа
- **Можно отключить:** Нет (сайт не будет работать)

### Аналитические Cookies
- **Назначение:** Понять, как вы используете Pay Family
- **Длительность:** 1 год
- **Можно отключить:** Да

### Cookies Предпочтений
- **Назначение:** Запомнить ваш язык, тему, валюту
- **Длительность:** 1 год
- **Можно отключить:** Да

## Как управлять Cookies

### В вашем браузере
1. Откройте Параметры
2. Найдите раздел Cookies/Приватность
3. Блокируйте или разрешайте cookies

### В Pay Family
- Параметры → Приватность → Предпочтения Cookies
- Переключайте аналитические cookies

## Вопросы?
Email: privacy@payfamily.com`,
    pl: `# Polityka plików cookie

## Czym są pliki cookie?
Pliki cookie to małe pliki przechowywane na Twoim urządzeniu, które pomagają nam Cię zapamiętać i ulepszyć Twoje doświadczenie.

## Rodzaje używanych plików cookie

### Niezbędne pliki cookie
- **Cel:** Trzymanie Cię zalogowanego, przetwarzanie płatności
- **Czas trwania:** Sesja lub 24 godziny
- **Można wyłączyć:** Nie (strona nie będzie działać)

### Pliki cookie analityczne
- **Cel:** Zrozumienie, jak korzystasz z Pay Family
- **Czas trwania:** 1 rok
- **Można wyłączyć:** Tak

### Pliki cookie preferencji
- **Cel:** Zapamiętanie Twojego języka, preferencji motywu, waluty
- **Czas trwania:** 1 rok
- **Można wyłączyć:** Tak

## Jak zarządzać plikami cookie

### W Twojej przeglądarce
1. Otwórz Ustawienia
2. Znajdź sekcję Pliki cookie/Prywatność
3. Blokuj lub zezwól na pliki cookie

### W Pay Family
- Ustawienia → Prywatność → Preferencje plików cookie
- Przełącz pliki cookie analityczne

## Pytania?
Email: privacy@payfamily.com`,
  },
};

export const LegalHub: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'terms' | 'privacy' | 'security' | 'gdpr' | 'cookies'>('terms');
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Auto-detect language and currency on mount
  useEffect(() => {
    const detectedLang = getDeviceLanguage();
    setLanguage(detectedLang);
    setCurrency(getDeviceCurrency(detectedLang));
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrency(getDeviceCurrency(lang));
  };

  const currentDoc = documents.find((d) => d.id === activeDoc);
  const documentContent = content[activeDoc][language];

  const languageLabel: Record<Language, string> = {
    en: 'English (USD)',
    ru: 'Русский (RUB)',
    pl: 'Polski (PLN)',
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          {language === 'en' && 'Legal & Compliance'}
          {language === 'ru' && 'Юридические документы'}
          {language === 'pl' && 'Dokumenty prawne'}
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
          {language === 'en' && 'Last updated: 2026-01-14 | Currency: '}
          {language === 'ru' && 'Последнее обновление: 14 января 2026 | Валюта: '}
          {language === 'pl' && 'Ostatnia aktualizacja: 14 stycznia 2026 | Waluta: '}
          <strong>{currency}</strong>
        </p>
      </div>

      {/* Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* Document tabs */}
        <div style={{ flex: 1, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: activeDoc === doc.id ? '#0066cc' : '#fff',
                color: activeDoc === doc.id ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: activeDoc === doc.id ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              {doc.title[language]}
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <div style={{ display: 'flex', gap: '6px', borderLeft: '1px solid #eee', paddingLeft: '12px' }}>
          {(['en', 'ru', 'pl'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              style={{
                padding: '8px 12px',
                fontSize: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                background: language === lang ? '#0066cc' : '#fff',
                color: language === lang ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: language === lang ? '600' : '400',
                whiteSpace: 'nowrap',
              }}
            >
              {languageLabel[lang]}
            </button>
          ))}
        </div>

        {/* Print button */}
        <button
          onClick={() => window.print()}
          style={{
            padding: '8px 12px',
            fontSize: '13px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            background: '#f5f5f5',
            cursor: 'pointer',
          }}
        >
          {language === 'en' && 'Print'}
          {language === 'ru' && 'Печать'}
          {language === 'pl' && 'Drukuj'}
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '30px',
          lineHeight: '1.6',
          fontSize: '15px',
          color: '#333',
          whiteSpace: 'pre-wrap',
        }}
      >
        {documentContent}
      </div>

      {/* Footer contact info */}
      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#666',
        }}
      >
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
          {language === 'en' && 'Questions?'}
          {language === 'ru' && 'Вопросы?'}
          {language === 'pl' && 'Pytania?'}
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' && 'Privacy: '}
          {language === 'ru' && 'Конфиденциальность: '}
          {language === 'pl' && 'Prywatność: '}
          <a href="mailto:privacy@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            privacy@payfamily.com
          </a>
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' && 'Legal: '}
          {language === 'ru' && 'Юридическая: '}
          {language === 'pl' && 'Prawne: '}
          <a href="mailto:legal@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            legal@payfamily.com
          </a>
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' && 'Security: '}
          {language === 'ru' && 'Безопасность: '}
          {language === 'pl' && 'Bezpieczeństwo: '}
          <a href="mailto:security@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            security@payfamily.com
          </a>
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' && 'Data Subject Requests: '}
          {language === 'ru' && 'Запросы данных: '}
          {language === 'pl' && 'Wnioski o dane: '}
          <a href="mailto:dsr@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            dsr@payfamily.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default LegalHub;