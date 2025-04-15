/**
 * Statistics DTOs
 *
 * This file defines the Data Transfer Objects for the Statistics module.
 */

// Revenue Statistics DTO
export interface RevenueStatisticsDTO {
  totalRevenue: number;
  monthlyGrowth: number;
  averageOrderValue: number;
  conversionRate: number;
  monthlyRevenue: MonthlyRevenueDTO[];
  courseRevenue: CourseRevenueDTO[];
  trendingKeywords: KeywordTrendDTO[];
}

// Monthly Revenue DTO
export interface MonthlyRevenueDTO {
  month: string;
  revenue: number;
  expenses: number;
}

// Course Revenue DTO
export interface CourseRevenueDTO {
  category: string;
  revenue: number;
  enrollments: number;
}

// Keyword Trend DTO
export interface KeywordTrendDTO {
  term: string;
  count: number;
}

// No default export needed, using named exports
