import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import { AppError } from '../../errors/AppError';
import { TManagementDepartment } from './managementDepartment.interface';

const managementDepartmentSchema = new Schema<TManagementDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

managementDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await ManagementDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department already exists',
    );
  }
  next();
});

managementDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await ManagementDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  next();
});

export const ManagementDepartment = model<TManagementDepartment>(
  'ManagementDepartment',
  managementDepartmentSchema,
);
