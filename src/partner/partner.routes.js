import { Router } from 'express';

import partnerController from './partner.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/me', [auth()], partnerController.getMyProfile)
    .post('/', [auth()], partnerController.create)

export default router;