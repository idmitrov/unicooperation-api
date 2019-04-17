import Passport from 'passport';

import Account from './account.model';
import { accountType } from './account.constants';

import Admin from '../admin/admin.model';
import Partner from '../partner/partner.model';
import Student from '../student/student.model';
import University from '../university/university.model';

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
        return new Promise((resolve, reject) => {
            return Passport.authenticate('local', (err, accountData) => {
                if (err) {
                    reject(err);
                }

                return resolve(accountData);
            })(req, res);
        })
    },
    get(email) {
        return Account.findOne({ email });
    },
    /**
     * Seed account
     * @param {String} email 
     * @param {String} password
     * @param {String} accountType
     */
    seedAccount(email, password, accountType) {
        return Account.findOne({ email })
            .then((foundAccount) => {
                if (!foundAccount) {
                    return this.register(email, password, accountType);
                }

                return Promise.resolve(foundAccount);
            });
    }
}