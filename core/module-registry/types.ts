import { EventEmitter } from 'events';

/**
 * Манифест модуля
 */
export interface ModuleManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author?: string;
  license?: string;
  
  core?: {
    minVersion: string;
    maxVersion?: string;
  };
  
  dependencies?: {
    modules?: Record<string, string>;
    npm?: Record<string, string>;
  };
  
  provides?: {
    routes?: string[];
    components?: string[];
    services?: string[];
  };
  
  requires?: {
    permissions?: string[];
    database?: boolean;
    apis?: string[];
  };
  
  hooks?: {
    onInstall?: string;
    onEnable?: string;
    onDisable?: string;
    onUninstall?: string;
    onUpgrade?: string;
  };
  
  settings?: {
    configurable?: boolean;
    ui?: string;
  };
}

/**
 * Контекст модуля - предоставляет доступ к системным сервисам
 */
export interface ModuleContext {
  moduleId: string;
  schema: string;
  manifest: ModuleManifest;
  
  // Сервисы
  db: DatabaseService;
  api: APIService;
  ui: UIService;
  events: EventEmitter;
  services: Map<string, any>;
  settings: Map<string, any>;
  permissions: PermissionsService;
}

/**
 * Базовый класс модуля
 */
export abstract class Module {
  /**
   * Вызывается при установке модуля
   */
  abstract onInstall(context: ModuleContext): Promise<void>;
  
  /**
   * Вызывается при активации модуля
   */
  abstract onEnable(context: ModuleContext): Promise<void>;
  
  /**
   * Вызывается при деактивации модуля
   */
  abstract onDisable(context: ModuleContext): Promise<void>;
  
  /**
   * Вызывается при удалении модуля
   */
  abstract onUninstall(context: ModuleContext): Promise<void>;
  
  /**
   * Проверка здоровья модуля
   */
  abstract healthCheck(): Promise<HealthCheckResult>;
}

/**
 * Результат проверки здоровья
 */
export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  details?: Record<string, any>;
  message?: string;
}

/**
 * Статус модуля
 */
export type ModuleStatus = 
  | 'registered'
  | 'installing'
  | 'installed'
  | 'enabling'
  | 'enabled'
  | 'disabling'
  | 'disabled'
  | 'uninstalling'
  | 'error'
  | 'unknown';

/**
 * Сервис работы с БД
 */
export interface DatabaseService {
  executeSQL(sql: string, params?: any[]): Promise<any>;
  query(sql: string, params?: any[]): Promise<any>;
  createSchema(name: string): Promise<void>;
  dropSchema(name: string): Promise<void>;
  getSchema(name: string): any;
}

/**
 * Сервис работы с API
 */
export interface APIService {
  registerRoutes(routes: any): Promise<void>;
  unregisterRoutes(moduleId: string): Promise<void>;
  register(path: string, handler: any): Promise<void>;
}

/**
 * Сервис работы с UI
 */
export interface UIService {
  registerComponents(components: any): Promise<void>;
  unregisterComponents(moduleId: string): Promise<void>;
}

/**
 * Сервис разрешений
 */
export interface PermissionsService {
  check(permission: string): Promise<boolean>;
  request(permissions: string[]): Promise<boolean>;
  revoke(permission: string): Promise<void>;
}
