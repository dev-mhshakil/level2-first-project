import { NextFunction, Request, Response } from 'express';
// import studentValidationSchema from '../student/student.zod.validation';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // data validation using joi
    // const { error } = studentValidationSchema.validate(req.body);

    // data validation using zod
    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, faculty: facultyData } = req.body;

    const result = await UserServices.createFacultyIntoDB(
      password,
      facultyData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
  createFaculty,
};
