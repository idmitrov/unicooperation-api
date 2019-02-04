import http from 'http';
import express from 'express';
import cors from 'cors';

const configureApi = (api) => {
    return new Promise((resolve, reject) => {
        api.use(cors);

        resolve(api);
    })
}

export default {
    /**
     * Connect to Api
     * @param {String} host 
     * @param {String} port 
     */
    start(host, port) {
        return configureApi(express())
            .then(() => {
                http
                    .createServer(express)
                    .listen(port, host);
            });
    }
};