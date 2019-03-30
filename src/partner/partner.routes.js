import { Router } from 'express';
import partnerController from './partner.controller';

const router = new Router();

router
    .post('/', partnerController.create)

export default router;