import { dbSchema, dbModel } from '../db';

const universitySchemaOptions = {
    timestamps: true
};

const universitySchema = new dbSchema({
    /**
     * @name accountId
     * @type String
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
     * @name facebookUrl
     * @type String
     */
    facebookUrl: {
        type: String,
        default: null
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
     * @name linkedinUrl
     * @type String
     */
    linkedinUrl: {
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
     * @name name
     * @type String
     */
    name: {
        type: String,
        required: true
    },
    /**
     * @name partners
     * @type Array
     */
    partners: [
        { type: dbSchema.Types.ObjectId, ref: 'Partner' }
    ],
    /**
     * @name rating
     * @type Number
     */
    rating: {
        type: Number,
        default: 0
    },
    /**
     * @name students
     * @type Array
     */
    students: [
        { type: dbSchema.Types.ObjectId, ref: 'Student' }
    ],
    /**
     * @name summary
     * @type String
     */
    summary: {
        type: String,
        default: null
    }
}, universitySchemaOptions);

export default dbModel('University', universitySchema);