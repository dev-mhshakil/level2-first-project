import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: Partial<TSemesterRegistration>,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCOMING | 'ONGOING

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`,
    );
  }

  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'The academic semester not found');
  }

  //  check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exists for this academic semester',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistration.find().populate('academicSemester');
  return result;
};

const getSemesterRegistrationByIdFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationByIdInDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the registration is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  const requestedStatus = payload?.status;

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The semester registration not found',
    );
  }

  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status;

  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  //  UPCOMING --> ONGOING --> ENDED
  if (currentSemesterStatus === 'UPCOMING' && requestedStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (currentSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('academicSemester');
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSemesterRegistrationByIdFromDB,
  updateSemesterRegistrationByIdInDB,
};
