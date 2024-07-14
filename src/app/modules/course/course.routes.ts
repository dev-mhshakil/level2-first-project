import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.updateAssignFacultyWithCourse),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.deleteAssignFacultyWithCourse),
  CourseController.removeFacultiesWithCourse,
);
router.get('/:id', CourseController.getCourseById);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;
