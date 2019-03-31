import { Router } from 'express';
import nomenclaturesController from './nomenclatures.controller';

const router = new Router();

router
    .get('/countries', nomenclaturesController.getCountries);

export default router;