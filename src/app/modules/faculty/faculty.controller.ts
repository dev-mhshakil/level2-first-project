import { NextFunction, Request, Response } from 'express';
import { FacultyService } from './faculty.service';
import sendResponse from '../../utils/sendResponse';

const getAllFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await FacultyService.getAllFacultiesFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
      message: 'Faculty list fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const FacultyController = {
  getAllFaculty,
};
