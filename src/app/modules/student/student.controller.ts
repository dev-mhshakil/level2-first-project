import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.zod.validation';
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation using joi
    // const { error } = studentValidationSchema.validate(req.body);

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Student creation failed',
    //     error,
    //   });
    // }
  } catch (error: unknown) {
    let errorMessage = 'Student creation failed';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error,
    });
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
    res.status(500).json({
      success: true,
      message: 'Student not found',
      error: error,
    });
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
    res.status(500).json({
      success: true,
      message: 'Student not found',
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.params;
    await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Student not found',
      error: error,
    });
  }
};

const updateStudentById = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.params;
    const { student: updatedStudentData } = req.body;

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(updatedStudentData);

    await StudentServices.updateStudentByIdInDB(studentId, zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Student not found',
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudentById,
};
