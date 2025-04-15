/**
 * Statistics Controller
 *
 * This file defines the controller layer for the Statistics module, handling HTTP requests.
 */

import { Request, Response } from 'express';
import StatisticsService from '../domain/statistics.service';

class StatisticsController {
  /**
   * Get revenue statistics
   */
  async getRevenueStatistics(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await StatisticsService.getRevenueStatistics();
      
      res.status(200).json({
        success: true,
        message: 'Revenue statistics retrieved successfully',
        data: statistics
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve revenue statistics',
        error: error
      });
    }
  }

  /**
   * Get trending keywords
   */
  async getTrendingKeywords(req: Request, res: Response): Promise<void> {
    try {
      const keywords = await StatisticsService.getTrendingKeywords();
      
      res.status(200).json({
        success: true,
        message: 'Trending keywords retrieved successfully',
        data: keywords
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve trending keywords',
        error: error
      });
    }
  }
}

export default new StatisticsController();
