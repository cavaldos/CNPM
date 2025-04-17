import { MongoClient, MongoClientOptions, Db, Collection, Document } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Define interface for MongoDB connection options
interface MongoConnectionOptions {
    serverSelectionTimeoutMS: number;
    connectTimeoutMS: number;
    socketTimeoutMS: number;
    maxPoolSize: number;
    retryWrites: boolean;
    retryReads: boolean;
}

// MongoDB client, database, and collection variables
let client: MongoClient | null = null;
let db: Db | null = null;
let recentSearchesCollection: Collection<Document> | null = null;

// Initialize MongoDB connection
const initMongoDB = async (): Promise<void> => {
    try {
        // Set connection options with retry
        const options: MongoConnectionOptions = {
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            connectTimeoutMS: 10000, // Timeout for initial connection
            socketTimeoutMS: 45000, // How long a socket can be idle before closing
            maxPoolSize: 10, // Maximum number of connections in the connection pool
            retryWrites: true, // Retry write operations if they fail
            retryReads: true // Retry read operations if they fail
        };

        client = new MongoClient(process.env.MONGODB_URI as string, options as MongoClientOptions);
        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db(process.env.MONGODB_DB_NAME as string);
        recentSearchesCollection = db.collection(process.env.MONGODB_COLLECTION as string);

        // Create an index on timestamp field for efficient sorting
        await recentSearchesCollection.createIndex({ timestamp: -1 });

        console.log('MongoDB initialized');
    } catch (error: unknown) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

// Get the collection
const getRecentSearchesCollection = <T extends Document>(): Collection<T> => {
    if (!recentSearchesCollection) {
        throw new Error('MongoDB not initialized');
    }
    return recentSearchesCollection as unknown as Collection<T>;
};

// Export module
export default {
    initMongoDB,
    getRecentSearchesCollection
};