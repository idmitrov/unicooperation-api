import { Router } from 'express';

import { accountType } from '../account/account.constants';
import skillsController from './skills.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/filter', [auth(accountType.student)], skillsController.filter)

export default router;