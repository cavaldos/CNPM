import express from 'express';

import searchController from './controller/autoCompleteController';

const router = express.Router();

// Route for search endpoint
router.post('/search', searchController.search);

// Route for getting recent searches
router.get('/recent', searchController.getRecentSearches);

export default router;
