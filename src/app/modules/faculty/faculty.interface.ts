import { Types } from 'mongoose';

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: object;
  designation: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicFaculty: string;
  academicDepartment: string;
  isDeleted: boolean;
};
