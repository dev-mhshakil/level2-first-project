import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);  //built in static method
  const student = new Student(studentData); //create instance of Student

  if (await student.isUserExists(studentData.id)) {
    throw new Error('Student already exists');
  }

  const result = await student.save();
  return result;
};

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
  updateStudentByIdInDB,
};
