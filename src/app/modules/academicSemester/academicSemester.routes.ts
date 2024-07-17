import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get(
  '/:semesterId',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicSemesterController.getSemesterById,
);

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateSemesterById,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicSemesterController.getAllSemesters,
);

export const AcademicSemesterRoutes = router;
