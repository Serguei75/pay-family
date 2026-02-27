# Pay Family - Модульная Архитектура

## Принципы модульной архитектуры

### 1. Независимость модулей
Каждый модуль является самодостаточным компонентом с:
- Собственной изолированной логикой
- Независимой базой данных (schema/namespace)
- Отдельными API endpoints
- Собственными UI компонентами
- Изолированными зависимостями

### 2. Скелет приложения (Core)
Базовая платформа предоставляет:
- Систему авторизации и аутентификации
- Роутинг и навигацию
- Общие UI компоненты (дизайн-система)
- API Gateway и middleware
- Систему управления модулями (Module Registry)
- Общие утилиты и сервисы

### 3. Подключение модулей
Модули подключаются через:
- Декларативную манифест-систему
- Hot-reload без перезапуска приложения
- Версионирование и обратная совместимость
- Graceful degradation (модуль может отключиться без падения системы)

## Структура проекта

```
pay-family/
├── core/                      # Ядро платформы
│   ├── auth/                  # Авторизация
│   ├── routing/               # Роутинг
│   ├── ui/                    # Базовые UI компоненты
│   ├── api/                   # API Gateway
│   ├── module-registry/       # Реестр модулей
│   └── utils/                 # Общие утилиты
│
├── modules/                   # Независимые модули
│   ├── email-parser/          # AI парсинг email
│   ├── expense-tracker/       # Учёт расходов
│   ├── budget-planner/        # Планирование бюджета
│   ├── family-sharing/        # Семейный доступ
│   ├── analytics/             # Аналитика и отчёты
│   ├── bank-integration/      # Интеграция с банками
│   └── notifications/         # Уведомления
│
├── shared/                    # Общие ресурсы
│   ├── types/                 # TypeScript типы
│   ├── constants/             # Константы
│   └── interfaces/            # Интерфейсы модулей
│
└── infrastructure/            # Инфраструктура
    ├── database/              # База данных
    ├── cache/                 # Кэширование
    └── monitoring/            # Мониторинг
```

## Манифест модуля

Каждый модуль содержит файл `module.manifest.json`:

```json
{
  "id": "email-parser",
  "name": "Email Parser",
  "version": "1.0.0",
  "description": "AI-powered email parsing for financial data",
  
  "dependencies": {
    "core": ">=1.0.0",
    "modules": {
      "expense-tracker": ">=1.0.0"
    }
  },
  
  "provides": {
    "routes": [
      "/modules/email-parser",
      "/api/v1/parse-email"
    ],
    "components": [
      "EmailParserWidget",
      "EmailHistoryTable"
    ],
    "services": [
      "EmailParsingService",
      "AIAnalysisService"
    ]
  },
  
  "requires": {
    "permissions": ["email.read", "expenses.write"],
    "apis": ["gemini", "openai"],
    "database": true
  },
  
  "hooks": {
    "onInstall": "./scripts/install.ts",
    "onEnable": "./scripts/enable.ts",
    "onDisable": "./scripts/disable.ts",
    "onUninstall": "./scripts/uninstall.ts",
    "onUpgrade": "./scripts/upgrade.ts"
  },
  
  "settings": {
    "configurable": true,
    "ui": "./components/Settings.tsx"
  }
}
```

## Жизненный цикл модуля

### 1. Установка
```typescript
// modules/email-parser/scripts/install.ts
export async function install(context: ModuleContext) {
  // Создание таблиц БД
  await context.db.createSchema('email_parser');
  
  // Регистрация API endpoints
  await context.api.register(routes);
  
  // Инициализация настроек
  await context.settings.init(defaultSettings);
}
```

### 2. Активация
```typescript
export async function enable(context: ModuleContext) {
  // Подключение к внешним сервисам
  await context.services.connect('gemini');
  
  // Запуск фоновых задач
  await context.scheduler.start(emailCheckJob);
  
  // Регистрация UI компонентов
  await context.ui.registerComponents(components);
}
```

### 3. Деактивация (graceful shutdown)
```typescript
export async function disable(context: ModuleContext) {
  // Остановка фоновых задач
  await context.scheduler.stop();
  
  // Отключение от сервисов
  await context.services.disconnect();
  
  // Сохранение состояния
  await context.state.save();
}
```

## Коммуникация между модулями

### Event Bus
```typescript
// Модуль email-parser публикует событие
context.events.emit('expense:detected', {
  amount: 150.50,
  category: 'groceries',
  date: new Date(),
  source: 'email'
});

// Модуль expense-tracker подписывается
context.events.on('expense:detected', async (data) => {
  await expenseService.create(data);
});
```

### Shared Services
```typescript
// Модуль предоставляет сервис
context.services.register('EmailParser', emailParserService);

// Другой модуль использует
const parser = context.services.get('EmailParser');
const result = await parser.parse(email);
```

## Изоляция данных

### Database Namespacing
```typescript
// Каждый модуль работает со своей схемой
const db = context.db.getSchema('email_parser');

// Таблицы изолированы
await db.emails.create({ ... });
await db.parsing_history.findMany({ ... });
```

### API Scoping
```typescript
// Автоматический префикс для всех routes модуля
router.get('/emails', handler); // -> /api/modules/email-parser/emails
```

## Hot-reload модулей

```typescript
// Система автоматически отслеживает изменения
moduleRegistry.watch('email-parser', async (changes) => {
  if (changes.code) {
    await moduleRegistry.reload('email-parser');
  }
  if (changes.manifest) {
    await moduleRegistry.reconfigure('email-parser');
  }
});
```

## Обработка ошибок

### Circuit Breaker
```typescript
// Если модуль падает - изолируем его
moduleRegistry.onError('email-parser', async (error) => {
  console.error(`Module email-parser failed:`, error);
  
  // Отключаем модуль
  await moduleRegistry.disable('email-parser');
  
  // Уведомляем пользователя
  await notificationService.send({
    type: 'warning',
    message: 'Email parser temporarily disabled'
  });
  
  // Остальное приложение продолжает работать
});
```

## Система обновлений

### Безопасное обновление
```typescript
// 1. Загрузка новой версии
await moduleRegistry.download('email-parser', '1.1.0');

// 2. Тестирование в изолированной среде
const testResult = await moduleRegistry.test('email-parser@1.1.0');

if (testResult.success) {
  // 3. Backup текущей версии
  await moduleRegistry.backup('email-parser@1.0.0');
  
  // 4. Миграция данных
  await moduleRegistry.migrate('email-parser', '1.0.0', '1.1.0');
  
  // 5. Активация новой версии
  await moduleRegistry.upgrade('email-parser', '1.1.0');
} else {
  // Rollback
  await moduleRegistry.restore('email-parser@1.0.0');
}
```

## Производительность

### Lazy Loading
```typescript
// Модули загружаются по требованию
const loadModule = async (moduleId: string) => {
  if (!moduleRegistry.isLoaded(moduleId)) {
    await moduleRegistry.load(moduleId);
  }
  return moduleRegistry.get(moduleId);
};
```

### Code Splitting
```typescript
// Автоматическое разделение кода модулей
const EmailParser = React.lazy(() => 
  import('./modules/email-parser/components/EmailParser')
);
```

## Безопасность

### Permissions System
```typescript
// Модуль запрашивает разрешения
const hasPermission = await context.permissions.check(
  'expense.write'
);

if (!hasPermission) {
  throw new PermissionDeniedError('expense.write');
}
```

### Sandboxing
```typescript
// Модули выполняются в изолированном контексте
const sandbox = {
  context: moduleContext,
  api: restrictedAPI,
  db: scopedDatabase,
  // Нет доступа к file system, process, etc
};

await vm.runInContext(moduleCode, sandbox);
```

## Мониторинг

### Health Checks
```typescript
// Периодическая проверка здоровья модулей
setInterval(async () => {
  for (const module of moduleRegistry.getActive()) {
    const health = await module.healthCheck();
    
    if (health.status !== 'healthy') {
      await handleUnhealthyModule(module, health);
    }
  }
}, 60000); // каждую минуту
```

### Metrics
```typescript
// Сбор метрик по модулям
context.metrics.track('email_parsed', {
  module: 'email-parser',
  duration: 1250,
  success: true
});
```

## Преимущества архитектуры

1. **Независимая разработка** - команды могут работать над модулями параллельно
2. **Безопасные обновления** - обновление модуля не влияет на другие
3. **Graceful degradation** - падение модуля не роняет приложение
4. **Hot-reload** - изменения применяются без перезапуска
5. **Расширяемость** - легко добавлять новую функциональность
6. **Тестируемость** - модули тестируются изолированно
7. **Производительность** - lazy loading и code splitting
8. **Масштабируемость** - модули могут работать на отдельных серверах
