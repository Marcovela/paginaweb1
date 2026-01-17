
import { Product, Service } from './types';
import { PRODUCTS as INITIAL_PRODUCTS, SERVICES as INITIAL_SERVICES } from './constants';

const DB_NAME = 'ArceDB';
const DB_VERSION = 1;
const STORES = {
  PRODUCTS: 'products',
  SERVICES: 'services'
};

export class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORES.PRODUCTS)) {
          const productStore = db.createObjectStore(STORES.PRODUCTS, { keyPath: 'id' });
          INITIAL_PRODUCTS.forEach(p => productStore.add(p));
        }
        if (!db.objectStoreNames.contains(STORES.SERVICES)) {
          const serviceStore = db.createObjectStore(STORES.SERVICES, { keyPath: 'id' });
          INITIAL_SERVICES.forEach(s => serviceStore.add(s));
        }
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event) => reject(event);
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.getAll<Product>(STORES.PRODUCTS);
  }

  async getAllServices(): Promise<Service[]> {
    return this.getAll<Service>(STORES.SERVICES);
  }

  async saveProducts(products: Product[]): Promise<void> {
    return this.saveAll(STORES.PRODUCTS, products);
  }

  async saveServices(services: Service[]): Promise<void> {
    return this.saveAll(STORES.SERVICES, services);
  }

  private async getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('DB not initialized');
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async saveAll(storeName: string, items: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('DB not initialized');
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      // Clear existing and add new
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        items.forEach(item => store.add(item));
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  }
}

export const db = new Database();
