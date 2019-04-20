import { Router } from 'express';

import publicationController from './publication.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .post('', [auth()], publicationController.create)
    .get('/list', [auth()], publicationController.list)

export default router;