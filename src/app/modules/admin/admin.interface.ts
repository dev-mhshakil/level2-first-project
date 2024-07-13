import { Model, Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  middleName?: string | '';
  lastName: string;
};

export type TAdmin = {
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
  managementDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export type AdminMethod = {
  isUserExists(id: string): Promise<TAdmin | null>;
};

export type AdminModel = Model<TAdmin, Record<string, never>, AdminMethod>;
