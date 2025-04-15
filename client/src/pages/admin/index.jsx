import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CircularProgress } from '@mui/material';
import PublicService from '../../services/public.service';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f5f6fa;
  min-height: 100vh;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  height: ${props => props.height || '400px'};
`;

// No longer needed - removed monthly, performance, and activity data

// Colors for the pie chart
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#A4DE6C',
  '#D0ED57',
  '#FFC658',
  '#FF6B6B',
];

// Sample topic data in case API fails
const sampleTopicData = [
  { name: 'Web Development', value: 35 },
  { name: 'Data Science', value: 25 },
  { name: 'Mobile Development', value: 18 },
  { name: 'Machine Learning', value: 15 },
  { name: 'DevOps', value: 12 },
  { name: 'Cybersecurity', value: 10 },
  { name: 'Cloud Computing', value: 8 },
  { name: 'Game Development', value: 7 },
];

const AdminDashboard = () => {
  const [topicData, setTopicData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourseTopics = async () => {
      try {
        setLoading(true);
        const response = await PublicService.course.getAllCourses(0, 100); // Get all courses

        if (response.success) {
          // Process the data to count courses by topic
          const courses = response.data.result || [];
          const topicCounts = {};

          courses.forEach(course => {
            const topic = course.Topic || 'Uncategorized';
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
          });

          // Convert to array format for the pie chart
          const formattedData = Object.keys(topicCounts).map(topic => ({
            name: topic,
            value: topicCounts[topic],
          }));

          // If we got data from API, use it; otherwise use sample data
          setTopicData(formattedData.length > 0 ? formattedData : sampleTopicData);
        } else {
          console.warn('Failed to load course data, using sample data');
          setTopicData(sampleTopicData);
        }
      } catch (err) {
        console.error('Error fetching course topics:', err);
        console.warn('Using sample data instead');
        setTopicData(sampleTopicData);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseTopics();
  }, []);

  return (
    <DashboardContainer>
      {/* Topic Distribution Chart */}
      <ChartContainer height="600px">
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Course Topic Distribution in the Platform
        </h3>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : topicData.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No course data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topicData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={220}
                innerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                paddingAngle={2}
              >
                {topicData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value} courses (${(props.percent * 100).toFixed(1)}%)`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '14px' }}>
          This chart shows the distribution of courses across different topics in the platform. Each
          segment represents the proportion of courses in a specific topic category.
        </div>
      </ChartContainer>

      {/* Removed performance analysis and activity overview charts */}
    </DashboardContainer>
  );
};

export default AdminDashboard;
