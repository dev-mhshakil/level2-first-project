import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const result = await Student.findById(id);
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateStudentByIdInDB = async (id: string, studentData: object) => {
  const result = await Student.updateOne({ id }, studentData);
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
  updateStudentByIdInDB,
};
