import DataConnect from '../../utils/DataConnect';

const CourseRepository = {
  async getCourses() {
    try {
      const query = 'SELECT * FROM [Course]';
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting courses: ${error.message}`);
      }
      throw new Error('Error getting courses');
    }
  },

  async getCourseById(id: number) {
    try {
      const query = `SELECT * FROM [Course] WHERE CourseID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting course by id: ${error.message}`);
      }
      throw new Error('Error getting course by id');
    }
  },

  async createCourse(course: {
    title: string;
    description: string;
    image?: string;
    price: number;
    instructorId: number;
  }) {
    try {
      const query = `
        INSERT INTO [Course] (Title, Description, Image, Price, CreateTime, InstructorID)
        VALUES (
          '${course.title}',
          '${course.description}',
          ${course.image ? `'${course.image}'` : 'NULL'},
          ${course.price},
          GETDATE(),
          ${course.instructorId}
        )`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating course: ${error.message}`);
      }
      throw new Error('Error creating course');
    }
  },

  async updateCourse(
    id: number,
    course: {
      title?: string;
      description?: string;
      image?: string;
      price?: number;
      instructorId?: number;
    },
  ) {
    try {
      let updateFields = [];
      if (course.title) updateFields.push(`Title = '${course.title}'`);
      if (course.description)
        updateFields.push(`Description = '${course.description}'`);
      if (course.image !== undefined)
        updateFields.push(
          `Image = ${course.image ? `'${course.image}'` : 'NULL'}`,
        );
      if (course.price) updateFields.push(`Price = ${course.price}`);
      if (course.instructorId)
        updateFields.push(`InstructorID = ${course.instructorId}`);

      const query = `
        UPDATE [Course] 
        SET ${updateFields.join(', ')}
        WHERE CourseID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating course: ${error.message}`);
      }
      throw new Error('Error updating course');
    }
  },

  async deleteCourse(id: number) {
    try {
      // Start transaction
      await DataConnect.execute('BEGIN TRANSACTION');

      // Delete related records first
      await DataConnect.execute(`DELETE FROM [Lessons] WHERE CourseID = ${id}`);
      await DataConnect.execute(`DELETE FROM [Review] WHERE CourseID = ${id}`);
      await DataConnect.execute(
        `DELETE FROM [InvoiceDetail] WHERE CourseID = ${id}`,
      );
      await DataConnect.execute(`DELETE FROM [Forum] WHERE CourseID = ${id}`);

      // Then delete the course
      await DataConnect.execute(`DELETE FROM [Course] WHERE CourseID = ${id}`);

      // Commit transaction
      await DataConnect.execute('COMMIT');
    } catch (error) {
      // Rollback on error
      await DataConnect.execute('ROLLBACK');
      if (error instanceof Error) {
        throw new Error(`Error deleting course: ${error.message}`);
      }
      throw new Error('Error deleting course');
    }
  },

  async getCoursesByInstructor(instructorId: number) {
    try {
      const query = `SELECT * FROM [Course] WHERE InstructorID = ${instructorId}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error getting courses by instructor: ${error.message}`,
        );
      }
      throw new Error('Error getting courses by instructor');
    }
  },

  async searchCourses(searchTerm: string) {
    try {
      const query = `
        SELECT c.*, u.FullName as InstructorName
        FROM [Course] c
        JOIN [User] u ON c.InstructorID = u.UserID
        WHERE c.Title LIKE '%${searchTerm}%' 
        OR c.Description LIKE '%${searchTerm}%'`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error searching courses: ${error.message}`);
      }
      throw new Error('Error searching courses');
    }
  },

  async getCourseReviews(courseId: number) {
    try {
      const query = `
        SELECT r.*, u.FullName as StudentName
        FROM [Review] r
        JOIN [User] u ON r.StudentID = u.UserID
        WHERE r.CourseID = ${courseId}
        ORDER BY r.CreatedDate DESC`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting course reviews: ${error.message}`);
      }
      throw new Error('Error getting course reviews');
    }
  },
};

export default CourseRepository;
