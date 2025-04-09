/**
 * User Repository
 * 
 * This file defines the repository interface and implementation for the User domain.
 */

import DataConnect from '../../../config/DataConnect';
import { User, UserRole } from '../domain/user';

// Repository interface
export interface IUserRepository {
  create(userName: string, email: string, fullName: string, role: string): Promise<any>;
  update(userID: number, userName: string, email: string, fullName: string, role: string): Promise<any>;
  delete(userID: number): Promise<any>;
  getAll(): Promise<User[]>;
  getById(userID: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}

// Repository implementation
class UserRepository implements IUserRepository {
  async create(userName: string, email: string, fullName: string, role: string): Promise<any> {
    const proc = 'create_user';
    const params = {
      UserName: userName,
      Email: email,
      FullName: fullName,
      Role: role
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async update(userID: number, userName: string, email: string, fullName: string, role: string): Promise<any> {
    const proc = 'update_user';
    const params = {
      UserID: userID,
      UserName: userName,
      Email: email,
      FullName: fullName,
      Role: role
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async delete(userID: number): Promise<any> {
    const proc = 'delete_user';
    const params = {
      UserID: userID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getAll(): Promise<User[]> {
    const query = `
      SELECT u.*, 
             (SELECT COUNT(*) FROM Course c WHERE c.InstructorID = u.UserID) as CoursesCount,
             (SELECT COUNT(*) FROM Invoice i WHERE i.StudentID = u.UserID) as InvoicesCount
      FROM [User] u
      ORDER BY u.CreatedTime DESC
    `;
    const result = await DataConnect.execute(query);
    return result ? result.map((userData: any) => User.create(userData)) : [];
  }

  async getById(userID: number): Promise<User | null> {
    const query = `
      SELECT * FROM [User] WHERE UserID = @UserID
    `;
    const params = { UserID: userID };
    const result = await DataConnect.executeWithParams(query, params);
    return result && result.length > 0 ? User.create(result[0]) : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT * FROM [User] WHERE Email = @Email
    `;
    const params = { Email: email };
    const result = await DataConnect.executeWithParams(query, params);
    return result && result.length > 0 ? User.create(result[0]) : null;
  }
}

// Export a singleton instance
export default new UserRepository();
