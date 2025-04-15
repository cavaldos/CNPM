import axiosinstance from './axios.config';

const PublicService = {
  user: {
    createUser: async userData => {
      const response = await axiosinstance.post('/public/user/create', userData);
      return response;
    },

    updateUser: async userData => {
      const response = await axiosinstance.post('/public/user/update', userData);
      return response;
    },

    deleteUser: async userID => {
      const response = await axiosinstance.post('/public/user/delete', { userID });
      return response;
    },

    getAllUsers: async () => {
      const response = await axiosinstance.post('/public/user/get-all');
      return response;
    },

    getUserByID: async userID => {
      const response = await axiosinstance.post('/public/user/get', { userID });
      return response;
    },
  },

  course: {
    autoComplete: async searchTerm => {
      const response = await axiosinstance.post('/public/course/autocomplete', { searchTerm });
      return response;
    },

    searchCourse: async (searchTerm, page, pageSize) => {
      page = page || 0;
      pageSize = pageSize || 10;
      const response = await axiosinstance.post('/public/course/search', {
        searchTerm,
        page,
        pageSize,
      });
      return response;
    },
    getAllCourses: async (page, pageSize) => {
      const response = await axiosinstance.post('/public/course/get-all-course-pagination', {
        page,
        pageSize,
      });
      return response;
    },
    getCourseDetail: async courseID => {
      const response = await axiosinstance.post('/public/course/get-course-detail', { courseID });
      return response;
    },
  },

  forum: {
    createMessage: async message => {
      const response = await axiosinstance.post('/public/forum/create', message);
      return response;
    },

    deleteMessage: async messageID => {
      const response = await axiosinstance.post('/public/forum/delete', { messageID });
      return response;
    },

    getMessagesByCourse: async courseID => {
      const response = await axiosinstance.post('/public/forum/course', { courseID });
      return response;
    },
  },
  ai: {
    chatWithGroq: async message => {
      const response = await axiosinstance.post('/apiv2/ai/groq', { message });
      return response;
      // {
      //     "success": true,
      //         "message": "Chat successful",
      //             "data": {
      //         "result": "Hello again. How's your day goinyou'dsome conversation starters?"
      //     }
      // }
    },
  },
};

export default PublicService;
