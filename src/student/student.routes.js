import { Router } from 'express';
import studentController from './student.controller';

const router = new Router();

router
    .post('/', studentController.create)

export default router;