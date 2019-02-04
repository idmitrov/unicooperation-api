import http from 'http';
import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

import Passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';

import Config from './config'; 
import Account from './account/account.model';

const configureAuth = (options) => {
    const localOptions = {
        session: false,
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
    };

    Passport.use('local', new Strategy(localOptions, (req, username, password, done) => {
        Account.findOne({ email: username })
            .then((foundUser) => {
                if (!foundUser) {
                    return done({ message: 'Unauthenticated' });
                }

                foundUser.comparePasswords(password, foundUser.password)
                    .then((passwordMatch) => {
                        if (!passwordMatch) {
                            return done({ message: 'Invalid credentials' });
                        }

                        const userData = {
                            token: jwt.sign({ sub: user._id, password: user.password }, Config.api.secret),
                            email: foundUser.email
                        }

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
    api.use('*', (req, res) => {
        res.json({ message: 'Unknown endpoint' });
    });
}

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

        return http
            .createServer(api)
            .listen(port, host);
    }
};