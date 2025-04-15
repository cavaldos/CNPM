import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
import color from 'ansi-colors';

dotenv.config();

// Redis configuration
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'Redis@123456!';
const REDIS_URL = `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;

// Default cache expiration time in seconds (10 minutes)
export const DEFAULT_CACHE_TTL = 600;

class RedisClient {
  private client: RedisClientType | null = null;
  private isConnected: boolean = false;

  async connect(): Promise<void> {
    try {
      if (!this.client) {
        this.client = createClient({
          url: REDIS_URL,
        });

        // Set up event handlers
        this.client.on('error', (err) => {
          console.error('Redis Client Error:', color.red(String(err)));
          this.isConnected = false;
        });

        this.client.on('connect', () => {
          console.log('  \n  🔄  ➜ Redis Client Connected:', color.green('Success'));
          this.isConnected = true;
        });

        this.client.on('reconnecting', () => {
          console.log('  \n  🔄  ➜ Redis Client Reconnecting...');
          this.isConnected = false;
        });

        this.client.on('end', () => {
          console.log('  \n  🔄  ➜ Redis Client Connection Closed');
          this.isConnected = false;
        });

        // Connect to Redis
        await this.client.connect();
      } else if (!this.isConnected) {
        await this.client.connect();
      }
    } catch (error) {
      console.error('Redis Connection Error:', color.red(String(error)));
      this.isConnected = false;
      this.client = null;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.client || !this.isConnected) {
        await this.connect();
      }

      if (!this.client) {
        return null;
      }

      const data = await this.client.get(key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error getting cache for key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = DEFAULT_CACHE_TTL): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        await this.connect();
      }

      if (!this.client) {
        return false;
      }

      const stringValue = JSON.stringify(value);
      await this.client.set(key, stringValue, { EX: ttl });
      return true;
    } catch (error) {
      console.error(`Error setting cache for key ${key}:`, error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        await this.connect();
      }

      if (!this.client) {
        return false;
      }

      await this.client.del(key);
      return true;
    } catch (error) {
      console.error(`Error deleting cache for key ${key}:`, error);
      return false;
    }
  }

  async flushAll(): Promise<boolean> {
    try {
      if (!this.client || !this.isConnected) {
        await this.connect();
      }

      if (!this.client) {
        return false;
      }

      await this.client.flushAll();
      return true;
    } catch (error) {
      console.error('Error flushing cache:', error);
      return false;
    }
  }
}

// Export a singleton instance
export default new RedisClient();
