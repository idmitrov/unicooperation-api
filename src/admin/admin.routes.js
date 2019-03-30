import { Router } from 'express';
import adminController from './admin.controller';

const router = new Router();

router
    .post('/', adminController.create)

export default router;