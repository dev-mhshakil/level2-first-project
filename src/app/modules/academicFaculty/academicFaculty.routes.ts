import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.patch(
  '/:facultyId',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFacultyById,
);

router.get(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AcademicFacultyController.getAcademicFacultyById,
);

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AcademicFacultyController.getAllAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
