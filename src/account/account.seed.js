import Config from '../config';
import Account from './account.model';
import accountService from './account.service';
import { accountType } from './account.constants';

export const seedAdmin = () => {
    Account.findOne({ email: Config.admin.email })
        .then((foundAccount) => {
            if (!foundAccount) {
                return accountService.register(Config.admin.email, Config.admin.password, accountType.admin);
            }

            return Promise.resolve(foundAccount);
        });
}

export default () => {
    seedAdmin();
}