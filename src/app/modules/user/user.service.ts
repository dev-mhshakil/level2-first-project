import config from '../../config';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user
  const userData: Partial<TUser> = {};

  // if password is not provided, use default password
  userData.password = password || (config.default_password as string);

  // set student role

  userData.role = 'student';

  // manually generated id
  userData.id = Math.random().toString(36).substr(2, 9) as string;

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user data
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
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

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
