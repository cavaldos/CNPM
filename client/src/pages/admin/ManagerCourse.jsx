import { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Input,
  Pagination,
  Card,
  Tag,
  Image,
  Tooltip,
  Typography,
  Switch,
  Spin,
  message,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import PublicService from '../../services/public.service';
import { Modal } from 'antd';

const { Title, Text } = Typography;
const { confirm } = Modal;

const ManagerCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses data
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await PublicService.course.getAllCourses(page - 1, pageSize); // Adjust for 0-indexed backend
      if (response.success) {
        setCourses(response.data.result);
        setTotalPages(response.data.totalPage);
      } else {
        message.error('Failed to load courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      message.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, pageSize]);

  // Search handler
  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchTerm.trim() === '') {
        fetchCourses();
        return;
      }

      const response = await PublicService.course.searchCourse(searchTerm, page - 1, pageSize);
      if (response.success) {
        setCourses(response.data.result || []);
        setTotalPages(response.data.totalPage || 1);
      } else {
        message.error('Search failed');
      }
    } catch (error) {
      console.error('Error searching courses:', error);
      message.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // View course details
  const handleViewCourse = courseId => {
    console.log('View course:', courseId);
    // You can implement navigation to course detail page here
  };

  // Edit course
  const handleEditCourse = courseId => {
    console.log('Edit course:', courseId);
    // You can implement navigation to course edit page here
  };

  // Delete course confirmation
  const showDeleteConfirm = course => {
    confirm({
      title: `Are you sure you want to delete "${course.Title}"?`,
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('Delete confirmed for course:', course.CourseID);
        // Implement actual deletion logic here
        message.success('Course deleted successfully');
      },
    });
  };

  // Toggle course visibility
  const handleToggleVisibility = (course, checked) => {
    console.log(`Set course ${course.CourseID} visibility to:`, checked);
    // Implement actual visibility toggle logic here
    message.success(`Course is now ${checked ? 'visible' : 'hidden'}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'CourseID',
      key: 'CourseID',
      width: 80,
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
      width: 100,
      render: image => (
        <Image
          src={image || 'https://via.placeholder.com/150x100'}
          alt="Course thumbnail"
          style={{ width: 80, height: 60, objectFit: 'cover' }}
          fallback="https://via.placeholder.com/150x100?text=No+Image"
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => (
        <Tooltip placement="topLeft" title={title}>
          <Text strong>{title}</Text>
          <br />
          <Text type="secondary" ellipsis>
            {record.Description?.substring(0, 50)}
            {record.Description?.length > 50 ? '...' : ''}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Instructor',
      dataIndex: 'InstructorName',
      key: 'InstructorName',
      width: 150,
    },
    {
      title: 'Topic',
      dataIndex: 'Topic',
      key: 'Topic',
      width: 150,
      render: topic => <Tag color="blue">{topic}</Tag>,
    },
    {
      title: 'Enrollments',
      dataIndex: 'EnrollmentCount',
      key: 'EnrollmentCount',
      width: 120,
      sorter: (a, b) => a.EnrollmentCount - b.EnrollmentCount,
    },
    {
      title: 'Rating',
      dataIndex: 'AvgRating',
      key: 'AvgRating',
      width: 100,
      render: rating => (rating ? `${rating.toFixed(1)}/5` : 'N/A'),
      sorter: (a, b) => (a.AvgRating || 0) - (b.AvgRating || 0),
    },
    {
      title: 'Visible',
      dataIndex: 'IsHidden',
      key: 'IsHidden',
      width: 100,
      render: (isHidden, record) => (
        <Switch checked={!isHidden} onChange={checked => handleToggleVisibility(record, checked)} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewCourse(record.CourseID)}
          />
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditCourse(record.CourseID)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Course Management</Title>
        <div style={{ display: 'flex', gap: 16 }}>
          <Input
            placeholder="Search courses..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 250 }}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button type="primary">Add New Course</Button>
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="CourseID"
          pagination={false}
          scroll={{ x: 1100 }}
        />
      </Spin>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalPages * pageSize} // Approximate total count
          onChange={p => setPage(p)}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setPage(1);
            setPageSize(size);
          }}
          showQuickJumper
        />
      </div>
    </Card>
  );
};

export default ManagerCourse;
