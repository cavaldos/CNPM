/**
 * Statistics Service
 *
 * This file defines the service layer for the Statistics domain, containing business logic.
 */

// Domain event emitter
import { EventEmitter } from 'events';
import { RevenueStatisticsDTO, KeywordTrendDTO } from '../dto/statistics.dto';
import StatisticsRepository from '../repositories/Implement/statistics.repo';

const eventEmitter = new EventEmitter();

// Service interface
export interface IStatisticsService {
  getRevenueStatistics(): Promise<RevenueStatisticsDTO>;
  getTrendingKeywords(): Promise<KeywordTrendDTO[]>;
}

// Service implementation
class StatisticsService implements IStatisticsService {
  async getRevenueStatistics(): Promise<RevenueStatisticsDTO> {
    try {
      // Get data from repository
      return await StatisticsRepository.getRevenueStatistics();
    } catch (error) {
      console.error('Error in statistics service:', error);
      throw new Error('Failed to retrieve revenue statistics');
    }
  }

  async getTrendingKeywords(): Promise<KeywordTrendDTO[]> {
    try {
      // Get data from repository
      return await StatisticsRepository.getTrendingKeywords();
    } catch (error) {
      console.error('Error in statistics service:', error);
      throw new Error('Failed to retrieve trending keywords');
    }
  }
}

export default new StatisticsService();
