import Account from './account.model';

export default {
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