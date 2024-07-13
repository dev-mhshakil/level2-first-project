import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentValidationSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);

router.get(
  '/:academicDepartmentId',
  ManagementDepartmentController.getManagementDepartmentById,
);

router.patch(
  '/:academicDepartmentId',
  validateRequest(
    ManagementDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  ManagementDepartmentController.updateManagementDepartmentById,
);

router.get('/', ManagementDepartmentController.getAllManagementDepartment);

export const ManagementDepartmentRoutes = router;
