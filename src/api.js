import http from 'http';
import express from 'express';

export default {
    /**
     * Connect to Api
     * @param {String} host 
     * @param {String} port 
     */
    start(host, port) {
        http
            .createServer(express)
            .listen(port, host);
    }
};