import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyInDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getFacultyByIdFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id });
  return result;
};

const updateFacultyByIdInDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyInDB,
  getAllFacultiesFromDB,
  getFacultyByIdFromDB,
  updateFacultyByIdInDB,
};
