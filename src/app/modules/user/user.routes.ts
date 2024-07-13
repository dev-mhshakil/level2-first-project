import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
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

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
