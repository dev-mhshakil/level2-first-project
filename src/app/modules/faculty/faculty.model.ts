import { model, Schema } from 'mongoose';
import validator from 'validator';
import { FacultyMethod, FacultyModel, TFaculty } from './faculty.interface';

const facultySchema = new Schema<TFaculty, FacultyModel, FacultyMethod>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required and must be unique'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: Object,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender must be either male, female or other.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          'Blood Group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-',
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required and must be unique'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    profileImage: {
      type: String,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

facultySchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
