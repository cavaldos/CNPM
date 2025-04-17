import { v4 as uuidv4 } from 'uuid';
import cassandra from '../../../config/Cassandra';
import mongodb from '../../../config/MongoDB';
import { Collection } from 'mongodb';

// Interface for search data stored in Cassandra
interface SearchData {
    id: string;
    search_query: string;
    timestamp: Date;
    synced_to_mongo?: boolean;
}

// Interface for MongoDB search document (flexible to accommodate additional fields)
interface MongoSearchDocument {
    search_query: string;
    timestamp: Date;
    [key: string]: any; // Allow additional fields
}

// Save search query to Cassandra
const saveSearchToCassandra = async (searchQuery: string): Promise<SearchData> => {
    const id: string = uuidv4();
    const timestamp: Date = new Date();

    const query: string = 'INSERT INTO search_history (id, search_query, timestamp, synced_to_mongo) VALUES (?, ?, ?, ?)';
    const params: [string, string, Date, boolean] = [id, searchQuery, timestamp, false];

    try {
        if (!cassandra.client) {
            throw new Error('Cassandra client is not initialized');
        }
        await cassandra.client.execute(query, params, { prepare: true });
        console.log(`Search query "${searchQuery}" saved to Cassandra with ID: ${id}`);
        return { id, search_query: searchQuery, timestamp };
    } catch (error: unknown) {
        console.error('Error saving search to Cassandra:', error);
        throw error;
    }
};

// This function is no longer used as we're using a separate sync service
// Keeping it for reference but it's not called anymore
const syncLatestSearchToMongoDB = async (_searchData: SearchData): Promise<void> => {
    console.log('This function is deprecated. Using sync service instead.');
    // The actual synchronization is now handled by the sync service
};

// Get recent searches from MongoDB
const getRecentSearches = async (limit: number = 10): Promise<MongoSearchDocument[]> => {
    try {
        const recentSearchesCollection: Collection = mongodb.getRecentSearchesCollection();
        const rawSearches = await recentSearchesCollection
            .find({})
            .sort({ timestamp: -1 })
            .limit(limit)
            .toArray();

        // Convert the raw documents to MongoSearchDocument type
        const searches: MongoSearchDocument[] = rawSearches.map(doc => ({
            search_query: doc.search_query,
            timestamp: doc.timestamp,
            ...doc
        }));

        return searches;
    } catch (error: unknown) {
        console.error('Error getting recent searches from MongoDB:', error);
        throw error;
    }
};

// Export module
export default {
    saveSearchToCassandra,
    syncLatestSearchToMongoDB,
    getRecentSearches
};
