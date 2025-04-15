/**
 * Statistics Module
 *
 * This module provides statistics and analytics data for the platform
 */

// Import components
import StatisticsService from './domain/statistics.service';
import StatisticsController from './controllers/statistics.co';
import statisticsRoutes from './routes/statistics.route';
import StatisticsRepository from './repositories/Implement/statistics.repo';
import { RevenueStatisticsDTO, KeywordTrendDTO, MonthlyRevenueDTO, CourseRevenueDTO } from './dto/statistics.dto';

// Export all components from the module
export {
    // Service
    StatisticsService,

    // Controller
    StatisticsController,

    // Routes
    statisticsRoutes,

    // Repository
    StatisticsRepository,

    // DTOs
    RevenueStatisticsDTO,
    KeywordTrendDTO,
    MonthlyRevenueDTO,
    CourseRevenueDTO
};
