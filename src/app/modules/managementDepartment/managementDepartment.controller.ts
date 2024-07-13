import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(async (req, res) => {
  const result =
    await ManagementDepartmentService.createManagementDepartmentServiceInDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department Created Successfully',
    data: result,
  });
});

const getAllManagementDepartment = catchAsync(async (req, res) => {
  const result =
    await ManagementDepartmentService.getAllManagementDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department List Fetched Successfully',
    data: result,
  });
});

const getManagementDepartmentById = catchAsync(async (req, res) => {
  const { managementDepartmentId } = req.params;
  const result =
    await ManagementDepartmentService.getManagementDepartmentByIdFromDB(
      managementDepartmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Data Fetched Successfully',
    data: result,
  });
});

const updateManagementDepartmentById = catchAsync(async (req, res) => {
  const { managementDepartmentId } = req.params;
  const payload = req.body;
  const result =
    await ManagementDepartmentService.updateManagementDepartmentByIdInDB(
      managementDepartmentId,
      payload,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Updated Successfully',
    data: result,
  });
});

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getManagementDepartmentById,
  updateManagementDepartmentById,
};
