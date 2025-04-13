/**
 * Lesson Repository Implementation
 * 
 * This file implements the repository interface for the Lesson domain.
 * It handles the persistence of Lesson entities to the database.
 */

import DataConnect from '../../../../config/DataConnect';
import { Lesson } from '../../domain/lesson';
import LessonFactory from '../../domain/factories/lesson.factory';
import { ILessonRepository } from '../interface/ILesson.repo';

/**
 * Lesson Repository Implementation
 * 
 * This class is responsible for persisting and retrieving Lesson entities from the database.
 * It implements the ILessonRepository interface defined in the domain layer.
 */
class LessonRepository implements ILessonRepository {
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
      SELECT l.*, 
             CASE
                WHEN l.LessonType = 'Video' THEN lv.URL
                WHEN l.LessonType = 'Document' THEN ld.Content
                ELSE NULL
             END AS Content,
             CASE
                WHEN l.LessonType = 'Video' THEN lv.LessonVideoID
                WHEN l.LessonType = 'Document' THEN ld.LessonDocumentID
                ELSE NULL
             END AS ResourceID
      FROM Lessons l
      LEFT JOIN LessonVideo lv ON l.LessonID = lv.LessonID
      LEFT JOIN LessonDocument ld ON l.LessonID = ld.LessonID
      JOIN Course c ON l.CourseID = c.CourseID
      WHERE c.CourseID = @CourseID
      ORDER BY l.Ordinal
    `;
    const params = {
      CourseID: courseID
    };
    const result = await DataConnect.executeWithParams(query, params);
    return result ? result.map((lessonData: any) => LessonFactory.createLessonFromDB(lessonData)) : [];
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
        L.LessonID = @LessonID
    `;
    const params = {
      LessonID: lessonID
    };
    const result = await DataConnect.executeWithParams(query, params);
    return result && result.length > 0 ? LessonFactory.createLessonFromDB(result[0]) : null;
  }

  async sortLessons(lessonID: number, ordinal: number): Promise<any> {
    const query = `
      UPDATE Lessons
      SET Ordinal = @Ordinal
      WHERE LessonID = @LessonID
    `;
    const params = {
      LessonID: lessonID,
      Ordinal: ordinal
    };
    return await DataConnect.executeWithParams(query, params);
  }
}

// Export a singleton instance
export default new LessonRepository();
