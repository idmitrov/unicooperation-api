import { Router } from 'express';

import universityController from './university.controller';
import { auth } from '../account/account.middleware';
import { uploadS3 } from '../aws';

const router = new Router();

router
    .post('/', [auth()], universityController.create)
    .get('/me', [auth()], universityController.me)
    .put('/me', [auth(), uploadS3('profile').any()], universityController.updateMyProfile)
    .get('/findByName/:name', [auth()], universityController.findByName)
    .get('/filter',[auth()], universityController.filterByName)

export default router;