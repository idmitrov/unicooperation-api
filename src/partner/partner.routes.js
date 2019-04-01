import { Router } from 'express';

import partnerController from './partner.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .post('/', [auth()], partnerController.create)

export default router;