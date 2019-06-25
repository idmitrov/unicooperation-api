import { Router } from 'express';

import { accountType } from '../account/account.constants';
import addController from './add.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('', [auth()], addController.getAdds)
    .post('', [auth(accountType.partner)], addController.createNewAdd)

export default router;