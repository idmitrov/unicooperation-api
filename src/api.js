import http from 'http';
import express, { Router } from 'express';
import cors from 'cors';
import io from 'socket.io';
import { urlencoded, json } from 'body-parser';

import Passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';

import Config from './config';

import Account from './account/account.model';
import { authSocket } from './account/account.middleware';

import adminRoutes from './admin/admin.routes';
import accountRoutes from './account/account.routes';
import studentRoutes from './student/student.routes';
import universityRoutes from './university/university.routes';
import nomenclatursRoutes from './nomenclatures/nomenclatures.routes';
import partnerRoutes from './partner/partner.routes';

import publicationEvents from './publication/publication.events';

const configureAuth = (options = {}) => {
    const localDefaults = {
        session: false,
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    };

    const localOptions = Object.assign({}, localDefaults, options);

    Passport.use('local', new Strategy(localOptions, (req, email, password, done) => {
        Account.findOne({ email })
            .then((foundAccount) => {
                if (!foundAccount) {
                    return done({ message: 'Invalid credentials' });
                }

                foundAccount.comparePasswords(password, foundAccount.password)
                    .then((passwordMatch) => {
                        if (!passwordMatch) {
                            return done({ message: 'Invalid credentials' });
                        }
                        
                        const userData = Object.assign({}, foundAccount.getPublicFields(), {
                            token: jwt.sign({ sub: foundAccount._id, password: foundAccount.password }, Config.api.secret),
                        });

                        return done(null, userData);
                    })
            });
    }));
}

const configureMiddlewares = (api) => {
    api
        .use(cors())
        .use(urlencoded({ extended: false }))
        .use(json())
        .use(Passport.initialize());
}

const configureRoutes = (api) => {
    api
        .use('/nom', nomenclatursRoutes)
        .use('/university', universityRoutes)
        .use('/student', studentRoutes)
        .use('/account', accountRoutes)
        .use('/partner', partnerRoutes)
        .use('/admin', adminRoutes)
        .use('*', (req, res, next) => next('Unknown endpoint'));
}

const configureSockets = (socketIO) => {
    socketIO
        .of('/publications', publicationEvents)
        .use(authSocket);
}

const handleErrors = (api) => {
    api.use((ex, req, res, next) => {
        if (ex) {
            let errors = [ex.message ? ex.message : ex];

            if (ex.errors) {
                errors = Object.keys(ex.errors)
                    .map((errKey) => ex.errors[errKey].properties.message);
            }

            return res
                .status(ex.status ? ex.status : 400)
                .json({ data: null, errors });
        }
    });
}

export const apiRouter = new Router();

export default {
    /**
     * Connect to Api
     * @param {String} host 
     * @param {String} port 
     */
    start(host, port) {
        const api = express();

        configureAuth();
        configureMiddlewares(api);
        configureRoutes(api);
        handleErrors(api);

        const server = http.createServer(api)
        const socketIO = io(server, { origins: Config.api.origins });
        
        server.listen(port, host, () => {            
            configureSockets(socketIO);
        });
    }
};
