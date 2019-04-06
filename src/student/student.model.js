import { dbSchema, dbModel } from '../db';

const studentSchemaOptions = {
    timestamps: true
};

const studentSchema = new dbSchema({
    /**
     * @name accountId
     * @type Account
     */
    accountId: {
        type: dbSchema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    /**
     * @name facultyId
     * @type String
     */
    facultyId: {
        type: String,
        required: true
    },
    /**
     * @name firstName
     * @type String
     */
    firstName: {
        type: String,
        required: true
    },
    /**
     * @name lastName
     * @type String
     */
    lastName: {
        type: String,
        default: null
    },
    /**
     * @name middleName
     * @type String
     */
    middleName: {
        type: String,
        default: null
    },
    /**
     * @name mobileNumber
     * @type String
     */
    mobileNumber: {
        type: String,
        default: null
    },
    /**
     * @name verified
     * @type Boolean
     */
    verified: {
        type: Boolean,
        default: false
    },
    /**
     * @name summary
     * @type String
     */
    summary: {
        type: String,
        default: null
    },
    /**
     * @name universityId
     * @type String
     */
    universityId: {
        type: dbSchema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    facebookProfileUrl: {
        type: String,
        default: null,
        unique: true
    },
    linkedInProfileUrl: {
        type: String,
        default: null,
        unique: true
    },
    instagramProfileUrl: {
        type: String,
        default: null,
        unique: true
    }
}, studentSchemaOptions);

studentSchema.index({ universityId: 1, facultyId: 1 }, { unique: true })

export default dbModel('Student', studentSchema);