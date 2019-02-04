import mongoose, { model, Schema } from 'mongoose';

export const dbDriver = mongoose;
export const dbModel = model;
export const dbSchema = Schema;

dbDriver.Promise = global.Promise;

export default {
    connect(host, port, name) {
        const connectionString = `mongodb://${host}:${port}/${name}`;

        return dbDriver.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true });
    }
};
