import { Router } from 'express';

import { accountType } from '../account/account.constants';
import studentController from './student.controller';
import { auth } from '../account/account.middleware';
import { uploadS3 } from '../aws';

const router = new Router();

router
    .post('/', [auth(accountType.student)], studentController.create)
    .get('/me', [auth(accountType.student)], studentController.me)
    .put('/me', [auth(accountType.student), uploadS3('profile').any()], studentController.updateMyProfile)

export default router;