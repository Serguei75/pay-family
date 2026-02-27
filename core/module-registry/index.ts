/**
 * Module Registry - Центральная система управления модулями
 */

import { EventEmitter } from 'events';
import { Module, ModuleManifest, ModuleContext, ModuleStatus } from './types';

export class ModuleRegistry extends EventEmitter {
  private modules: Map<string, Module> = new Map();
  private manifests: Map<string, ModuleManifest> = new Map();
  private contexts: Map<string, ModuleContext> = new Map();
  private statuses: Map<string, ModuleStatus> = new Map();

  /**
   * Регистрация модуля
   */
  async register(manifest: ModuleManifest, moduleClass: new () => Module): Promise<void> {
    const { id } = manifest;

    if (this.modules.has(id)) {
      throw new Error(`Module ${id} already registered`);
    }

    // Проверка зависимостей
    await this.checkDependencies(manifest);

    // Создание экземпляра модуля
    const module = new moduleClass();

    // Создание контекста
    const context = await this.createContext(manifest);

    // Сохранение
    this.modules.set(id, module);
    this.manifests.set(id, manifest);
    this.contexts.set(id, context);
    this.statuses.set(id, 'registered');

    console.log(`Module ${id} registered`);
    this.emit('module:registered', { id, manifest });
  }

  /**
   * Установка модуля
   */
  async install(id: string): Promise<void> {
    const module = this.getModule(id);
    const context = this.getContext(id);

    try {
      this.setStatus(id, 'installing');
      await module.onInstall(context);
      this.setStatus(id, 'installed');
      
      console.log(`Module ${id} installed`);
      this.emit('module:installed', { id });
    } catch (error) {
      this.setStatus(id, 'error');
      throw new Error(`Failed to install module ${id}: ${error}`);
    }
  }

  /**
   * Активация модуля
   */
  async enable(id: string): Promise<void> {
    const module = this.getModule(id);
    const context = this.getContext(id);

    try {
      this.setStatus(id, 'enabling');
      await module.onEnable(context);
      this.setStatus(id, 'enabled');
      
      console.log(`Module ${id} enabled`);
      this.emit('module:enabled', { id });
    } catch (error) {
      this.setStatus(id, 'error');
      throw new Error(`Failed to enable module ${id}: ${error}`);
    }
  }

  /**
   * Деактивация модуля
   */
  async disable(id: string): Promise<void> {
    const module = this.getModule(id);
    const context = this.getContext(id);

    try {
      this.setStatus(id, 'disabling');
      await module.onDisable(context);
      this.setStatus(id, 'disabled');
      
      console.log(`Module ${id} disabled`);
      this.emit('module:disabled', { id });
    } catch (error) {
      this.setStatus(id, 'error');
      console.error(`Failed to disable module ${id}:`, error);
    }
  }

  /**
   * Удаление модуля
   */
  async uninstall(id: string): Promise<void> {
    const module = this.getModule(id);
    const context = this.getContext(id);

    try {
      // Сначала деактивируем
      if (this.getStatus(id) === 'enabled') {
        await this.disable(id);
      }

      this.setStatus(id, 'uninstalling');
      await module.onUninstall(context);
      
      // Удаляем из реестра
      this.modules.delete(id);
      this.manifests.delete(id);
      this.contexts.delete(id);
      this.statuses.delete(id);
      
      console.log(`Module ${id} uninstalled`);
      this.emit('module:uninstalled', { id });
    } catch (error) {
      this.setStatus(id, 'error');
      throw new Error(`Failed to uninstall module ${id}: ${error}`);
    }
  }

  /**
   * Reload модуля (Hot-reload)
   */
  async reload(id: string): Promise<void> {
    console.log(`Reloading module ${id}`);
    
    const wasEnabled = this.getStatus(id) === 'enabled';
    
    if (wasEnabled) {
      await this.disable(id);
    }
    
    // TODO: Перезагрузка кода модуля
    
    if (wasEnabled) {
      await this.enable(id);
    }
    
    this.emit('module:reloaded', { id });
  }

  /**
   * Проверка здоровья модуля
   */
  async healthCheck(id: string): Promise<any> {
    const module = this.getModule(id);
    return await module.healthCheck();
  }

  /**
   * Получение списка активных модулей
   */
  getActiveModules(): string[] {
    return Array.from(this.statuses.entries())
      .filter(([_, status]) => status === 'enabled')
      .map(([id]) => id);
  }

  /**
   * Проверка зависимостей
   */
  private async checkDependencies(manifest: ModuleManifest): Promise<void> {
    const { dependencies } = manifest;
    
    if (dependencies?.modules) {
      for (const [moduleId, version] of Object.entries(dependencies.modules)) {
        if (!this.modules.has(moduleId)) {
          throw new Error(`Missing dependency: ${moduleId}`);
        }
        // TODO: Проверка версии
      }
    }
  }

  /**
   * Создание контекста модуля
   */
  private async createContext(manifest: ModuleManifest): Promise<ModuleContext> {
    return {
      moduleId: manifest.id,
      schema: manifest.id.replace(/-/g, '_'),
      manifest,
      db: null as any, // TODO: Database service
      api: null as any, // TODO: API service
      ui: null as any, // TODO: UI service
      events: new EventEmitter(),
      services: new Map(),
      settings: new Map(),
      permissions: null as any, // TODO: Permissions service
    };
  }

  private getModule(id: string): Module {
    const module = this.modules.get(id);
    if (!module) {
      throw new Error(`Module ${id} not found`);
    }
    return module;
  }

  private getContext(id: string): ModuleContext {
    const context = this.contexts.get(id);
    if (!context) {
      throw new Error(`Context for module ${id} not found`);
    }
    return context;
  }

  private getStatus(id: string): ModuleStatus {
    return this.statuses.get(id) || 'unknown';
  }

  private setStatus(id: string, status: ModuleStatus): void {
    this.statuses.set(id, status);
    this.emit('module:status', { id, status });
  }
}

export const moduleRegistry = new ModuleRegistry();
