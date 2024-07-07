import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.zod.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import studentValidationSchema from './student.joi.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
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

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: studentId } = req.params;
    const result = await StudentServices.getStudentByIdFromDB(studentId);
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

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
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

const updateStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: studentId } = req.params;
    const { student: updatedStudentData } = req.body;

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(updatedStudentData);

    const result = await StudentServices.updateStudentByIdInDB(
      studentId,
      zodParsedData,
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

export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudentById,
};
