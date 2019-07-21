import Passport from 'passport';

import Account from './account.model';

export default {
    /**
     * register
     * @param {String} email 
     * @param {String} password 
     */
    register(email, password, type) {
        const account = new Account({email, password, type});

        return account.save();
    },
    /**
     * login
     * @param {Object} req 
     * @param {Object} res 
     */
    login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw { message: 'Invalid credentials', id: 'error.credentials' };
        }
        
        return new Promise((resolve, reject) => {
            return Passport.authenticate('local', (err, accountData) => {
                if (err) {
                    reject(err);
                }

                return resolve(accountData);
            })(req, res);
        })
    }
}