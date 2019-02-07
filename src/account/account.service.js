import Passport from 'passport';
import Account from './account.model';

export default {
    login(req, res) {
        return new Promise((resolve, reject) => {
            return Passport.authenticate('local', (err, accountData) => {
                if (err) {
                    reject(err);
                }

                return resolve(accountData);
            })(req, res);
        })
    },
    /**
     * Seed Admin account
     * @param {String} email 
     * @param {String} password 
     */
    seedAdmin(email, password) {
        return Account.findOne({ email })
            .then((foundAcction) => {
                if (!foundAcction) {
                    const admin = new Account({
                        email,
                        password
                    });

                    return admin.save();
                }

                return Promise.resolve(foundAcction);
            });
    }
}