import http from 'http';
import express from 'express';

export default {
    start(host, port) {
        http
            .createServer(express)
            .listen(port, host);
    }
};