import { Client } from 'cassandra-driver';
import { Collection, ObjectId } from 'mongodb';
import cassandra from '../../../config/Cassandra';
import mongodb from '../../../config/MongoDB';

// Interface for Cassandra row
interface CassandraSearchRow {
    id: string; // UUID in Cassandra is returned as a string
    search_query: string;
    timestamp: Date;
}

// Interface for MongoDB search document
interface MongoSearchDocument {
    _id?: ObjectId; // MongoDB's default ID
    cassandraId: string;
    searchQuery: string;
    timestamp: Date;
}

// Maximum number of recent searches to keep in MongoDB
const MAX_RECENT_SEARCHES: number = 100;

// Synchronize data from Cassandra to MongoDB
const syncDataToMongoDB = async (): Promise<void> => {
    try {
        console.log('Starting synchronization from Cassandra to MongoDB...');

        // Check if Cassandra client is initialized
        if (!cassandra.client) {
            console.error('Cassandra client is not initialized. Make sure to call initCassandra() before syncing data.');
            return;
        }

        // Get unsynced searches from Cassandra
        const query: string = 'SELECT id, search_query, timestamp FROM search_history WHERE synced_to_mongo = ? ALLOW FILTERING';
        const params: [boolean] = [false];
        const result = await cassandra.client.execute(query, params, { prepare: true });

        if (result.rows.length === 0) {
            console.log('No new searches to synchronize');
            return;
        }

        console.log(`Found ${result.rows.length} searches to synchronize`);

        // Get MongoDB collection
        const recentSearchesCollection: Collection<MongoSearchDocument> = mongodb.getRecentSearchesCollection<MongoSearchDocument>();

        // Insert each search into MongoDB
        for (const row of result.rows) {
            // Convert Row to CassandraSearchRow
            const searchRow: CassandraSearchRow = {
                id: row.get('id') as string,
                search_query: row.get('search_query') as string,
                timestamp: row.get('timestamp') as Date
            };

            await recentSearchesCollection.insertOne({
                cassandraId: searchRow.id.toString(),
                searchQuery: searchRow.search_query,
                timestamp: searchRow.timestamp
            });

            // Update synced status in Cassandra
            const updateQuery: string = 'UPDATE search_history SET synced_to_mongo = ? WHERE id = ?';
            const updateParams: [boolean, string] = [true, row.id];
            await cassandra.client.execute(updateQuery, updateParams, { prepare: true });

            console.log(`Synchronized search "${row.search_query}" to MongoDB`);
        }

        // Maintain only MAX_RECENT_SEARCHES in MongoDB
        const totalCount: number = await recentSearchesCollection.countDocuments({});

        if (totalCount > MAX_RECENT_SEARCHES) {
            // Find the oldest searches that exceed our limit
            const excessCount: number = totalCount - MAX_RECENT_SEARCHES;

            // Get the oldest searches
            const oldestSearches: MongoSearchDocument[] = await recentSearchesCollection
                .find({})
                .sort({ timestamp: 1 }) // Sort by timestamp ascending (oldest first)
                .limit(excessCount)
                .toArray();

            // Extract IDs of oldest searches
            const oldestIds: ObjectId[] = oldestSearches.map(search => search._id!);

            // Delete the oldest searches
            if (oldestIds.length > 0) {
                await recentSearchesCollection.deleteMany({ _id: { $in: oldestIds } });
                console.log(`Removed ${oldestIds.length} oldest searches to maintain limit of ${MAX_RECENT_SEARCHES}`);
            }
        }

        console.log('Synchronization completed successfully');
    } catch (error: unknown) {
        console.error('Error during synchronization:', error);
    }
};

// Interface for sync service control
export interface SyncServiceControl {
    stop: () => void;
}

// Start periodic synchronization
const startSyncService = async (intervalMs: number = 5000): Promise<SyncServiceControl> => {
    console.log(`Starting synchronization service with interval of ${intervalMs}ms`);

    // Ensure Cassandra is initialized before starting sync
    if (!cassandra.client) {
        try {
            console.log('Initializing Cassandra connection before starting sync service...');
            await cassandra.initCassandra();
            console.log('Cassandra initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Cassandra:', error);
            throw new Error('Cannot start sync service: Cassandra initialization failed');
        }
    }

    // Run initial sync
    await syncDataToMongoDB();

    // Set up interval for periodic sync
    const intervalId: NodeJS.Timeout = setInterval(syncDataToMongoDB, intervalMs);

    return {
        stop: (): void => {
            clearInterval(intervalId);
            console.log('Synchronization service stopped');
        }
    };
};

// Export module
export default {
    syncDataToMongoDB,
    startSyncService
};