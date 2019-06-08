import { Router } from 'express';

import { accountType } from '../account/account.constants';
import partnerController from './partner.controller';
import { auth } from '../account/account.middleware';
import { uploadS3 } from '../aws';

const router = new Router();

router
    .get('/preview/:name', partnerController.preview)
    .get('/filter', [auth(accountType.university)], partnerController.filterByName)
    .get('/me', [auth(accountType.partner)], partnerController.getMyProfile)
    .put('/me', [auth(accountType.partner), uploadS3('profile').any()], partnerController.updateMyProfile)
    .post('/', [auth(accountType.partner)], partnerController.create)

export default router;