import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.route('/create-student').post(StudentController.createStudent);

router.route('/').get(StudentController.getAllStudents);

router.route('/:id').get(StudentController.getStudentById);

export const StudentRoutes = router;
