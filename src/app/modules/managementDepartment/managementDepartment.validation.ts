import { z } from 'zod';

const createManagementDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Management Department must be string',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Management Department must be string',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
