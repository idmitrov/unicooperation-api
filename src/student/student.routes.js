import { Router } from 'express';

import studentController from './student.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .post('/', [auth()], studentController.create)
    .get('/me', [auth()], studentController.me)

export default router;