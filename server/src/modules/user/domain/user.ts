/**
 * User Domain Entity
 * 
 * This file defines the User entity and related value objects in the domain model.
 */

// User roles as a value object
export enum UserRole {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

// User entity
export class User {
  private _id: number;
  private _userName: string;
  private _email: string;
  private _fullName: string;
  private _role: UserRole;
  private _createdTime: Date;
  private _updatedTime?: Date;

  constructor(
    id: number,
    userName: string,
    email: string,
    fullName: string,
    role: UserRole,
    createdTime: Date,
    updatedTime?: Date
  ) {
    this._id = id;
    this._userName = userName;
    this._email = email;
    this._fullName = fullName;
    this._role = role;
    this._createdTime = createdTime;
    this._updatedTime = updatedTime;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get userName(): string {
    return this._userName;
  }

  get email(): string {
    return this._email;
  }

  get fullName(): string {
    return this._fullName;
  }

  get role(): UserRole {
    return this._role;
  }

  get createdTime(): Date {
    return this._createdTime;
  }

  get updatedTime(): Date | undefined {
    return this._updatedTime;
  }

  // Domain methods
  isAdmin(): boolean {
    return this._role === UserRole.ADMIN;
  }

  isInstructor(): boolean {
    return this._role === UserRole.INSTRUCTOR;
  }

  isStudent(): boolean {
    return this._role === UserRole.STUDENT;
  }

  // Factory method to create a User from raw data
  static create(data: any): User {
    return new User(
      data.UserID || data.userID,
      data.UserName || data.userName,
      data.Email || data.email,
      data.FullName || data.fullName,
      data.Role || data.role,
      data.CreatedTime || data.createdTime || new Date(),
      data.UpdatedTime || data.updatedTime
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      userID: this._id,
      userName: this._userName,
      email: this._email,
      fullName: this._fullName,
      role: this._role,
      createdTime: this._createdTime,
      updatedTime: this._updatedTime
    };
  }
}
