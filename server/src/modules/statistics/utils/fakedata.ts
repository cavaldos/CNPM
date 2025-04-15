/**
 * Fake Data for Statistics
 *
 * This file provides fake data for the Statistics module.
 */

import { RevenueStatisticsDTO, KeywordTrendDTO } from '../dto/statistics.dto';

// Fake revenue statistics data
export const fakeRevenueData: RevenueStatisticsDTO = {
  totalRevenue: 125000000,
  monthlyGrowth: 15.7,
  averageOrderValue: 499000,
  conversionRate: 3.2,
  monthlyRevenue: [
    { month: 'Jan', revenue: 12000000, expenses: 8000000 },
    { month: 'Feb', revenue: 15000000, expenses: 9000000 },
    { month: 'Mar', revenue: 18000000, expenses: 10000000 },
    { month: 'Apr', revenue: 16000000, expenses: 9500000 },
    { month: 'May', revenue: 21000000, expenses: 11000000 },
    { month: 'Jun', revenue: 19000000, expenses: 10500000 },
    { month: 'Jul', revenue: 22000000, expenses: 12000000 },
    { month: 'Aug', revenue: 25000000, expenses: 13000000 },
    { month: 'Sep', revenue: 28000000, expenses: 14000000 },
    { month: 'Oct', revenue: 30000000, expenses: 15000000 },
    { month: 'Nov', revenue: 35000000, expenses: 16000000 },
    { month: 'Dec', revenue: 40000000, expenses: 18000000 },
  ],
  courseRevenue: [
    { category: 'Web Development', revenue: 45000000, enrollments: 1200 },
    { category: 'Data Science', revenue: 38000000, enrollments: 950 },
    { category: 'Mobile Development', revenue: 32000000, enrollments: 820 },
    { category: 'Machine Learning', revenue: 28000000, enrollments: 650 },
    { category: 'DevOps', revenue: 22000000, enrollments: 480 },
    { category: 'Cybersecurity', revenue: 18000000, enrollments: 320 },
  ],
  trendingKeywords: [
    { term: 'JavaScript', count: 1245 },
    { term: 'React', count: 1120 },
    { term: 'Python', count: 980 },
    { term: 'Data Science', count: 870 },
    { term: 'Machine Learning', count: 760 },
    { term: 'Node.js', count: 650 },
    { term: 'Angular', count: 540 },
    { term: 'Vue.js', count: 430 },
    { term: 'AWS', count: 380 },
    { term: 'Docker', count: 350 },
    { term: 'Kubernetes', count: 320 },
    { term: 'TypeScript', count: 310 },
    { term: 'SQL', count: 290 },
    { term: 'MongoDB', count: 270 },
    { term: 'Flutter', count: 250 },
  ]
};

// Fake trending keywords data
export const fakeTrendingKeywords: KeywordTrendDTO[] = [
  { term: 'JavaScript', count: 1245 },
  { term: 'React', count: 1120 },
  { term: 'Python', count: 980 },
  { term: 'Data Science', count: 870 },
  { term: 'Machine Learning', count: 760 },
  { term: 'Node.js', count: 650 },
  { term: 'Angular', count: 540 },
  { term: 'Vue.js', count: 430 },
  { term: 'AWS', count: 380 },
  { term: 'Docker', count: 350 },
  { term: 'Kubernetes', count: 320 },
  { term: 'TypeScript', count: 310 },
  { term: 'SQL', count: 290 },
  { term: 'MongoDB', count: 270 },
  { term: 'Flutter', count: 250 },
];
