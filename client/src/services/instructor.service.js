import axiosinstance from './axios.config';

const InstructorService = {
  // Course management
  createCourse: async (title, topic, description, image, instructorID) => {
    console.log('Creating course with data:', { title, topic, description, image, instructorID });
    const response = await axiosinstance.post('/instructor/course/create', {
      title,
      topic,
      description,
      image,
      instructorID,
    });
    return response;
  },

  updateCourse: async (courseID, title, topic, description, image, instructorID) => {
    courseID = parseInt(courseID, 10);
    instructorID = parseInt(instructorID, 10);
    const courseData = { courseID, title, topic, description, image, instructorID };
    const response = await axiosinstance.post('/instructor/course/update', courseData);
    return response;
  },
  setHiddenCourse: async (courseID, isHidden) => {
    const response = await axiosinstance.post('/instructor/course/set-hidden', {
      courseID,
      isHidden,
    });
    return response;
  },

  deleteCourse: async courseID => {
    const response = await axiosinstance.post('/instructor/course/delete', { courseID });
    return response;
  },

  getCourseByID: async courseID => {
    const response = await axiosinstance.post('/instructor/course/get', { courseID });
    return response;
  },

  getAllCoursesByInstructorID: async instructorID => {
    const response = await axiosinstance.post('/instructor/course/get-all-course-by-instructor', {
      instructorID,
    });
    return response;
  },

  // Lesson management
  createLessonVideo: async (
    title,
    duration,
    complexityLevel,
    lessonType,
    ordinal,
    courseID,
    url
  ) => {
    const response = await axiosinstance.post('/instructor/lesson/video/create', {
      title,
      duration,
      complexityLevel,
      lessonType,
      ordinal,
      courseID,
      url,
    });
    return response;
  },
    getAllStudentByCourseID: async (courseID) => {
        const response = await axiosinstance.post("/instructor/course/get-all-student-by-course", { courseID });
        return response;

    },


    // Lesson management
    createLessonVideo: async (title, duration, complexityLevel, lessonType, ordinal, courseID, url) => {
        const response = await axiosinstance.post("/instructor/lesson/video/create", { title, duration, complexityLevel, lessonType, ordinal, courseID, url });
        return response;
    },

  updateLessonVideo: async (lessonVideoID, url) => {
    const response = await axiosinstance.post('/instructor/lesson/video/update', {
      lessonVideoID,
      url,
    });
    return response;
  },

  createLessonDocument: async (
    title,
    duration,
    complexityLevel,
    lessonType,
    ordinal,
    documentContent,
    courseID
  ) => {
    const response = await axiosinstance.post('/instructor/lesson/document/create', {
      title,
      duration,
      complexityLevel,
      lessonType,
      ordinal,
      documentContent,
      courseID,
    });
    return response;
  },

  updateLessonDocument: async (lessonDocumentID, documentContent) => {
    const response = await axiosinstance.post('/instructor/lesson/document/update', {
      lessonDocumentID,
      documentContent,
    });
    return response;
  },

  deleteLesson: async lessonID => {
    const response = await axiosinstance.post('/instructor/lesson/delete', { lessonID });
    return response;
  },

  getAllLessonsByCourseID: async courseID => {
    const response = await axiosinstance.post('/instructor/lesson/get-all-lesson-course-id', {
      courseID,
    });
    return response;
  },

  getLessonByID: async lessonID => {
    const response = await axiosinstance.post('/instructor/lesson/get-lesson-by-id', { lessonID });
    return response;
  },

  sortLessons: async (lessonID, ordinal) => {
    const response = await axiosinstance.post('/instructor/lesson/sort', { lessonID, ordinal });
    return response;
  },
};

export default InstructorService;
