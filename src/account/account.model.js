import { dbSchema, dbModel } from '../db';
import Utils from '../utils';

const accountSchemaOptions = {
    timestamps: true
};

const accountSchema = new dbSchema({
    /**
     * @name email
     * @type String
     */
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    /**
     * @name password
     * @type String
     */
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    /**
     * @name confirmed
     * @type Boolean
     */
    confirmed: {
        type: Boolean,
        default: false
    }
}, accountSchemaOptions);

/**
 * Compare candidate password with user.password
 * @param {String} possiblePassword
 */
accountSchema.methods.comparePasswords = function(possiblePassword) {
    return Utils.compareHashes(possiblePassword, this.password);
}

accountSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        return Utils.generateSalt()
            .then((salt) => {
                return Utils.generateHash(this.password, salt)
            })
            .then((hashedPassword) => {
                this.password = hashedPassword;
                
                return next();
            });
    }

    return next();
});

export default new dbModel('Account', accountSchema);