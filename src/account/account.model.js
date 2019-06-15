import { dbSchema, dbModel } from '../db';
import Utils from '../utils';
import { accountType } from './account.constants';

const accountSchemaOptions = {
    timestamps: true
};

const accountSchema = new dbSchema({
    /**
     * @name confirmed
     * @type Boolean
     */
    confirmed: {
        type: Boolean,
        default: false
    },
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
     * @name profile
     * @type Object
     */
    profileId: {
       type: dbSchema.Types.ObjectId,
       refPath: 'type',
       default: null
    },
    /**
     * @name type
     * @type String
     */
    type: {
        type: String,
        required: true,
        enum: Object.values(accountType)
    }
}, accountSchemaOptions);

/**
 * Compare candidate password with user.password
 * @name comparePasswords
 * @param {String} possiblePassword
 */
accountSchema.methods.comparePasswords = function(possiblePassword) {
    return Utils.compareHashes(possiblePassword, this.password);
}

/**
 * Returns account public fields only
 * @name getPublicFields
 */
accountSchema.methods.getPublicFields = function() {
    const { type, profileId, email, confirmed, avatar } = this;

    return { type, profileId, email, confirmed, avatar };
}

accountSchema.methods.setProfileId = function(profileId) {
    this.profileId = profileId;

    return this.save();
}

// TODO: Refactor to returns only the profile without the account
accountSchema.methods.getProfile = function() {
    return Account.populate(this, 'profileId');
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

const Account = new dbModel('Account', accountSchema);

export default Account;