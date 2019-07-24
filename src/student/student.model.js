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
     * @name available
     * @type Boolean
     */
    available: {
        type: Boolean,
        default: true
    },
    /**
     * @name experience
     * @type Number
     */
    experience: {
        type: Number,
        default: 0
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
     * @name instagramUrl
     * @type String
     */
    instagramUrl: {
        type: String,
        default: null
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
     * @name skills
     * @type Array
     */
    skills: [{
        type: String
    }],
    /**
     * @name title
     * @type String
     */
    title: {
        type: String,
        default: 'student'
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
     * @name university
     * @type String
     */
    university: {
        type: dbSchema.Types.ObjectId,
        ref: 'University',
        required: true
    }
}, studentSchemaOptions);

studentSchema.index({ university: 1, facultyId: 1 }, { unique: true });

export default dbModel('Student', studentSchema);