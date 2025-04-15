import { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Card, Tag, Typography, Spin, message, Modal, Form, Select } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import PublicService from '../../services/public.service';

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const ManagerUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    // Fetch users data
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await PublicService.user.getAllUsers();
            if (response.data || response.data.success) {
                setUsers(response.data);
            } else {
                message.error('Failed to load users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            message.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Search handler
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            fetchUsers();
            return;
        }

        const filteredUsers = users.filter(user =>
            user.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.FullName?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setUsers(filteredUsers);
    };

    // View user details
    const handleViewUser = (userId) => {
        const user = users.find(u => u.UserID === userId);
        if (user) {
            Modal.info({
                title: 'User Details',
                content: (
                    <div>
                        <p><strong>ID:</strong> {user.UserID}</p>
                        <p><strong>Username:</strong> {user.UserName}</p>
                        <p><strong>Email:</strong> {user.Email}</p>
                        <p><strong>Full Name:</strong> {user.FullName}</p>
                        <p><strong>Role:</strong> {user.Role}</p>
                    </div>
                ),
                width: 500,
            });
        }
    };

    // Edit user
    const handleEditUser = (userId) => {
        const user = users.find(u => u.UserID === userId);
        if (user) {
            setCurrentUser(user);
            editForm.setFieldsValue({
                userName: user.UserName,
                email: user.Email,
                fullName: user.FullName,
                role: user.Role
            });
            setIsEditModalVisible(true);
        }
    };

    // Delete user confirmation
    const showDeleteConfirm = (user) => {
        confirm({
            title: `Are you sure you want to delete user "${user.UserName}"?`,
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteUser(user.UserID);
            },
        });
    };

    // Delete user
    const handleDeleteUser = async (userId) => {
        try {
            setLoading(true);
            const response = await PublicService.user.deleteUser(userId);
            if (response.data && response.data.success) {
                message.success('User deleted successfully');
                fetchUsers();
            } else {
                message.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Failed to delete user');
        } finally {
            setLoading(false);
        }
    };

    // Add new user
    const handleAddUser = () => {
        setIsAddModalVisible(true);
        form.resetFields();
    };

    // Submit new user
    const handleAddSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const response = await PublicService.user.createUser(values);
            if (response.data && response.data.success) {
                message.success('User created successfully');
                setIsAddModalVisible(false);
                form.resetFields();
                fetchUsers();
            } else {
                message.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            message.error('Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    // Submit edit user
    const handleEditSubmit = async () => {
        try {
            const values = await editForm.validateFields();
            setLoading(true);

            const userData = {
                userID: currentUser.UserID,
                ...values
            };

            const response = await PublicService.user.updateUser(userData);
            if (response.data && response.data.success) {
                message.success('User updated successfully');
                setIsEditModalVisible(false);
                fetchUsers();
            } else {
                message.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'UserID',
            key: 'UserID',
            width: 80,
        },
        {
            title: 'Username',
            dataIndex: 'UserName',
            key: 'UserName',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Full Name',
            dataIndex: 'FullName',
            key: 'FullName',
        },
        {
            title: 'Role',
            dataIndex: 'Role',
            key: 'Role',
            render: (role) => (
                <Tag color={role === 'Admin' ? 'red' : role === 'Instructor' ? 'blue' : 'green'}>
                    {role}
                </Tag>
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
                        onClick={() => handleViewUser(record.UserID)}
                    />
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEditUser(record.UserID)}
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
                <Title level={4}>User Management</Title>
                <div style={{ display: 'flex', gap: 16 }}>
                    <Input
                        placeholder="Search users..."
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onPressEnter={handleSearch}
                        style={{ width: 250 }}
                    />
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button type="primary" icon={<UserAddOutlined />} onClick={handleAddUser}>
                        Add New User
                    </Button>
                </div>
            </div>

            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="UserID"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1000 }}
                />
            </Spin>

            {/* Add User Modal */}
            <Modal
                title="Add New User"
                open={isAddModalVisible}
                onOk={handleAddSubmit}
                onCancel={() => setIsAddModalVisible(false)}
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="userName"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select placeholder="Select a role">
                            <Option value="Admin">Admin</Option>
                            <Option value="Instructor">Instructor</Option>
                            <Option value="Student">Student</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                title="Edit User"
                open={isEditModalVisible}
                onOk={handleEditSubmit}
                onCancel={() => setIsEditModalVisible(false)}
                confirmLoading={loading}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        name="userName"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select a role' }]}
                    >
                        <Select placeholder="Select a role">
                            <Option value="Admin">Admin</Option>
                            <Option value="Instructor">Instructor</Option>
                            <Option value="Student">Student</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default ManagerUser;