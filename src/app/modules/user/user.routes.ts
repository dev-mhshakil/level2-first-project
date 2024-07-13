import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from '../faculty/faculty.validation';
import { StudentValidations } from '../student/student.zod.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.facultyValidationSchema),
  UserController.createFaculty,
);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
