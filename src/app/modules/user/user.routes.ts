import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.route('/create-student').post(UserController.createStudent);

router.route('/create-faculty').post(UserController.createFaculty);

export const UserRoutes = router;
