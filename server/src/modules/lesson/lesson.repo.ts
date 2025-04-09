/**
 * Lesson Repository
 * 
 * This file defines the repository interface and implementation for the Lesson domain.
 */

import DataConnect from '../../config/DataConnect';
import { Lesson, VideoLesson, DocumentLesson, LessonType, ComplexityLevel, createLesson } from './lesson';

// Repository interface
export interface ILessonRepository {
  // Video lesson methods
  createLessonVideo(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    lessonType: string,
    ordinal: number, 
    courseID: number, 
    url: string
  ): Promise<any>;
  
  updateLessonVideo(lessonVideoID: number, url: string): Promise<any>;
  
  // Document lesson methods
  createLessonDocument(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    lessonType: string,
    ordinal: number, 
    documentContent: string, 
    courseID: number
  ): Promise<any>;
  
  updateLessonDocument(lessonDocumentID: number, documentContent: string): Promise<any>;
  
  // General lesson methods
  updateLesson(
    lessonID: number, 
    title: string, 
    duration: number, 
    complexityLevel: string,
    lessonType: string, 
    ordinal: number, 
    courseID: number
  ): Promise<any>;
  
  deleteLesson(lessonID: number): Promise<any>;
  getAllLessons(courseID: number): Promise<Lesson[]>;
  getLessonByID(lessonID: number): Promise<Lesson | null>;
  sortLessons(lessonID: number, ordinal: number): Promise<any>;
}

// Repository implementation
class LessonRepository implements ILessonRepository {
  // Video lesson methods
  async createLessonVideo(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    lessonType: string,
    ordinal: number, 
    courseID: number, 
    url: string
  ): Promise<any> {
    const proc = 'create_lesson_video';
    const params = {
      Title: title,
      Duration: duration,
      ComplexityLevel: complexityLevel,
      LessonType: lessonType,
      Ordinal: ordinal,
      CourseID: courseID,
      URL: url
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async updateLessonVideo(lessonVideoID: number, url: string): Promise<any> {
    const proc = 'update_lesson_video';
    const params = {
      LessonVideoID: lessonVideoID,
      URL: url
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  // Document lesson methods
  async createLessonDocument(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    lessonType: string,
    ordinal: number, 
    documentContent: string, 
    courseID: number
  ): Promise<any> {
    const proc = 'create_lesson_document';
    const params = {
      Title: title,
      Duration: duration,
      ComplexityLevel: complexityLevel,
      LessonType: lessonType,
      Ordinal: ordinal,
      DocumentContent: documentContent,
      CourseID: courseID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async updateLessonDocument(lessonDocumentID: number, documentContent: string): Promise<any> {
    const proc = 'update_lesson_document';
    const params = {
      LessonDocumentID: lessonDocumentID,
      DocumentContent: documentContent
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  // General lesson methods
  async updateLesson(
    lessonID: number, 
    title: string, 
    duration: number, 
    complexityLevel: string,
    lessonType: string, 
    ordinal: number, 
    courseID: number
  ): Promise<any> {
    const proc = 'update_lesson';
    const params = {
      LessonID: lessonID,
      Title: title,
      Duration: duration,
      ComplexityLevel: complexityLevel,
      LessonType: lessonType,
      Ordinal: ordinal,
      CourseID: courseID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async deleteLesson(lessonID: number): Promise<any> {
    const proc = 'delete_lesson';
    const params = {
      LessonID: lessonID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getAllLessons(courseID: number): Promise<Lesson[]> {
    const query = `
      SELECT 
        L.LessonID,
        L.Title,
        L.LessonType,
        L.Duration,
        L.ComplexityLevel,
        L.Ordinal,
        L.CourseID,
        L.CreatedTime,
        L.UpdatedTime,
        CASE
          WHEN L.LessonType = 'Video' THEN LV.URL
          WHEN L.LessonType = 'Document' THEN LD.Content
          ELSE NULL
        END AS Content,
        CASE
          WHEN L.LessonType = 'Video' THEN LV.LessonVideoID
          WHEN L.LessonType = 'Document' THEN LD.LessonDocumentID
          ELSE NULL
        END AS ResourceID
      FROM Lessons L
      LEFT JOIN LessonVideo LV ON L.LessonID = LV.LessonID
      LEFT JOIN LessonDocument LD ON L.LessonID = LD.LessonID
      WHERE L.CourseID = ${courseID}
      ORDER BY L.Ordinal
    `;
    
    const result = await DataConnect.execute(query);
    
    if (!result || result.length === 0) {
      return [];
    }
    
    return result.map((lessonData: any) => {
      return createLesson(lessonData);
    });
  }

  async getLessonByID(lessonID: number): Promise<Lesson | null> {
    const query = `
      SELECT
        L.LessonID,
        L.Title,
        L.LessonType,
        L.Duration,
        L.ComplexityLevel,
        L.Ordinal,
        L.CourseID,
        L.CreatedTime,
        L.UpdatedTime,
        CASE
          WHEN L.LessonType = 'Video' THEN LV.URL
          WHEN L.LessonType = 'Document' THEN LD.Content
          ELSE NULL
        END AS Content,
        CASE
          WHEN L.LessonType = 'Video' THEN LV.LessonVideoID
          WHEN L.LessonType = 'Document' THEN LD.LessonDocumentID
          ELSE NULL
        END AS ResourceID
      FROM
        Lessons L
      LEFT JOIN
        LessonVideo LV ON L.LessonID = LV.LessonID
      LEFT JOIN
        LessonDocument LD ON L.LessonID = LD.LessonID
      WHERE
        L.LessonID = ${lessonID}
    `;
    
    const params = { LessonID: lessonID };
    const result = await DataConnect.executeWithParams(query, params);
    
    if (!result || result.length === 0) {
      return null;
    }
    
    return createLesson(result[0]);
  }

  async sortLessons(lessonID: number, ordinal: number): Promise<any> {
    const query = `
      UPDATE Lessons
      SET Ordinal = ${ordinal}
      WHERE LessonID = ${lessonID}
    `;
    return await DataConnect.execute(query);
  }
}

// Export a singleton instance
export default new LessonRepository();
