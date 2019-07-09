import jwt from 'jsonwebtoken';
import config from '../config';
import Account from './account.model';
import { messages } from './account.constants';


export const authSocket = (socket, next) => {    
    const { token } = socket.handshake.query;

    if (!token) {
        next(new Error(messages.unauthenticared))
    } else {
        jwt.verify(token, config.api.secret, (err, decoded) => {
            if (!decoded || !decoded.sub || !decoded.password) {
                return next(new Error(messages.unauthorized));
            } else {
                Account.findById(decoded.sub)
                    .then(foundAccount => {
                        if (!foundAccount || foundAccount.password !== decoded.password) {
                            return next(new Error(messages.unauthorized));
                        }

                        socket.account = foundAccount;

                        next();
                    });
            }
        });
    }
}

export const auth = (roles) => (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(401)
            .json({ error: messages.unauthenticared });
    }

    const token = req.headers.authorization.split(/^Bearer\s+/i)[1];

    if (!token) {
        return res
            .status(401)
            .json({ error: messages.unauthenticared });
    }

    jwt.verify(token, config.api.secret, (err, decoded) => {
        if (!decoded || !decoded.sub || !decoded.password) {
            return res
                .status(401)
                .json({ error: messages.unauthenticared });
        }

        Account.findById(decoded.sub)
            .then(foundAccount => {
                if (!foundAccount || foundAccount.password !== decoded.password) {
                    return res
                        .status(401)
                        .json({ error: messages.unauthenticared });
                }

                if (roles) {
                    if (Array.isArray(roles)) {
                        if (!roles.includes(foundAccount.type)) {
                            return res
                                .status(401)
                                .json({ error: messages.unauthorized });
                        }
                    } else {
                        if (roles !== foundAccount.type) {
                            return res
                                .status(401)
                                .json({ error: messages.unauthorized });
                        }
                    }
                }

                req.account = foundAccount;

                return next();
            });
    });
}