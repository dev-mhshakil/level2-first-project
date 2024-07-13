import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Faculty list fetched successfully',
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await FacultyService.getFacultyById(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Faculty list fetched successfully',
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const updatedData = req.body;

  const result = await FacultyService.updateFacultyInDB(facultyId, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Faculty updated successfully',
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
