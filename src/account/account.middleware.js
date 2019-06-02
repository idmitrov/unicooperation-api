import jwt from 'jsonwebtoken';
import config from '../config';
import Account from './account.model';

export const authSocket = (socket, next) => {    
    const { token } = socket.handshake.query;

    if (!token) {
        next(new Error('Unauthenticated!'))
    } else {
        jwt.verify(token, config.api.secret, (err, decoded) => {
            if (!decoded.sub || !decoded.password) {
                return next(new Error('Unauthorized'));
            } else {
                Account.findById(decoded.sub)
                    .then(foundAccount => {
                        if (!foundAccount || foundAccount.password !== decoded.password) {
                            return next(new Error('Unauthorized'));
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
            .json({ error: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(/^Bearer\s+/i)[1];

    if (!token) {
        return res
            .status(401)
            .json({ error: 'Unauthorized' });
    }

    jwt.verify(token, config.api.secret, (err, decoded) => {
        if (!decoded.sub || !decoded.password) {
            return res
                .status(401)
                .json({ error: 'Unauthorized' });
        }

        Account.findById(decoded.sub)
            .then(foundAccount => {
                if (!foundAccount || foundAccount.password !== decoded.password) {
                    return res
                        .status(401)
                        .json({ error: 'Unauthorized' });
                }

                if (roles && Array.isArray(roles) && roles.length) {
                    if (!roles.includes(foundAccount.type)) {
                        return res
                            .status(401)
                            .json({ error: 'Unauthorized' });
                    }
                }

                req.account = foundAccount;

                return next();
            });
    });
}