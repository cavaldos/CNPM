import { createClient } from 'redis';
import dotenv from 'dotenv';

// Đảm bảo biến môi trường được load
dotenv.config();

class RedisConnect {
    private static client: any;

    // Khởi tạo kết nối Redis
    static async connect() {
        try {
            // Tạo client Redis với kết nối đến Redis server từ biến môi trường
            const redisUrl = process.env.REDIS_HOST || 'redis://localhost:6379';

            this.client = createClient({
                url: redisUrl,
            });

            // Xử lý sự kiện lỗi
            this.client.on('error', (err: Error) => {
                console.error('Redis connection error:', err);
            });

            // Xử lý sự kiện kết nối thành công
            this.client.on('connect', () => {
                console.log('Connected to Redis server successfully');
            });

            // Kết nối đến Redis server
            await this.client.connect();

            return this.client;
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    // Lấy instance Redis client
    static getClient() {
        if (!this.client) {
            throw new Error('Redis client not initialized. Call connect() first.');
        }
        return this.client;
    }

    // Đóng kết nối Redis
    static async close() {
        if (this.client) {
            await this.client.quit();
            console.log('Redis connection closed');
        }
    }

    // Các phương thức Helper cho caching

    // Lưu dữ liệu vào cache
    static async set(key: string, value: any, expirationInSeconds?: number) {
        try {
            const client = this.getClient();
            // Chuyển đổi dữ liệu thành chuỗi JSON nếu là object
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

            if (expirationInSeconds) {
                // Lưu với thời gian hết hạn
                await client.set(key, stringValue, { EX: expirationInSeconds });
            } else {
                // Lưu không có thời gian hết hạn
                await client.set(key, stringValue);
            }
            return true;
        } catch (error) {
            console.error(`Error setting cache for key ${key}:`, error);
            return false;
        }
    }

    // Lấy dữ liệu từ cache
    static async get(key: string) {
        try {
            const client = this.getClient();
            const value = await client.get(key);

            if (!value) return null;

            // Thử parse JSON nếu là dữ liệu JSON
            try {
                return JSON.parse(value);
            } catch {
                // Nếu không phải JSON thì trả về nguyên gốc
                return value;
            }
        } catch (error) {
            console.error(`Error getting cache for key ${key}:`, error);
            return null;
        }
    }

    // Xóa dữ liệu từ cache
    static async del(key: string) {
        try {
            const client = this.getClient();
            await client.del(key);
            return true;
        } catch (error) {
            console.error(`Error deleting cache for key ${key}:`, error);
            return false;
        }
    }

    // Xóa tất cả dữ liệu trong cache
    static async flush() {
        try {
            const client = this.getClient();
            await client.flushAll();
            return true;
        } catch (error) {
            console.error('Error flushing cache:', error);
            return false;
        }
    }
}

export default RedisConnect;