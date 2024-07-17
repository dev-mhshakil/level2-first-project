import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  auth(USER_ROLE.admin),
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentValidationSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);

router.get(
  '/:academicDepartmentId',
  auth(USER_ROLE.admin),
  ManagementDepartmentController.getManagementDepartmentById,
);

router.patch(
  '/:academicDepartmentId',
  auth(USER_ROLE.admin),
  validateRequest(
    ManagementDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  ManagementDepartmentController.updateManagementDepartmentById,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  ManagementDepartmentController.getAllManagementDepartment,
);

export const ManagementDepartmentRoutes = router;
