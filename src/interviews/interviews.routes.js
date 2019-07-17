import { Router } from 'express';

import { accountType } from '../account/account.constants';
import interviewsController from './interviews.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/mine',  [auth([accountType.partner, accountType.student])], interviewsController.getMineInterviews)
    .get('/:interviewId',  [auth([accountType.partner, accountType.student])], interviewsController.get)
    .post('/request', [auth(accountType.partner)], interviewsController.create)
    .put('/request', [auth(accountType.partner)], interviewsController.edit)
    .post('/answer', auth(accountType.student), interviewsController.answer)
    .post('/complete', auth(accountType.partner), interviewsController.complete)
    .delete('/:interviewId', [auth(accountType.partner), interviewsController.archive]);

export default router;