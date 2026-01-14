import React, { useState } from 'react';

type DocumentType = 'terms' | 'privacy' | 'security' | 'gdpr' | 'cookies';
type Language = 'en' | 'ru';

interface Document {
  id: DocumentType;
  title: { en: string; ru: string };
  lastUpdated: string;
}

const documents: Document[] = [
  { id: 'terms', title: { en: 'Terms of Service', ru: 'Условия обслуживания' }, lastUpdated: '2026-01-14' },
  { id: 'privacy', title: { en: 'Privacy Policy', ru: 'Политика конфиденциальности' }, lastUpdated: '2026-01-14' },
  { id: 'security', title: { en: 'Security Statement', ru: 'Заявление о безопасности' }, lastUpdated: '2026-01-14' },
  { id: 'gdpr', title: { en: 'GDPR & Data Rights', ru: 'GDPR и права данных' }, lastUpdated: '2026-01-14' },
  { id: 'cookies', title: { en: 'Cookie Policy', ru: 'Политика использования cookies' }, lastUpdated: '2026-01-14' },
];

const content: Record<DocumentType, Record<Language, string>> = {
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
Получая доступ и используя Pay Family, вы принимаете и соглашаетесь соблюдать условия данного соглашения.

## 2. Лицензия использования
Разрешается временно загружать одну копию материалов (информации или программного обеспечения) Pay Family только для личного, некоммерческого просмотра.

## 3. Отказ от ответственности
Материалы на Pay Family предоставляются в состоянии "как есть". Pay Family не дает никаких гарантий, явных или подразумеваемых.

## 4. Ограничение ответственности
Pay Family не несет ответственности за убытки, возникшие из использования материалов, включая потерю данных или прибыли.

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

Email: security@payfamily.com with:
1. Description of vulnerability
2. Steps to reproduce
3. Potential impact

## Bug Bounty Program
- Critical: $1000
- High: $500
- Medium: $250
- Low: $100

## Incident Response
1. Detection (automated alerts)
2. Isolation (affected systems taken offline)
3. Investigation (forensic analysis)
4. Notification (within 72 hours)
5. Remediation (fix and deploy)

## Compliance
- SOC 2 Type II compliant
- GDPR security requirements met
- OWASP Top 10 protections
- CWE Top 25 vulnerabilities addressed

## Updates
Security patches released within 48 hours of discovery.

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

Email: security@payfamily.com с:
1. Описанием уязвимости
2. Шагами воспроизведения
3. Потенциальным воздействием

## Программа поиска ошибок
- Критическая: $1000
- Высокая: $500
- Средняя: $250
- Низкая: $100

## Реагирование на инциденты
1. Обнаружение (автоматические оповещения)
2. Изоляция (затронутые системы отключены)
3. Расследование (судебный анализ)
4. Уведомление (в течение 72 часов)
5. Устранение (исправление и развертывание)

## Соответствие
- SOC 2 Type II compliant
- Требования безопасности GDPR выполнены
- Защита OWASP Top 10
- Уязвимости CWE Top 25 устранены

## Обновления
Патчи безопасности выпускаются в течение 48 часов после обнаружения.

## Контакт
security@payfamily.com`,
  },
  gdpr: {
    en: `# GDPR & Data Rights

## Your 5 Main Rights

### 1. Right to Access
Request a copy of all personal data we hold about you.

**How:**
Email: dsr@payfamily.com
Include: Your account email, date range (optional)
Response time: 30 days

### 2. Right to Rectification
Correct any inaccurate or incomplete data.

**How:**
Log in → Settings → Update your information
Or email: privacy@payfamily.com

### 3. Right to Erasure ("Right to be Forgotten")
Request deletion of your personal data.

**How:**
Email: dsr@payfamily.com with "Deletion Request"
We will delete:
- Account data
- Transaction history
- Personal information
- Within 30 days

**Note:** This is permanent and cannot be undone.

### 4. Right to Restrict Processing
Limit how we use your data (while we investigate).

**How:**
Email: privacy@payfamily.com with specific restriction

### 5. Right to Data Portability
Export your data in machine-readable format (JSON, CSV).

**How:**
Settings → Export Data
Or email: dsr@payfamily.com with "Data Export Request"
Response: Within 7 days

## GDPR Compliance
- Data Protection Officer (DPO): dpo@payfamily.com
- Data Processing Agreement: Available on request
- Legal basis: Contractual necessity + legitimate interest
- Data retention: 30 days after account deletion

## How to Submit Requests
1. Email: dsr@payfamily.com (Data Subject Requests)
2. Subject: Specify which right (Access, Rectification, Erasure, etc.)
3. Include: Your account email + any relevant details
4. SLA: 30 days maximum

## Contact
dsr@payfamily.com - For all GDPR requests`,
    ru: `# GDPR и права данных

## Ваши 5 основных прав

### 1. Право на доступ
Запросите копию всех ваших персональных данных.

**Как:**
Email: dsr@payfamily.com
Включите: Email вашей учетной записи, период (опционально)
Время ответа: 30 дней

### 2. Право на исправление
Исправьте неверные или неполные данные.

**Как:**
Войдите → Параметры → Обновите информацию
Или email: privacy@payfamily.com

### 3. Право на удаление ("Право быть забытым")
Запросите удаление ваших персональных данных.

**Как:**
Email: dsr@payfamily.com с "Запрос на удаление"
Мы удалим:
- Данные учетной записи
- Историю транзакций
- Личную информацию
- В течение 30 дней

**Внимание:** Это необратимо.

### 4. Право на ограничение обработки
Ограничьте использование ваших данных.

**Как:**
Email: privacy@payfamily.com с конкретным ограничением

### 5. Право на портативность данных
Экспортируйте ваши данные в машиночитаемом формате (JSON, CSV).

**Как:**
Параметры → Экспортировать данные
Или email: dsr@payfamily.com с "Запрос на экспорт данных"
Ответ: В течение 7 дней

## Соответствие GDPR
- Специалист по защите данных: dpo@payfamily.com
- Соглашение об обработке данных: Доступно по запросу
- Правовое основание: Договорная необходимость + законный интерес
- Хранение данных: 30 дней после удаления учетной записи

## Как отправить запросы
1. Email: dsr@payfamily.com (Запросы субъектов данных)
2. Тема: Укажите право (Доступ, Исправление, Удаление и т.д.)
3. Включите: Email вашей учетной записи + релевантные детали
4. SLA: Максимум 30 дней

## Контакт
dsr@payfamily.com - Для всех запросов GDPR`,
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
- **Examples:** auth_token, session_id

### Analytics Cookies
- **Purpose:** Understand how you use Pay Family
- **Duration:** 1 year
- **Can disable:** Yes
- **Tool:** Google Analytics

### Preference Cookies
- **Purpose:** Remember your language, theme preference
- **Duration:** 1 year
- **Can disable:** Yes
- **Examples:** language=ru, theme=dark

## Third-Party Cookies
- Stripe (payments)
- Cloudflare (security)
- Google Analytics (if enabled)

## How to Manage Cookies

### In Your Browser
1. Open Settings
2. Find Cookies/Privacy section
3. Block or allow cookies
4. Clear cookies anytime

### In Pay Family
- Settings → Privacy → Cookie Preferences
- Toggle analytics cookies on/off
- Cookie banner on first visit

## Cookie Consent
Your consent is stored in: `payment_cookie_consent` cookie
- You can change consent anytime in Settings
- Essential cookies always enabled
- Analytics/Preferences can be disabled

## Data Shared via Cookies
- Encrypted session tokens (not readable by third parties)
- Anonymized analytics (no financial data)
- No personally identifiable information in cookies

## Duration
- Essential: Session + 24 hours
- Analytics: 1 year
- Preferences: 1 year

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
- **Примеры:** auth_token, session_id

### Аналитические Cookies
- **Назначение:** Понять, как вы используете Pay Family
- **Длительность:** 1 год
- **Можно отключить:** Да
- **Инструмент:** Google Analytics

### Cookies Предпочтений
- **Назначение:** Запомнить ваш язык, тему
- **Длительность:** 1 год
- **Можно отключить:** Да
- **Примеры:** language=ru, theme=dark

## Cookies третьих сторон
- Stripe (платежи)
- Cloudflare (безопасность)
- Google Analytics (если включено)

## Как управлять Cookies

### В вашем браузере
1. Откройте Параметры
2. Найдите раздел Cookies/Приватность
3. Блокируйте или разрешайте cookies
4. Очищайте cookies в любое время

### В Pay Family
- Параметры → Приватность → Предпочтения Cookies
- Переключайте аналитические cookies
- Баннер cookies при первом посещении

## Согласие на Cookies
Ваше согласие хранится в: `payment_cookie_consent` cookie
- Вы можете изменить согласие в Параметрах
- Необходимые cookies всегда включены
- Аналитические/Предпочтения могут быть отключены

## Данные, передаваемые через Cookies
- Зашифрованные токены сессии
- Анонимизированная аналитика
- Нет личной информации в cookies

## Длительность
- Необходимые: Сессия + 24 часа
- Аналитика: 1 год
- Предпочтения: 1 год

## Вопросы?
Email: privacy@payfamily.com`,
  },
};

export const LegalHub: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<DocumentType>('terms');
  const [language, setLanguage] = useState<Language>('en');

  const currentDoc = documents.find((d) => d.id === activeDoc);
  const documentContent = content[activeDoc][language];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          {language === 'en' ? 'Legal & Compliance' : 'Юридические документы'}
        </h1>
        <p style={{ color: '#666', fontSize: '14px' }}>
          {language === 'en' ? 'Last updated: 2026-01-14' : 'Последнее обновление: 14 января 2026'}
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
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '8px 12px',
              fontSize: '13px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: language === 'en' ? '#0066cc' : '#fff',
              color: language === 'en' ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: language === 'en' ? '600' : '400',
            }}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ru')}
            style={{
              padding: '8px 12px',
              fontSize: '13px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: language === 'ru' ? '#0066cc' : '#fff',
              color: language === 'ru' ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: language === 'ru' ? '600' : '400',
            }}
          >
            Русский
          </button>
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
          {language === 'en' ? 'Print' : 'Печать'}
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
        }}
      >
        <div style={{ whiteSpace: 'pre-wrap' }}>{documentContent}</div>
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
          {language === 'en' ? 'Questions?' : 'Вопросы?'}
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' ? 'Privacy: ' : 'Конфиденциальность: '}
          <a href="mailto:privacy@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            privacy@payfamily.com
          </a>
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' ? 'Legal: ' : 'Юридический: '}
          <a href="mailto:legal@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            legal@payfamily.com
          </a>
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' ? 'Security: ' : 'Безопасность: '}
          <a href="mailto:security@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            security@payfamily.com
          </a>
        </p>
        <p style={{ margin: '5px 0' }}>
          {language === 'en' ? 'Data Subject Requests: ' : 'Запросы данных: '}
          <a href="mailto:dsr@payfamily.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
            dsr@payfamily.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default LegalHub;