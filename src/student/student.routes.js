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
    .get('/preview/:id', [auth([accountType.partner, accountType.university])], studentController.preview)
    .get('/match', [auth(accountType.partner)], studentController.match)

export default router;