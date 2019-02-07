import { apiRouter } from '../api';
import accountController from './account.controller';

export default () => {
    return apiRouter
        .post('/login', accountController.login)
        .post('/register', accountController.register);
}