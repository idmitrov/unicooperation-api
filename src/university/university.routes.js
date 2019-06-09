import { Router } from 'express';

import { accountType } from '../account/account.constants';
import universityController from './university.controller';
import { auth } from '../account/account.middleware';
import { uploadS3 } from '../aws';

const router = new Router();

router
    .post('/', [auth(accountType.university)], universityController.create)
    .get('/preview/:name', [auth(accountType.partner)], universityController.preview)
    .get('/me', [auth(accountType.university)], universityController.me)
    .put('/me', [auth(accountType.university), uploadS3('profile').any()], universityController.updateMyProfile)
    // AS SOON AS THE SYSTEM STABILITY CONFIRMED WILL BE DELETED
    // .get('/findByName/:name', [auth(accountType.student)], universityController.findByName)
    .get('/filter', [auth(['Student', 'Partner'])], universityController.filterByName)

export default router;