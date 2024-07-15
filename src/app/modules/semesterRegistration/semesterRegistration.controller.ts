import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration created successfully',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registrations fetched successfully',
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSemesterRegistrationByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration fetched successfully',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationByIdInDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration updated successfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
