import { apiRouter } from '../api';
import accountController from './account.controller';

export default () => {
    apiRouter
        .post('/login', accountController.login)

    return apiRouter;
}