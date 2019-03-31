import { Router } from 'express';

import universityController from './university.controller';
import { auth } from '../account/account.middleware';

const router = new Router();

router
    .get('/findByName/:name', universityController.findByName)
    .get('/filter', universityController.filterByName)
    .post('/', [auth()], universityController.create)

export default router;