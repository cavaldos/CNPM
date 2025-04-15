import { Request, Response, NextFunction } from 'express';
import RedisClient, { DEFAULT_CACHE_TTL } from '../config/RedisClient';

/**
 * Cache middleware for API responses
 * @param ttl Cache time-to-live in seconds
 */
export const cacheMiddleware = (ttl: number = DEFAULT_CACHE_TTL) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Create a cache key based on the route and request body
      const cacheKey = `${req.originalUrl}:${JSON.stringify(req.body)}`;
      
      // Try to get data from cache
      const cachedData = await RedisClient.get(cacheKey);
      
      if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.status(200).json(cachedData);
      }
      
      // If no cache hit, continue to the controller
      console.log(`Cache miss for ${cacheKey}`);
      
      // Store the original res.json method
      const originalJson = res.json;
      
      // Override the res.json method to cache the response
      res.json = function (body) {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          RedisClient.set(cacheKey, body, ttl)
            .catch(err => console.error('Error caching response:', err));
        }
        
        // Call the original json method
        return originalJson.call(this, body);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next(); // Continue to the controller even if caching fails
    }
  };
};
