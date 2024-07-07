import { Schema, model } from 'mongoose';
import {
  TGuardians,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxLength: [20, 'First Name can not exceed 20 characters'],
      validate: {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

          return firstNameStr === value;
        },
        message: 'First Name should start with a capital letter',
      },
    },
    middleName: {
      type: String,
      trim: true,
      maxLength: [20, 'Middle Name can not exceed 20 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
      maxLength: [20, 'Last Name can not exceed 20 characters'],
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} should only contain alphanumeric characters',
      },
    },
  },
  { _id: false },
);

const guardiansSchema = new Schema<TGuardians>(
  {
    fatherName: {
      type: String,
      required: [true, "Father's Name is required"],
    },
    fatherOccupation: {
      type: String,
    },
    fatherContactNo: {
      type: String,
      required: [true, "Father's Contact Number is required"],
    },
    motherName: {
      type: String,
      required: [true, "Mother's Name is required"],
    },
    motherOccupation: {
      type: String,
    },
    motherContactNo: {
      type: String,
      required: [true, "Mother's Contact Number is required"],
    },
  },
  { _id: false },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      required: [true, "Local Guardian's Name is required"],
    },
    contactNo: {
      type: String,
      required: [true, "Local Guardian's Contact Number is required"],
    },
    occupation: {
      type: String,
      required: [true, "Local Guardian's Occupation is required"],
    },
    address: {
      type: String,
      required: [true, "Local Guardian's Address is required"],
    },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required and must be unique'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Student ID is required and must be unique'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender must be either male, female or other.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: String,
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
      required: [true, 'Contact Number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          'Blood Group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardians: {
      type: guardiansSchema,
      required: [true, 'Guardians information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual

studentSchema.virtual('fullName').get(function () {
  const middleName = this.name.middleName ? ` ${this.name.middleName}` : '';
  return `${this.name.firstName}${middleName} ${this.name.lastName}`;
});

// query middleware/ hook

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
