import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), AdminControllers.getAllAdmins);

router.get('/:id', auth(USER_ROLE.admin), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', auth(USER_ROLE.admin), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
