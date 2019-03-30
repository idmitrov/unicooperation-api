import { Router } from 'express';
import accountController from './account.controller';

const router = new Router();

router
    .post('/login', accountController.login)
    .post('/register', accountController.register)
    .post('/reset', accountController.reset);

export default router;