/**
 * Statistics Routes
 *
 * This file defines the routes for the Statistics module.
 */

import { Router } from 'express';
import StatisticsController from '../controllers/statistics.co';

const router = Router();

// Statistics routes
router.get('/revenue', StatisticsController.getRevenueStatistics);
router.get('/keywords/trending', StatisticsController.getTrendingKeywords);

export default router;
