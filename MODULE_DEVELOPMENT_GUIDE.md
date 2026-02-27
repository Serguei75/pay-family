# Руководство по разработке модулей Pay Family

## Быстрый старт

### Создание нового модуля

```bash
npm run create-module my-module
```

Это создаст структуру:

```
modules/my-module/
├── module.manifest.json    # Манифест модуля
├── index.ts               # Точка входа
├── README.md              # Документация
├── components/            # React компоненты
├── services/              # Бизнес-логика
├── api/                   # API handlers
├── database/              # Схема БД
├── types/                 # TypeScript типы
├── scripts/               # Lifecycle scripts
├── tests/                 # Тесты
└── assets/                # Статические файлы
```

## Структура модуля

### module.manifest.json

```json
{
  "id": "my-module",
  "name": "My Module",
  "version": "1.0.0",
  "description": "Module description",
  "author": "Your Name",
  "license": "MIT",
  
  "core": {
    "minVersion": "1.0.0",
    "maxVersion": "2.0.0"
  },
  
  "dependencies": {
    "modules": {
      "expense-tracker": "^1.0.0"
    },
    "npm": {
      "axios": "^1.6.0"
    }
  },
  
  "provides": {
    "routes": ["/my-module"],
    "components": ["MyWidget"],
    "services": ["MyService"]
  },
  
  "requires": {
    "permissions": ["data.read", "data.write"],
    "database": true,
    "apis": ["gemini"]
  }
}
```

### index.ts - Точка входа

```typescript
import { Module, ModuleContext } from '@/core/module-registry';
import { MyService } from './services/MyService';
import routes from './api/routes';
import components from './components';

export default class MyModule extends Module {
  private service: MyService;
  
  async onInstall(context: ModuleContext) {
    // Создание таблиц
    await context.db.executeSQL(`
      CREATE TABLE IF NOT EXISTS ${context.schema}.my_table (
        id SERIAL PRIMARY KEY,
        data JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    
    console.log('Module installed');
  }
  
  async onEnable(context: ModuleContext) {
    // Инициализация сервисов
    this.service = new MyService(context);
    
    // Регистрация API routes
    context.api.registerRoutes(routes);
    
    // Регистрация UI компонентов
    context.ui.registerComponents(components);
    
    // Подписка на события
    context.events.on('expense:created', this.handleExpense);
    
    console.log('Module enabled');
  }
  
  async onDisable(context: ModuleContext) {
    // Очистка ресурсов
    context.events.off('expense:created', this.handleExpense);
    await this.service.cleanup();
    
    console.log('Module disabled');
  }
  
  async onUninstall(context: ModuleContext) {
    // Удаление данных (опционально)
    await context.db.executeSQL(`
      DROP SCHEMA IF EXISTS ${context.schema} CASCADE
    `);
    
    console.log('Module uninstalled');
  }
  
  private handleExpense = async (data: any) => {
    await this.service.processExpense(data);
  }
  
  async healthCheck(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy', details: any }> {
    const dbOk = await this.service.checkDatabase();
    
    return {
      status: dbOk ? 'healthy' : 'unhealthy',
      details: { database: dbOk }
    };
  }
}
```

## Работа с базой данных

### Схема модуля

```typescript
// database/schema.ts
export const schema = {
  tableName: 'my_table',
  columns: {
    id: 'SERIAL PRIMARY KEY',
    user_id: 'INTEGER REFERENCES users(id)',
    data: 'JSONB NOT NULL',
    created_at: 'TIMESTAMPTZ DEFAULT NOW()',
    updated_at: 'TIMESTAMPTZ DEFAULT NOW()'
  },
  indexes: [
    'CREATE INDEX idx_my_table_user_id ON my_table(user_id)',
    'CREATE INDEX idx_my_table_data ON my_table USING GIN(data)'
  ]
};
```

### Database Service

```typescript
// services/DatabaseService.ts
import { ModuleContext } from '@/core/module-registry';

export class DatabaseService {
  constructor(private context: ModuleContext) {}
  
  async create(data: any) {
    return this.context.db.query(
      `INSERT INTO ${this.context.schema}.my_table (data) VALUES ($1) RETURNING *`,
      [data]
    );
  }
  
  async findByUserId(userId: number) {
    return this.context.db.query(
      `SELECT * FROM ${this.context.schema}.my_table WHERE user_id = $1`,
      [userId]
    );
  }
  
  async update(id: number, data: any) {
    return this.context.db.query(
      `UPDATE ${this.context.schema}.my_table 
       SET data = $2, updated_at = NOW() 
       WHERE id = $1 RETURNING *`,
      [id, data]
    );
  }
  
  async delete(id: number) {
    return this.context.db.query(
      `DELETE FROM ${this.context.schema}.my_table WHERE id = $1`,
      [id]
    );
  }
}
```

## API Routes

```typescript
// api/routes.ts
import { Router } from 'express';
import { authenticate, authorize } from '@/core/middleware';
import { MyController } from './controllers/MyController';

const router = Router();
const controller = new MyController();

// Все routes автоматически получают префикс /api/modules/my-module
router.get('/items', 
  authenticate,
  authorize('data.read'),
  controller.getItems
);

router.post('/items',
  authenticate,
  authorize('data.write'),
  controller.createItem
);

router.put('/items/:id',
  authenticate,
  authorize('data.write'),
  controller.updateItem
);

router.delete('/items/:id',
  authenticate,
  authorize('data.write'),
  controller.deleteItem
);

export default router;
```

## React компоненты

```typescript
// components/MyWidget.tsx
import React, { useEffect, useState } from 'react';
import { useModuleContext } from '@/core/hooks';
import { Card, Button } from '@/core/ui';

export const MyWidget: React.FC = () => {
  const { api, events } = useModuleContext('my-module');
  const [data, setData] = useState([]);
  
  useEffect(() => {
    loadData();
    
    // Подписка на события
    const unsubscribe = events.on('data:updated', loadData);
    return unsubscribe;
  }, []);
  
  const loadData = async () => {
    try {
      const response = await api.get('/items');
      setData(response.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };
  
  const handleCreate = async () => {
    try {
      await api.post('/items', { name: 'New Item' });
      events.emit('data:updated');
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };
  
  return (
    <Card>
      <h3>My Widget</h3>
      <Button onClick={handleCreate}>Create Item</Button>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </Card>
  );
};
```

## Event System

### Публикация событий

```typescript
// Внутри модуля
context.events.emit('my-module:action-completed', {
  itemId: 123,
  result: 'success'
});
```

### Подписка на события

```typescript
// В другом модуле или в том же
context.events.on('my-module:action-completed', async (data) => {
  console.log('Action completed:', data);
  // Обработка события
});
```

### Глобальные события

```typescript
// Подписка на системные события
context.events.on('user:login', handleUserLogin);
context.events.on('user:logout', handleUserLogout);
context.events.on('expense:created', handleExpenseCreated);
```

## Services

### Регистрация сервиса

```typescript
// services/MyService.ts
export class MyService {
  constructor(private context: ModuleContext) {}
  
  async processData(data: any) {
    // Бизнес-логика
    return processedData;
  }
}

// В index.ts
context.services.register('MyService', new MyService(context));
```

### Использование сервиса из другого модуля

```typescript
const myService = context.services.get<MyService>('MyService');
const result = await myService.processData(data);
```

## Permissions

### Проверка разрешений

```typescript
const canWrite = await context.permissions.check('data.write');

if (!canWrite) {
  throw new PermissionDeniedError('data.write');
}
```

### Запрос разрешений

```typescript
// В манифесте
"requires": {
  "permissions": [
    "data.read",
    "data.write",
    "email.read",
    "notifications.send"
  ]
}
```

## Настройки модуля

```typescript
// components/Settings.tsx
export const Settings: React.FC = () => {
  const { settings } = useModuleContext('my-module');
  
  const [apiKey, setApiKey] = useState(settings.get('apiKey', ''));
  
  const handleSave = async () => {
    await settings.set('apiKey', apiKey);
    alert('Settings saved');
  };
  
  return (
    <div>
      <input 
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="API Key"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
```

## Тестирование

```typescript
// tests/MyModule.test.ts
import { createTestContext } from '@/core/testing';
import MyModule from '../index';

describe('MyModule', () => {
  let module: MyModule;
  let context: ModuleContext;
  
  beforeEach(async () => {
    context = await createTestContext('my-module');
    module = new MyModule();
    await module.onInstall(context);
    await module.onEnable(context);
  });
  
  afterEach(async () => {
    await module.onDisable(context);
    await module.onUninstall(context);
  });
  
  it('should process data correctly', async () => {
    const result = await module.service.processData({ test: true });
    expect(result).toBeDefined();
  });
  
  it('should handle events', async () => {
    const mockHandler = jest.fn();
    context.events.on('my-module:test', mockHandler);
    
    context.events.emit('my-module:test', { data: 'test' });
    
    expect(mockHandler).toHaveBeenCalledWith({ data: 'test' });
  });
});
```

## Миграции

```typescript
// scripts/migrations/001_initial.ts
export async function up(context: ModuleContext) {
  await context.db.executeSQL(`
    CREATE TABLE ${context.schema}.my_table (
      id SERIAL PRIMARY KEY,
      data JSONB
    )
  `);
}

export async function down(context: ModuleContext) {
  await context.db.executeSQL(`
    DROP TABLE IF EXISTS ${context.schema}.my_table
  `);
}
```

## Best Practices

1. **Изоляция** - модуль не должен напрямую обращаться к другим модулям
2. **События** - используйте event bus для коммуникации
3. **Сервисы** - выносите бизнес-логику в отдельные сервисы
4. **Типизация** - используйте TypeScript для всего кода
5. **Тестирование** - покрывайте тестами критичную функциональность
6. **Документация** - документируйте API и компоненты
7. **Безопасность** - всегда проверяйте permissions
8. **Производительность** - оптимизируйте запросы к БД
9. **Ошибки** - обрабатывайте все возможные ошибки
10. **Версионирование** - следуйте semver

## Публикация модуля

```bash
# Сборка
npm run build-module my-module

# Тестирование
npm run test-module my-module

# Публикация
npm run publish-module my-module
```
