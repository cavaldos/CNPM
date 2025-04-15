/**
 * Course Repository Interface
 *
 * This file defines the repository interface for the Course domain.
 * It defines the contract that any Course repository implementation must follow.
 */

import { Course } from '../../domain/course';

export interface ICourseRepository {

  create(title: string, topic: string, description: string, image: string, instructorID: number): Promise<any>;
  update(courseID: number, title: string, topic: string, description: string, image: string, price: number): Promise<any>;
  delete(courseID: number): Promise<any>;
  getById(courseID: number): Promise<Course | null>;
  getAll(): Promise<Course[]>;
  getAllByInstructorID(instructorID: number): Promise<Course[]>;
  getAllPagination(offSet: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  search(searchTerm: string, page: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  setHidden(courseID: number, isHidden: boolean): Promise<any>;
  totalPages(isHidden: boolean): Promise<number>;
}
