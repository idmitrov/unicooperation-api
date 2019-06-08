import { Router } from 'express';

import partnerController from './partner.controller';
import { auth } from '../account/account.middleware';
import { uploadS3 } from '../aws';

const router = new Router();

router
    .get('/preview/:name', partnerController.preview)
    .get('/filter', [auth('University')], partnerController.filterByName)
    .get('/me', [auth()], partnerController.getMyProfile)
    .put('/me', [auth(), uploadS3('profile').any()], partnerController.updateMyProfile)
    .post('/', [auth()], partnerController.create)

export default router;