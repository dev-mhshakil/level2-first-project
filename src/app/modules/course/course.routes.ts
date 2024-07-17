import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.patch(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateAssignFacultyWithCourse),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.deleteAssignFacultyWithCourse),
  CourseController.removeFacultiesWithCourse,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getCourseById,
);
router.delete('/:id', auth(USER_ROLE.admin), CourseController.deleteCourse);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseController.getAllCourses,
);

export const CourseRoutes = router;
