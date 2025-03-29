
import React from 'react';
import styled from 'styled-components';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar
} from 'recharts';
import { CircularProgress, Box } from '@mui/material';
import CoursesTable from './CoursesTable';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f5f6fa;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  height: ${props => props.height || '400px'};
`;

const StatCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const monthlyData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 },
  { name: 'Jul', value: 349 },
  { name: 'Aug', value: 430 },
  { name: 'Sep', value: 401 },
  { name: 'Oct', value: 300 },
  { name: 'Nov', value: 450 },
];

const performanceData = [
  { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
  { subject: 'Quality', A: 98, B: 130, fullMark: 150 },
  { subject: 'Stability', A: 86, B: 130, fullMark: 150 },
  { subject: 'Security', A: 99, B: 100, fullMark: 150 },
  { subject: 'Performance', A: 85, B: 90, fullMark: 150 },
  { subject: 'Usage', A: 65, B: 85, fullMark: 150 },
];

const activityData = [
  { name: 'Mon', users: 4000, sessions: 2400 },
  { name: 'Tue', users: 3000, sessions: 1398 },
  { name: 'Wed', users: 2000, sessions: 9800 },
  { name: 'Thu', users: 2780, sessions: 3908 },
  { name: 'Fri', users: 1890, sessions: 4800 },
  { name: 'Sat', users: 2390, sessions: 3800 },
  { name: 'Sun', users: 3490, sessions: 4300 },
];

const AdminDashboard = () => {

  return (
    <DashboardContainer>
      <Grid>
        <StatCard>
          <StatValue>25%</StatValue>
          <StatLabel>Growth Rate</StatLabel>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={25} />
          </Box>
        </StatCard>
        <StatCard>
          <StatValue>50k</StatValue>
          <StatLabel>Total Users</StatLabel>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={50} />
          </Box>
        </StatCard>
        <StatCard>
          <StatValue>75%</StatValue>
          <StatLabel>Completion Rate</StatLabel>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={75} />
          </Box>
        </StatCard>
        <StatCard>
          <StatValue>100%</StatValue>
          <StatLabel>Success Rate</StatLabel>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={100} />
          </Box>
        </StatCard>
      </Grid>

      <ChartContainer>
        <h3>Monthly Analysis</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Grid style={{ gridTemplateColumns: '1fr 1fr' }}>
        <ChartContainer height="300px">
          <h3>Performance Analysis</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Performance" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer height="300px">
          <h3>Activity Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#2563eb" />
              <Bar dataKey="sessions" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Grid>
      <CoursesTable></CoursesTable>
    </DashboardContainer>
  );
};

export default AdminDashboard;
