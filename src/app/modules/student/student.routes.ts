import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.route('/create-student').post(StudentController.createStudent);

router.route('/').get(StudentController.getAllStudents);

router.route('/:id').get(StudentController.getStudentById);

router.route('/:id').delete(StudentController.deleteStudent);

router.route('/:id').patch(StudentController.updateStudentById);

export const StudentRoutes = router;
