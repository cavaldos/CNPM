/**
 * DDD Routes
 *
 * This file integrates the DDD module routes with the existing Express router.
 */

import { Router } from 'express';
import {
    userRoutes,
    courseRoutes,
    aiRoutes,
    reviewRoutes,
    lessonRoutes,
    enrollmentRoutes,
    learningRoutes
} from '.';

const DddRouter = Router();

// Mount DDD module routes
DddRouter.use('/user', userRoutes);
DddRouter.use('/course', courseRoutes);
DddRouter.use('/ai', aiRoutes);
DddRouter.use('/review', reviewRoutes);
DddRouter.use('/lesson', lessonRoutes);
DddRouter.use('/enrollment', enrollmentRoutes);
DddRouter.use('/learning', learningRoutes);

export default DddRouter;
