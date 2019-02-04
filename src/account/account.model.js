import { dbSchema, dbModel } from '../db';
import Utils from '../utils';

const accountSchema = new dbSchema({
    /**
     * @name email
     * @type String
     */
    email: {
        type: String,
        required: true,
        unique: true
    },
    /**
     * @name password
     * @type String
     */
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

accountSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        return Utils.generateSalt()
            .then((salt) => {
                return Utils.generateHash(this.password, salt)
            })
            .then((hashedPassword) => {
                this.password = hashedPassword;
            });
    }

    return next();
});

export default new dbModel('Account', accountSchema);