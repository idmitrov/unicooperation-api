import http from 'http';
import https from 'https';
import express, { Router } from 'express';
import cors from 'cors';

import io from 'socket.io';

import { urlencoded, json } from 'body-parser';

import Passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';

import Config from './config';
import { configureAWS } from './aws';

import Account from './account/account.model';

import { init, handleNamespaceEvents } from './socket';
import { authSocket } from './account/account.middleware';

import adminRoutes from './admin/admin.routes';
import accountRoutes from './account/account.routes';
import studentRoutes from './student/student.routes';
import universityRoutes from './university/university.routes';
import nomenclatursRoutes from './nomenclatures/nomenclatures.routes';
import partnerRoutes from './partner/partner.routes';
import publicationRoutes from './publication/publication.routes';
import adsRoutes from './ads/ads.routes';

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
        .use('/ads', adsRoutes)
        .use('/publication', publicationRoutes)
        .use('/university', universityRoutes)
        .use('/student', studentRoutes)
        .use('/account', accountRoutes)
        .use('/partner', partnerRoutes)
        .use('/admin', adminRoutes)
        .use('*', (req, res, next) => next('Unknown endpoint'));
}

const configureSockets = (socketIO) => {
    init(socketIO);

    handleNamespaceEvents('/publications', publicationEvents, [authSocket]);
}

const handleErrors = (api) => {
    api.use((ex, req, res, next) => {
        if (ex) {            
            let errors = [];
            
            if (ex.errors) {
                errors = Object.keys(ex.errors)
                    .map((errKey) => {
                        if (ex.errors[errKey].properties) {
                            return ex.errors[errKey].properties.message
                        }

                        return ex.errors[errKey].message;
                    });
            } else if (ex.message) {
                errors.push({ message: ex.message.toString() });
            } else {
                errors.push({ message: ex.toString() });
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

        configureAWS(Config.aws);
        configureAuth();
        configureMiddlewares(api);
        configureRoutes(api);
        handleErrors(api);

        let server = null;
        if (process.env.NODE_ENV === 'prod') {
            server = https.createServer({}, api);
        } else {
            server = http.createServer(api);
        }

        const sokcetIO = io(server,  { origins: Config.api.origins });
        server.listen(port, host, () => {
            configureSockets(sokcetIO);
        });
    }
};
