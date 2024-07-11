import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.find(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.[0]?.id ? lastStudent[0].id : undefined;
};

// year semesterCode 4 digit number
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    // increment by 1
    currentId = lastStudentId.substring(6);
  }

  let nextId = (parseInt(currentId) + 1).toString().padStart(4, '0');

  nextId = `${payload.year}${payload.code}${nextId}`;

  return nextId;
};
