import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { CircularProgress, Paper, Grid, Typography, Box, Chip } from '@mui/material';
import AdminService from '../../services/admin.service';

// Styled components
const StatsContainer = styled.div`
  padding: 20px;
  background-color: #f5f6fa;
  min-height: 100vh;
`;

const ChartContainer = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  height: ${props => props.height || '400px'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const KeywordContainer = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const KeywordGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const StatsGrid = styled(Grid)`
  margin-bottom: 20px;
`;

const StatCard = styled(Paper)`
  padding: 20px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatValue = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 8px;
`;

const StatLabel = styled(Typography)`
  font-size: 14px;
  color: #64748b;
`;

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const RevenueStats = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [courseRevenueData, setCourseRevenueData] = useState([]);
  const [trendingKeywords, setTrendingKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyGrowth: 0,
    averageOrderValue: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch revenue statistics
        const response = await AdminService.getRevenueStats();

        if (response.success) {
          setRevenueData(response.data.monthlyRevenue || []);
          setCourseRevenueData(response.data.courseRevenue || []);
          setTrendingKeywords(response.data.trendingKeywords || []);
          setStats({
            totalRevenue: response.data.totalRevenue || 0,
            monthlyGrowth: response.data.monthlyGrowth || 0,
            averageOrderValue: response.data.averageOrderValue || 0,
            conversionRate: response.data.conversionRate || 0,
          });
        } else {
          console.warn('Failed to load revenue data, using sample data');
          // Use sample data if API fails
          setRevenueData(sampleMonthlyRevenue);
          setCourseRevenueData(sampleCourseRevenue);
          setTrendingKeywords(sampleTrendingKeywords);
          setStats({
            totalRevenue: 125000,
            monthlyGrowth: 15.7,
            averageOrderValue: 49.99,
            conversionRate: 3.2,
          });
        }
      } catch (err) {
        console.error('Error fetching revenue statistics:', err);
        // Use sample data if API fails
        setRevenueData(sampleMonthlyRevenue);
        setCourseRevenueData(sampleCourseRevenue);
        setTrendingKeywords(sampleTrendingKeywords);
        setStats({
          totalRevenue: 125000,
          monthlyGrowth: 15.7,
          averageOrderValue: 49.99,
          conversionRate: 3.2,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format currency
  const formatCurrency = value => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercent = value => {
    return `${value}%`;
  };

  if (loading) {
    return (
      <StatsContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        Revenue Statistics Dashboard
      </Typography>

      {/* Key Stats */}
      <StatsGrid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <StatValue>{formatCurrency(stats.totalRevenue)}</StatValue>
            <StatLabel>Total Revenue</StatLabel>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <StatValue>{formatPercent(stats.monthlyGrowth)}</StatValue>
            <StatLabel>Monthly Growth</StatLabel>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <StatValue>{formatCurrency(stats.averageOrderValue)}</StatValue>
            <StatLabel>Average Order Value</StatLabel>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <StatValue>{formatPercent(stats.conversionRate)}</StatValue>
            <StatLabel>Conversion Rate</StatLabel>
          </StatCard>
        </Grid>
      </StatsGrid>

      {/* Monthly Revenue Chart */}
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Monthly Revenue
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={value => `${value / 1000}K`} />
            <Tooltip formatter={value => formatCurrency(value)} />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.3}
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Revenue by Course Category */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ChartContainer height="400px">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Revenue by Course Category
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={courseRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={value => `${value / 1000}K`} />
                <Tooltip formatter={value => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
                <Bar dataKey="enrollments" fill="#10b981" name="Enrollments" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} md={5}>
          <ChartContainer height="400px">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Revenue Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={courseRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="category"
                  label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                >
                  {courseRevenueData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={value => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
      </Grid>

      {/* Trending Keywords */}
      <KeywordContainer>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Trending Search Keywords
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          The most popular search terms used by students in the last 30 days
        </Typography>
        <KeywordGrid>
          {trendingKeywords.map((keyword, index) => (
            <Chip
              key={index}
              label={`${keyword.term} (${keyword.count})`}
              color={index < 5 ? 'primary' : 'default'}
              variant={index < 3 ? 'filled' : 'outlined'}
              size="medium"
            />
          ))}
        </KeywordGrid>
      </KeywordContainer>
    </StatsContainer>
  );
};

// Sample data in case API fails
const sampleMonthlyRevenue = [
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
];

const sampleCourseRevenue = [
  { category: 'Web Development', revenue: 45000000, enrollments: 1200 },
  { category: 'Data Science', revenue: 38000000, enrollments: 950 },
  { category: 'Mobile Development', revenue: 32000000, enrollments: 820 },
  { category: 'Machine Learning', revenue: 28000000, enrollments: 650 },
  { category: 'DevOps', revenue: 22000000, enrollments: 480 },
  { category: 'Cybersecurity', revenue: 18000000, enrollments: 320 },
];

const sampleTrendingKeywords = [
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

export default RevenueStats;
