import Database from './db';
import Api from './api';
import Config from './config';
import Logger from './logger';

try {
    Database.connect(Config.db.host, Config.db.port, Config.db.name)
        .then(() => {
            Api.start(Config.api.host, Config.api.port);
        })
        .catch((err) => {
            Logger.log(err);
        });
} catch(ex) {
    Logger.error(ex);
}