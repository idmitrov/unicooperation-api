import mongoose, { model, Schema } from 'mongoose';

export const dbDriver = mongoose;
export const dbModel = model;
export const dbSchema = Schema;

dbDriver.Promise = global.Promise;

export default {
    /**
     * Connect to Api database 
     * @param {String} host 
     * @param {String} port 
     * @param {String} name 
     * @param {Object} options 
     */
    connect(host, port, name, options = {}) {
        const connectionString = `mongodb://${host}:${port}/${name}`;

        const dbDefaults = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        };

        return dbDriver.connect(connectionString, Object.assign({}, dbDefaults, options));
    }
};
