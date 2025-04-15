import axiosinstance from './axios.config';

const AdminService = {
  // User management
  getAllUsers: async () => {
    try {
      const response = await axiosinstance.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch users',
      };
    }
  },

  getUserById: async id => {
    try {
      const response = await axiosinstance.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch user',
      };
    }
  },

  // Revenue statistics
  getRevenueStats: async () => {
    try {
      const response = await axiosinstance.get('/apiv2/statistics/revenue');
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue statistics:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch revenue statistics',
      };
    }
  },

  // Trending keywords
  getTrendingKeywords: async () => {
    try {
      const response = await axiosinstance.get('/apiv2/statistics/keywords/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending keywords:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch trending keywords',
      };
    }
  },
};
export default AdminService;
