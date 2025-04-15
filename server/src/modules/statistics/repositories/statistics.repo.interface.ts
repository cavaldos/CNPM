/**
 * Statistics Repository Interface
 *
 * This file defines the interface for the Statistics repository.
 */

import { RevenueStatisticsDTO, KeywordTrendDTO } from '../dto/statistics.dto';

export interface IStatisticsRepository {
  getRevenueStatistics(): Promise<RevenueStatisticsDTO>;
  getTrendingKeywords(): Promise<KeywordTrendDTO[]>;
}
