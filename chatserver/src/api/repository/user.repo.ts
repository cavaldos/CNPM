import User, { IUser } from '../../model/user.model';
import mongoose from 'mongoose';

const UserRepo = {
  async createUser(userData: {
    username: string;
    email: string;
    fullName: string;
    age?: number;
    role?: string;
  }): Promise<IUser> {
    const newUser = new User(userData);
    return await newUser.save();
  },

  async getUserById(id: string): Promise<IUser | null> {
    if (!this.isValidObjectId(id)) {
      return null;
    }
    return await User.findById(id);
  },

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  },

  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  },

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    if (!this.isValidObjectId(id)) {
      return null;
    }
    return await User.findByIdAndUpdate(id, userData, { new: true });
  },

  async deleteUser(id: string): Promise<boolean> {
    if (!this.isValidObjectId(id)) {
      return false;
    }
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  },

  isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  },
};

export default UserRepo;
