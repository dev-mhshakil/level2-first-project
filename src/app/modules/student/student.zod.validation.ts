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

const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required and must be unique'),
  password: z.string().min(8).max(16),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be either male, female, or other',
  }),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  email: z
    .string()
    .email('Email is not valid')
    .min(1, 'Email is required and must be unique'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency Contact Number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardians: guardiansValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
