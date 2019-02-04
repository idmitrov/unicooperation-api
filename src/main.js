import Database from './db';
import Api from './api';
import Config from './config';
import Logger from './logger';
import accountService from './account/account.service';

try {
    Database.connect(Config.db.host, Config.db.port, Config.db.name)
        .then(() => {
            return accountService.seedAdmin(Config.admin.email, Config.admin.password);
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