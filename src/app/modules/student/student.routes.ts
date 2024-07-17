import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { StudentController } from './student.controller';
import { StudentValidations } from './student.zod.validation';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getAllStudents,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getStudentById,
);

router.delete('/:id', auth(USER_ROLE.admin), StudentController.deleteStudent);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudentById,
);

export const StudentRoutes = router;
