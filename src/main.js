import Database from './db';
import Api from './api';
import Config from './config';
import Logger from './logger';
import accountService from './account/account.service';
import { accountType } from './account/account.constants';

try {
    Database.connect(Config.db.host, Config.db.port, Config.db.name)
        .then(() => {
            accountService.seedAccount(Config.admin.email, Config.admin.password, accountType.admin);
        })
        .then(() => {
            Api.start(Config.api.host, Config.api.port);
        })
        .catch((err) => {
            Logger.log(err);
        });
} catch(ex) {
    Logger.error(ex);
}