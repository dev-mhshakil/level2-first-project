import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.zod.validation';

const router = express.Router();

router.route('/').get(StudentController.getAllStudents);

router.route('/:studentId').get(StudentController.getStudentById);

router.route('/:studentId').delete(StudentController.deleteStudent);

router.patch(
  '/:studentId',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudentById,
);

export const StudentRoutes = router;
