/**
 * DDD Routes
 *
 * This file integrates the DDD module routes with the existing Express router.
 */

import { Router } from 'express';
import {
    courseRoutes,
    aiRoutes,
    learningRoutes,
    enrollmentRoutes,
    learnProgressRoutes,
    statisticsRoutes
} from '.';

const DddRouter = Router();


DddRouter.use('/course', courseRoutes);
DddRouter.use('/ai', aiRoutes);
DddRouter.use('/learning', learningRoutes);
DddRouter.use('/enrollment', enrollmentRoutes);
DddRouter.use('/learn-progress', learnProgressRoutes);
DddRouter.use('/statistics', statisticsRoutes);

export default DddRouter;
