import DataConnect from '../../utils/DataConnect';

const UserRepository = {
  async getUsers() {
    try {
      const query = 'SELECT * FROM [User]';
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting users: ${error.message}`);
      }
      throw new Error('Error getting users');
    }
  },

  async getUserById(id: number) {
    try {
      const query = `SELECT * FROM [User] WHERE UserID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting user by id: ${error.message}`);
      }
      throw new Error('Error getting user by id');
    }
  },

  async createUser(user: {
    userName: string;
    email: string;
    fullName: string;
    role: 'Student' | 'Instructor' | 'Admin';
  }) {
    try {
      const query = `
        INSERT INTO [User] (UserName, Email, FullName, Role, CreatedTime, UpdateTime)
        VALUES (
          '${user.userName}',
          '${user.email}',
          '${user.fullName}',
          '${user.role}',
          GETDATE(),
          GETDATE()
        )`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
      throw new Error('Error creating user');
    }
  },

  async updateUser(
    id: number,
    user: {
      userName?: string;
      email?: string;
      fullName?: string;
      role?: 'Student' | 'Instructor' | 'Admin';
    },
  ) {
    try {
      let updateFields = [];
      if (user.userName) updateFields.push(`UserName = '${user.userName}'`);
      if (user.email) updateFields.push(`Email = '${user.email}'`);
      if (user.fullName) updateFields.push(`FullName = '${user.fullName}'`);
      if (user.role) updateFields.push(`Role = '${user.role}'`);
      updateFields.push(`UpdateTime = GETDATE()`);

      const query = `
        UPDATE [User] 
        SET ${updateFields.join(', ')}
        WHERE UserID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating user: ${error.message}`);
      }
      throw new Error('Error updating user');
    }
  },

  async deleteUser(id: number) {
    try {
      const query = `DELETE FROM [User] WHERE UserID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
      throw new Error('Error deleting user');
    }
  },
};

export default UserRepository;
