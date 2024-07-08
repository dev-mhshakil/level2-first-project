import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.route('/').get(FacultyController.getAllFaculty);

export const FacultyRoutes = router;
