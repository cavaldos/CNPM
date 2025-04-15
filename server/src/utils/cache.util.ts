import RedisClient, { DEFAULT_CACHE_TTL } from '../config/RedisClient';

/**
 * Cache utility functions for direct use in controllers
 */
export const CacheUtil = {
  /**
   * Get data from cache or execute the fallback function and cache the result
   * @param key Cache key
   * @param fallback Function to execute if cache miss
   * @param ttl Cache time-to-live in seconds
   */
  async getOrSet<T>(
    key: string,
    fallback: () => Promise<T>,
    ttl: number = DEFAULT_CACHE_TTL
  ): Promise<T> {
    try {
      // Try to get data from cache
      const cachedData = await RedisClient.get<T>(key);
      
      if (cachedData) {
        console.log(`Cache hit for ${key}`);
        return cachedData;
      }
      
      // If no cache hit, execute the fallback function
      console.log(`Cache miss for ${key}`);
      const data = await fallback();
      
      // Cache the result
      await RedisClient.set(key, data, ttl);
      
      return data;
    } catch (error) {
      console.error(`Error in getOrSet for key ${key}:`, error);
      // If caching fails, still return the data from the fallback function
      return await fallback();
    }
  },
  
  /**
   * Invalidate a cache key
   * @param key Cache key to invalidate
   */
  async invalidate(key: string): Promise<boolean> {
    return await RedisClient.del(key);
  },
  
  /**
   * Invalidate all cache keys that match a pattern
   * @param pattern Pattern to match (e.g., '/api/courses/*')
   */
  async invalidatePattern(pattern: string): Promise<boolean> {
    try {
      // For now, just flush all cache since Redis client doesn't support pattern matching
      // In a production environment, you would use SCAN and DEL commands
      return await RedisClient.flushAll();
    } catch (error) {
      console.error(`Error invalidating pattern ${pattern}:`, error);
      return false;
    }
  }
};
