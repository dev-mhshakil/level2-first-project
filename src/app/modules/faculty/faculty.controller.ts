import { FacultyService } from './faculty.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFacultiesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Faculty list fetched successfully',
  });
});

export const FacultyController = {
  getAllFaculty,
};
