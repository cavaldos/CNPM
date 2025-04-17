# Redis Caching Implementation Guide

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── RedisClient.ts         # Redis client configuration and core methods
│   ├── middleware/
│   │   └── cache.middleware.ts    # Express middleware for automatic response caching
│   ├── utils/
│   │   └── cache.util.ts          # Utility functions for programmatic caching
│   ├── api/
│   │   ├── routes/
│   │   │   └── public.route.ts    # Example of routes using cache middleware
│   │   └── controller/
│   │       └── Course.co.ts       # Example controller with cached endpoints
│   └── app.ts                     # Application setup with Redis connection
└── .env                           # Environment variables for Redis configuration
```

## How Redis Caching Works in This Project

Redis caching in this project follows a simple flow:

1. **Request comes in** -> Check if response is cached -> If yes, return cached response
2. **If not cached** -> Process request normally -> Cache the response -> Return response

This is implemented in two ways:
- **Middleware-based caching**: Automatically caches API responses
- **Programmatic caching**: Manually cache data in controllers or services

## Code Explanation

### 1. Redis Client (`src/config/RedisClient.ts`)

This is the core component that handles the connection to Redis and provides methods for interacting with the cache.

```typescript
import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
import color from 'ansi-colors';

dotenv.config();

// Redis configuration from environment variables
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'Redis@123456!';
const REDIS_URL = `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;

// Default cache expiration time in seconds (10 minutes)
export const DEFAULT_CACHE_TTL = 600;

class RedisClient {
  private client: RedisClientType | null = null;
  private isConnected: boolean = false;

  // Connect to Redis server
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
          console.log('  \n  Redis Client Connected:', color.green('Success'));
          this.isConnected = true;
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

  // Get data from cache
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

  // Set data in cache with TTL
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

  // Delete a key from cache
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

  // Clear all cache
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
```

**Key Points:**
- Creates a singleton Redis client
- Handles connection management and reconnection
- Provides methods for getting, setting, and deleting cache entries
- Automatically serializes/deserializes JSON data
- Includes error handling for all operations

### 2. Cache Middleware (`src/middleware/cache.middleware.ts`)

This middleware automatically caches API responses and serves them on subsequent requests.

```typescript
import { Request, Response, NextFunction } from 'express';
import RedisClient, { DEFAULT_CACHE_TTL } from '../config/RedisClient';

/**
 * Cache middleware for API responses
 * @param ttl Cache time-to-live in seconds
 */
export const cacheMiddleware = (ttl: number = DEFAULT_CACHE_TTL) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
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
```

**Key Points:**
- Creates a cache key based on the request URL and body
- Checks if the response is already cached
- If cached, returns the cached response immediately
- If not cached, overrides the `res.json` method to cache the response before sending it
- Only caches successful responses (status code 200-299)
- Continues to the controller even if caching fails

### 3. Cache Utility (`src/utils/cache.util.ts`)

This utility provides functions for programmatic caching in controllers and services.

```typescript
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
```

**Key Points:**
- Provides a `getOrSet` method that combines getting and setting cache
- Only executes the fallback function if the data is not in cache
- Includes methods for cache invalidation
- Handles errors gracefully and falls back to the original function if caching fails

### 4. Example Usage in Routes (`src/api/routes/public.route.ts`)

This shows how the cache middleware is applied to routes.

```typescript
import { Router } from "express";
import CourseController from "../controller/Course.co";
import UserController from "../controller/User.co";
import ForumController from "../controller/Forum.co";
import { cacheMiddleware } from "../../middleware/cache.middleware";
const PublicRouter = Router();

// User routes
PublicRouter.post("/user/create", UserController.createUser);
PublicRouter.post("/user/update", UserController.updateUser);
PublicRouter.post("/user/delete", UserController.deleteUser);
PublicRouter.post("/user/get-all", UserController.getAllUsers);
PublicRouter.post("/user/get", UserController.getUserByID);

// Course routes with caching
PublicRouter.post("/course/get-all-course-pagination", cacheMiddleware(300), CourseController.getAllCoursesPagination);
PublicRouter.post("/course/autocomplete", cacheMiddleware(300), CourseController.autoComplete);
PublicRouter.post("/course/search", cacheMiddleware(300), CourseController.searchCourse);
PublicRouter.post("/course/get-course-detail", CourseController.getCourseDetail);
PublicRouter.post("/course/get-all", CourseController.getAllCourses);
PublicRouter.get("/course/get-all", CourseController.getAllCourses);

// Forum interaction
PublicRouter.post("/forum/create", ForumController.createMessage);
PublicRouter.post("/forum/delete", ForumController.deleteMessage);
PublicRouter.post("/forum/course", ForumController.getMessagesByCourse);

export default PublicRouter;
```

**Key Points:**
- Cache middleware is applied to specific routes that benefit from caching
- TTL is set to 300 seconds (5 minutes) for these routes
- Not all routes are cached - only those that are read-heavy and don't change frequently

### 5. Application Setup (`src/app.ts`)

This shows how Redis is initialized when the application starts.

```typescript
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routers from "./routes/index.route";
import DataConnect from './config/DataConnect';
import RedisClient from './config/RedisClient';

// Connect to databases
DataConnect.open();
RedisClient.connect();

// Create Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api', routers);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Key Points:**
- Redis connection is established when the application starts
- This ensures Redis is ready to handle cache operations

## Redis Caching Flow

Here's how the caching flow works in practice:

1. **Using Middleware Caching:**
   - Request comes in to `/api/public/course/search`
   - Cache middleware checks if response is cached for this URL + request body
   - If cached, returns cached response immediately
   - If not cached, passes to controller, which processes the request
   - Response is automatically cached before being sent to client
   - Next request with same parameters gets cached response

2. **Using Programmatic Caching:**
   - Controller/service needs to fetch data
   - Calls `CacheUtil.getOrSet` with a key and fallback function
   - If data exists in cache, returns it immediately
   - If not in cache, executes fallback function (e.g., database query)
   - Caches the result and returns it
   - Future calls with same key get cached data until TTL expires

## Docker Setup for Redis

The project includes a Docker Compose configuration for Redis in `docker-compose-database.yml`:

```yaml
services:
  redis:
    image: redis:alpine
    container_name: redis-cache
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-Redis@123456!}
    restart: unless-stopped
    networks:
      - app-network

volumes:
  redis-data:
    driver: local

networks:
  app-network:
    driver: bridge
```

**Key Points:**
- Uses the official Redis Alpine image
- Exposes port 6379
- Persists data using a Docker volume
- Sets a password from environment variable or default
- Enables AOF persistence for data durability

## Best Practices for Redis Caching

1. **Choose Appropriate TTL Values**:
   - Short TTL (seconds to minutes) for frequently changing data
   - Longer TTL (hours) for relatively static data

2. **Cache Invalidation**:
   - Invalidate cache when related data changes
   - Consider what other cached data might be affected

3. **Cache Keys**:
   - Use descriptive, hierarchical keys (e.g., `user:123:profile`)
   - Include relevant identifiers to avoid conflicts

4. **Error Handling**:
   - Always have fallbacks when cache operations fail
   - Don't let cache failures affect core functionality

## Monitoring and Debugging

### Redis CLI Commands

```bash
# Connect to Redis
redis-cli -a Redis@123456!

# List all keys
KEYS *

# Get value of a key
GET "your-key-name"

# Check TTL of a key (in seconds)
TTL "your-key-name"

# Delete a key
DEL "your-key-name"

# Clear all keys (use with caution)
FLUSHALL

```