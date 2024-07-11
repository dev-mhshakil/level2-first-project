import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user
  const userData: Partial<TUser> = {};

  // if password is not provided, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // Check if admissionSemester is not null
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  // set generate id
  userData.id = await generatedStudentId(admissionSemester);

  // create a session
  const session = await User.startSession();
  session.startTransaction();

  try {
    // create a user (transaction - 1)
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a user');
    }
    // set id, _id as user data
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student');
    }
    await session.commitTransaction();
    session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a student');
  }
};

const createFacultyIntoDB = async (password: string, facultyData: TFaculty) => {
  // create a user
  const userData: Partial<TUser> = {};

  // if password is not provided, use default password
  userData.password = password || (config.default_password as string);

  // set faculty role
  userData.role = 'faculty';

  // manually generated id
  userData.id = Math.random().toString(36).substr(2, 9) as string;

  // create a user
  const newUser = await User.create(userData);

  // create a faculty
  if (Object.keys(newUser).length) {
    // set id, _id as user data
    facultyData.id = newUser.id;
    facultyData.user = newUser._id;

    const newFaculty = await Faculty.create(facultyData);
    return newFaculty;
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  getAllUsersFromDB,
};
