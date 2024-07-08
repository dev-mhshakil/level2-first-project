import { z } from 'zod';

const facultyValidationSchema = z.object({
  id: z.string(),
  user: z.string(),
  name: z.string(),
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
  academicFaculty: z.string(),
  academicDepartment: z.string(),
  isDeleted: z.boolean(),
});

export const FacultyValidation = {
  facultyValidationSchema,
};
