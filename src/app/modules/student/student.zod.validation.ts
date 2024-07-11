import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(20, 'First Name cannot exceed 20 characters')
    .regex(/^[A-Z]/, 'First Name should start with a capital letter'),
  middleName: z
    .string()
    .max(20, 'Middle Name cannot exceed 20 characters')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(20, 'Last Name cannot exceed 20 characters')
    .regex(
      /^[A-Za-z]*$/,
      'Last Name should only contain alphabetic characters',
    ),
});

const guardiansValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's Name is required"),
  fatherOccupation: z.string(),
  fatherContactNo: z.string().min(1, "Father's Contact Number is required"),
  motherName: z.string().min(1, "Mother's Name is required"),
  motherOccupation: z.string(),
  motherContactNo: z.string().min(1, "Mother's Contact Number is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local Guardian's Name is required"),
  contactNo: z.string().min(1, "Local Guardian's Contact Number is required"),
  occupation: z.string().min(1, "Local Guardian's Occupation is required"),
  address: z.string().min(1, "Local Guardian's Address is required"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(16),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be either male, female, or other',
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email is not valid'),
      contactNo: z.string().min(1, 'Contact Number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present Address is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      guardians: guardiansValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
