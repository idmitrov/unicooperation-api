import { Router } from 'express';

import { accountType } from '../account/account.constants';
import addController from './add.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/mine', [auth(accountType.partner)], addController.getMyAdds)
    .post('', [auth(accountType.partner)], addController.createNewAdd)
    .put('/:addId', [auth(accountType.partner)], addController.editExistingAdd)

export default router;