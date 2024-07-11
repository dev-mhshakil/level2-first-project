import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // validate the payload

  // academicSemesterNameCodeMapper['Fall'] = '03'
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code');
  }
  // create academic semester in DB
  const result = await AcademicSemester.create(payload);
  // return the created academic semester
  return result;
};

const getAllSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSemesterByIdFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemesterByIdInDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester code');
  }
  const result = await AcademicSemester.updateOne({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllSemestersFromDB,
  getSemesterByIdFromDB,
  updateSemesterByIdInDB,
};
