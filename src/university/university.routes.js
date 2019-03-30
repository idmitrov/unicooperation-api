import { Router } from 'express';
import universityController from './university.controller';

const router = new Router();

router
    .get('/findByName/:name', universityController.findByName)
    .get('/filter', universityController.filterByName)
    .post('/', universityController.create)

export default router;