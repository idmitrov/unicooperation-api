import { Router } from 'express';

import universityController from './university.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/findByName/:name', [auth()], universityController.findByName)
    .get('/filter',[auth()], universityController.filterByName)
    .post('/', [auth()], universityController.create)

export default router;