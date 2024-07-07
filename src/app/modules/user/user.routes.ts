import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.route('/create-student').post(UserController.createStudent);

export const UserRoutes = router;
