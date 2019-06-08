import { dbSchema, dbModel } from '../db';

const studentSchemaOptions = {
    timestamps: true
};

const studentSchema = new dbSchema({
    /**
     * @name account
     * @type Account
     */
    account: {
        type: dbSchema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    /**
     * @name avatar
     * @type String
     */
    avatar: {
        type: String,
        default: null
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
     * @name facebookUrl
     * @type String 
     */
    facebookUrl: {
        type: String,
        default: null
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
     * @name linkedinUrl
     * @type String 
     */
    linkedinUrl: {
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
    }
}, studentSchemaOptions);

studentSchema.index({ universityId: 1, facultyId: 1 }, { unique: true })

export default dbModel('Student', studentSchema);