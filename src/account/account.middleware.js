import jwt from 'jsonwebtoken';
import config from '../config';
import Account from './account.model';

export const auth = (role) => (req, res, next) => {
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

                if (role) {
                    if (foundAccount.type === role) {
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