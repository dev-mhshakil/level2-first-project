import { TManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartmentServiceInDB = async (
  payload: TManagementDepartment,
) => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartmentsFromDB = async () => {
  const result = await ManagementDepartment.find().populate('academicFaculty');
  return result;
};

const getManagementDepartmentByIdFromDB = async (id: string) => {
  const result = await ManagementDepartment.findById({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateManagementDepartmentByIdInDB = async (
  id: string,
  payload: Partial<TManagementDepartment>,
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartmentServiceInDB,
  getAllManagementDepartmentsFromDB,
  getManagementDepartmentByIdFromDB,
  updateManagementDepartmentByIdInDB,
};
