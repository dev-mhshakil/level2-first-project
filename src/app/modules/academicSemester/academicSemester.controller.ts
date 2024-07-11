import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters Fetched Successfully',
    data: result,
  });
});

const getSemesterById = catchAsync(async (req, res) => {
  const { semesterId: semesterId } = req.params;
  const result =
    await AcademicSemesterService.getSemesterByIdFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters Fetched Successfully',
    data: result,
  });
});

const updateSemesterById = catchAsync(async (req, res) => {
  const { semesterId: semesterId } = req.params;
  const updatedSemester = req.body;

  const result = await AcademicSemesterService.updateSemesterByIdInDB(
    semesterId,
    updatedSemester,
  );

  if (result.modifiedCount === 0) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Academic Semester cannot be updated',
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters Updated Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSemesterById,
  updateSemesterById,
};
