import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get(
  '/:academicDepartmentId',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AcademicDepartmentController.getAcademicDepartmentById,
);

router.patch(
  '/:academicDepartmentId',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartmentById,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AcademicDepartmentController.getAllAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
