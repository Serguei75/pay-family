# Email Parser Module

## Описание

AI-парсинг email для автоматического извлечения финансовых данных из писем, чеков и счетов.

## Функционал

- Подключение к Gmail/Outlook через IMAP
- AI-анализ писем с Gemini API
- Извлечение транзакций (сумма, дата, мерчант, категория)
- Автоматическая категоризация расходов
- История обработанных писем
- Настраиваемые правила парсинга

## Установка

```bash
npm install
```

## Конфигурация

### Настройка Email

1. Перейдите в настройки модуля
2. Введите email и пароль приложения
3. Выберите IMAP сервер (Gmail/Outlook)

### Настройка Gemini API

В настройках приложения укажите `GEMINI_API_KEY`.

## API

### POST /api/v1/parse-email

Ручной парсинг email.

```json
{
  "emailId": "string",
  "content": "string"
}
```

### GET /api/v1/email-history

Получение истории обработанных писем.

## События

### `email-parser:transaction-detected`

Испускается когда обнаружена новая транзакция.

```typescript
{
  amount: number,
  merchant: string,
  category: string,
  date: Date,
  emailId: string
}
```

## Разработка

```bash
npm run dev
npm test
npm run build
```
