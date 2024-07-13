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

const findLastFacultyId = async () => {
  const lastFaculty = await User.find(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.[0]?.id ? lastFaculty[0].id : undefined;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.find(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.[0]?.id ? lastAdmin[0].id : undefined;
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

export const generateFacultyId = async () => {
  // first time 0000
  let currentFacultyId = (0).toString();

  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentFacultyId = lastFacultyId.substring(2);
  }

  let nextFacultyId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(4, '0');

  nextFacultyId = `F-${nextFacultyId}`;

  return nextFacultyId;
};

export const generateAdminId = async () => {
  // first time 0000
  let currentFacultyId = (0).toString();

  const lastFacultyId = await findLastAdminId();

  if (lastFacultyId) {
    currentFacultyId = lastFacultyId.substring(2);
  }

  let nextFacultyId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(4, '0');

  nextFacultyId = `A-${nextFacultyId}`;

  return nextFacultyId;
};
