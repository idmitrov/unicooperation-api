import { Router } from 'express';

import studentController from './student.controller';
import { auth } from '../account/account.middleware';
import { uploadS3 } from '../aws';

const router = new Router();

router
    .post('/', [auth()], studentController.create)
    .get('/me', [auth()], studentController.me)
    .put('/me', [auth(), uploadS3('profile').any()], studentController.updateMyProfile)

export default router;