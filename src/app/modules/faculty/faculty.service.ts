import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment').populate('academicFaculty'),
    query,
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getFacultyById = async (facultyId: string) => {
  const result =
    await Faculty.findById(facultyId).populate('academicDepartment');
  return result;
};

const updateFacultyInDB = async (id: string, facultyData: object) => {
  const result = await Faculty.findByIdAndUpdate(id, facultyData, {
    new: true,
  });
  return result;
};

export const FacultyService = {
  getAllFacultiesFromDB,
  getFacultyById,
  updateFacultyInDB,
};
