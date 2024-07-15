import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

  //check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const academicSemester = isSemesterRegistrationExits?.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
  }

  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
  }

  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
   */

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found !',
    );
  }

  // checking if the status is still "UPCOMING".
  const isSemesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (isSemesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${isSemesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  // deleting the associated courses
  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration!`',
      );
    }

    const deletedSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration!`',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
