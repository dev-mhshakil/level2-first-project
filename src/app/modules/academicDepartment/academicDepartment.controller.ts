import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.createAcademicDepartmentServiceInDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department List Fetched Successfully',
    data: result,
  });
});

const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await AcademicDepartmentService.getAcademicDepartmentByIdFromDB(
      academicDepartmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Data Fetched Successfully',
    data: result,
  });
});

const updateAcademicDepartmentById = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const payload = req.body;
  const result =
    await AcademicDepartmentService.updateAcademicDepartmentByIdInDB(
      academicDepartmentId,
      payload,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Updated Successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
};
