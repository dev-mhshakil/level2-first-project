import { z } from 'zod';

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const adminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      id: z.string(),
      name: updateUserNameValidationSchema,
      designation: z.string(),
      gender: z.string(),
      dateOfBirth: z.string(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string(),
      managementDepartment: z.string(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const AdminValidation = {
  adminValidationSchema,
};
