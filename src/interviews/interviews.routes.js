import { Router } from 'express';

import { accountType } from '../account/account.constants';
import interviewsController from './interviews.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/mine',  [auth([accountType.partner, accountType.student])], interviewsController.getMineInterviews)
    .post('/request', [auth(accountType.partner)], interviewsController.create)
    .put('/accept', auth(accountType.student), interviewsController.accept)
    .put('/complete', auth(accountType.partner), interviewsController.complete)

export default router;