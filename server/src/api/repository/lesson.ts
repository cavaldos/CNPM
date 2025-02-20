import DataConnect from "../../utils/DataConnect";

const LessonRepository = {
  async getLessons() {
    try {
      const query = "SELECT * FROM [Lessons]";
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting lessons: ${error.message}`);
      }
      throw new Error('Error getting lessons');
    }
  },

  async getLessonById(id: number) {
    try {
      const query = `SELECT * FROM [Lessons] WHERE LessonsID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting lesson by id: ${error.message}`);
      }
      throw new Error('Error getting lesson by id');
    }
  },

  async createLesson(lesson: {
    title: string;
    content: string;
    duration: number;
    complexityLevel: 'Easy' | 'Medium' | 'Hard';
    lessonType: string;
    ordinal: number;
    courseId: number;
  }) {
    try {
      const query = `
        INSERT INTO [Lessons] (
          Title, Content, Duration, ComplexityLevel, 
          CreatedTime, UpdatedTime, LessonType, Ordinal, CourseID
        )
        VALUES (
          '${lesson.title}',
          '${lesson.content}',
          ${lesson.duration},
          '${lesson.complexityLevel}',
          GETDATE(),
          GETDATE(),
          '${lesson.lessonType}',
          ${lesson.ordinal},
          ${lesson.courseId}
        )`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating lesson: ${error.message}`);
      }
      throw new Error('Error creating lesson');
    }
  },

  async updateLesson(id: number, lesson: {
    title?: string;
    content?: string;
    duration?: number;
    complexityLevel?: 'Easy' | 'Medium' | 'Hard';
    lessonType?: string;
    ordinal?: number;
    courseId?: number;
  }) {
    try {
      let updateFields = [];
      if (lesson.title) updateFields.push(`Title = '${lesson.title}'`);
      if (lesson.content) updateFields.push(`Content = '${lesson.content}'`);
      if (lesson.duration) updateFields.push(`Duration = ${lesson.duration}`);
      if (lesson.complexityLevel) updateFields.push(`ComplexityLevel = '${lesson.complexityLevel}'`);
      if (lesson.lessonType) updateFields.push(`LessonType = '${lesson.lessonType}'`);
      if (lesson.ordinal) updateFields.push(`Ordinal = ${lesson.ordinal}`);
      if (lesson.courseId) updateFields.push(`CourseID = ${lesson.courseId}`);
      updateFields.push(`UpdatedTime = GETDATE()`);

      const query = `
        UPDATE [Lessons] 
        SET ${updateFields.join(', ')}
        WHERE LessonsID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating lesson: ${error.message}`);
      }
      throw new Error('Error updating lesson');
    }
  },

  async deleteLesson(id: number) {
    try {
      const query = `DELETE FROM [Lessons] WHERE LessonsID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting lesson: ${error.message}`);
      }
      throw new Error('Error deleting lesson');
    }
  },

  async getLessonsByCourse(courseId: number) {
    try {
      const query = `
        SELECT * FROM [Lessons] 
        WHERE CourseID = ${courseId} 
        ORDER BY Ordinal`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting lessons by course: ${error.message}`);
      }
      throw new Error('Error getting lessons by course');
    }
  }
};

export default LessonRepository;