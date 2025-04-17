import { Request, Response } from 'express';
import searchModel from '../model/completeModel';

// Interface for search data returned by saveSearchToCassandra
interface SearchData {
    search_query: string;
    timestamp: Date;
}

// Interface for MongoDB search document
interface MongoSearchDocument {
    search_query: string;
    timestamp: Date;
    [key: string]: any; // Allow additional fields
}

// Interface for formatted search response
interface FormattedSearch {
    query: string;
    timestamp: Date;
}

// Controller for search endpoint
const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchString } = req.body as { searchString?: string };

        if (!searchString) {
            res.status(400).json({ error: 'Search string is required' });
            return;
        }

        // Save search to Cassandra
        // The sync service will handle synchronization to MongoDB
        const searchData: SearchData = await searchModel.saveSearchToCassandra(searchString);

        // Return success response
        res.status(200).json({
            message: 'Search saved successfully',
            searchData: {
                query: searchData.search_query,
                timestamp: searchData.timestamp
            }
        });
    } catch (error: unknown) {
        console.error('Error in search controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for getting recent searches
const getRecentSearches = async (req: Request, res: Response): Promise<void> => {
    try {
        const limit: number = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

        // Get recent searches from MongoDB
        const recentSearches: MongoSearchDocument[] = await searchModel.getRecentSearches(limit);

        // Format the response
        const formattedSearches: FormattedSearch[] = recentSearches.map(search => ({
            query: search.search_query,
            timestamp: search.timestamp
        }));

        res.status(200).json({
            recentSearches: formattedSearches
        });
    } catch (error: unknown) {
        console.error('Error in getRecentSearches controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export module
export default {
    search,
    getRecentSearches
};