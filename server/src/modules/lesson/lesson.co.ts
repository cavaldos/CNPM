/**
 * Lesson Controller
 * 
 * This file defines the controller layer for the Lesson domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import LessonService from './lesson.service';

const LessonController = {
  async createLessonVideo(req: Request, res: Response): Promise<void> {
    try {
      const { title, duration, complexityLevel, ordinal, courseID, url } = req.body;
      
      const result = await LessonService.createLessonVideo(
        title, 
        duration, 
        complexityLevel, 
        ordinal, 
        courseID, 
        url
      );
      
      res.status(201).json({
        success: true,
        message: 'Video lesson created successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create video lesson',
        error: error
      });
    }
  },

  async updateLessonVideo(req: Request, res: Response): Promise<void> {
    try {
      const { lessonVideoID, url } = req.body;
      
      const result = await LessonService.updateLessonVideo(lessonVideoID, url);
      
      res.status(200).json({
        success: true,
        message: 'Video lesson updated successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update video lesson',
        error: error
      });
    }
  },

  async createLessonDocument(req: Request, res: Response): Promise<void> {
    try {
      const { title, duration, complexityLevel, ordinal, documentContent, courseID } = req.body;
      
      const result = await LessonService.createLessonDocument(
        title, 
        duration, 
        complexityLevel, 
        ordinal, 
        documentContent, 
        courseID
      );
      
      res.status(201).json({
        success: true,
        message: 'Document lesson created successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create document lesson',
        error: error
      });
    }
  },

  async updateLessonDocument(req: Request, res: Response): Promise<void> {
    try {
      const { lessonDocumentID, documentContent } = req.body;
      
      const result = await LessonService.updateLessonDocument(lessonDocumentID, documentContent);
      
      res.status(200).json({
        success: true,
        message: 'Document lesson updated successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update document lesson',
        error: error
      });
    }
  },

  async updateLesson(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, title, duration, complexityLevel, ordinal, courseID } = req.body;
      
      const result = await LessonService.updateLesson(
        lessonID, 
        title, 
        duration, 
        complexityLevel, 
        ordinal, 
        courseID
      );
      
      res.status(200).json({
        success: true,
        message: 'Lesson updated successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update lesson',
        error: error
      });
    }
  },

  async deleteLesson(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID } = req.body;
      
      const result = await LessonService.deleteLesson(lessonID);
      
      res.status(200).json({
        success: true,
        message: 'Lesson deleted successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete lesson',
        error: error
      });
    }
  },

  async getAllLessonsByCourseID(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      
      const lessons = await LessonService.getAllLessons(courseID);
      
      res.status(200).json({
        success: true,
        message: 'Lessons retrieved successfully',
        data: lessons.map(lesson => lesson.toDTO())
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get lessons',
        error: error
      });
    }
  },

  async getLessonByID(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID } = req.body;
      
      const lesson = await LessonService.getLessonByID(lessonID);
      
      if (!lesson) {
        res.status(404).json({
          success: false,
          message: 'Lesson not found'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'Lesson retrieved successfully',
        data: lesson.toDTO()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get lesson',
        error: error
      });
    }
  },

  async sortLessons(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, ordinal } = req.body;
      
      const result = await LessonService.sortLessons(lessonID, ordinal);
      
      res.status(200).json({
        success: true,
        message: 'Lesson order updated successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update lesson order',
        error: error
      });
    }
  }
};

export default LessonController;
