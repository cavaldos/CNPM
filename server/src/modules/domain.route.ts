/**
 * DDD Routes
 *
 * This file integrates the DDD module routes with the existing Express router.
 */

import { Router } from 'express';
import {
    courseRoutes,
    aiRoutes,
} from '.';

const DddRouter = Router();


DddRouter.use('/course', courseRoutes);
DddRouter.use('/ai', aiRoutes);

export default DddRouter;
