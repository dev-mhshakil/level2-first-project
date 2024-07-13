import { Model, Types } from 'mongoose';

export type TFacultyUserName = {
  firstName: string;
  middleName?: string | '';
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TFacultyUserName;
  designation: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string | '';
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export type FacultyMethod = {
  isUserExists(id: string): Promise<TFaculty | null>;
};

export type FacultyModel = Model<
  TFaculty,
  Record<string, never>,
  FacultyMethod
>;
