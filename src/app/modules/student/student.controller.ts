import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: error.message,
    // })
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.params;
    const result = await StudentServices.getStudentByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
