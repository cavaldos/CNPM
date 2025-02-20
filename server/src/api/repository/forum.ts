import DataConnect from "../../utils/DataConnect";

const ForumRepository = {
  async getForumPosts() {
    try {
      const query = `
        SELECT f.*, u.FullName as UserName, c.Title as CourseTitle
        FROM [Forum] f
        JOIN [User] u ON f.UserID = u.UserID
        JOIN [Course] c ON f.CourseID = c.CourseID`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting forum posts: ${error.message}`);
      }
      throw new Error('Error getting forum posts');
    }
  },

  async getForumPostById(id: number) {
    try {
      const query = `
        SELECT f.*, u.FullName as UserName, c.Title as CourseTitle
        FROM [Forum] f
        JOIN [User] u ON f.UserID = u.UserID
        JOIN [Course] c ON f.CourseID = c.CourseID
        WHERE f.ForumID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting forum post by id: ${error.message}`);
      }
      throw new Error('Error getting forum post by id');
    }
  },

  async createForumPost(post: {
    content: string;
    courseId: number;
    userId: number;
  }) {
    try {
      const query = `
        INSERT INTO [Forum] (Content, CreateAt, CourseID, UserID)
        VALUES (
          '${post.content}',
          GETDATE(),
          ${post.courseId},
          ${post.userId}
        )`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating forum post: ${error.message}`);
      }
      throw new Error('Error creating forum post');
    }
  },

  async updateForumPost(id: number, post: {
    content: string;
  }) {
    try {
      const query = `
        UPDATE [Forum] 
        SET Content = '${post.content}'
        WHERE ForumID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating forum post: ${error.message}`);
      }
      throw new Error('Error updating forum post');
    }
  },

  async deleteForumPost(id: number) {
    try {
      const query = `DELETE FROM [Forum] WHERE ForumID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting forum post: ${error.message}`);
      }
      throw new Error('Error deleting forum post');
    }
  },

  async getForumPostsByCourse(courseId: number) {
    try {
      const query = `
        SELECT f.*, u.FullName as UserName
        FROM [Forum] f
        JOIN [User] u ON f.UserID = u.UserID
        WHERE f.CourseID = ${courseId}
        ORDER BY f.CreateAt DESC`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting forum posts by course: ${error.message}`);
      }
      throw new Error('Error getting forum posts by course');
    }
  },

  async getForumPostsByUser(userId: number) {
    try {
      const query = `
        SELECT f.*, c.Title as CourseTitle
        FROM [Forum] f
        JOIN [Course] c ON f.CourseID = c.CourseID
        WHERE f.UserID = ${userId}
        ORDER BY f.CreateAt DESC`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting forum posts by user: ${error.message}`);
      }
      throw new Error('Error getting forum posts by user');
    }
  }
};

export default ForumRepository;