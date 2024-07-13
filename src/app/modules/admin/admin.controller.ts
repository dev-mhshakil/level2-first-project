import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Admin list fetched successfully',
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const { adminId } = req.query;
  const result = await AdminService.getAdminByIdFromDB(adminId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Admin fetched successfully',
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const updatedAdmin = await AdminService.updateAdminInDB(adminId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: updatedAdmin,
    message: 'Admin updated successfully',
  });
});

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
};
