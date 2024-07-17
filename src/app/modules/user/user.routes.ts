import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { StudentValidations } from '../student/student.zod.validation';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
