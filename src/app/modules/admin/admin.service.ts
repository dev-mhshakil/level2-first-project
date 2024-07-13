import QueryBuilder from '../../builder/QueryBuilder';
import { adminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(
    Admin.find().populate('managementDepartment'),
    query,
  )
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getAdminByIdFromDB = async (adminId: string) => {
  const result = await Admin.findOne({ id: adminId });
  return result;
};

const updateAdminInDB = async (adminId: string, adminData: object) => {
  const result = await Admin.findByIdAndUpdate({ id: adminId }, adminData, {
    new: true,
  });
  return result;
};

export const AdminService = {
  getAllAdminsFromDB,
  getAdminByIdFromDB,
  updateAdminInDB,
};
