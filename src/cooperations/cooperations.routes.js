import { Router } from 'express';

import { accountType } from '../account/account.constants';
import cooperationsController from './cooperations.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .post('', [auth(accountType.partner)], cooperationsController.create)

export default router;